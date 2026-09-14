import { site } from "../../../lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { safariDetails } from "../../../lib/content/safaris";

type SafariPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(safariDetails).map((slug) => ({
    slug,
  }));
}

export default async function SafariDetailPage({
  params,
}: SafariPageProps) {
  const { slug } = await params;
  const safari = safariDetails[slug];

  if (!safari) {
    notFound();
  }


  return (
    <main>
      <Navbar />

      {/* Detail page hero */}
      <section className="relative flex min-h-[620px] items-end overflow-hidden">
        <Image
          src={safari.image}
          alt={safari.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b24] via-[#0d2b24]/60 to-black/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 text-white">
          <Link
            href="/safaris"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#e7ad4a]"
          >
            <ArrowLeft size={17} />
            All Safari Routes
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-[#e7ad4a]">
            Private Safari Experience ---
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold md:text-7xl">
            {safari.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            {safari.introduction}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
  <a
    href="/booking"
    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d9902f] px-7 py-4 font-semibold text-white transition hover:bg-[#b87420]"
  >
    <MessageCircle size={20} />
    Book This Safari
  </a>

  <Link
    href="/safaris"
    className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[#173f35]"
  >
    Compare All Routes
  </Link>
</div>
        </div>
      </section>

      {/* Safari facts bar */}
<section className="border-b border-[#e4dccf] bg-white px-5">
  <div className="mx-auto grid max-w-7xl md:grid-cols-3 md:divide-x md:divide-[#e4dccf]">
    {/* Location */}
    <article className="flex items-center gap-4 py-7 md:pr-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eadb] text-[#d9902f]">
        <MapPin size={22} />
      </span>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Location
        </p>

        <p className="mt-1 font-bold text-[#173f35]">
          {safari.location}
        </p>
      </div>
    </article>

    {/* Duration */}
    <article className="flex items-center gap-4 border-t border-[#e4dccf] py-7 md:border-t-0 md:px-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eadb] text-[#d9902f]">
        <Clock3 size={22} />
      </span>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Approximate Duration
        </p>

        <p className="mt-1 font-bold text-[#173f35]">
          {safari.duration}
        </p>
      </div>
    </article>

    {/* Journey type */}
    <article className="flex items-center gap-4 border-t border-[#e4dccf] py-7 md:border-t-0 md:pl-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eadb] text-[#d9902f]">
        <Users size={22} />
      </span>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Journey Type
        </p>

        <p className="mt-1 font-bold text-[#173f35]">
          {safari.groupType}
        </p>
      </div>
    </article>
  </div>
</section>

      {/* Safari details */}
      <section className="bg-[#f8f5ee] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9902f]">
              About This Experience ---
            </p>

            <h2 className="mt-5 text-4xl font-bold text-[#173f35]">
              A closer look at the journey.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {safari.description}
            </p>

            <h3 className="mt-12 text-2xl font-bold text-[#173f35]">
              Experience highlights
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {safari.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9902f] text-white">
                    <Check size={17} strokeWidth={3} />
                  </span>

                  <span className="font-medium text-[#173f35]">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking panel */}
          <aside className="h-fit rounded-3xl bg-[#173f35] p-8 text-white lg:sticky lg:top-32">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e7ad4a]">
              Plan This Safari
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              What&apos;s included?
            </h2>

            <ul className="mt-7 space-y-4">
              {safari.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-[#e7ad4a]"
                  />

                  <span className="text-sm leading-6 text-white/75">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/15 pt-7">
              <p className="text-sm leading-6 text-white/60">
                Share your preferred date and group size to check
                availability.
              </p>

              <a
                href="/booking"
                className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[#d9902f] px-6 py-4 font-semibold text-white transition hover:bg-[#b87420]"
              >
                <MessageCircle size={20} />
                Check Availability
              </a>

              <a
                href={`tel:${site.phone}`}
                className="mt-3 block text-center text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Or call {site.phoneLabel}
              </a>
            </div>
          </aside>
        </div>
      </section>
      {/* Safari gallery */}
<section className="bg-white px-5 py-24">
  <div className="mx-auto max-w-7xl">
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9902f]">
        From The Park ---
      </p>

      <h2 className="mt-4 text-4xl font-bold text-[#173f35] md:text-5xl">
        Moments from {safari.name}
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600">
        A closer look at the landscapes, wildlife and safari experience.
      </p>
    </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {safari.gallery.map((photo, index) => (
        <article
          key={photo}
          className={`group relative overflow-hidden rounded-3xl bg-[#173f35] ${
            index === 0 || index === 5
              ? "min-h-[420px] lg:col-span-2"
              : "min-h-[320px]"
          }`}
        >
          <Image
            src={photo}
            alt={`${safari.name} wildlife photograph ${index + 1}`}
            fill
            sizes={
              index === 0 || index === 5
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, 33vw"
            }
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7ad4a]">
              Safari Moment {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {safari.location}
            </h3>
          </div>
        </article>
      ))}
    </div>

    <p className="mt-6 text-xs leading-5 text-gray-500">
      Wildlife sightings and park conditions vary according to the season.
    </p>
  </div>
</section>

      <Footer />
    </main>
  );
}