import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Clock3,
  MessageCircle,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { safaris as safariRoutes } from "../../lib/content/safaris";

export default function SafarisPage() {

  return (
    <main>
      <Navbar />

      {/* Page hero */}
      <section className="relative flex min-h-[470px] items-center overflow-hidden">
        <Image
          src="/images/minneriya-elephants.webp"
          alt="Sri Lankan wildlife safari"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#0d2b24]/75" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#e7ad4a]"
          >
            <ArrowLeft size={17} />
            Return Home
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-[#e7ad4a]">
            Explore Our Safaris
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Choose your journey into Sri Lanka&apos;s wild.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Compare our safari experiences and choose a route that suits your
            interests, travel date and group.
          </p>
        </div>
      </section>

      {/* Safari routes */}
      <section className="bg-[#f8f5ee] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9902f]">
                Four Safari Experiences
              </p>

              <h2 className="mt-4 text-4xl font-bold text-[#173f35] md:text-5xl">
                Find the right route for you.
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-gray-600">
              Wildlife locations can change with the season. Contact us with
              your travel date for help selecting the most suitable route.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {safariRoutes.map((safari) => (
              <article
                key={safari.id}
                className="group overflow-hidden rounded-3xl border border-[#e4dccf] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={safari.image}
                    alt={safari.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <span className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#d9902f] text-sm font-bold text-white">
                    {String(safari.id).padStart(2, "0")}
                  </span>

                  <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                    {safari.name}
                  </h2>
                </div>

                <div className="p-7">
                  <p className="leading-7 text-gray-600">
                    {safari.description}
                  </p>

                  <div className="mt-6 grid gap-4 rounded-2xl bg-[#f8f5ee] p-5 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Clock3 size={20} className="text-[#d9902f]" />

                      <div>
                        <p className="text-xs text-gray-500">Duration</p>

                        <p className="mt-1 text-sm font-bold text-[#173f35]">
                          {safari.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Camera size={20} className="text-[#d9902f]" />

                      <div>
                        <p className="text-xs text-gray-500">Best For</p>

                        <p className="mt-1 text-sm font-bold text-[#173f35]">
                          {safari.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm text-[#173f35] sm:grid-cols-3">
                    {safari.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-[#d9902f]"
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={safari.link}
                    className="mt-7 flex items-center justify-between rounded-xl bg-[#173f35] px-5 py-4 font-semibold text-white transition hover:bg-[#d9902f]"
                  >
                    View Safari Details
                    <ArrowRight size={19} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Help section */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-[#173f35] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e7ad4a]">
              Need Some Guidance?
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Not sure which safari to choose?
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-white/65">
              Share your travel date and interests, and we will help you choose
              a suitable experience.
            </p>
          </div>

          <a
            href="/booking"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#d9902f] px-7 py-4 font-semibold text-white transition hover:bg-[#b87420]"
          >
            <MessageCircle size={20} />
            Request a booking
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}