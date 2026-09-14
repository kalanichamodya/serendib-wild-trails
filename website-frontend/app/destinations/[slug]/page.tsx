import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


import { destinations } from "../../../lib/content/destinations";

type DestinationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({
    slug,
  }));
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinations[slug];

  if (!destination) {
    notFound();
  }


  return (
    <main>
      <Navbar />

      <section className="relative flex min-h-[580px] items-end overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b24] via-[#0d2b24]/60 to-black/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 text-white">
          <Link
            href="/#destinations"
            className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-[#e7ad4a]"
          >
            <ArrowLeft size={17} />
            All Destinations
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-[#e7ad4a]">
            Explore Sri Lanka ---
          </p>

          <h1 className="mt-5 text-5xl font-bold md:text-7xl">
            {destination.name}
          </h1>

          <p className="mt-5 flex items-center gap-2 text-white/75">
            <MapPin size={18} />
            {destination.location}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {destination.introduction}
          </p>
        </div>
      </section>

      <section className="bg-[#f8f5ee] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9902f]">
              About The Destination ---
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#173f35]">
              Discover {destination.name}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {destination.description}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#173f35]">
              Experience highlights
            </h2>

            <ul className="mt-6 space-y-4">
              {destination.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9902f] text-sm text-white">
                    ✓
                  </span>

                  {highlight}
                </li>
              ))}
            </ul>

            <a
              href="/booking"
              className="mt-8 flex items-center justify-center gap-3 rounded-full bg-[#d9902f] px-7 py-4 font-semibold text-white hover:bg-[#b87420]"
            >
              <MessageCircle size={20} />
              Plan This Journey
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}