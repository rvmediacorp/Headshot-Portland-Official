/**
 * Bloom.io public questionnaire API client.
 *
 * Bloom exposes an unauthenticated, public form-submission API. The happy path
 * is a strict three-stage flow (7 total HTTP requests):
 *
 *   1. POST /api/questionnaires/{id}/answer-groups           → create group
 *   2. POST /api/questionnaires/{id}/answers × 5             → one per question
 *   3. POST /api/questionnaires/{id}/answers (payload=SUBMIT) → finalize
 *
 * All calls MUST be sequential (Bloom races out-of-order submits) and must
 * carry the three required headers below. No authentication.
 *
 * This module is server-only — it's imported by the /api/lead route handler,
 * never shipped to the browser.
 */

const BLOOM_API_BASE = "https://api.bloom.io"
const QUESTIONNAIRE_ID_DEFAULT = "3257ko6em9n6g" // "Get instant quote"

const HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/vnd.bloom.v3",
  "x-new-feature": "1",
}

const QUESTION_IDS = {
  headshotType: "8wod4vxo8jd01",
  needIn2to4Wks: "pv5d61jxqj7w4",
  turnaround: "vn8d20opln7oq",
  budget: "2kldyqrnno7pj",
  contact: "po8711q3317w4",
} as const

// String literals pinned to match types/lead.ts exactly — TypeScript catches
// any future drift between our Lead enum values and Bloom's accepted payloads.
export type BloomHeadshotType =
  | "LinkedIn"
  | "Website & Business Card"
  | "Modeling Digital"
  | "Children Portfolio"

export type BloomTurnaround = "24-48 Hours" | "1 Week" | "2-3 Weeks"

export type BloomBudget =
  | "$200-500"
  | "$500-1000"
  | "$1k-2k (teams)"
  | "$2k-4k (large teams)"

export interface BloomLead {
  headshotType: BloomHeadshotType
  needIn2to4Wks: boolean
  turnaround: BloomTurnaround
  budget: BloomBudget[]
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export class BloomError extends Error {
  constructor(
    public step: string,
    public status: number,
    public body: string
  ) {
    super(`Bloom ${step} failed (${status}): ${body}`)
    this.name = "BloomError"
  }
}

interface BloomFetchOpts {
  signal?: AbortSignal
}

async function bloomFetch(
  path: string,
  body: unknown,
  opts: BloomFetchOpts
): Promise<unknown> {
  const res = await fetch(`${BLOOM_API_BASE}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
    signal: opts.signal,
  })
  const text = await res.text()
  if (!res.ok) throw new BloomError(path, res.status, text)
  return text ? JSON.parse(text) : {}
}

async function createAnswerGroup(
  questionnaireId: string,
  opts: BloomFetchOpts
): Promise<string> {
  const json = (await bloomFetch(
    `/api/questionnaires/${questionnaireId}/answer-groups`,
    {},
    opts
  )) as { "answer-group"?: { id?: string } }
  const id = json["answer-group"]?.id
  if (!id) {
    throw new BloomError(
      "createAnswerGroup",
      0,
      `Unexpected response shape: ${JSON.stringify(json)}`
    )
  }
  return id
}

async function submitAnswer(
  questionnaireId: string,
  answerGroupId: string,
  questionId: string,
  payload: unknown,
  opts: BloomFetchOpts
): Promise<void> {
  await bloomFetch(
    `/api/questionnaires/${questionnaireId}/answers`,
    { answerGroupId, questionId, payload },
    opts
  )
}

async function finalize(
  questionnaireId: string,
  answerGroupId: string,
  opts: BloomFetchOpts
): Promise<void> {
  await bloomFetch(
    `/api/questionnaires/${questionnaireId}/answers`,
    { answerGroupId, payload: "SUBMIT" },
    opts
  )
}

export interface SubmitBloomLeadOpts {
  /** Override the default questionnaire ID (useful for staging). */
  questionnaireId?: string
  /** Single AbortSignal shared across all 7 Bloom calls for total-timeout control. */
  signal?: AbortSignal
}

/**
 * Submit a lead to Bloom.
 *
 * Walks Bloom's 3-stage questionnaire API sequentially. Throws `BloomError`
 * on any non-2xx response. Callers are expected to catch and log; the calling
 * route handler treats Bloom as fail-soft.
 */
export async function submitBloomLead(
  lead: BloomLead,
  opts: SubmitBloomLeadOpts = {}
): Promise<{ answerGroupId: string }> {
  const questionnaireId = opts.questionnaireId ?? QUESTIONNAIRE_ID_DEFAULT
  const fetchOpts: BloomFetchOpts = { signal: opts.signal }

  const answerGroupId = await createAnswerGroup(questionnaireId, fetchOpts)

  // Order matches the hosted form; Bloom races out-of-order submissions.
  await submitAnswer(
    questionnaireId,
    answerGroupId,
    QUESTION_IDS.headshotType,
    lead.headshotType,
    fetchOpts
  )
  await submitAnswer(
    questionnaireId,
    answerGroupId,
    QUESTION_IDS.needIn2to4Wks,
    lead.needIn2to4Wks,
    fetchOpts
  )
  await submitAnswer(
    questionnaireId,
    answerGroupId,
    QUESTION_IDS.turnaround,
    lead.turnaround,
    fetchOpts
  )
  await submitAnswer(
    questionnaireId,
    answerGroupId,
    QUESTION_IDS.budget,
    lead.budget,
    fetchOpts
  )
  await submitAnswer(
    questionnaireId,
    answerGroupId,
    QUESTION_IDS.contact,
    lead.contact,
    fetchOpts
  )

  await finalize(questionnaireId, answerGroupId, fetchOpts)

  return { answerGroupId }
}
