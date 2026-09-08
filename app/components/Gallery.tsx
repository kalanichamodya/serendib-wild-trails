import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const smallGalleryItems = [
  {
    id: "03",
    category: "Village Life",
    name: "Habarana",
    image: "/images/village-tour.png",
    link: "/village-tour",
  },
  {
    id: "04",
    category: "Sacred Heritage",
    name: "Dambulla",
    image: "/images/dambulla.webp",
    link: "/destinations/dambulla",
  },
  {
    id: "05",
    category: "Forest Journey",
    name: "Ritigala",
    image: "/images/ritigala.webp",
    link: "/destinations/ritigala",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#f8f5ee] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Gallery heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d9902f]">
            Moments From The Journey
          </p>

          <h2 className="mt-5 text-4xl font-bold text-[#173f35] md:text-5xl">
            Stories captured along the way.
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Explore wildlife encounters, village traditions and cultural
            landmarks discovered throughout our Sri Lankan journeys.
          </p>
        </div>

        {/* Feature item 1 */}
        <article className="mt-14 grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-[1.5fr_1fr]">
          <Link
            href="/safaris/minneriya"
            className="group relative min-h-[420px] overflow-hidden"
          >
            <Image
              src="/images/minneriya-elephants.webp"
              alt="Wild elephants near Minneriya"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
          </Link>

          <div className="flex items-center p-8 md:p-12">
            <div>
              <span className="text-6xl font-bold text-[#eadfc9]">01</span>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d9902f]">
                Wildlife Encounter
              </p>

              <h3 className="mt-3 text-4xl font-bold text-[#173f35]">
                Minneriya
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                Discover reservoir landscapes, native birdlife and seasonal
                gatherings of Sri Lanka&apos;s wild elephants.
              </p>

              <Link
                href="/safaris/minneriya"
                className="mt-7 inline-flex items-center gap-3 border-b-2 border-[#d9902f] pb-2 text-sm font-bold uppercase tracking-wider text-[#173f35] transition hover:text-[#d9902f]"
              >
                Explore This Journey
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </article>

        {/* Feature item 2 */}
        <article className="mt-8 grid overflow-hidden rounded-3xl bg-[#173f35] shadow-sm lg:grid-cols-[1fr_1.5fr]">
          <div className="order-2 flex items-center p-8 text-white md:p-12 lg:order-1">
            <div>
              <span className="text-6xl font-bold text-white/10">02</span>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#e7ad4a]">
                Ancient Heritage
              </p>

              <h3 className="mt-3 text-4xl font-bold">Sigiriya</h3>

              <p className="mt-5 leading-7 text-white/65">
                Experience the legendary rock fortress, historic gardens and
                remarkable views across Sri Lanka&apos;s Cultural Triangle.
              </p>

              <Link
                href="/destinations/sigiriya"
                className="mt-7 inline-flex items-center gap-3 border-b-2 border-[#d9902f] pb-2 text-sm font-bold uppercase tracking-wider text-white transition hover:text-[#e7ad4a]"
              >
                Explore This Journey
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <Link
            href="/destinations/sigiriya"
            className="group order-1 relative min-h-[420px] overflow-hidden lg:order-2"
          >
            <Image
              src="/images/sigiriya.webp"
              alt="Sigiriya Rock Fortress"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
          </Link>
        </article>

        {/* Small gallery album */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {smallGalleryItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group overflow-hidden rounded-2xl bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#d9902f] text-sm font-bold text-white">
                  {item.id}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                    {item.category}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{item.name}</h3>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-[#d9902f]">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}