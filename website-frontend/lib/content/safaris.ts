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
  gallery: string[];
};

export const safariDetails: Record<string, SafariDetails> = {
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
    gallery: [
  "/images/safaris/minneriya-1.webp",
  "/images/safaris/minneriya-2.webp",
  "/images/safaris/minneriya-3.webp",
  "/images/safaris/minneriya-4.webp",
  "/images/safaris/minneriya-5.webp",
  "/images/safaris/minneriya-6.webp",
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
    gallery: [
  "/images/safaris/kaudulla-1.webp",
  "/images/safaris/kaudulla-2.webp",
  "/images/safaris/kaudulla-3.webp",
  "/images/safaris/kaudulla-4.webp",
  "/images/safaris/kaudulla-5.webp",
  "/images/safaris/kaudulla-6.webp",
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
    gallery: [
  "/images/safaris/hurulu-1.webp",
  "/images/safaris/hurulu-2.webp",
  "/images/safaris/hurulu-3.webp",
  "/images/safaris/hurulu-4.webp",
  "/images/safaris/hurulu-5.webp",
  "/images/safaris/hurulu-6.webp",
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
    gallery: [
  "/images/safaris/gal-oya-1.webp",
  "/images/safaris/gal-oya-2.webp",
  "/images/safaris/gal-oya-3.webp",
  "/images/safaris/gal-oya-4.webp",
  "/images/safaris/gal-oya-5.webp",
  "/images/safaris/gal-oya-6.webp",
],
  },
};

export const safaris = Object.entries(safariDetails).map(([slug, safari], index) => ({ ...safari, id: index + 1, slug, link: `/safaris/${slug}`, description: safari.introduction, bestFor: safari.highlights[0], features: safari.includes.slice(0, 3) }));
