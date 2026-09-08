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

type SafariDetails = {
  name: string;
  location: string;
  duration: string;
  groupType: string;
  image: string;
  introduction: string;
  description: string;
  highlights: string[];
  includes: string[];
};

const safariDetails: Record<string, SafariDetails> = {
  minneriya: {
    name: "Minneriya Safari",
    location: "Minneriya National Park",
    duration: "3 - 4 Hours",
    groupType: "Private Journey",
    image: "/images/minneriya-elephants.webp",
    introduction:
      "Experience reservoir landscapes and seasonal gatherings of Sri Lanka's wild elephants.",
    description:
      "Minneriya National Park is known for its open grasslands, reservoir views, native birdlife and seasonal elephant movements. The experience is planned according to your preferred date and current park conditions.",
    highlights: [
      "Seasonal wild elephant sightings",
      "Minneriya reservoir landscapes",
      "Native and migratory birdlife",
      "Open grassland photography",
    ],
    includes: [
      "Private safari jeep",
      "Experienced safari driver",
      "Hotel pickup from the agreed area",
      "Flexible route based on park conditions",
    ],
  },

  kaudulla: {
    name: "Kaudulla Safari",
    location: "Kaudulla National Park",
    duration: "3 - 4 Hours",
    groupType: "Private Journey",
    image: "/images/kaudulla-safari.webp",
    introduction:
      "Journey across peaceful plains and forest trails filled with elephants and native birds.",
    description:
      "Kaudulla National Park offers a combination of open grasslands, water areas and forest habitats. Wildlife movements vary throughout the year, making seasonal route selection important.",
    highlights: [
      "Wild elephant encounters",
      "Water birds and native wildlife",
      "Peaceful reservoir scenery",
      "Wildlife photography opportunities",
    ],
    includes: [
      "Private safari jeep",
      "Experienced safari driver",
      "Convenient hotel pickup",
      "Seasonal safari route guidance",
    ],
  },

  hurulu: {
    name: "Hurulu Eco Safari",
    location: "Hurulu Eco Park",
    duration: "Approximately 3 Hours",
    groupType: "Private Journey",
    image: "/images/hurulu-eco-park.webp",
    introduction:
      "Explore dry evergreen forests and changing wildlife habitats near Habarana.",
    description:
      "Hurulu Eco Park provides a quieter forest safari experience. Its dry-zone landscape supports elephants, birds and other wildlife, with conditions changing according to the season.",
    highlights: [
      "Dry-zone forest landscapes",
      "Wild elephant sightings",
      "Native birds and forest wildlife",
      "Relaxed nature experience",
    ],
    includes: [
      "Private safari jeep",
      "Experienced safari driver",
      "Pickup from the agreed location",
      "Route selected for current conditions",
    ],
  },

  "gal-oya": {
    name: "Gal Oya Safari",
    location: "Gal Oya National Park",
    duration: "Half-Day Experience",
    groupType: "Private Journey",
    image: "/images/gal-oya-safari.webp",
    introduction:
      "Discover remarkable landscapes and diverse wildlife in one of Sri Lanka's peaceful national parks.",
    description:
      "Gal Oya National Park is known for its natural scenery, wildlife habitats and opportunities to experience a quieter side of Sri Lanka. Trip arrangements should be confirmed according to the starting location and available transport.",
    highlights: [
      "Remarkable natural scenery",
      "Diverse wildlife habitats",
      "Birdlife and nature photography",
      "A peaceful national park experience",
    ],
    includes: [
      "Private journey arrangement",
      "Route planning assistance",
      "Experienced local guidance",
      "Pickup details confirmed before travel",
    ],
  },
};

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

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to know more about the ${safari.name}.`
  );

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
            Private Safari Experience
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold md:text-7xl">
            {safari.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            {safari.introduction}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
  <a
    href={`https://wa.me/94762801972?text=${whatsappMessage}`}
    target="_blank"
    rel="noopener noreferrer"
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
              About This Experience
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
                href={`https://wa.me/94762801972?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[#d9902f] px-6 py-4 font-semibold text-white transition hover:bg-[#b87420]"
              >
                <MessageCircle size={20} />
                Check Availability
              </a>

              <a
                href="tel:+94767632044"
                className="mt-3 block text-center text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Or call +94 76 763 2044
              </a>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}