import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


type Destination = {
  name: string;
  location: string;
  image: string;
  introduction: string;
  description: string;
  highlights: string[];
};

const destinations: Record<string, Destination> = {
    habarana: {
  name: "Habarana",
  location: "North Central Sri Lanka",
  image: "/images/habarana.webp",
  introduction:
    "Discover a peaceful base for wildlife, village and cultural experiences.",
  description:
    "Habarana is conveniently located near several national parks and Cultural Triangle attractions. It provides a suitable starting point for safari journeys, village experiences and visits to nearby heritage destinations.",
  highlights: [
    "Convenient safari starting point",
    "Traditional village experiences",
    "Access to nearby national parks",
    "Close to Cultural Triangle attractions",
  ],
},
  sigiriya: {
    name: "Sigiriya",
    location: "Central Province, Sri Lanka",
    image: "/images/sigiriya.webp",
    introduction:
      "Discover one of Sri Lanka's most remarkable ancient landmarks.",
    description:
      "Sigiriya is known for its historic rock fortress, landscaped gardens and surrounding countryside. It can be combined with a safari or village experience from Habarana.",
    highlights: [
      "Ancient rock fortress",
      "Historic gardens",
      "Panoramic surroundings",
      "Easy access from Habarana",
    ],
  },

  dambulla: {
    name: "Dambulla",
    location: "Central Province, Sri Lanka",
    image: "/images/dambulla.webp",
    introduction:
      "Experience ancient cave temples and Sri Lanka's cultural heritage.",
    description:
      "Dambulla is well known for its historic cave temple complex and convenient location within Sri Lanka's Cultural Triangle.",
    highlights: [
      "Ancient cave temples",
      "Historic paintings",
      "Cultural heritage",
      "Convenient day journey",
    ],
  },

  polonnaruwa: {
    name: "Polonnaruwa",
    location: "North Central Province, Sri Lanka",
    image: "/images/polonnaruwa.webp",
    introduction:
      "Explore the ruins and monuments of an ancient Sri Lankan kingdom.",
    description:
      "Polonnaruwa offers an opportunity to discover ancient structures, historic monuments and the cultural history of Sri Lanka.",
    highlights: [
      "Ancient city ruins",
      "Historic monuments",
      "Cultural landmarks",
      "Photography opportunities",
    ],
  },

  ritigala: {
    name: "Ritigala",
    location: "North Central Province, Sri Lanka",
    image: "/images/ritigala.webp",
    introduction:
      "Walk through peaceful forest surroundings and ancient monastery ruins.",
    description:
      "Ritigala combines natural forest scenery with the remains of an ancient monastic complex, providing a quieter cultural experience.",
    highlights: [
      "Forest walking trails",
      "Ancient monastery ruins",
      "Peaceful surroundings",
      "Nature and heritage",
    ],
  },
};

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

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to know more about visiting ${destination.name}.`
  );

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
              href={`https://wa.me/94762801972?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
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