import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";

const activities = [
  "Guided village walk",
  "Traditional bullock cart ride",
  "Scenic countryside journey",
  "Local food experience",
  "Traditional cooking demonstration",
  "Meet local village families",
];

export default function VillageTour() {
  return (
    <section
      id="village"
      className="grid min-h-[680px] overflow-hidden lg:grid-cols-2"
    >
      {/* Left image section */}
      <div className="relative min-h-[500px] lg:min-h-[680px]">
        <Image
          src="/images/village-tour.png"
          alt="Traditional village journey through the Sri Lankan countryside"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Soften the image-to-panel transition */}
        <div className="absolute inset-y-0 right-0 z-10 hidden w-28 bg-gradient-to-r from-transparent to-[#0d2b25] lg:block" />

        {/* Image label */}
        <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/20 bg-black/25 px-5 py-4 text-white backdrop-blur-md md:left-10 md:right-auto">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5bd5d]">
              Authentic Experience
            </p>

            <p className="mt-1 font-semibold">
              Discover rural Sri Lankan life
            </p>
          </div>

          <div className="ml-8 flex items-center gap-2 border-l border-white/30 pl-5">
            <Clock3 size={20} />

            <span className="text-sm font-semibold">3 - 4 Hours</span>
          </div>
        </div>
      </div>

      {/* Right content section */}
      <div className="relative flex items-center overflow-hidden bg-[#0d2b25] px-6 py-20 text-white md:px-12 lg:px-16">
        {/* Decorative circles */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-white/10" />

        <div className="absolute -bottom-52 -left-40 h-96 w-96 rounded-full border border-[#d9902f]/20" />

        {/* Main content */}
        <div className="relative z-10 max-w-2xl">
          {/* Small heading */}
          <div className="flex items-center gap-4">
            <p className="text-[14px] font-bold uppercase tracking-[0.3em] text-[#f5bd5d]">
              Village Experience ---
            </p>
          </div>

          {/* Main heading */}
          <h2 className="mt-7 max-w-xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Discover the soul of rural Sri Lanka.
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            Leave the busy roads behind and experience the traditions, food
            and natural beauty of Sri Lankan village life through a relaxed
            journey created for couples, families and small groups.
          </p>

          {/* Activities */}
          <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9902f] text-white">
                  <Check size={15} strokeWidth={3} />
                </span>

                <span className="text-sm font-medium text-white/90">
                  {activity}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom action */}
          <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                Starting Location
              </p>

              <p className="mt-2 font-semibold text-white">
                Habarana, Central Sri Lanka
              </p>
            </div>

            <Link
              href="/village-tour"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d9902f] px-7 py-4 font-semibold text-white transition hover:bg-[#b87420]"
            >
              Plan Village Tour
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
