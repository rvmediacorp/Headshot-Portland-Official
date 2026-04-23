export interface Testimonial {
  name: string
  title: string
  company: string
  /** Star rating, 0–5. */
  rating: number
  quote: string
  /** Optional portrait. Use `/placeholder-user.jpg` until real portraits exist. */
  portrait: string
  /** Optional `key` override for React lists. */
  id: string
}

// TODO: Replace `portrait` with real portraits in /public/images/testimonials/<slug>.webp
//        as soon as approved photos are available. The page renders cleanly with
//        the existing /placeholder-user.jpg until then.

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "nicholas-long",
    name: "Nicholas Long",
    title: "Concept Creation Manager",
    company: "Nike",
    rating: 5,
    quote:
      "Nathan made the whole process completely painless. He coached me through every shot — I walked out with images I actually wanted to use. Best headshot experience I've had.",
    portrait: "/placeholder-user.jpg",
  },
  {
    id: "daniel-mikhaylenko",
    name: "Daniel Mikhaylenko",
    title: "Quality Assurance",
    company: "Bloom.io",
    rating: 5,
    quote:
      "I'm not a fan of being in front of a camera and Nathan made it feel easy. The retouching was tasteful — I still look like me. Got the files back in two days.",
    portrait: "/placeholder-user.jpg",
  },
  {
    id: "tom-danowski",
    name: "Tom Danowski",
    title: "Marketing",
    company: "Ziply Fiber",
    rating: 5,
    quote:
      "Nathan shot 42 people on our team in a single day. The whole event ran on time, the team had fun, and the headshots were on-brand and consistent across the board.",
    portrait: "/placeholder-user.jpg",
  },
]
