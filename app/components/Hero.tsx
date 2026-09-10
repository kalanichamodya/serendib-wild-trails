import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/minneriya-elephants.webp')",
      }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-cover bg-center ${styles.villageImage}`}
        style={{ backgroundImage: "url('/images/village-tour.png')" }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-cover bg-center ${styles.sigiriyaImage}`}
        style={{ backgroundImage: "url('/images/sigiriya.webp')" }}
      />

      {/* Dark layer over the image */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-[16px] font-bold uppercase tracking-[0.25em] text-[#e2b85e]">
            Explore Sri Lanka&apos;s Wild Side ---
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Where the wilderness comes alive.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
            Experience Sri Lanka through private wildlife safaris, authentic village
            journeys and unforgettable cultural adventures.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="https://wa.me/94762801972"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c69a4b] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#a97c32]"
            >
              Book a Safari →
            </a>

            <a
              href="/booking"
                className="rounded-full bg-[#173f35] px-7 py-4 text-center font-semibold text-white ring-1 ring-inset ring-[#e2b85e]/50 transition hover:bg-[#24594b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2b85e]"
            >
              Booking Request
            </a>

            <a
              href="#safaris"
              className="rounded-full border border-white px-7 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-[#2e3812]"
            >
              Explore Experiences
            </a>
          </div>

          {/* Service highlights */}
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-white">
            <span>✓ Local knowledge</span>
            <span>✓ Private journeys</span>
            <span>✓ Google reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-3xl text-white"
      >
        ↓
      </a>
    </section>
  );
}
