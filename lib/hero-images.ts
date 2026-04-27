import type { Niche } from "@/types/lead"

export interface HeroImage {
  src: string
  alt: string
}

/**
 * Niche-specific hero grid images. Each niche needs exactly 6 images for the
 * mobile 2x3 / desktop 3x2 grid.
 *
 * For now, we re-use real headshots from /public/images/HeroGrid18/ so each
 * paid page renders with actual portraits (these belong to Headshot Portland
 * and are already used on the home page hero).
 *
 * TODO: Replace with niche-specific shots as they become available — drop
 *       new files into /public/images/paid/<niche>/ and swap the `src` paths.
 */

const HG = "/images/HeroGrid18"

export const HERO_IMAGES: Record<Niche, HeroImage[]> = {
  corporate: [
    { src: `${HG}/john-headshot-portland.webp`,       alt: "Corporate headshot example — Portland studio (executive in navy suit)" },
    { src: `${HG}/angela-headshot-photo.webp`,        alt: "Corporate headshot example — Portland studio (woman leader in blue top)" },
    { src: `${HG}/tom-fisher-headshot-photographer.webp`, alt: "Corporate headshot example — Portland studio (executive in navy suit)" },
    { src: `${HG}/cheryl-doctor-headshots.webp`,      alt: "Corporate headshot example — Portland studio (woman in checkered jacket)" },
    { src: `${HG}/cameron-suit-headshot.webp`,        alt: "Corporate headshot example — Portland studio (young executive in navy suit)" },
    { src: `${HG}/headshot-portland-amy.webp`,        alt: "Corporate headshot example — Portland studio (woman in white button-up)" },
  ],
  actor: [
    { src: `${HG}/austyn-portland-headshots.webp`,    alt: "Actor headshot example — Portland studio (character look, bald with mustache)" },
    { src: `${HG}/scott-black-shirt-headshot.webp`,   alt: "Actor headshot example — Portland studio (dramatic look in black shirt)" },
    { src: `${HG}/siddhi-headshot-photographer.webp`, alt: "Actor headshot example — Portland studio (commercial smile)" },
    { src: `${HG}/hannah-headshots-pdx.webp`,         alt: "Actor headshot example — Portland studio (natural expression)" },
    { src: `${HG}/valerie-headshot-photographer.webp`,alt: "Actor headshot example — Portland studio (theatrical look)" },
    { src: `${HG}/male-headshot-portland.webp`,       alt: "Actor headshot example — Portland studio (character actor in plaid jacket)" },
  ],
  linkedin: [
    { src: `${HG}/headshot-portland-amy.webp`,        alt: "LinkedIn headshot example — Portland studio (clean professional, white button-up)" },
    { src: `${HG}/cameron-suit-headshot.webp`,        alt: "LinkedIn headshot example — Portland studio (executive in navy suit)" },
    { src: `${HG}/portland-headshot-studio-andrew.webp`, alt: "LinkedIn headshot example — Portland studio (creative professional)" },
    { src: `${HG}/tom-fisher-headshot-photographer.webp`, alt: "LinkedIn headshot example — Portland studio (confident leader)" },
    { src: `${HG}/maureen-studio-headshot.webp`,      alt: "LinkedIn headshot example — Portland studio (warm smile, light blue shirt)" },
    { src: `${HG}/cheryl-doctor-headshots.webp`,      alt: "LinkedIn headshot example — Portland studio (executive style)" },
  ],
  modeling: [
    { src: `${HG}/woman-white-top-headshot-portraits.webp`, alt: "Modeling headshot example — Portland studio (editorial in white top)" },
    { src: `${HG}/hannah-headshots-pdx.webp`,         alt: "Modeling headshot example — Portland studio (natural light)" },
    { src: `${HG}/siddhi-headshot-photographer.webp`, alt: "Modeling headshot example — Portland studio (beauty close-up)" },
    { src: `${HG}/abby-headshot-portland.webp`,       alt: "Modeling headshot example — Portland studio (commercial look)" },
    { src: `${HG}/valerie-headshot-photographer.webp`,alt: "Modeling headshot example — Portland studio (fashion portrait)" },
    { src: `${HG}/angela-headshot-photo.webp`,        alt: "Modeling headshot example — Portland studio (portfolio image)" },
  ],
  realtor: [
    { src: `${HG}/abby-headshot-portland.webp`,       alt: "Realtor headshot example — Portland studio (warm smile)" },
    { src: `${HG}/maureen-studio-headshot.webp`,      alt: "Realtor headshot example — Portland studio (approachable broker)" },
    { src: `${HG}/headshot-portland-amy.webp`,        alt: "Realtor headshot example — Portland studio (polished professional)" },
    { src: `${HG}/hannah-headshots-pdx.webp`,         alt: "Realtor headshot example — Portland studio (approachable agent)" },
    { src: `${HG}/tom-fisher-headshot-photographer.webp`, alt: "Realtor headshot example — Portland studio (broker portrait)" },
    { src: `${HG}/woman-hijab-headshot-studio.webp`,  alt: "Realtor headshot example — Portland studio (warm professional)" },
  ],
  general: [
    { src: `${HG}/john-headshot-portland.webp`,       alt: "Portland headshot example — classic executive portrait" },
    { src: `${HG}/headshot-portland-amy.webp`,        alt: "Portland headshot example — polished professional" },
    { src: `${HG}/austyn-portland-headshots.webp`,    alt: "Portland headshot example — character portrait" },
    { src: `${HG}/abby-headshot-portland.webp`,       alt: "Portland headshot example — warm and approachable" },
    { src: `${HG}/cameron-suit-headshot.webp`,        alt: "Portland headshot example — young executive" },
    { src: `${HG}/hannah-headshots-pdx.webp`,         alt: "Portland headshot example — natural portrait" },
  ],
}

export const COMPANY_LOGOS: { src: string; alt: string }[] = [
  { src: "/images/logos/nike-logo.svg", alt: "Nike" },
  { src: "/images/logos/microsoft-logo.svg", alt: "Microsoft" },
  { src: "/images/logos/under-armour-logo.svg", alt: "Under Armour" },
  { src: "/images/logos/adidas-logo.svg", alt: "Adidas" },
  { src: "/images/logos/the-north-face-logo.svg", alt: "The North Face" },
  { src: "/images/logos/columbia-logo.svg", alt: "Columbia Sportswear" },
  { src: "/images/logos/keen-logo.svg", alt: "Keen" },
  { src: "/images/logos/doc-martens-logo.svg", alt: "Dr. Martens" },
  { src: "/images/logos/amazon-logo.svg", alt: "Amazon" },
  { src: "/images/logos/linkedin-logo.svg", alt: "LinkedIn" },
  { src: "/images/logos/zillow-logo.svg", alt: "Zillow" },
  { src: "/images/logos/coinbase-logo.svg", alt: "Coinbase" },
  { src: "/images/logos/chase-logo.svg", alt: "Chase Bank" },
  { src: "/images/logos/columbia-bank-logo.svg", alt: "Columbia Bank" },
  { src: "/images/logos/zoominfo-logo.svg", alt: "ZoomInfo" },
  { src: "/images/logos/fidelity-logo.svg", alt: "Fidelity Investments" },
  { src: "/images/logos/fisher-investments-logo.svg", alt: "Fisher Investments" },
  { src: "/images/logos/google-logo.svg", alt: "Google" },
  { src: "/images/logos/apple-logo.svg", alt: "Apple" },
  { src: "/images/logos/intel-logo.svg", alt: "Intel" },
  { src: "/images/logos/starbucks-logo.svg", alt: "Starbucks" },
  { src: "/images/logos/toyota-logo.svg", alt: "Toyota" },
  { src: "/images/logos/facebook-logo.svg", alt: "Facebook" },
  { src: "/images/logos/tiktok-logo.svg", alt: "TikTok" },
  { src: "/images/logos/costco-logo.svg", alt: "Costco" },
  { src: "/images/logos/boeing-logo.svg", alt: "Boeing" },
]
