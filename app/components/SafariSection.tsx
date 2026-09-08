import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Camera,
  CarFront,
  Clock3,
  MapPinned,
} from "lucide-react";

type Safari = {
  id: number;
  name: string;
  description: string;
  duration: string;
  bestFor: string;
  image: string;
};

const safaris: Safari[] = [
  {
    id: 1,
    name: "Minneriya Safari",
    description:
      "Explore reservoir landscapes and seasonal gatherings of wild elephants.",
    duration: "3 - 4 Hours",
    bestFor: "Elephants",
    image: "/images/minneriya-elephants.webp",
  },
  {
    id: 2,
    name: "Kaudulla Safari",
    description:
      "Journey through peaceful forest trails filled with elephants and native birds.",
    duration: "3 - 4 Hours",
    bestFor: "Photography",
    image: "/images/kaudulla-safari.webp",
  },
  {
    id: 3,
    name: "Hurulu Eco Safari",
    description:
      "Discover dry forests, natural lakes and Sri Lanka's diverse wildlife.",
    duration: "3 Hours",
    bestFor: "Adventure",
    image: "/images/hurulu-eco-park.webp",
  },
  {
    id: 4,
    name: "Gal Oya Safari",
    description:
      "Enjoy remarkable scenery and wildlife encounters in a peaceful national park.",
    duration: "4–5 Hours",
    bestFor: "Nature",
    image: "/images/gal-oya-safari.webp",
  },
];

export default function SafariSection() {
  return (
    <section
      id="safaris"
      className="relative overflow-hidden bg-[#f8f5ee] px-5 py-24"
    >
      {/* Decorative background */}
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#e9dfca]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left heading */}
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-[#d9902f]">
                Safari Experiences ---
              </p>
            </div>

            <h2 className="mt-6 max-w-xl text-5xl font-bold leading-[1.05] text-[#173f35] md:text-6xl">
              Find your path into the wild.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-7 text-gray-500">
              Extraordinary wildlife. Meaningful journeys. Unforgettable Sri
              Lanka.
            </p>
          </div>

          {/* Right information */}
          <div>
            <p className="max-w-2xl text-lg leading-8 text-gray-600">
              Wildlife conditions change with the season. Share your travel
              date and we will recommend the most suitable safari route for
              your group.
            </p>

            {/* Safari facts */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-[#ded7c9]">
              {/* Routes */}
              <div className="flex items-center gap-4 sm:pr-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe7d7] text-[#173f35]">
                  <MapPinned size={25} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-lg font-bold text-[#173f35]">04</p>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#173f35]">
                    Safari Routes
                  </p>
                </div>
              </div>

              {/* Jeeps */}
              <div className="flex items-center gap-4 sm:px-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe7d7] text-[#173f35]">
                  <CarFront size={25} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-lg font-bold text-[#173f35]">Private</p>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#173f35]">
                    Safari Jeeps
                  </p>
                </div>
              </div>

              {/* Hotel pickup */}
              <div className="flex items-center gap-4 sm:pl-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe7d7] text-[#173f35]">
                  <BedDouble size={25} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-lg font-bold text-[#173f35]">Hotel</p>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#173f35]">
                    Pickup
                  </p>
                </div>
              </div>
            </div>

            {/* All routes link */}
            <Link
              href="/safaris"
              className="mt-8 inline-flex items-center border-b-2 border-[#d9902f] pb-2 text-sm font-bold uppercase tracking-wider text-[#173f35] transition hover:text-[#d9902f]"
            >
              View All Safari Routes →
            </Link>
          </div>
        </div>

        {/* Safari cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {safaris.map((safari) => (
            <article
              key={safari.id}
              className="group overflow-hidden rounded-[22px] border border-[#e8e1d5] bg-white p-2 shadow-[0_8px_25px_rgba(23,63,53,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(23,63,53,0.15)]"
            >
              {/* Card image */}
              <div className="relative h-52 overflow-hidden rounded-[17px]">
                <Image
                  src={safari.image}
                  alt={safari.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-4 pb-4 pt-4">
                <h3 className="text-[2rem] font-bold leading-[1.05] tracking-[-0.06em] text-[#173f35]">
                  {safari.name}
                </h3>

                <p className="mt-3 min-h-[78px] text-[15px] leading-6 text-[#4d584f]">
                  {safari.description}
                </p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3 text-[#173f35]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5d0c4] bg-[#f9f7f3] text-base text-[#173f35]">
                      <Clock3 size={15} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#173f35]">
                        {safari.duration}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5e5c58]">
                        Duration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[#173f35]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5d0c4] bg-[#f9f7f3] text-base text-[#173f35]">
                      <Camera size={15} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium leading-5 text-[#173f35]">
                        {safari.bestFor}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5e5c58]">
                        Best For
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/94774639048?text=${encodeURIComponent(
                    `Hello, I would like to know more about the ${safari.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-[#d9902f] bg-[#d9902f] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#b87420]"
                >
                  <span>View Route Details</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
