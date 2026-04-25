"use client"

import { useMemo, useId, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Check,
} from "lucide-react"
import { newEventId, track } from "@/lib/analytics"
import { readAttribution } from "@/lib/AttributionCapture"
import type {
  Niche,
  HeadshotType,
  DeliveryTimeline,
  BudgetRange,
  FormStep,
  LeadPayload,
} from "@/types/lead"

const HEADSHOT_TYPES: HeadshotType[] = [
  "LinkedIn",
  "Website & Business Card",
  "Modeling Digital",
  "Children Portfolio",
]

const DELIVERY_TIMELINES: DeliveryTimeline[] = [
  "24-48 Hours",
  "1 Week",
  "2-3 Weeks",
]

const BUDGET_RANGES: BudgetRange[] = [
  "$200-500",
  "$500-1000",
  "$1k-2k (teams)",
  "$2k-4k (large teams)",
]

const FALLBACK_QUOTE_URL = "https://ww3.headshotportland.com/instant-quote"

interface QuoteFormProps {
  niche: Niche
  /** Optional override for the on-light card background. */
  variant?: "on-dark" | "on-light"
}

export default function QuoteForm({
  niche,
  variant = "on-dark",
}: QuoteFormProps) {
  const formId = useId()
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  const [step, setStep] = useState<FormStep>(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [startedTracked, setStartedTracked] = useState(false)

  const [headshotType, setHeadshotType] = useState<HeadshotType | null>(null)
  const [urgentBooking, setUrgentBooking] = useState<boolean | null>(null)
  const [deliveryTimeline, setDeliveryTimeline] =
    useState<DeliveryTimeline | null>(null)
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function trackStart() {
    if (startedTracked) return
    setStartedTracked(true)
    track("form_start", { niche, form_id: formId })
  }

  function announce(message: string) {
    if (liveRegionRef.current) liveRegionRef.current.textContent = message
  }

  function goToStep(next: FormStep) {
    setStep((prev) => {
      track("form_step_complete", { step: prev, niche, next_step: next })
      return next
    })
  }

  // ── Validation ───────────────────────────────────────────────────────────
  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (step === 4 && budgetRanges.length === 0) {
      e.budget = "Choose at least one budget range."
    }
    if (step === 5) {
      if (!firstName.trim()) e.firstName = "Please enter your first name."
      if (!lastName.trim()) e.lastName = "Please enter your last name."
      if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email."
      const digits = phone.replace(/\D+/g, "")
      if (digits.length < 7) e.phone = "Enter a valid phone number."
    }
    return e
  }, [step, budgetRanges.length, firstName, lastName, email, phone])

  function showErr(field: string): string | null {
    return touched[field] && errors[field] ? errors[field]! : null
  }

  // ── Step handlers ────────────────────────────────────────────────────────
  function pickHeadshotType(value: HeadshotType) {
    trackStart()
    setHeadshotType(value)
    goToStep(2)
  }

  function pickUrgentBooking(value: boolean) {
    trackStart()
    setUrgentBooking(value)
    goToStep(3)
  }

  function pickDeliveryTimeline(value: DeliveryTimeline) {
    trackStart()
    setDeliveryTimeline(value)
    goToStep(4)
  }

  function toggleBudget(value: BudgetRange) {
    trackStart()
    setBudgetRanges((prev) =>
      prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]
    )
  }

  function nextFromBudget() {
    if (budgetRanges.length === 0) {
      setTouched((t) => ({ ...t, budget: true }))
      announce("Please pick at least one budget range.")
      return
    }
    goToStep(5)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched((t) => ({
      ...t,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }))
    if (errors.firstName || errors.lastName || errors.email || errors.phone) {
      announce("Please fix the highlighted fields before submitting.")
      return
    }
    if (
      !headshotType ||
      urgentBooking === null ||
      !deliveryTimeline ||
      budgetRanges.length === 0
    ) {
      announce("Please complete all earlier steps before submitting.")
      return
    }

    setSubmitting(true)
    setSubmitError(null)
    track("form_submit", { niche, form_id: formId })

    const payload: LeadPayload = {
      niche,
      headshotType,
      urgentBooking,
      deliveryTimeline,
      budgetRanges,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attribution: {
        ...readAttribution(),
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      },
      event_id: newEventId(),
      page_url:
        typeof window !== "undefined" ? window.location.href : undefined,
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `Request failed (${res.status})`)
      }

      track("generate_lead", {
        niche,
        value: 0,
        currency: "USD",
        event_id: payload.event_id,
        attribution: payload.attribution,
      })
      setSubmitted(true)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong."
      setSubmitError(message)
      announce(`Submission failed: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // ── UI helpers ───────────────────────────────────────────────────────────
  const isLight = variant === "on-light"
  const cardBg = isLight
    ? "bg-white text-[#111] ring-1 ring-black/10"
    : "bg-white text-[#111] ring-1 ring-black/10"

  const tileBase =
    "focus-ring text-left rounded-xl border border-black/10 bg-[#FAFAF7] px-4 py-4 text-sm sm:text-base font-medium transition hover:border-black/30 hover:bg-white"
  const tileSelected =
    "ring-2 ring-[var(--brand)] border-transparent bg-white"

  const inputBase =
    "focus-ring w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base text-[#111] placeholder:text-[#888] outline-none focus:border-[var(--brand)]"

  const progress = (step / 5) * 100

  // ── Success state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className={`rounded-2xl p-6 sm:p-8 ${cardBg}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="mb-3 h-10 w-10 text-[var(--brand)]"
          aria-hidden
        />
        <h3
          data-display
          className="text-2xl font-semibold leading-tight sm:text-3xl"
        >
          You&apos;re on the list
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#444]">
          Nathan or a team member will reply within 1 business hour with your
          custom quote and next available studio times.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#444]">
          <a
            href="tel:+15033137121"
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 hover:bg-white"
            onClick={() => track("phone_click", { from: "form_success" })}
          >
            <Phone className="h-4 w-4" aria-hidden /> 503.313.7121
          </a>
          <span>or text — we reply fast.</span>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className={`relative rounded-2xl p-5 sm:p-6 ${cardBg}`}
      aria-labelledby={`${formId}-heading`}
      noValidate
    >
      <input type="hidden" name="niche" value={niche} />

      {/* Progress bar */}
      <div
        className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Quote form progress"
      >
        <div
          className="h-full rounded-full bg-[var(--brand)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step heading */}
      <h2
        id={`${formId}-heading`}
        data-display
        className="text-xl font-semibold leading-tight sm:text-2xl"
      >
        {step === 1 && "What type of headshots are you looking for?"}
        {step === 2 &&
          "Are you looking to get your headshots in the next 2-4 weeks?"}
        {step === 3 && "How soon do you need your headshots after our session?"}
        {step === 4 && "What is your budget range?"}
        {step === 5 && "Where can we send your quote?"}
      </h2>

      <div className="mt-1 text-xs uppercase tracking-wide text-[#666]">
        Step {step} of 5
        {step === 4 && (
          <span className="ml-2 normal-case tracking-normal text-[#888]">
            · select all that apply
          </span>
        )}
      </div>

      {/* Live region for errors / status */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div className="mt-4">
        {step === 1 && (
          <fieldset className="grid grid-cols-1 gap-2.5 sm:gap-3">
            <legend className="sr-only">Type of headshots</legend>
            {HEADSHOT_TYPES.map((opt) => {
              const selected = headshotType === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pickHeadshotType(opt)}
                  className={`${tileBase} ${selected ? tileSelected : ""} flex min-h-[56px] items-center justify-between focus-ring`}
                  aria-pressed={selected}
                >
                  <span>{opt}</span>
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand)]"
                        : "border-black/25"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              )
            })}
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="grid grid-cols-1 gap-2.5 sm:gap-3">
            <legend className="sr-only">
              Looking to book in the next 2-4 weeks?
            </legend>
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map(({ label, value }) => {
              const selected = urgentBooking === value
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => pickUrgentBooking(value)}
                  className={`${tileBase} ${selected ? tileSelected : ""} flex min-h-[64px] items-center justify-center text-base font-semibold focus-ring`}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              )
            })}
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="grid grid-cols-1 gap-2.5 sm:gap-3">
            <legend className="sr-only">Delivery timeline</legend>
            {DELIVERY_TIMELINES.map((opt) => {
              const selected = deliveryTimeline === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pickDeliveryTimeline(opt)}
                  className={`${tileBase} ${selected ? tileSelected : ""} flex min-h-[56px] items-center justify-between focus-ring`}
                  aria-pressed={selected}
                >
                  <span>{opt}</span>
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand)]"
                        : "border-black/25"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              )
            })}
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="grid grid-cols-1 gap-2.5 sm:gap-3">
            <legend className="sr-only">Budget ranges (multi-select)</legend>
            {BUDGET_RANGES.map((opt) => {
              const selected = budgetRanges.includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleBudget(opt)}
                  className={`${tileBase} ${selected ? tileSelected : ""} flex min-h-[56px] items-center justify-between focus-ring`}
                  aria-pressed={selected}
                  role="checkbox"
                  aria-checked={selected}
                >
                  <span>{opt}</span>
                  <span
                    aria-hidden
                    style={{ borderRadius: "6px" }}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                        : "border-black/30 text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </button>
              )
            })}
            {showErr("budget") && (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors.budget}
              </p>
            )}
          </fieldset>
        )}

        {step === 5 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  First name
                </span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                  autoComplete="given-name"
                  aria-invalid={!!showErr("firstName")}
                  aria-describedby={
                    showErr("firstName")
                      ? `${formId}-firstName-err`
                      : undefined
                  }
                  className={inputBase}
                />
                {showErr("firstName") && (
                  <p
                    id={`${formId}-firstName-err`}
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.firstName}
                  </p>
                )}
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Last name
                </span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                  autoComplete="family-name"
                  aria-invalid={!!showErr("lastName")}
                  aria-describedby={
                    showErr("lastName") ? `${formId}-lastName-err` : undefined
                  }
                  className={inputBase}
                />
                {showErr("lastName") && (
                  <p
                    id={`${formId}-lastName-err`}
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.lastName}
                  </p>
                )}
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!showErr("email")}
                aria-describedby={
                  showErr("email") ? `${formId}-email-err` : undefined
                }
                className={inputBase}
              />
              {showErr("email") && (
                <p
                  id={`${formId}-email-err`}
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={!!showErr("phone")}
                aria-describedby={
                  showErr("phone") ? `${formId}-phone-err` : undefined
                }
                className={inputBase}
              />
              {showErr("phone") && (
                <p
                  id={`${formId}-phone-err`}
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.phone}
                </p>
              )}
            </label>
            <p className="text-xs text-[#666]">
              We&apos;ll reply within 1 business hour. We never share your info.
            </p>
            {submitError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <p className="font-medium">We couldn&apos;t send your quote.</p>
                <p className="mt-1">
                  Try again, or call us at{" "}
                  <a
                    href="tel:+15033137121"
                    className="font-semibold underline"
                    onClick={() =>
                      track("phone_click", { from: "form_error" })
                    }
                  >
                    503.313.7121
                  </a>{" "}
                  — or use our{" "}
                  <a
                    href={FALLBACK_QUOTE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    onClick={() =>
                      track("external_cta_click", {
                        from: "form_error",
                        href: FALLBACK_QUOTE_URL,
                      })
                    }
                  >
                    instant quote tool
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer / nav */}
      <div className="mt-5 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, (s - 1)) as FormStep)}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[#444] hover:text-[#111] hover:bg-black/5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}

        {step === 4 && (
          <button
            type="button"
            onClick={nextFromBudget}
            disabled={budgetRanges.length === 0}
            className="focus-ring btn-brand inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50 sm:text-base"
          >
            Next <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        )}
        {step === 5 && (
          <button
            type="submit"
            disabled={submitting}
            className="focus-ring btn-brand inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60 sm:text-base"
          >
            {submitting ? "Sending…" : "Get my custom quote"}
          </button>
        )}
        {(step === 1 || step === 2 || step === 3) && (
          <p className="text-xs text-[#666]">Tap an option to continue</p>
        )}
      </div>
    </form>
  )
}
