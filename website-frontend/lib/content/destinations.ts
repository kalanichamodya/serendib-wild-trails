type Destination = {
  name: string;
  location: string;
  image: string;
  introduction: string;
  description: string;
  highlights: string[];
};

export const destinations: Record<string, Destination> = {
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

export const destinationCards = Object.entries(destinations).map(([slug, destination]) => ({ ...destination, id: slug, slug, category: destination.location }));
