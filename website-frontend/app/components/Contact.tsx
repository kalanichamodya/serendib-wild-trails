import Image from "next/image";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to plan a Sri Lankan safari experience."
  );

  return (
    <section id="contact" className="bg-white px-5 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid overflow-hidden rounded-[28px] bg-[#f8f5ee] shadow-[0_20px_60px_rgba(23,63,53,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left image */}
          <div className="relative min-h-[200px] lg:min-h-[240px]">
            <Image
              src="/images/sigiriya.webp"
              alt="Sigiriya landscape in Sri Lanka"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Location label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-white backdrop-blur-md">
              <MapPin size={16} />

              <span className="text-xs font-semibold">
                Habarana, Sri Lanka
              </span>
            </div>
          </div>

          {/* Right contact content */}
          <div className="relative flex items-center overflow-hidden p-4 md:p-5 lg:p-6">
            {/* Decoration */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#d9902f]/15" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-4">
                <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-[#d9902f]">
                  Start Your Journey ---
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold leading-tight text-[#173f35] md:text-2xl">
                Let&apos;s plan your next Sri Lankan adventure.
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-5 text-gray-600">
                Contact us to check availability and select the most suitable
                wildlife, village or cultural experience for your preferred
                travel date.
              </p>

              {/* Contact options */}
              <div className="mt-3 grid gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/94762801972?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg bg-[#173f35] px-3 py-2 text-white transition hover:bg-[#245b4c]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <MessageCircle size={20} />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        Message on WhatsApp
                      </p>

                      <p className="mt-1 font-bold">+94 76 280 1972</p>
                    </div>
                  </div>

                  <ArrowRight
                    size={21}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                {/* Phone call */}
                <a
                  href="tel:+94767632044"
                  className="group flex items-center justify-between rounded-lg border border-[#d9d0c0] bg-white px-3 py-2 text-[#173f35] transition hover:border-[#d9902f]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1e8d8]">
                      <Phone size={19} />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Call for assistance
                      </p>

                      <p className="mt-1 font-bold">+94 76 763 2044</p>
                    </div>
                  </div>

                  <ArrowRight
                    size={21}
                    className="transition group-hover:translate-x-1"
                  />
                </a>
              </div>

              <p className="mt-3 text-[11px] leading-4 text-gray-500">
                Share your preferred date, group size and experience when
                contacting us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
