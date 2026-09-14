import Image from "next/image";
import { CarFront, Leaf, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-[#fffdf8] px-5 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left side content */}
        <div>
          <p className="text-[14px] font-bold uppercase tracking-[0.25em] text-[#d9902f]">
            Who We Are ---
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-[#173f35] md:text-5xl">
            Authentic journeys through Sri Lanka&apos;s wild and cultural
            landscapes.
          </h2>

          <p className="mt-6 max-w-2xl leading-7 text-gray-600">
            Serendib Wild Trails offers thoughtfully planned safari, village
            and cultural experiences around Sri Lanka&apos;s most remarkable
            destinations.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Each journey is created to provide comfort, local insight and
            respectful wildlife encounters for couples, families and small
            groups.
          </p>

          {/* Information cards */}
          <div className="mt-7 grid max-w-[640px] gap-4 sm:grid-cols-3">
            {/* Home base card */}
            <div className="rounded-2xl border border-[#e3d8c2] bg-[#f7f2ea] p-4 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7d3] text-[#173f35]">
                <MapPin size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b58b46]">
                Home Base
              </p>

              <p className="mt-2 text-sm font-medium text-[#1d2b1f]">
                Habarana, Central Sri Lanka
              </p>
            </div>

            {/* Tour style card */}
            <div className="rounded-2xl border border-[#e3d8c2] bg-[#f7f2ea] p-4 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7d3] text-[#173f35]">
                <CarFront size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b58b46]">
                Tour Style
              </p>

              <p className="mt-2 text-sm font-medium text-[#1d2b1f]">
                Private journeys with hotel pickup
              </p>
            </div>

            {/* Experiences card */}
            <div className="rounded-2xl border border-[#e3d8c2] bg-[#f7f2ea] p-4 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7d3] text-[#173f35]">
                <Leaf size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b58b46]">
                Experiences
              </p>

              <p className="mt-2 text-sm font-medium text-[#1d2b1f]">
                Wildlife, culture and village life
              </p>
            </div>
          </div>

          {/* Highlights */}
          <ul className="mt-8 space-y-4 text-[#1d2b1f]">
            <li className="flex gap-3">
              <span className="text-[#d9902f]">✓</span>
              <span>Locally planned adventures starting from Habarana</span>
            </li>

            <li className="flex gap-3">
              <span className="text-[#d9902f]">✓</span>
              <span>
                Comfortable private safari experiences for your group
              </span>
            </li>

            <li className="flex gap-3">
              <span className="text-[#d9902f]">✓</span>
              <span>
                Season-aware routes across Sri Lanka&apos;s wildlife parks
              </span>
            </li>

            <li className="flex gap-3">
              <span className="text-[#d9902f]">✓</span>
              <span>Flexible wildlife, village and heritage journeys</span>
            </li>
          </ul>
        </div>

        {/* Right side image */}
        <div className="relative flex rounded-[32px] border border-[#d8c9a9] bg-[#eee4d3] p-3 shadow-xl lg:self-stretch">
          <div className="relative min-h-[460px] w-full overflow-hidden rounded-[22px] sm:min-h-[570px] lg:min-h-[640px]">
            <Image
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/minneriya-elephants.webp"
              alt="Elephants travelling through a wildlife park"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute bottom-6 left-6 p-6 text-white">
              <p className="text-4xl font-bold text-[#e7ad4a]">100%</p>
              <p className="mt-1 text-sm">Locally inspired journeys</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white">
                Discover Sri Lanka&apos;s gentle giants and the wild beauty of
                their natural home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
