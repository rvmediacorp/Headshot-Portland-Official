const reviews = [
  { name: "Shannon Dillow", text: "Nathan did an amazing job! He had great suggestions on body angles and lighting. I'd book him again in a heartbeat." },
  { name: "Saron Kerorssa", text: "Fantastic experience! From scheduling to the actual shoot, the process was smooth, professional, and well-organized." },
  { name: "Brandon Stoehr", text: "One of the best photography companies I have ever done business with! Nathan and his team are incredibly helpful." },
  { name: "Nik A", text: "Quick and easy to work with. They shoot connected to the computer so you can see the photos as soon as they are taken." },
  { name: "T R", text: "Nathan was so personable. He made me feel comfortable right away and then guided me to the right pose. Highly recommend." },
  { name: "Tom Danowski", text: "Got to work with Nathan last week on some head shots and I absolutely loved how they turned out. Highly recommended." },
  { name: "Barbara Potter", text: "Nathan did an amazing job! Lots of photos to choose from, gave artistic direction and helped us pick the best photos!" },
  { name: "Lisa Fox", text: "Incredible experience! Their professionalism, creativity, and attention to detail made the entire process seamless." },
  { name: "Kathleen Wilson", text: "Super quick, VERY clear, AMAZING headshots were received. I would absolutely suggest using this organization!" },
  { name: "Parawana Yasmin", text: "Very professional and kind. I haven't taken a headshot I've liked in over 8 years and they were able to take several for me!" },
  { name: "Stephen Opoku Afriyie", text: "Really cool guy. Very patient and the images were great!" },
  { name: "Jamie McMillan", text: "Nathan does an absolutely fantastic job on capturing the perfect photo. Very professional and made you feel comfortable." },
  { name: "Jessica Carden", text: "My first professional headshot and it was the best experience! Nathan does a great job at making you feel comfortable." },
  { name: "Lindsay S", text: "I hate getting my picture taken, but Nathan was very friendly and helpful. Great experience." },
  { name: "Shelby Grice", text: "Fantastic experience, quick, professional, and did a fantastic job!" },
  { name: "Katie Kelley", text: "Nathan was friendly and professional. He immediately made me feel comfortable and confident. Highly recommend!" },
  { name: "Gourav Beniwal", text: "I was absolutely amazed by the picture quality and the precision behind all this work. Thank you so much." },
  { name: "Sarah Cassidy", text: "Nathan and his team know what they're doing! His quiet confidence resulted in great headshots." },
  { name: "Vadim", text: "Nathan was skilled and made me feel at ease. The resulting headshots were professional and exactly what I needed." },
  { name: "Jaden Alexzandra Kaz", text: "Nathan listened to everything I specifically wanted and got it all done efficiently. I recommend him to everyone." },
  { name: "Beth Cooper", text: "Nathan was incredible! He still gave each person an individualized experience. This is an excellent company!" },
  { name: "Eti Salazar-Kelley", text: "Very professional, courteous and patient with my corporate photograph. Highly recommend!" },
  { name: "Rosemary Pruneau", text: "First time taking professional headshots! Very good and effective experience. Definitely recommend!" },
  { name: "Cam", text: "I wish I could rate this business 6 stars. By far the best experience I have ever had hiring a photographer." },
  { name: "Yvette Scott", text: "Nathan was so nice. He worked to make sure he got the best images. Super easy and great results." },
  { name: "Trenten Cassity", text: "Great experience working with Nathan — he is the man to go to for headshots and portraits in Portland." },
  { name: "Jossie Coloma", text: "Nathan was AWESOME! Professional, kind, and I would recommend to anyone looking for an updated headshot!" },
  { name: "Joanna Van Son", text: "Extremely professional and efficient." },
  { name: "Veronica Lucero-Drennan", text: "Great photographers who made me feel comfortable and the end result was great." },
  { name: "Rachel Garza", text: "I could not be happier with how my headshot turned out!!" },
  { name: "Aarju Aryal", text: "Had a great experience! Fantastic headshots. I'm very happy with the results." },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  )
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-[#1C1B1C] rounded-xl p-5 border border-[#2a2a2a]">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className="text-white/90 text-sm leading-relaxed mb-3 line-clamp-3">{text}</p>
      <p className="text-white font-bodoniModa italic text-sm">— {name}</p>
    </div>
  )
}

export default function ReviewsMarquee() {
  // Split reviews into two rows for a double marquee
  const row1 = reviews.slice(0, 16)
  const row2 = reviews.slice(16)

  return (
    <section className="w-full py-8 overflow-hidden bg-black relative">
      {/* Dark edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Row 1 — scrolls left */}
      <div className="flex gap-4 mb-4 animate-marquee">
        {[...row1, ...row1].map((review, i) => (
          <ReviewCard key={`r1-${i}`} name={review.name} text={review.text} />
        ))}
      </div>
      {/* Row 2 — scrolls right */}
      <div className="flex gap-4 animate-marquee-reverse">
        {[...row2, ...row2, ...row2].map((review, i) => (
          <ReviewCard key={`r2-${i}`} name={review.name} text={review.text} />
        ))}
      </div>
    </section>
  )
}
