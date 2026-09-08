import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Destination = {
  id: number;
  name: string;
  category: string;
  description: string;
  travelTime: string;
  image: string;
  featured?: boolean;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Sigiriya",
    category: "Ancient Heritage",
    description:
      "Climb the legendary rock fortress and experience one of Sri Lanka's most remarkable ancient wonders.",
    travelTime: "25 Minutes",
    image: "/images/sigiriya.webp",
    featured: true,
  },
  {
    id: 2,
    name: "Dambulla",
    category: "Cave Temple",
    description:
      "Discover ancient cave paintings, statues and centuries of Sri Lankan history.",
    travelTime: "30 Minutes",
    image: "/images/dambulla.webp",
  },
  {
    id: 3,
    name: "Polonnaruwa",
    category: "Ancient City",
    description:
      "Explore royal ruins, stone carvings and the remains of a historic kingdom.",
    travelTime: "55 Minutes",
    image: "/images/polonnaruwa.webp",
  },
  {
    id: 4,
    name: "Ritigala",
    category: "Forest Monastery",
    description:
      "Walk through peaceful forest trails leading to an ancient Buddhist monastery.",
    travelTime: "45 Minutes",
    image: "/images/ritigala.webp",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d9902f]">
                Cultural Destinations
              </p>

              <span className="h-px w-16 bg-[#d9902f]" />
            </div>

            <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-[#173f35] md:text-5xl">
              Ancient stories are waiting nearby.
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-gray-600">
            Continue your journey beyond the wildlife parks and discover
            historic cities, sacred temples and peaceful forest ruins located
            around Sri Lanka&apos;s Cultural Triangle.
          </p>
        </div>

        {/* Destination cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <article
              key={destination.id}
              className="group relative aspect-square overflow-hidden rounded-3xl"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes={
                    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                }
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Category */}
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                {destination.category}
              </span>

              {/* Arrow button */}
              <a
                href="#contact"
                aria-label={`View ${destination.name}`}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173f35] transition group-hover:bg-[#d9902f] group-hover:text-white"
              >
                <ArrowUpRight size={20} />
              </a>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
                <h3 className="text-2xl font-bold md:text-3xl">
                  {destination.name}
                </h3>

                <p
                  className="mt-2 max-w-lg text-sm leading-5 text-white/75"
                >
                  {destination.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#f8f5ee] px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-[#173f35]">
              Need help planning your route?
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Combine a safari and cultural destination into one memorable
              journey.
            </p>
          </div>

          <a
            href="https://wa.me/94774639048"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#173f35] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#d9902f]"
          >
            Create My Journey →
          </a>
        </div>
      </div>
    </section>
  );
}