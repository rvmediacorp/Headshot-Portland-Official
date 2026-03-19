export default function VisitUsSection() {
  return (
    <div className="w-full px-[10px] my-[10px]">
      <section
        className="w-full rounded-[10px] bg-white"
        style={{
          display: "flex",
          padding: "116px 0px", // Changed from "116px 64px" to remove horizontal padding
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="w-full max-w-[95%] mx-auto">
          {/* Section Heading */}
          <h2 className="font-bodoniModa italic mb-12 md:mb-16 tracking-wide text-center overflow-hidden">
            <span className="text-[#1E3A47] text-[50px] md:text-[140px] lg:text-[220px] leading-[1.1] inline-block md:whitespace-nowrap">
              VISIT
            </span>
            <span className="text-[#247BA0] text-[50px] md:text-[140px] lg:text-[220px] leading-[1.1] inline-block ml-2 md:ml-8 md:whitespace-nowrap">
              US
            </span>
          </h2>

          {/* Information Grid - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
            {/* Address Column */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-4">ADDRESS</h3>
              <a
                href="https://maps.google.com/?q=750+SW+9TH+AVE,PORTLAND,+OR+97205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#247BA0] transition-colors"
              >
                <p className="font-bold text-center">
                  750 SW 9TH
                  <br />
                  AVE,PORTLAND, OR
                  <br />
                  97205
                </p>
              </a>
            </div>

            {/* Studio Hours Column */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-4">
                STUDIO HOURS
              </h3>
              <p className="font-bold text-black text-center">
                Monday-Thursday 8 am–10:30 pm
                <br />
                Friday 9 am-2 pm
                <br />
                Weekend – 9 am – 5 pm
              </p>
            </div>

            {/* Location Column */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-4">LOCATION</h3>
              <p className="font-bold text-black text-center">
                We&apos;re located in the Park Ave West building across from Nordstroms.{" "}
                <a
                  href="https://maps.google.com/?q=750+SW+9TH+AVE,PORTLAND,+OR+97205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#247BA0] hover:underline"
                >
                  Click here to get directions
                </a>
              </p>
            </div>
          </div>

          {/* Information Stack - Mobile */}
          <div className="md:hidden space-y-8 mb-8">
            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-2">ADDRESS</h3>
              <a
                href="https://maps.google.com/?q=750+SW+9TH+AVE,PORTLAND,+OR+97205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#247BA0] transition-colors"
              >
                <p className="font-bold text-center">
                  750 SW 9TH
                  <br />
                  AVE,PORTLAND, OR
                  <br />
                  97205
                </p>
              </a>
            </div>

            {/* Studio Hours */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-2">
                STUDIO HOURS
              </h3>
              <p className="font-bold text-black text-center">
                Monday-Thursday 8 am–10:30 pm
                <br />
                Friday 9 am-2 pm
                <br />
                Weekend – 9 am – 5 pm
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bodoniModa italic text-[#1E3A47] text-3xl md:text-4xl lg:text-5xl mb-2">LOCATION</h3>
              <p className="font-bold text-black text-center">
                We&apos;re located in the Park Ave West building across from Nordstroms.{" "}
                <a
                  href="https://maps.google.com/?q=750+SW+9TH+AVE,PORTLAND,+OR+97205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#247BA0] hover:underline"
                >
                  Click here to get directions
                </a>
              </p>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-[#247BA0] mb-8"></div>

          {/* Parking Information */}
          <div className="mb-8">
            <p className="text-black text-base md:text-lg">
              Metered parking, as well as free parking, is available on 9th and Park Avenue. We&apos;re a few blocks away
              from the Pioneer Square Mall & Nordstroms. You can get to our studio easily on the Red or Blue Trimet
              Line.
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-[400px] md:h-[500px] rounded-md overflow-hidden mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.5107874889835!2d-122.68211492346055!3d45.51921787107615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a051f072ee9%3A0x1e8c2d3e8e42a313!2s750%20SW%209th%20Ave%2C%20Portland%2C%20OR%2097205!5e0!3m2!1sen!2sus!4v1712789582831!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Headshot Portland Studio Location"
              aria-label="Map showing Headshot Portland studio location at 750 SW 9th Ave, Portland, OR 97205"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
