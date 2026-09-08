import Link from "next/link";
import Image from "next/image";
import {
  ArrowUp,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to know more about your Sri Lankan travel experiences."
  );

  return (
    <footer className="bg-[#0d2b24] text-white">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="#home" className="inline-block">
            <Image
              src="/images/safari-logo-transparent.png"
              alt="Safari Travel elephant logo"
              width={664}
              height={683}
              sizes="112px"
              className="mb-4 h-auto w-28 object-contain"
            />
            <p className="text-2xl font-bold">Serendib Wild Trails</p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#e7ad4a]">
              Safari & Experiences
            </p>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
            Meaningful wildlife, village and cultural journeys created to help
            travellers discover the natural beauty and heritage of Sri Lanka.
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
            <MapPin size={18} className="shrink-0 text-[#e7ad4a]" />

            <span>Habarana, Central Sri Lanka</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#e7ad4a]">
            Quick Links
          </h2>

          <nav className="mt-6 flex flex-col gap-4 text-sm text-white/65">
            <Link href="#home" className="transition hover:text-white">
              Home
            </Link>

            <Link href="#about" className="transition hover:text-white">
              About Us
            </Link>

            <Link href="#gallery" className="transition hover:text-white">
              Gallery
            </Link>

            <Link href="#reviews" className="transition hover:text-white">
              Testimonials
            </Link>

            <Link href="#contact" className="transition hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        {/* Experiences */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#e7ad4a]">
            Experiences
          </h2>

          <nav className="mt-6 flex flex-col gap-4 text-sm text-white/65">
            <Link
              href="/safaris/minneriya"
              className="transition hover:text-white"
            >
              Minneriya Safari
            </Link>

            <Link
              href="/safaris/kaudulla"
              className="transition hover:text-white"
            >
              Kaudulla Safari
            </Link>

            <Link href="/village-tour" className="transition hover:text-white">
              Village Experience
            </Link>

            <Link
              href="/destinations/sigiriya"
              className="transition hover:text-white"
            >
              Sigiriya Journey
            </Link>

            <Link
              href="/destinations/dambulla"
              className="transition hover:text-white"
            >
              Dambulla Journey
            </Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#e7ad4a]">
            Contact Us
          </h2>

          <div className="mt-6 space-y-5">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/94762801972?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#e7ad4a] transition group-hover:bg-[#d9902f] group-hover:text-white">
                <MessageCircle size={19} />
              </span>

              <div>
                <p className="text-xs text-white/45">WhatsApp</p>

                <p className="mt-1 text-sm font-semibold text-white/80 group-hover:text-white">
                  +94 76 280 1972
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+94767632044"
              className="group flex items-center gap-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#e7ad4a] transition group-hover:bg-[#d9902f] group-hover:text-white">
                <Phone size={18} />
              </span>

              <div>
                <p className="text-xs text-white/45">Call Us</p>

                <p className="mt-1 text-sm font-semibold text-white/80 group-hover:text-white">
                  +94 76 763 2044
                </p>
              </div>
            </a>
          </div>

          {/* Main WhatsApp button */}
          <a
            href={`https://wa.me/94762801972?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-[#d9902f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b87420]"
          >
            Start a Conversation →
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Serendib Wild Trails. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>

            {/* Back to top */}
            <Link
              href="#home"
              aria-label="Return to top of page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#d9902f] hover:bg-[#d9902f]"
            >
              <ArrowUp size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
