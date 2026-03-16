"use client"

import Image from "next/image"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function ContactSection() {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !message) return
    // TODO: wire up to form backend
    setSent(true)
  }

  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-[#0F0E0F]"
        style={{
          padding: isMobile ? "48px 20px 80px" : "44px 64px 64px",
        }}
      >
        {/* Heading */}
        <h2
          className="font-bodoniModa italic text-center text-brand-teal mb-10"
          style={{ fontSize: isMobile ? "48px" : "90px", lineHeight: "0.921" }}
        >
          Contact with us
        </h2>

        {/* Card */}
        <div
          className="mx-auto rounded-[10px] border border-[#4c4c4c] overflow-hidden"
          style={{
            backgroundColor: "#161516",
            padding: isMobile ? "24px" : "32px",
            maxWidth: "956px",
          }}
        >
          <div className={`flex ${isMobile ? "flex-col gap-10" : "flex-row items-stretch justify-between gap-8"}`}>

            {/* Left — Logo + Studio Hours */}
            <div
              className={`flex flex-col justify-between ${isMobile ? "" : "pr-8 border-r border-[#3c3c3c]"}`}
              style={{ minWidth: isMobile ? "auto" : "300px" }}
            >
              {/* Logo */}
              <div className="mb-8 w-[130px] h-[44px] relative">
                <Image
                  src="/images/logos/headshot_portland_white.svg"
                  alt="Headshot Portland"
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Studio Hours */}
              <div>
                <h3
                  className="font-bodoniModa italic uppercase text-brand-teal mb-4"
                  style={{ fontSize: isMobile ? "28px" : "40px", lineHeight: "0.921" }}
                >
                  Studio Hours
                </h3>
                <div className="text-white font-bold uppercase text-[16px] leading-[1.321] space-y-4">
                  <div>
                    <p>Monday–Thursday</p>
                    <p>8 AM–10:30 PM</p>
                  </div>
                  <div>
                    <p>Friday</p>
                    <p>9 AM–2 PM</p>
                  </div>
                  <div>
                    <p>Weekend</p>
                    <p>9 AM – 5 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="flex flex-col gap-8 flex-1" style={{ maxWidth: isMobile ? "100%" : "488px" }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <p className="text-brand-teal font-bodoniModa italic text-3xl mb-3">Message sent!</p>
                  <p className="text-white/60 text-sm">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                  {/* Email */}
                  <div className="flex flex-col gap-[2px]">
                    <label className="text-white/60 font-medium text-[16px] leading-[1.5]">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="mail@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-[8px] p-3 text-[16px] text-[#959595] placeholder:text-[#959595] focus:outline-none focus:ring-1 focus:ring-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal transition-colors"
                      style={{ backgroundColor: "rgba(248,250,252,0.12)", border: "none" }}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-[2px]">
                    <label className="text-white/60 font-medium text-[16px] leading-[1.5]">
                      Message <span className="text-white/60">*</span>
                    </label>
                    <textarea
                      placeholder="Hint text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="w-full rounded-[8px] p-3 text-[16px] text-[#959595] placeholder:text-[#959595] focus:outline-none focus:ring-1 focus:ring-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal transition-colors resize-none"
                      style={{ backgroundColor: "rgba(248,250,252,0.12)", border: "none" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-brand-teal text-white font-bold text-[16px] tracking-[0.16px] py-4 rounded-full hover:bg-brand-teal-hover transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
