import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { destinationCards as destinations } from "../../lib/content/destinations";

export default function Destinations() {
  return (
    <section id="destinations" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-[#d9902f]">
                Cultural Destinations ---
              </p>
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
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              aria-label={`View ${destination.name}`}
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
              <span className="absolute left-5 right-20 top-5 rounded-full border border-white/30 bg-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                {destination.category}
              </span>

              {/* Arrow button */}
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173f35] transition group-hover:bg-[#d9902f] group-hover:text-white"
              >
                <ArrowUpRight size={20} />
              </span>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
                <h3 className="text-2xl font-bold md:text-3xl">
                  {destination.name}
                </h3>

                <p
                  className="mt-2 max-w-lg text-sm leading-5 text-white/75"
                >
                  {destination.introduction}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
