import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

const DEMO_USERS = [
  { email: "demo@fairfind.local", name: "Demo User", role: "user" as const },
  { email: "anna@fairfind.local", name: "Anna Schmidt", role: "user" as const },
  { email: "lucas@fairfind.local", name: "Lucas Weber", role: "user" as const },
];

const DEFAULT_HOURS = [
  { dayOfWeek: 0, openTime: "09:00", closeTime: "18:00", isClosed: false },
  { dayOfWeek: 1, openTime: "09:00", closeTime: "18:00", isClosed: false },
  { dayOfWeek: 2, openTime: "09:00", closeTime: "18:00", isClosed: false },
  { dayOfWeek: 3, openTime: "09:00", closeTime: "18:00", isClosed: false },
  { dayOfWeek: 4, openTime: "09:00", closeTime: "18:00", isClosed: false },
  { dayOfWeek: 5, openTime: "10:00", closeTime: "16:00", isClosed: false },
  { dayOfWeek: 6, openTime: "00:00", closeTime: "00:00", isClosed: true },
];

const STORES = [
  {
    slug: "fair-coffee-berlin",
    name: "Fair Coffee Berlin",
    description:
      "Specialty coffee roasted in-house with direct-trade beans from Ethiopia, Colombia, and Guatemala. Every cup supports farmer cooperatives.",
    addressLine: "Torstraße 124",
    city: "Berlin",
    postalCode: "10119",
    latitude: 52.5298,
    longitude: 13.4015,
    phone: "+49 30 1234567",
    website: "https://faircoffee.example.com",
    fairBadges: ["fairtrade", "organic"],
    categories: ["Coffee & Tea", "Gifts"],
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    products: [
      {
        name: "Ethiopian Yirgacheffe Beans",
        slug: "ethiopian-yirgacheffe",
        description: "Floral, citrus notes. 250g whole bean.",
        price: 12.5,
        category: "Coffee",
        imageUrl:
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
      },
      {
        name: "Colombian Dark Roast",
        slug: "colombian-dark-roast",
        description: "Rich chocolate finish. 250g.",
        price: 11.0,
        category: "Coffee",
      },
    ],
    reviews: [
      { rating: 5, title: "Best fair coffee in Mitte", body: "Amazing atmosphere and truly ethical sourcing. The baristas know every origin story." },
      { rating: 4, body: "Great coffee, slightly pricey but worth it for the quality and mission." },
    ],
  },
  {
    slug: "weltladen-kreuzberg",
    name: "Weltladen Kreuzberg",
    description:
      "Community-run fair trade shop offering groceries, crafts, and gifts from partners across the Global South. Member of WFTO.",
    addressLine: "Oranienstraße 24",
    city: "Berlin",
    postalCode: "10999",
    latitude: 52.5033,
    longitude: 13.4223,
    phone: "+49 30 6123456",
    fairBadges: ["wfto", "fairtrade"],
    categories: ["Grocery", "Gifts", "Home & Living"],
    coverImage:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    products: [
      {
        name: "Palestinian Olive Oil",
        slug: "palestinian-olive-oil",
        description: "Extra virgin, 500ml from Zatoun cooperative.",
        price: 14.9,
        category: "Grocery",
      },
      {
        name: "Handwoven Basket",
        slug: "handwoven-basket",
        description: "From Ghana fair trade cooperative.",
        price: 28.0,
        category: "Home & Living",
        imageUrl:
          "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80",
      },
    ],
    reviews: [
      { rating: 5, body: "A Berlin institution. You can find everything from spices to beautiful handicrafts." },
    ],
  },
  {
    slug: "green-thread",
    name: "Green Thread",
    description:
      "Sustainable fashion boutique featuring fair-trade organic cotton, recycled materials, and transparent supply chains.",
    addressLine: "Kastanienallee 45",
    city: "Berlin",
    postalCode: "10435",
    latitude: 52.5392,
    longitude: 13.4089,
    phone: "+49 30 9876543",
    website: "https://greenthread.example.com",
    fairBadges: ["fairtrade", "organic", "bcorp"],
    categories: ["Clothing"],
    coverImage:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    products: [
      {
        name: "Organic Cotton Tee",
        slug: "organic-cotton-tee",
        description: "Unisex, made in India at a fair-wage factory.",
        price: 34.0,
        category: "Clothing",
      },
    ],
    reviews: [
      { rating: 5, title: "Ethical fashion done right", body: "Love knowing exactly where my clothes come from. Quality is excellent." },
      { rating: 5, body: "Beautiful pieces and the staff can tell you the story behind every item." },
    ],
  },
  {
    slug: "cacao-etica",
    name: "Cacao Ética",
    description:
      "Artisan chocolate shop with bean-to-bar production. All cocoa sourced from fair trade cooperatives in Ecuador and Peru.",
    addressLine: "Bergmannstraße 88",
    city: "Berlin",
    postalCode: "10961",
    latitude: 52.4891,
    longitude: 13.3887,
    fairBadges: ["fairtrade", "organic"],
    categories: ["Chocolate", "Gifts"],
    coverImage:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
    products: [
      {
        name: "Ecuador 72% Dark Bar",
        slug: "ecuador-72-dark",
        description: "Single origin, 80g.",
        price: 6.5,
        category: "Chocolate",
        imageUrl:
          "https://images.unsplash.com/photo-1606312619070-d48ecc494a1e?w=400&q=80",
      },
      {
        name: "Peruvian Salt Caramel",
        slug: "peruvian-salt-caramel",
        description: "Award-winning filled bar, 80g.",
        price: 7.0,
        category: "Chocolate",
      },
    ],
    reviews: [
      { rating: 5, body: "The best chocolate in Berlin, hands down. Try the tasting flight!" },
    ],
  },
  {
    slug: "unpackaged-prenzlauer",
    name: "UnPackaged Prenzlauer Berg",
    description:
      "Zero-waste grocery store with bulk fair-trade goods. Bring your own containers or buy reusable ones in-store.",
    addressLine: "Stargarder Straße 54",
    city: "Berlin",
    postalCode: "10437",
    latitude: 52.5478,
    longitude: 13.4172,
    phone: "+49 30 5551234",
    fairBadges: ["fairtrade", "organic"],
    categories: ["Zero Waste", "Grocery"],
    coverImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    products: [
      {
        name: "Fair Trade Basmati Rice",
        slug: "basmati-rice-bulk",
        description: "Bulk per 100g from India cooperative.",
        price: 0.45,
        category: "Grocery",
      },
      {
        name: "Loose Leaf Darjeeling",
        slug: "darjeeling-loose",
        description: "Per 50g, fair trade certified.",
        price: 3.2,
        category: "Coffee & Tea",
      },
    ],
    reviews: [
      { rating: 4, body: "Great selection and friendly staff. A bit small but that's part of the charm." },
      { rating: 5, body: "Finally a place where I can shop without plastic guilt!" },
    ],
  },
  {
    slug: "fair-trade-markt-boxi",
    name: "Fair Trade Markt Boxi",
    description:
      "Weekly fair trade market at Boxhagener Platz. Local vendors plus rotating guest stalls from fair trade importers.",
    addressLine: "Boxhagener Platz",
    city: "Berlin",
    postalCode: "10245",
    latitude: 52.5107,
    longitude: 13.4598,
    fairBadges: ["fairtrade", "wfto"],
    categories: ["Grocery", "Gifts", "Clothing"],
    coverImage:
      "https://images.unsplash.com/photo-1488459716781-31db5178c9f1?w=800&q=80",
    products: [],
    reviews: [
      { rating: 5, title: "Sunday morning essential", body: "Best market in Friedrichshain. Live music and amazing food stalls too." },
    ],
  },
  {
    slug: "kaffee-kooperative",
    name: "Kaffee Kooperative",
    description:
      "Worker-owned café and roastery. Profits shared with producing communities through the Kooperative fund.",
    addressLine: "Weserstraße 54",
    city: "Berlin",
    postalCode: "12045",
    latitude: 52.4876,
    longitude: 13.4312,
    fairBadges: ["fairtrade", "bcorp"],
    categories: ["Coffee & Tea"],
    coverImage:
      "https://images.unsplash.com/photo-1501339847302-ac814a0a89d7?w=800&q=80",
    products: [
      {
        name: "House Blend Espresso",
        slug: "house-blend-espresso",
        description: "1kg bag, medium roast.",
        price: 24.0,
        category: "Coffee",
      },
    ],
    reviews: [
      { rating: 4, body: "Solid espresso and a great community vibe in Neukölln." },
    ],
  },
  {
    slug: "fair-wear-friedrichshain",
    name: "Fair Wear Friedrichshain",
    description:
      "Second-hand and fair-trade new clothing. Portion of sales donated to textile worker advocacy groups.",
    addressLine: "Warschauer Straße 33",
    city: "Berlin",
    postalCode: "10243",
    latitude: 52.5058,
    longitude: 13.4493,
    fairBadges: ["fairtrade", "wfto"],
    categories: ["Clothing"],
    coverImage:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    products: [],
    reviews: [
      { rating: 4, body: "Good finds at reasonable prices. Vintage section is especially good." },
    ],
  },
  {
    slug: "bio-fair-kollwitz",
    name: "Bio & Fair Kollwitz",
    description:
      "Neighborhood bio supermarket with dedicated fair-trade aisle. Certified organic and fair trade produce.",
    addressLine: "Kollwitzstraße 60",
    city: "Berlin",
    postalCode: "10435",
    latitude: 52.5354,
    longitude: 13.4145,
    phone: "+49 30 4445566",
    fairBadges: ["fairtrade", "organic"],
    categories: ["Grocery"],
    coverImage:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    products: [
      {
        name: "Fair Bananas (kg)",
        slug: "fair-bananas",
        description: "Per kg, Dominican Republic cooperative.",
        price: 2.49,
        category: "Grocery",
      },
    ],
    reviews: [
      { rating: 4, body: "Convenient and well-stocked. Fair trade section keeps growing." },
    ],
  },
  {
    slug: "handmade-harmony",
    name: "Handmade Harmony",
    description:
      "Fair trade gifts and home décor from artisan cooperatives in Nepal, Kenya, and Bolivia.",
    addressLine: "Schönhauser Allee 132",
    city: "Berlin",
    postalCode: "10437",
    latitude: 52.5512,
    longitude: 13.4128,
    fairBadges: ["wfto", "fairtrade"],
    categories: ["Gifts", "Home & Living"],
    coverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    products: [
      {
        name: "Nepalese Singing Bowl",
        slug: "nepalese-singing-bowl",
        description: "Hand-hammered brass, medium size.",
        price: 45.0,
        category: "Gifts",
        imageUrl:
          "https://images.unsplash.com/photo-1608889825103-eb5ed706fc32?w=400&q=80",
      },
    ],
    reviews: [
      { rating: 5, body: "Unique gifts with real stories. Perfect for birthdays." },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.storeHours.deleteMany();
  await prisma.storePhoto.deleteMany();
  await prisma.savedStore.deleteMany();
  await prisma.savedProduct.deleteMany();
  await prisma.storeClaim.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = await Promise.all(
    DEMO_USERS.map((u) => prisma.user.create({ data: u }))
  );
  const primaryUser = createdUsers[0];

  for (const storeData of STORES) {
    const { products, reviews, fairBadges, categories, ...storeFields } = storeData;

    const store = await prisma.store.create({
      data: {
        ...storeFields,
        fairBadges: JSON.stringify(fairBadges),
        categories: JSON.stringify(categories),
        createdById: primaryUser.id,
        status: "active",
        hours: {
          create: DEFAULT_HOURS,
        },
        products: {
          create: products,
        },
      },
    });

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i] as { rating: number; title?: string; body: string };
      const reviewUser = createdUsers[i % createdUsers.length];
      await prisma.review.create({
        data: {
          storeId: store.id,
          userId: reviewUser.id,
          rating: review.rating,
          title: review.title ?? null,
          body: review.body,
        },
      });
    }

    console.log(`  ✓ ${store.name}`);
  }

  console.log(`\nSeeded ${STORES.length} stores in Berlin.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
