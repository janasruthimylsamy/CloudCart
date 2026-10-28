import { useEffect, useMemo, useState } from "react"

type Product = {
  id: number
  name: string
  category: string
  price: number
  original: number
  rating: number
  reviews: number
  image: string
  badge: string
  description: string
  specifications?: Record<string, string>
  stock?: number
  featured?: boolean
  availability?: "In stock" | "Low stock" | "Out of stock"
}

const images = {
  watch:
    "https://images.unsplash.com/photo-1548960254-5139d80bd5ec?auto=format&fit=crop&w=900&q=85",
  earbuds:
    "https://images.unsplash.com/photo-1640904851437-524bc9fe3cc3?auto=format&fit=crop&w=900&q=85",
  laptop:
    "https://images.unsplash.com/photo-1650285110415-3561055fdd67?auto=format&fit=crop&w=900&q=85",
  fashion:
    "https://images.unsplash.com/photo-1622782262245-bfb660f4ff93?auto=format&fit=crop&w=900&q=85",
  bag: "https://images.unsplash.com/photo-1616876313400-7a88a027ada8?auto=format&fit=crop&w=900&q=85",
  sneakers:
    "https://images.unsplash.com/photo-1573705603531-a388c95eb63c?auto=format&fit=crop&w=900&q=85",
  lifestyle:
    "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=1400&q=88",
}

const baseProducts: Product[] = [
  {
    id: 1,
    name: "Aura AMOLED Smartwatch",
    category: "Electronics",
    price: 2799,
    original: 4999,
    rating: 4.6,
    reviews: 1248,
    image: images.watch,
    badge: "Best seller",
    description:
      "Vivid AMOLED display, wellness tracking and a polished everyday profile.",
  },
  {
    id: 2,
    name: "Drift Pro Wireless Earbuds",
    category: "Electronics",
    price: 1499,
    original: 2999,
    rating: 4.5,
    reviews: 835,
    image: images.earbuds,
    badge: "Trending",
    description:
      "Immersive sound with low-latency audio and a pocket-size charging case.",
  },
  {
    id: 3,
    name: "Nova Slim Work Laptop",
    category: "Electronics",
    price: 48990,
    original: 56990,
    rating: 4.7,
    reviews: 329,
    image: images.laptop,
    badge: "New",
    description:
      "A lightweight productivity laptop with an all-day battery and crisp display.",
  },
  {
    id: 4,
    name: "Gulmohar Cotton Kurta",
    category: "Women's Fashion",
    price: 899,
    original: 1599,
    rating: 4.4,
    reviews: 521,
    image: images.fashion,
    badge: "43% off",
    description:
      "Breathable cotton kurta with a graceful silhouette for effortless days.",
  },
  {
    id: 5,
    name: "Sienna Everyday Handbag",
    category: "Accessories",
    price: 1199,
    original: 1999,
    rating: 4.5,
    reviews: 416,
    image: images.bag,
    badge: "Editor’s pick",
    description:
      "A structured everyday bag with considered compartments and soft lining.",
  },
  {
    id: 6,
    name: "Cloudstep Street Sneakers",
    category: "Footwear",
    price: 1799,
    original: 2999,
    rating: 4.3,
    reviews: 704,
    image: images.sneakers,
    badge: "40% off",
    description:
      "Cushioned low-top sneakers made for long walks and relaxed weekends.",
  },
  {
    id: 7,
    name: "Dewdrop Gentle Face Cleanser",
    category: "Beauty & Personal Care",
    price: 449,
    original: 599,
    rating: 4.5,
    reviews: 389,
    image:
      "https://images.unsplash.com/photo-1748639320154-6ba118bccc74?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A refreshing gel cleanser designed for a soft, comfortable daily cleanse.",
  },
  {
    id: 8,
    name: "Petal Tint Makeup Edit",
    category: "Beauty & Personal Care",
    price: 799,
    original: 1199,
    rating: 4.4,
    reviews: 275,
    image:
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=900&q=85",
    badge: "Beauty pick",
    description:
      "A coordinated pink-toned makeup edit for easy everyday looks.",
  },
  {
    id: 9,
    name: "Noir Botanical Skincare Set",
    category: "Beauty & Personal Care",
    price: 1299,
    original: 1899,
    rating: 4.6,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=900&q=85",
    badge: "Set savings",
    description:
      "A refined multi-step skincare set presented in reusable dark containers.",
  },
  {
    id: 10,
    name: "Sunny Wooden Pull Toy",
    category: "Kids & Baby",
    price: 599,
    original: 899,
    rating: 4.7,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1614356485393-1d9c7015d24e?auto=format&fit=crop&w=900&q=85",
    badge: "Parent pick",
    description:
      "A cheerful tactile toy made for imaginative play and little hands.",
  },
  {
    id: 11,
    name: "Glow Friend Bedside Lamp",
    category: "Home & Living",
    price: 999,
    original: 1499,
    rating: 4.6,
    reviews: 126,
    image:
      "https://images.unsplash.com/photo-1725698691115-f9dcf57ae3a4?auto=format&fit=crop&w=900&q=85",
    badge: "Cozy find",
    description:
      "A friendly ambient lamp that brings a warm glow to desks and bedside tables.",
  },
  {
    id: 12,
    name: "Halo Minimal Table Lamp",
    category: "Home & Living",
    price: 1799,
    original: 2399,
    rating: 4.5,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1642260550217-e40fcf147ca5?auto=format&fit=crop&w=900&q=85",
    badge: "Design edit",
    description:
      "A sculptural table light with a calm, contemporary silhouette.",
  },
  {
    id: 13,
    name: "Breeze 14 Everyday Laptop",
    category: "Electronics",
    price: 42990,
    original: 49990,
    rating: 4.5,
    reviews: 186,
    image:
      "https://images.unsplash.com/photo-1655156875398-d11323b4f5de?auto=format&fit=crop&w=900&q=85",
    badge: "Work essential",
    description:
      "Portable laptop for study, browsing and everyday productivity.",
    specifications: {
      Display: "14-inch anti-glare",
      Memory: "16 GB",
      Storage: "512 GB SSD",
    },
    stock: 18,
    featured: true,
  },
  {
    id: 14,
    name: "Pearl Slimline Laptop",
    category: "Electronics",
    price: 56990,
    original: 64990,
    rating: 4.6,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1654555023156-0a1c9cdf1130?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "Refined white laptop for focused work and effortless portability.",
    specifications: {
      Display: "15.6-inch Full HD",
      Memory: "16 GB",
      Storage: "1 TB SSD",
    },
    stock: 12,
  },
  {
    id: 15,
    name: "Slate Creator Notebook",
    category: "Electronics",
    price: 68990,
    original: 76990,
    rating: 4.7,
    reviews: 97,
    image:
      "https://images.unsplash.com/photo-1740591318085-092777c9c9ea?auto=format&fit=crop&w=900&q=85",
    badge: "Creator pick",
    description: "Capable notebook with a crisp screen for creative projects.",
    specifications: {
      Display: "15-inch high-resolution",
      Memory: "24 GB",
      Storage: "1 TB SSD",
    },
    stock: 9,
  },
  {
    id: 16,
    name: "Obsidian Mechanical Keyboard",
    category: "Electronics",
    price: 2899,
    original: 3999,
    rating: 4.6,
    reviews: 451,
    image:
      "https://images.unsplash.com/photo-1584727151652-d09b17ebf23f?auto=format&fit=crop&w=900&q=85",
    badge: "Desk upgrade",
    description:
      "Tactile full-size keyboard for productive desks and gaming setups.",
    specifications: {
      Layout: "Full size",
      Connection: "Wired USB",
      Lighting: "Backlit",
    },
    stock: 34,
  },
  {
    id: 17,
    name: "Graphite Compact Keyboard",
    category: "Electronics",
    price: 1799,
    original: 2499,
    rating: 4.4,
    reviews: 318,
    image:
      "https://images.unsplash.com/photo-1584727129739-cd30984745bc?auto=format&fit=crop&w=900&q=85",
    badge: "Compact",
    description: "Space-saving keyboard with comfortable key travel.",
    specifications: {
      Layout: "Compact",
      Connection: "USB",
      Finish: "Graphite",
    },
    stock: 41,
  },
  {
    id: 18,
    name: "Studio Wireless Keyboard",
    category: "Electronics",
    price: 2199,
    original: 2999,
    rating: 4.5,
    reviews: 226,
    image:
      "https://images.unsplash.com/photo-1600610429853-81d08d9ae4b1?auto=format&fit=crop&w=900&q=85",
    badge: "Minimal desk",
    description: "Low-profile wireless keyboard designed for quiet typing.",
    specifications: {
      Layout: "Full size",
      Connection: "Wireless",
      Battery: "Up to 6 months",
    },
    stock: 27,
  },
  {
    id: 19,
    name: "Axis Keyboard & Mouse Combo",
    category: "Electronics",
    price: 2499,
    original: 3499,
    rating: 4.4,
    reviews: 372,
    image:
      "https://images.unsplash.com/photo-1632078056157-f7eb9c54e9cc?auto=format&fit=crop&w=900&q=85",
    badge: "Combo value",
    description: "Coordinated keyboard and mouse set for a tidy workstation.",
    specifications: {
      Contents: "Keyboard and mouse",
      Connection: "2.4 GHz wireless",
      Range: "10 m",
    },
    stock: 39,
  },
  {
    id: 20,
    name: "Glide Ergonomic Wireless Mouse",
    category: "Electronics",
    price: 1299,
    original: 1899,
    rating: 4.5,
    reviews: 604,
    image:
      "https://images.unsplash.com/photo-1595074475055-10ab7377ccfb?auto=format&fit=crop&w=900&q=85",
    badge: "Best seller",
    description: "Contoured wireless mouse with smooth adjustable tracking.",
    specifications: {
      Sensor: "Adjustable optical",
      Connection: "2.4 GHz",
      Buttons: "6",
    },
    stock: 56,
  },
  {
    id: 21,
    name: "Framecraft DSLR Camera",
    category: "Electronics",
    price: 38990,
    original: 44990,
    rating: 4.7,
    reviews: 164,
    image:
      "https://images.unsplash.com/photo-1591785944213-c8b5b7a75ec6?auto=format&fit=crop&w=900&q=85",
    badge: "Photo pick",
    description: "Versatile DSLR for learning portrait and travel photography.",
    specifications: {
      Sensor: "APS-C",
      Video: "Full HD",
      Mount: "Interchangeable lens",
    },
    stock: 8,
  },
  {
    id: 22,
    name: "Focusline DSLR Camera",
    category: "Electronics",
    price: 52990,
    original: 59990,
    rating: 4.8,
    reviews: 121,
    image:
      "https://images.unsplash.com/photo-1610092309893-ddcaf17d7fb4?auto=format&fit=crop&w=900&q=85",
    badge: "Enthusiast",
    description: "Responsive DSLR with hands-on controls for enthusiasts.",
    specifications: { Sensor: "24 MP APS-C", Burst: "5 fps", Video: "Full HD" },
    stock: 6,
  },
  {
    id: 23,
    name: "Nocturne Over-Ear Headphones",
    category: "Electronics",
    price: 2299,
    original: 3299,
    rating: 4.5,
    reviews: 537,
    image:
      "https://images.unsplash.com/photo-1615182786845-37b226f0aa98?auto=format&fit=crop&w=900&q=85",
    badge: "Deep listening",
    description:
      "Comfortable headphones for music, study and focused listening.",
    specifications: {
      Type: "Over-ear",
      Connection: "Wireless and 3.5 mm",
      Battery: "30 hours",
    },
    stock: 44,
  },
  {
    id: 24,
    name: "Transit Mouse & Power Bank Kit",
    category: "Electronics",
    price: 1999,
    original: 2799,
    rating: 4.3,
    reviews: 208,
    image:
      "https://images.unsplash.com/photo-1595074475129-432e3fd1bace?auto=format&fit=crop&w=900&q=85",
    badge: "Travel kit",
    description:
      "Wireless mouse and compact power bank pairing for work on the move.",
    specifications: {
      Contents: "Mouse and power bank",
      Capacity: "10,000 mAh",
      Connection: "2.4 GHz",
    },
    stock: 31,
  },
]

const electronicsExpansion: Product[] = [
  {
    id: 25,
    name: "Cedar Desk Laptop",
    category: "Electronics",
    price: 37990,
    original: 44990,
    rating: 4.4,
    reviews: 176,
    image:
      "https://images.unsplash.com/photo-1714578187196-6925387b9f38?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description: "A practical laptop for documents, classes and video calls.",
    specifications: {
      Display: "14-inch Full HD",
      Memory: "8 GB",
      Storage: "512 GB SSD",
    },
    stock: 17,
  },
  {
    id: 26,
    name: "Canvas Tablet Workstation",
    category: "Electronics",
    price: 32990,
    original: 37990,
    rating: 4.6,
    reviews: 144,
    image:
      "https://images.unsplash.com/photo-1627691673558-cf76f304f273?auto=format&fit=crop&w=900&q=85",
    badge: "Flexible work",
    description:
      "A slim tablet setup for reading, notes and portable productivity.",
    specifications: {
      Display: "10.9-inch",
      Storage: "256 GB",
      Connectivity: "Wi-Fi",
    },
    stock: 14,
  },
  {
    id: 27,
    name: "Blush Desktop Input Set",
    category: "Electronics",
    price: 3199,
    original: 4299,
    rating: 4.5,
    reviews: 267,
    image:
      "https://images.unsplash.com/photo-1706169529392-8685eea83b98?auto=format&fit=crop&w=900&q=85",
    badge: "Desk set",
    description:
      "A coordinated keyboard and mouse setup for a cheerful workspace.",
    specifications: {
      Contents: "Keyboard and mouse",
      Connection: "Wireless",
      Layout: "Compact",
    },
    stock: 32,
  },
  {
    id: 29,
    name: "Ivory Smartphone & Laptop Duo",
    category: "Electronics",
    price: 62990,
    original: 70990,
    rating: 4.5,
    reviews: 118,
    image:
      "https://images.unsplash.com/photo-1759588071782-b2091e07d737?auto=format&fit=crop&w=900&q=85",
    badge: "Device bundle",
    description:
      "A coordinated smartphone and laptop bundle for connected work.",
    specifications: { Laptop: "14-inch", Phone: "128 GB", Warranty: "1 year" },
    stock: 5,
  },
  {
    id: 30,
    name: "Midnight Tablet & Phone Pair",
    category: "Electronics",
    price: 46990,
    original: 53990,
    rating: 4.6,
    reviews: 93,
    image:
      "https://images.unsplash.com/photo-1549192477-faf7479f7093?auto=format&fit=crop&w=900&q=85",
    badge: "Connected pair",
    description:
      "A dark-finish tablet and smartphone pair for entertainment on the go.",
    specifications: {
      Tablet: "10-inch",
      Phone: "128 GB",
      Connectivity: "Wi-Fi and 5G",
    },
    stock: 8,
  },
  {
    id: 31,
    name: "Pocket Creator Camera Kit",
    category: "Electronics",
    price: 28990,
    original: 33990,
    rating: 4.5,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1726463276806-63a1e75ccb66?auto=format&fit=crop&w=900&q=85",
    badge: "Creator kit",
    description:
      "A compact camera and phone pairing for mobile content creation.",
    specifications: {
      Camera: "4K compact",
      "Phone support": "Universal",
      Connection: "Wi-Fi",
    },
    stock: 11,
  },
  {
    id: 32,
    name: "Sentinel Indoor Security Camera Kit",
    category: "Electronics",
    price: 2799,
    original: 3699,
    rating: 4.4,
    reviews: 428,
    image:
      "https://images.unsplash.com/photo-1715869428589-366729e7fdcd?auto=format&fit=crop&w=900&q=85",
    badge: "Smart home",
    description: "An indoor security camera with convenient phone monitoring.",
    specifications: {
      Resolution: "1080p",
      View: "Wide angle",
      Connection: "Wi-Fi",
    },
    stock: 36,
  },
  {
    id: 33,
    name: "Walnut Full-Size Keyboard",
    category: "Electronics",
    price: 1699,
    original: 2299,
    rating: 4.3,
    reviews: 311,
    image:
      "https://images.unsplash.com/photo-1638909067462-1310c4011610?auto=format&fit=crop&w=900&q=85",
    badge: "Office pick",
    description: "A dependable full-size keyboard for home and office desks.",
    specifications: {
      Layout: "Full size",
      Connection: "USB",
      Keys: "Low profile",
    },
    stock: 47,
  },
  {
    id: 34,
    name: "Tactile Pro Mechanical Keyboard",
    category: "Electronics",
    price: 3499,
    original: 4599,
    rating: 4.7,
    reviews: 513,
    image:
      "https://images.unsplash.com/photo-1592683855405-3f272c7e462a?auto=format&fit=crop&w=900&q=85",
    badge: "Tactile keys",
    description: "A responsive mechanical keyboard for fast, confident typing.",
    specifications: {
      Switches: "Tactile",
      Connection: "USB-C",
      Lighting: "White backlight",
    },
    stock: 29,
  },
  {
    id: 35,
    name: "Orbit Wireless Desk Combo",
    category: "Electronics",
    price: 2199,
    original: 2999,
    rating: 4.4,
    reviews: 354,
    image:
      "https://images.unsplash.com/photo-1674036373727-50eb89eed019?auto=format&fit=crop&w=900&q=85",
    badge: "Wireless combo",
    description:
      "A wireless keyboard and mouse combination for clutter-free desks.",
    specifications: {
      Contents: "Keyboard and mouse",
      Range: "10 m",
      Receiver: "Single USB",
    },
    stock: 42,
  },
  {
    id: 36,
    name: "Mono Compact Desk Combo",
    category: "Electronics",
    price: 1899,
    original: 2599,
    rating: 4.3,
    reviews: 229,
    image:
      "https://images.unsplash.com/photo-1636059151106-5471f93f1dc9?auto=format&fit=crop&w=900&q=85",
    badge: "Compact set",
    description:
      "A compact keyboard and mouse set suited to smaller workspaces.",
    specifications: {
      Layout: "Compact",
      Connection: "Wireless",
      Battery: "Included",
    },
    stock: 38,
  },
  {
    id: 37,
    name: "Mobile Desk Docking Set",
    category: "Electronics",
    price: 2499,
    original: 3299,
    rating: 4.4,
    reviews: 184,
    image:
      "https://images.unsplash.com/photo-1531092601737-e5b3b6e57365?auto=format&fit=crop&w=900&q=85",
    badge: "Mobile desk",
    description:
      "A keyboard-led mobile desk setup for focused phone productivity.",
    specifications: {
      Compatibility: "Android and iOS",
      Connection: "Bluetooth",
      Layout: "Slim",
    },
    stock: 24,
  },
  {
    id: 38,
    name: "Studio Desk Audio Set",
    category: "Electronics",
    price: 4299,
    original: 5499,
    rating: 4.6,
    reviews: 197,
    image:
      "https://images.unsplash.com/photo-1707858057802-ab1227691ed5?auto=format&fit=crop&w=900&q=85",
    badge: "Desk audio",
    description: "A keyboard, mouse and headphone desk set for work and play.",
    specifications: {
      Contents: "Keyboard, mouse, headphones",
      Connection: "Mixed",
      Colour: "Black",
    },
    stock: 16,
  },
  {
    id: 39,
    name: "SwiftCharge Phone Cable Kit",
    category: "Electronics",
    price: 699,
    original: 999,
    rating: 4.4,
    reviews: 842,
    image:
      "https://images.unsplash.com/photo-1614399113305-a127bb2ca893?auto=format&fit=crop&w=900&q=85",
    badge: "Charging essential",
    description: "A durable phone charging cable kit for home and travel.",
    specifications: {
      Connector: "USB-C",
      Length: "1.5 m",
      Power: "Fast charge compatible",
    },
    stock: 73,
  },
  {
    id: 40,
    name: "Crimson Protective Device Case",
    category: "Electronics",
    price: 899,
    original: 1299,
    rating: 4.3,
    reviews: 276,
    image:
      "https://images.unsplash.com/photo-1594843665794-446ce915d840?auto=format&fit=crop&w=900&q=85",
    badge: "Protective gear",
    description: "A structured red protective case for compact electronics.",
    specifications: {
      Material: "Synthetic leather",
      Closure: "Zip",
      Lining: "Soft fabric",
    },
    stock: 51,
  },
  {
    id: 41,
    name: "Dual Connect Smartphone Set",
    category: "Electronics",
    price: 35990,
    original: 41990,
    rating: 4.5,
    reviews: 133,
    image:
      "https://images.unsplash.com/photo-1596207891316-23851be3cc20?auto=format&fit=crop&w=900&q=85",
    badge: "Phone pair",
    description:
      "A practical pair of Android smartphones for family connectivity.",
    specifications: { Storage: "128 GB each", Network: "5G", SIM: "Dual SIM" },
    stock: 10,
  },
  {
    id: 42,
    name: "Commute Phone & Headset Kit",
    category: "Electronics",
    price: 18990,
    original: 22990,
    rating: 4.4,
    reviews: 211,
    image:
      "https://images.unsplash.com/photo-1633373371236-4750eb345a69?auto=format&fit=crop&w=900&q=85",
    badge: "Commute kit",
    description:
      "A smartphone and headphone kit for calls and daily entertainment.",
    specifications: { Phone: "128 GB", Headphones: "Wireless", Network: "5G" },
    stock: 13,
  },
  {
    id: 44,
    name: "VoltEdge Compact Power Bank",
    category: "Electronics",
    price: 1399,
    original: 1999,
    rating: 4.5,
    reviews: 687,
    image:
      "https://images.unsplash.com/photo-1614399777646-3b47813b2088?auto=format&fit=crop&w=900&q=85",
    badge: "Power on the go",
    description: "A compact backup battery for phones and small USB devices.",
    specifications: {
      Capacity: "10,000 mAh",
      Ports: "Dual USB",
      Input: "USB-C",
    },
    stock: 64,
  },
  {
    id: 45,
    name: "QuietArc Over-Ear Headphones",
    category: "Electronics",
    price: 2799,
    original: 3899,
    rating: 4.6,
    reviews: 476,
    image:
      "https://images.unsplash.com/photo-1515940175183-6798529cb860?auto=format&fit=crop&w=900&q=85",
    badge: "Comfort audio",
    description:
      "Light over-ear headphones with soft cushions for extended listening.",
    specifications: {
      Type: "Over-ear",
      Connection: "Wireless",
      Battery: "28 hours",
    },
    stock: 35,
  },
  {
    id: 46,
    name: "Tabletop Mirrorless Camera Kit",
    category: "Electronics",
    price: 61990,
    original: 69990,
    rating: 4.8,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1615657198544-efcc44cab9cc?auto=format&fit=crop&w=900&q=85",
    badge: "Mirrorless",
    description:
      "A compact interchangeable-lens camera for detailed stills and video.",
    specifications: {
      Sensor: "APS-C",
      Video: "4K",
      Mount: "Interchangeable lens",
    },
    stock: 5,
  },
  {
    id: 47,
    name: "Onyx Compact Smartphone",
    category: "Electronics",
    price: 16990,
    original: 19990,
    rating: 4.4,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1625959326359-29a1700ad55e?auto=format&fit=crop&w=900&q=85",
    badge: "Compact phone",
    description:
      "A compact black smartphone for dependable everyday communication.",
    specifications: { Storage: "128 GB", Network: "5G", Camera: "Dual rear" },
    stock: 22,
  },
  {
    id: 48,
    name: "Cafe Wireless Charging Bundle",
    category: "Electronics",
    price: 2499,
    original: 3299,
    rating: 4.5,
    reviews: 321,
    image:
      "https://images.unsplash.com/photo-1778854228508-4aa7595d1678?auto=format&fit=crop&w=900&q=85",
    badge: "Wireless bundle",
    description: "A phone charging and wireless earbud bundle for busy days.",
    specifications: {
      Charging: "Wireless",
      Earbuds: "Bluetooth",
      Case: "Rechargeable",
    },
    stock: 28,
  },
]

const categoryExpansion: Product[] = [
  {
    id: 55,
    name: "Ivory Formal Shirt",
    category: "Men's Fashion",
    price: 699,
    original: 1089,
    rating: 4.2,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1552252059-9d77e4059ad1?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Cotton poplin",
      Fit: "Regular fit",
      Care: "Gentle wash",
    },
    stock: 12,
    featured: true,
  },
  {
    id: 56,
    name: "Cedar Zip Jacket",
    category: "Men's Fashion",
    price: 769,
    original: 1199,
    rating: 4.3,
    reviews: 121,
    image:
      "https://images.unsplash.com/photo-1620228922597-cca58f177310?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Relaxed fit",
      Care: "Gentle wash",
    },
    stock: 19,
    featured: false,
  },
  {
    id: 57,
    name: "Brick Lane Casual Shirt",
    category: "Men's Fashion",
    price: 839,
    original: 1309,
    rating: 4.4,
    reviews: 158,
    image:
      "https://images.unsplash.com/photo-1673092147872-5ddb03194341?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Brushed cotton",
      Fit: "Regular fit",
      Care: "Gentle wash",
    },
    stock: 26,
    featured: false,
  },
  {
    id: 58,
    name: "Indigo Everyday Hoodie",
    category: "Men's Fashion",
    price: 909,
    original: 1409,
    rating: 4.5,
    reviews: 195,
    image:
      "https://images.unsplash.com/photo-1728394604722-c1007e3edf09?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Fleece",
      Fit: "Relaxed fit",
      Care: "Gentle wash",
    },
    stock: 33,
    featured: false,
  },
  {
    id: 59,
    name: "Metro Casual Overshirt",
    category: "Men's Fashion",
    price: 979,
    original: 1519,
    rating: 4.6,
    reviews: 232,
    image:
      "https://images.unsplash.com/photo-1713943189183-c5a9dde63b45?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Twill",
      Fit: "Layered fit",
      Care: "Gentle wash",
    },
    stock: 40,
    featured: false,
  },
  {
    id: 60,
    name: "Crimson Crew Sweater",
    category: "Men's Fashion",
    price: 1049,
    original: 1629,
    rating: 4.7,
    reviews: 269,
    image:
      "https://images.unsplash.com/photo-1628250521470-28c1fc54616c?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Knit cotton",
      Fit: "Regular fit",
      Care: "Gentle wash",
    },
    stock: 47,
    featured: true,
  },
  {
    id: 61,
    name: "Market Day Casual Jacket",
    category: "Men's Fashion",
    price: 1119,
    original: 1739,
    rating: 4.2,
    reviews: 306,
    image:
      "https://images.unsplash.com/photo-1565128260358-318e131efbb6?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Cotton canvas",
      Fit: "Comfort fit",
      Care: "Gentle wash",
    },
    stock: 54,
    featured: false,
  },
  {
    id: 62,
    name: "Trailside Utility Outfit",
    category: "Men's Fashion",
    price: 1189,
    original: 1849,
    rating: 4.3,
    reviews: 343,
    image:
      "https://images.unsplash.com/photo-1664607239609-414cd7728ffb?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Outdoor fit",
      Care: "Gentle wash",
    },
    stock: 13,
    featured: false,
  },
  {
    id: 63,
    name: "Skate Park Casual Trousers",
    category: "Men's Fashion",
    price: 1259,
    original: 1959,
    rating: 4.4,
    reviews: 380,
    image:
      "https://images.unsplash.com/photo-1722703905760-955776668017?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Stretch cotton",
      Fit: "Tapered fit",
      Care: "Gentle wash",
    },
    stock: 20,
    featured: false,
  },
  {
    id: 64,
    name: "Urban Skate Sweatshirt",
    category: "Men's Fashion",
    price: 1329,
    original: 2059,
    rating: 4.5,
    reviews: 417,
    image:
      "https://images.unsplash.com/photo-1639795198222-9a7b58510a6b?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Loopknit cotton",
      Fit: "Relaxed fit",
      Care: "Gentle wash",
    },
    stock: 27,
    featured: false,
  },
  {
    id: 65,
    name: "Graphite Pullover Hoodie",
    category: "Men's Fashion",
    price: 1399,
    original: 2169,
    rating: 4.6,
    reviews: 454,
    image:
      "https://images.unsplash.com/photo-1577394745831-5f5351823199?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Fleece",
      Fit: "Regular fit",
      Care: "Gentle wash",
    },
    stock: 34,
    featured: true,
  },
  {
    id: 66,
    name: "Weekend Knit Sweater",
    category: "Men's Fashion",
    price: 1469,
    original: 2279,
    rating: 4.7,
    reviews: 491,
    image:
      "https://images.unsplash.com/photo-1768216330811-18537dd9031e?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Soft acrylic",
      Fit: "Comfort fit",
      Care: "Gentle wash",
    },
    stock: 41,
    featured: false,
  },
  {
    id: 67,
    name: "Midnight Casual Shirt",
    category: "Men's Fashion",
    price: 1539,
    original: 2389,
    rating: 4.2,
    reviews: 528,
    image:
      "https://images.unsplash.com/photo-1642546539552-eaf9d56d7359?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: { Fabric: "Cotton", Fit: "Slim fit", Care: "Gentle wash" },
    stock: 48,
    featured: false,
  },
  {
    id: 68,
    name: "Alpine White Hoodie",
    category: "Men's Fashion",
    price: 1609,
    original: 2499,
    rating: 4.3,
    reviews: 565,
    image:
      "https://images.unsplash.com/photo-1667319250298-159eac818480?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Brushed fleece",
      Fit: "Relaxed fit",
      Care: "Gentle wash",
    },
    stock: 55,
    featured: false,
  },
  {
    id: 69,
    name: "Indigo Denim Shirt",
    category: "Men's Fashion",
    price: 1679,
    original: 2609,
    rating: 4.4,
    reviews: 602,
    image:
      "https://images.unsplash.com/photo-1626302010471-87735c78d04b?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A versatile menswear piece designed for comfortable everyday styling.",
    specifications: {
      Fabric: "Denim cotton",
      Fit: "Regular fit",
      Care: "Gentle wash",
    },
    stock: 14,
    featured: false,
  },
  {
    id: 70,
    name: "Marigold Floral Dress",
    category: "Women's Fashion",
    price: 899,
    original: 1399,
    rating: 4.2,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Viscose", Fit: "Flared", Care: "Gentle wash" },
    stock: 12,
    featured: true,
  },
  {
    id: 71,
    name: "Sunbeam Embroidered Tier Dress",
    category: "Women's Fashion",
    price: 989,
    original: 1539,
    rating: 4.3,
    reviews: 121,
    image:
      "https://images.unsplash.com/photo-1760287363878-1a09af715b80?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Tiered",
      Care: "Gentle wash",
    },
    stock: 19,
    featured: false,
  },
  {
    id: 72,
    name: "Meadow Green Day Dress",
    category: "Women's Fashion",
    price: 1079,
    original: 1679,
    rating: 4.4,
    reviews: 158,
    image:
      "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Rayon", Fit: "A-line", Care: "Gentle wash" },
    stock: 26,
    featured: false,
  },
  {
    id: 73,
    name: "Blush Pink Ethnic Set",
    category: "Women's Fashion",
    price: 1169,
    original: 1819,
    rating: 4.5,
    reviews: 195,
    image:
      "https://images.unsplash.com/photo-1729146768776-8356708e907d?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Cotton silk",
      Fit: "Straight",
      Care: "Gentle wash",
    },
    stock: 33,
    featured: false,
  },
  {
    id: 74,
    name: "Forest Walk Traditional Set",
    category: "Women's Fashion",
    price: 1259,
    original: 1959,
    rating: 4.6,
    reviews: 232,
    image:
      "https://images.unsplash.com/photo-1760162693478-4c96b6c99d55?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Cotton", Fit: "Classic", Care: "Gentle wash" },
    stock: 40,
    featured: false,
  },
  {
    id: 75,
    name: "Terracotta Maxi Dress",
    category: "Women's Fashion",
    price: 1349,
    original: 2099,
    rating: 4.7,
    reviews: 269,
    image:
      "https://images.unsplash.com/photo-1649140333933-9e5df9baf6da?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Viscose", Fit: "Maxi", Care: "Gentle wash" },
    stock: 47,
    featured: true,
  },
  {
    id: 76,
    name: "Bougainvillea Floral Kurta Set",
    category: "Women's Fashion",
    price: 1439,
    original: 2239,
    rating: 4.2,
    reviews: 306,
    image:
      "https://images.unsplash.com/photo-1745737603531-f2314e3ae531?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Cotton", Fit: "Straight", Care: "Gentle wash" },
    stock: 54,
    featured: false,
  },
  {
    id: 77,
    name: "Rose Stripe Cardigan",
    category: "Women's Fashion",
    price: 1529,
    original: 2369,
    rating: 4.3,
    reviews: 343,
    image:
      "https://images.unsplash.com/photo-1598451837400-19b80d53a4a6?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Soft knit",
      Fit: "Relaxed",
      Care: "Gentle wash",
    },
    stock: 13,
    featured: false,
  },
  {
    id: 78,
    name: "Heritage Festive Ensemble",
    category: "Women's Fashion",
    price: 1619,
    original: 2509,
    rating: 4.4,
    reviews: 380,
    image:
      "https://images.unsplash.com/photo-1760162690638-743ba3c1d4f4?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Art silk",
      Fit: "Traditional",
      Care: "Gentle wash",
    },
    stock: 20,
    featured: false,
  },
  {
    id: 79,
    name: "Woodland Ethnic Kurta Set",
    category: "Women's Fashion",
    price: 1709,
    original: 2649,
    rating: 4.5,
    reviews: 417,
    image:
      "https://images.unsplash.com/photo-1760162692659-6f7b83dc763f?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Straight",
      Care: "Gentle wash",
    },
    stock: 27,
    featured: false,
  },
  {
    id: 80,
    name: "Sapphire Lehenga Set",
    category: "Women's Fashion",
    price: 1799,
    original: 2789,
    rating: 4.6,
    reviews: 454,
    image:
      "https://images.unsplash.com/photo-1640745690845-4d6aa890811d?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Art silk", Fit: "Flared", Care: "Gentle wash" },
    stock: 34,
    featured: true,
  },
  {
    id: 81,
    name: "Ruby Forest Traditional Set",
    category: "Women's Fashion",
    price: 1889,
    original: 2929,
    rating: 4.7,
    reviews: 491,
    image:
      "https://images.unsplash.com/photo-1760162692537-e8fd41367069?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Cotton silk",
      Fit: "Classic",
      Care: "Gentle wash",
    },
    stock: 41,
    featured: false,
  },
  {
    id: 82,
    name: "Scarlet Midi Skirt",
    category: "Women's Fashion",
    price: 1979,
    original: 3069,
    rating: 4.2,
    reviews: 528,
    image:
      "https://images.unsplash.com/photo-1642912276376-5db11bb63a1f?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: { Fabric: "Viscose", Fit: "Midi", Care: "Gentle wash" },
    stock: 48,
    featured: false,
  },
  {
    id: 83,
    name: "Emerald Festive Kurta Set",
    category: "Women's Fashion",
    price: 2069,
    original: 3209,
    rating: 4.3,
    reviews: 565,
    image:
      "https://images.unsplash.com/photo-1756483551860-2b312666ac53?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Silk blend",
      Fit: "Straight",
      Care: "Gentle wash",
    },
    stock: 55,
    featured: false,
  },
  {
    id: 84,
    name: "Indigo Blue Saree",
    category: "Women's Fashion",
    price: 2159,
    original: 3349,
    rating: 4.4,
    reviews: 602,
    image:
      "https://images.unsplash.com/photo-1731131400094-8de05619131a?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A thoughtfully styled womenswear piece for elegant everyday and occasion dressing.",
    specifications: {
      Fabric: "Art silk",
      Fit: "Classic drape",
      Care: "Gentle wash",
    },
    stock: 14,
    featured: false,
  },
  {
    id: 85,
    name: "Moonlit Necklace & Earring Set",
    category: "Jewellery",
    price: 799,
    original: 1239,
    rating: 4.2,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1722410180687-b05b50922362?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Alloy",
      Finish: "Silver tone",
      Care: "Keep dry",
    },
    stock: 12,
    featured: true,
  },
  {
    id: 86,
    name: "Emerald Drop Necklace",
    category: "Jewellery",
    price: 909,
    original: 1409,
    rating: 4.3,
    reviews: 121,
    image:
      "https://images.unsplash.com/photo-1722410180670-b6d5a2e704fa?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Alloy",
      Finish: "Gold tone",
      Care: "Keep dry",
    },
    stock: 19,
    featured: false,
  },
  {
    id: 87,
    name: "Celebration Jewellery Collection",
    category: "Jewellery",
    price: 1019,
    original: 1579,
    rating: 4.4,
    reviews: 158,
    image:
      "https://images.unsplash.com/photo-1721807644561-9efcabee5c42?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Mixed alloy",
      Finish: "Festive",
      Care: "Keep dry",
    },
    stock: 26,
    featured: false,
  },
  {
    id: 88,
    name: "Golden Trio Necklace Set",
    category: "Jewellery",
    price: 1129,
    original: 1749,
    rating: 4.5,
    reviews: 195,
    image:
      "https://images.unsplash.com/photo-1721103418218-416182aca079?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Brass alloy",
      Finish: "Gold plated",
      Care: "Keep dry",
    },
    stock: 33,
    featured: false,
  },
  {
    id: 89,
    name: "Fine Link Gold-Tone Chain",
    category: "Jewellery",
    price: 1239,
    original: 1929,
    rating: 4.6,
    reviews: 232,
    image:
      "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Stainless steel",
      Finish: "Gold tone",
      Care: "Keep dry",
    },
    stock: 40,
    featured: false,
  },
  {
    id: 90,
    name: "Heirloom Mixed Jewellery Set",
    category: "Jewellery",
    price: 1349,
    original: 2099,
    rating: 4.7,
    reviews: 269,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Mixed metal",
      Finish: "Dual tone",
      Care: "Keep dry",
    },
    stock: 47,
    featured: true,
  },
  {
    id: 91,
    name: "Starlight Crystal Necklace",
    category: "Jewellery",
    price: 1459,
    original: 2269,
    rating: 4.2,
    reviews: 306,
    image:
      "https://images.unsplash.com/photo-1744369382892-eb5b6a2fdc6f?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Crystal alloy",
      Finish: "Silver tone",
      Care: "Keep dry",
    },
    stock: 54,
    featured: false,
  },
  {
    id: 92,
    name: "Vintage Table Jewellery Collection",
    category: "Jewellery",
    price: 1569,
    original: 2439,
    rating: 4.3,
    reviews: 343,
    image:
      "https://images.unsplash.com/photo-1682823544362-b751e260e33c?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Mixed alloy",
      Finish: "Antique tone",
      Care: "Keep dry",
    },
    stock: 13,
    featured: false,
  },
  {
    id: 93,
    name: "Layered Everyday Jewellery Set",
    category: "Jewellery",
    price: 1679,
    original: 2609,
    rating: 4.4,
    reviews: 380,
    image:
      "https://images.unsplash.com/photo-1697713465161-d872b22723a2?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Alloy",
      Finish: "Gold tone",
      Care: "Keep dry",
    },
    stock: 20,
    featured: false,
  },
  {
    id: 94,
    name: "Crystal Necklace & Stud Set",
    category: "Jewellery",
    price: 1789,
    original: 2779,
    rating: 4.5,
    reviews: 417,
    image:
      "https://images.unsplash.com/photo-1721103418939-5112f0ccfac8?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "An elegant jewellery design created to add a polished finish to festive and everyday looks.",
    specifications: {
      Material: "Crystal alloy",
      Finish: "Silver tone",
      Care: "Keep dry",
    },
    stock: 27,
    featured: false,
  },
  {
    id: 95,
    name: "Classic Pen & Blank Journal",
    category: "Books & Stationery",
    price: 199,
    original: 309,
    rating: 4.2,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "192 pages",
      Use: "Study and planning",
    },
    stock: 12,
    featured: true,
  },
  {
    id: 96,
    name: "Coral Spiral Study Notebook",
    category: "Books & Stationery",
    price: 234,
    original: 369,
    rating: 4.3,
    reviews: 121,
    image:
      "https://images.unsplash.com/photo-1623697899811-f2403f50685e?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "160 pages",
      Use: "Study and planning",
    },
    stock: 19,
    featured: false,
  },
  {
    id: 97,
    name: "Cobalt Notes Journal",
    category: "Books & Stationery",
    price: 269,
    original: 419,
    rating: 4.4,
    reviews: 158,
    image:
      "https://images.unsplash.com/photo-1647559709298-c0e3dcb47092?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "200 pages",
      Use: "Study and planning",
    },
    stock: 26,
    featured: false,
  },
  {
    id: 98,
    name: "Focus Weekly Planner",
    category: "Books & Stationery",
    price: 304,
    original: 479,
    rating: 4.5,
    reviews: 195,
    image:
      "https://images.unsplash.com/photo-1632772998001-cc9bf6f7c852?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A4",
      Pages: "52 weeks",
      Use: "Study and planning",
    },
    stock: 33,
    featured: false,
  },
  {
    id: 99,
    name: "Executive Gold Pen Set",
    category: "Books & Stationery",
    price: 339,
    original: 529,
    rating: 4.6,
    reviews: 232,
    image:
      "https://images.unsplash.com/photo-1617177435596-1c9e30d6d608?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "Metal",
      Pages: "2 pens",
      Use: "Study and planning",
    },
    stock: 40,
    featured: false,
  },
  {
    id: 100,
    name: "Graphite Pencil Cup Set",
    category: "Books & Stationery",
    price: 374,
    original: 579,
    rating: 4.7,
    reviews: 269,
    image:
      "https://images.unsplash.com/photo-1510936994138-07e06c7c5add?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "HB graphite",
      Pages: "12 pencils",
      Use: "Study and planning",
    },
    stock: 47,
    featured: true,
  },
  {
    id: 101,
    name: "Minimal Kraft Notebook",
    category: "Books & Stationery",
    price: 409,
    original: 639,
    rating: 4.2,
    reviews: 306,
    image:
      "https://images.unsplash.com/photo-1603188389888-7b80bd0a7e3e?auto=format&fit=crop&w=900&q=85",
    badge: "Limited edit",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "180 pages",
      Use: "Study and planning",
    },
    stock: 54,
    featured: false,
  },
  {
    id: 102,
    name: "Daily Tasks Notepad",
    category: "Books & Stationery",
    price: 444,
    original: 689,
    rating: 4.3,
    reviews: 343,
    image:
      "https://images.unsplash.com/photo-1692158961562-cb06d93fb63c?auto=format&fit=crop&w=900&q=85",
    badge: "Everyday pick",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "100 sheets",
      Use: "Study and planning",
    },
    stock: 13,
    featured: false,
  },
  {
    id: 103,
    name: "Blush Notebook & Pen Set",
    category: "Books & Stationery",
    price: 479,
    original: 749,
    rating: 4.4,
    reviews: 380,
    image:
      "https://images.unsplash.com/photo-1512279093314-5926a353720c?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "A5",
      Pages: "3 pens",
      Use: "Study and planning",
    },
    stock: 20,
    featured: false,
  },
  {
    id: 104,
    name: "Desk Notes Journal",
    category: "Books & Stationery",
    price: 514,
    original: 799,
    rating: 4.5,
    reviews: 417,
    image:
      "https://images.unsplash.com/photo-1679119790850-161688b0417e?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A practical stationery essential for organised notes, study and daily planning.",
    specifications: {
      Format: "B5",
      Pages: "200 pages",
      Use: "Study and planning",
    },
    stock: 27,
    featured: false,
  },
]

const categoryExpansionTwo: Product[] = [
  {
    id: 105,
    name: "Heritage Street Kurta",
    category: "Men's Fashion",
    price: 849,
    original: 1279,
    rating: 4.2,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1756661836160-b23f14a72005?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: { Fabric: "Cotton", Fit: "Relaxed", Care: "Gentle wash" },
    stock: 10,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 106,
    name: "Violet Occasion Blazer",
    category: "Men's Fashion",
    price: 924,
    original: 1389,
    rating: 4.3,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1608828017351-c5063ef786d1?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Poly-viscose",
      Fit: "Tailored",
      Care: "Gentle wash",
    },
    stock: 19,
    availability: "In stock",
    featured: false,
  },
  {
    id: 107,
    name: "City Evening Blazer",
    category: "Men's Fashion",
    price: 999,
    original: 1499,
    rating: 4.4,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1649954459557-f77663765a48?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Textured blend",
      Fit: "Slim",
      Care: "Gentle wash",
    },
    stock: 28,
    availability: "In stock",
    featured: false,
  },
  {
    id: 108,
    name: "Indigo Harrington Jacket",
    category: "Men's Fashion",
    price: 1074,
    original: 1619,
    rating: 4.5,
    reviews: 183,
    image:
      "https://images.unsplash.com/photo-1534569370043-e0af197b3ec0?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Cotton twill",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 37,
    availability: "In stock",
    featured: false,
  },
  {
    id: 109,
    name: "Stone Casual Overshirt",
    category: "Men's Fashion",
    price: 1149,
    original: 1729,
    rating: 4.6,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1703701278183-87b3d0576d01?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Brushed cotton",
      Fit: "Relaxed",
      Care: "Gentle wash",
    },
    stock: 46,
    availability: "In stock",
    featured: false,
  },
  {
    id: 110,
    name: "Ash Knit Pullover",
    category: "Men's Fashion",
    price: 1224,
    original: 1839,
    rating: 4.7,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1624195864896-22656b3b0eff?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Cotton knit",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 55,
    availability: "In stock",
    featured: false,
  },
  {
    id: 111,
    name: "Plum Formal Blazer",
    category: "Men's Fashion",
    price: 1299,
    original: 1949,
    rating: 4.2,
    reviews: 270,
    image:
      "https://images.unsplash.com/photo-1712130126754-009c33690ee3?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Suiting blend",
      Fit: "Tailored",
      Care: "Gentle wash",
    },
    stock: 14,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 112,
    name: "Campus Casual Trousers",
    category: "Men's Fashion",
    price: 1374,
    original: 2069,
    rating: 4.3,
    reviews: 299,
    image:
      "https://images.unsplash.com/photo-1575323849703-709425d5cf78?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Stretch cotton",
      Fit: "Tapered",
      Care: "Gentle wash",
    },
    stock: 23,
    availability: "In stock",
    featured: false,
  },
  {
    id: 113,
    name: "Highland Scarf Outfit",
    category: "Men's Fashion",
    price: 1449,
    original: 2179,
    rating: 4.4,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1746193689563-931efd26a809?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Wool blend",
      Fit: "Layered",
      Care: "Gentle wash",
    },
    stock: 32,
    availability: "In stock",
    featured: false,
  },
  {
    id: 114,
    name: "Midnight Formal Suit",
    category: "Men's Fashion",
    price: 1524,
    original: 2289,
    rating: 4.5,
    reviews: 357,
    image:
      "https://images.unsplash.com/photo-1683965832190-0781083f2519?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Suiting fabric",
      Fit: "Tailored",
      Care: "Gentle wash",
    },
    stock: 41,
    availability: "In stock",
    featured: false,
  },
  {
    id: 115,
    name: "Azure Winter Scarf",
    category: "Men's Fashion",
    price: 1599,
    original: 2399,
    rating: 4.6,
    reviews: 386,
    image:
      "https://images.unsplash.com/photo-1632999874916-c80c603f5b26?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Soft acrylic",
      Fit: "Long",
      Care: "Gentle wash",
    },
    stock: 50,
    availability: "In stock",
    featured: false,
  },
  {
    id: 116,
    name: "Black Denim Jacket",
    category: "Men's Fashion",
    price: 1674,
    original: 2519,
    rating: 4.7,
    reviews: 415,
    image:
      "https://images.unsplash.com/photo-1585770475784-0f7e6c2826d0?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: { Fabric: "Denim", Fit: "Regular", Care: "Gentle wash" },
    stock: 59,
    availability: "In stock",
    featured: false,
  },
  {
    id: 117,
    name: "White Pique Polo",
    category: "Men's Fashion",
    price: 1749,
    original: 2629,
    rating: 4.2,
    reviews: 444,
    image:
      "https://images.unsplash.com/photo-1606762759501-d6c1fa325182?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Pique cotton",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 18,
    availability: "In stock",
    featured: true,
  },
  {
    id: 118,
    name: "Sky Blue Formal Shirt",
    category: "Men's Fashion",
    price: 1824,
    original: 2739,
    rating: 4.3,
    reviews: 473,
    image:
      "https://images.unsplash.com/photo-1505233040952-e43a3a015bc2?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Cotton poplin",
      Fit: "Slim",
      Care: "Gentle wash",
    },
    stock: 27,
    availability: "In stock",
    featured: false,
  },
  {
    id: 119,
    name: "Classic Blue Denim Jacket",
    category: "Men's Fashion",
    price: 1899,
    original: 2849,
    rating: 4.4,
    reviews: 502,
    image:
      "https://images.unsplash.com/photo-1569438322867-500692e2a572?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A distinctive menswear style with comfortable construction for versatile everyday dressing.",
    specifications: {
      Fabric: "Denim cotton",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 36,
    availability: "In stock",
    featured: false,
  },
  {
    id: 120,
    name: "Indigo Patterned Tunic Set",
    category: "Women's Fashion",
    price: 949,
    original: 1429,
    rating: 4.2,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1622049605334-72e1e4432346?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Cotton", Fit: "Straight", Care: "Gentle wash" },
    stock: 10,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 121,
    name: "Meadow Woven Shawl",
    category: "Women's Fashion",
    price: 1034,
    original: 1559,
    rating: 4.3,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1520402787196-ac6264cda85f?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Wool blend",
      Fit: "Draped",
      Care: "Gentle wash",
    },
    stock: 19,
    availability: "In stock",
    featured: false,
  },
  {
    id: 122,
    name: "Monochrome Printed Saree",
    category: "Women's Fashion",
    price: 1119,
    original: 1679,
    rating: 4.4,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Art silk", Fit: "Classic", Care: "Gentle wash" },
    stock: 28,
    availability: "In stock",
    featured: false,
  },
  {
    id: 123,
    name: "Midnight Long-Sleeve Top",
    category: "Women's Fashion",
    price: 1204,
    original: 1809,
    rating: 4.5,
    reviews: 183,
    image:
      "https://images.unsplash.com/photo-1628620835051-8f40f48c928d?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Cotton jersey",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 37,
    availability: "In stock",
    featured: false,
  },
  {
    id: 124,
    name: "Polka Dot Day Dress",
    category: "Women's Fashion",
    price: 1289,
    original: 1939,
    rating: 4.6,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1617297873650-aef8f4e00b9b?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Viscose", Fit: "A-line", Care: "Gentle wash" },
    stock: 46,
    availability: "In stock",
    featured: false,
  },
  {
    id: 125,
    name: "City Walk Casual Dress",
    category: "Women's Fashion",
    price: 1374,
    original: 2069,
    rating: 4.7,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1726076572100-6da5e58894f6?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Relaxed",
      Care: "Gentle wash",
    },
    stock: 55,
    availability: "In stock",
    featured: false,
  },
  {
    id: 126,
    name: "Azure Everyday Saree",
    category: "Women's Fashion",
    price: 1459,
    original: 2189,
    rating: 4.2,
    reviews: 270,
    image:
      "https://images.unsplash.com/photo-1671043463929-0f35a8d57269?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Cotton blend",
      Fit: "Classic",
      Care: "Gentle wash",
    },
    stock: 14,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 127,
    name: "Cobalt Denim Jacket",
    category: "Women's Fashion",
    price: 1544,
    original: 2319,
    rating: 4.3,
    reviews: 299,
    image:
      "https://images.unsplash.com/photo-1632848171114-af1763e5bd78?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Denim", Fit: "Regular", Care: "Gentle wash" },
    stock: 23,
    availability: "In stock",
    featured: false,
  },
  {
    id: 128,
    name: "Riverside Festive Saree",
    category: "Women's Fashion",
    price: 1629,
    original: 2449,
    rating: 4.4,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1747993114347-7a4a9d454e22?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Art silk", Fit: "Classic", Care: "Gentle wash" },
    stock: 32,
    availability: "In stock",
    featured: false,
  },
  {
    id: 129,
    name: "Ocean Blue Midi Dress",
    category: "Women's Fashion",
    price: 1714,
    original: 2579,
    rating: 4.5,
    reviews: 357,
    image:
      "https://images.unsplash.com/photo-1723640077478-fb776e39c512?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Rayon", Fit: "Midi", Care: "Gentle wash" },
    stock: 41,
    availability: "In stock",
    featured: false,
  },
  {
    id: 130,
    name: "Street Art Casual Set",
    category: "Women's Fashion",
    price: 1799,
    original: 2699,
    rating: 4.6,
    reviews: 386,
    image:
      "https://images.unsplash.com/photo-1738853941181-335fa56c8e16?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Cotton", Fit: "Relaxed", Care: "Gentle wash" },
    stock: 50,
    availability: "In stock",
    featured: false,
  },
  {
    id: 131,
    name: "Double Denim Casual Set",
    category: "Women's Fashion",
    price: 1884,
    original: 2829,
    rating: 4.7,
    reviews: 415,
    image:
      "https://images.unsplash.com/photo-1592228364660-49b1b6b15a41?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Denim cotton",
      Fit: "Regular",
      Care: "Gentle wash",
    },
    stock: 59,
    availability: "In stock",
    featured: false,
  },
  {
    id: 132,
    name: "Midnight Blue Saree",
    category: "Women's Fashion",
    price: 1969,
    original: 2959,
    rating: 4.2,
    reviews: 444,
    image:
      "https://images.unsplash.com/flagged/photo-1565293859496-47a9e90fbc78?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: {
      Fabric: "Silk blend",
      Fit: "Classic",
      Care: "Gentle wash",
    },
    stock: 18,
    availability: "In stock",
    featured: true,
  },
  {
    id: 133,
    name: "Terrace Day Kurti",
    category: "Women's Fashion",
    price: 2054,
    original: 3089,
    rating: 4.3,
    reviews: 473,
    image:
      "https://images.unsplash.com/photo-1703725388762-243b194d36f3?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Cotton", Fit: "Straight", Care: "Gentle wash" },
    stock: 27,
    availability: "In stock",
    featured: false,
  },
  {
    id: 134,
    name: "Heritage Doorway Dress",
    category: "Women's Fashion",
    price: 2139,
    original: 3209,
    rating: 4.4,
    reviews: 502,
    image:
      "https://images.unsplash.com/photo-1738854599330-a2908ff24d21?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A thoughtfully composed womenswear style for polished everyday and occasion looks.",
    specifications: { Fabric: "Viscose", Fit: "A-line", Care: "Gentle wash" },
    stock: 36,
    availability: "In stock",
    featured: false,
  },
  {
    id: 135,
    name: "Golden Keepsake Box Set",
    category: "Jewellery",
    price: 899,
    original: 1349,
    rating: 4.2,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1682823544433-aae34df4e3da?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Alloy",
      Finish: "Gold tone",
      Care: "Store separately",
    },
    stock: 10,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 136,
    name: "Celebration Gold Jewellery Tray",
    category: "Jewellery",
    price: 1019,
    original: 1529,
    rating: 4.3,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1650455221359-3aebf920bcc5?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Brass alloy",
      Finish: "Gold plated",
      Care: "Store separately",
    },
    stock: 19,
    availability: "In stock",
    featured: false,
  },
  {
    id: 137,
    name: "Stone & Ring Minimal Set",
    category: "Jewellery",
    price: 1139,
    original: 1709,
    rating: 4.4,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1673131158657-4404fd1f041a?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Mixed metal",
      Finish: "Minimal",
      Care: "Store separately",
    },
    stock: 28,
    availability: "In stock",
    featured: false,
  },
  {
    id: 138,
    name: "Dessert Rose Jewellery Set",
    category: "Jewellery",
    price: 1259,
    original: 1889,
    rating: 4.5,
    reviews: 183,
    image:
      "https://images.unsplash.com/photo-1682823545338-96b6ac5802da?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Alloy",
      Finish: "Rose gold",
      Care: "Store separately",
    },
    stock: 37,
    availability: "In stock",
    featured: false,
  },
  {
    id: 139,
    name: "Sapphire Sparkle Jewellery Set",
    category: "Jewellery",
    price: 1379,
    original: 2069,
    rating: 4.6,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1770722272510-ef28c6f57541?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Crystal alloy",
      Finish: "Blue crystal",
      Care: "Store separately",
    },
    stock: 46,
    availability: "In stock",
    featured: false,
  },
  {
    id: 140,
    name: "Fine Layered Jewellery Edit",
    category: "Jewellery",
    price: 1499,
    original: 2249,
    rating: 4.7,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1682823542622-1c6a336a6244?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Mixed alloy",
      Finish: "Gold tone",
      Care: "Store separately",
    },
    stock: 55,
    availability: "In stock",
    featured: false,
  },
  {
    id: 141,
    name: "Modern Table Jewellery Set",
    category: "Jewellery",
    price: 1619,
    original: 2429,
    rating: 4.2,
    reviews: 270,
    image:
      "https://images.unsplash.com/photo-1685489807405-fdffb06aef2c?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Mixed metal",
      Finish: "Dual tone",
      Care: "Store separately",
    },
    stock: 14,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 142,
    name: "Gallery Jewellery Collection",
    category: "Jewellery",
    price: 1739,
    original: 2609,
    rating: 4.3,
    reviews: 299,
    image:
      "https://images.unsplash.com/photo-1724986481830-4e7b781c2bd1?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Mixed alloy",
      Finish: "Festive",
      Care: "Store separately",
    },
    stock: 23,
    availability: "In stock",
    featured: false,
  },
  {
    id: 143,
    name: "Blush Gemstone Ring",
    category: "Jewellery",
    price: 1859,
    original: 2789,
    rating: 4.4,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1621334119889-bcc0b9e97bc1?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Silver alloy",
      Finish: "Pink stone",
      Care: "Store separately",
    },
    stock: 32,
    availability: "In stock",
    featured: false,
  },
  {
    id: 144,
    name: "Emerald Textile Bracelet",
    category: "Jewellery",
    price: 1979,
    original: 2969,
    rating: 4.5,
    reviews: 357,
    image:
      "https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A refined jewellery piece designed to bring considered detail to festive and everyday outfits.",
    specifications: {
      Material: "Alloy",
      Finish: "Green stone",
      Care: "Store separately",
    },
    stock: 41,
    availability: "In stock",
    featured: false,
  },
  {
    id: 145,
    name: "Botanical Page Journal",
    category: "Books & Stationery",
    price: 249,
    original: 379,
    rating: 4.2,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1605007623898-004a09c1142a?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A5",
      Details: "160 pages",
      Use: "Study and creative work",
    },
    stock: 10,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 146,
    name: "Open Desk Notebook Set",
    category: "Books & Stationery",
    price: 289,
    original: 439,
    rating: 4.3,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1722929309984-c6b3e55dd6e5?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A4",
      Details: "200 pages",
      Use: "Study and creative work",
    },
    stock: 19,
    availability: "In stock",
    featured: false,
  },
  {
    id: 147,
    name: "Illustration Art Supply Kit",
    category: "Books & Stationery",
    price: 329,
    original: 499,
    rating: 4.4,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1763041316817-36ffaa4d2c15?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "Mixed media",
      Details: "18 pieces",
      Use: "Study and creative work",
    },
    stock: 28,
    availability: "In stock",
    featured: false,
  },
  {
    id: 148,
    name: "Colour Pencil Writing Set",
    category: "Books & Stationery",
    price: 369,
    original: 559,
    rating: 4.5,
    reviews: 183,
    image:
      "https://images.unsplash.com/photo-1744188789096-ea2f19c92ef5?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A5",
      Details: "12 pencils",
      Use: "Study and creative work",
    },
    stock: 37,
    availability: "In stock",
    featured: false,
  },
  {
    id: 149,
    name: "Study Desk Book Bundle",
    category: "Books & Stationery",
    price: 409,
    original: 619,
    rating: 4.6,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1632774080959-420ce62b177d?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "Paperback",
      Details: "4 books",
      Use: "Study and creative work",
    },
    stock: 46,
    availability: "In stock",
    featured: false,
  },
  {
    id: 150,
    name: "Interior Design Sketchbook",
    category: "Books & Stationery",
    price: 449,
    original: 679,
    rating: 4.7,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1742130847739-f7728ae50176?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A4",
      Details: "120 pages",
      Use: "Study and creative work",
    },
    stock: 55,
    availability: "In stock",
    featured: false,
  },
  {
    id: 151,
    name: "Floral Pencil Pouch",
    category: "Books & Stationery",
    price: 489,
    original: 739,
    rating: 4.2,
    reviews: 270,
    image:
      "https://images.unsplash.com/photo-1587039148791-29fa9fb8037e?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "Fabric",
      Details: "Zip closure",
      Use: "Study and creative work",
    },
    stock: 14,
    availability: "Low stock",
    featured: true,
  },
  {
    id: 152,
    name: "Kraft Spiral Notebook",
    category: "Books & Stationery",
    price: 529,
    original: 799,
    rating: 4.3,
    reviews: 299,
    image:
      "https://images.unsplash.com/photo-1623697899817-2e067e4a4036?auto=format&fit=crop&w=900&q=85",
    badge: "Fresh pick",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A5",
      Details: "160 pages",
      Use: "Study and creative work",
    },
    stock: 23,
    availability: "In stock",
    featured: false,
  },
  {
    id: 153,
    name: "Monochrome Drawing Pad",
    category: "Books & Stationery",
    price: 569,
    original: 859,
    rating: 4.4,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1607354602380-bd12bd37bb57?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "A4",
      Details: "80 sheets",
      Use: "Study and creative work",
    },
    stock: 32,
    availability: "In stock",
    featured: false,
  },
  {
    id: 154,
    name: "Assorted Colour Pen Set",
    category: "Books & Stationery",
    price: 609,
    original: 919,
    rating: 4.5,
    reviews: 357,
    image:
      "https://images.unsplash.com/photo-1574621658342-39529891e552?auto=format&fit=crop&w=900&q=85",
    badge: "Curated",
    description:
      "A useful stationery essential designed for organised study, planning and creative work.",
    specifications: {
      Format: "Fine tip",
      Details: "12 colours",
      Use: "Study and creative work",
    },
    stock: 41,
    availability: "In stock",
    featured: false,
  },
]

const products: Product[] = [
  ...baseProducts,
  ...electronicsExpansion,
  ...categoryExpansion,
  ...categoryExpansionTwo,
]

const categories = [
  ["Electronics", "⌁"],
  ["Women’s Fashion", "✦"],
  ["Footwear", "↗"],
  ["Accessories", "◇"],
  ["Beauty", "✧"],
  ["Home & Living", "⌂"],
]

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`

function Icon({
  name,
}: {
  name: "search" | "heart" | "bag" | "user" | "menu" | "arrow" | "star" | "close"
}) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    bag: (
      <>
        <path d="M6 8h12l1 13H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    star: (
      <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 9l7-.9L12 2Z" />
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function ProductCard({
  product,
  wishlisted,
  onWish,
  onCart,
  onView,
}: {
  product: Product
  wishlisted: boolean
  onWish: () => void
  onCart: () => void
  onView: () => void
}) {
  const discount = Math.round((1 - product.price / product.original) * 100)
  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={onView}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="badge">{product.badge}</span>
        <button
          className={`wish ${wishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            onWish()
          }}
          aria-label="Toggle wishlist"
        >
          <Icon name="heart" />
        </button>
      </div>
      <div className="product-content">
        <p className="eyebrow">{product.category}</p>
        <h3 onClick={onView}>{product.name}</h3>
        <div className="rating">
          <Icon name="star" /> <strong>{product.rating}</strong>
          <span>({product.reviews})</span>
        </div>
        <p className="price">
          <strong>{money(product.price)}</strong>
          <s>{money(product.original)}</s>
          <span>{discount}% off</span>
        </p>
        <button className="add-button" onClick={onCart}>
          Add to bag <Icon name="bag" />
        </button>
      </div>
    </article>
  )
}

export default function App() {
  const [page, setPage] = useState("home")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [wishlist, setWishlist] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("cc-wishlist") || "[]"),
  )
  const [cart, setCart] = useState<Record<number, number>>(() =>
    JSON.parse(localStorage.getItem("cc-cart") || "{}"),
  )
  const [selected, setSelected] = useState<Product | null>(null)
  const [toast, setToast] = useState("")
  const [users, setUsers] = useState(2400)
  const [arch, setArch] = useState("Cloud Backend")
  const [menu, setMenu] = useState(false)
  const [orders, setOrders] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("cc-orders") || "[]"),
  )
  const [maxPrice, setMaxPrice] = useState(50000)
  const [sort, setSort] = useState("popular")
  const [visibleProducts, setVisibleProducts] = useState(24)

  useEffect(
    () => localStorage.setItem("cc-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  )
  useEffect(() => localStorage.setItem("cc-cart", JSON.stringify(cart)), [cart])
  useEffect(
    () => localStorage.setItem("cc-orders", JSON.stringify(orders)),
    [orders],
  )
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2200)
      return () => clearTimeout(t)
    }
  }, [toast])
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = Object.entries(cart).reduce(
    (sum, [id, qty]) =>
      sum + (products.find((p) => p.id === +id)?.price || 0) * qty,
    0,
  )
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All" ||
              p.category.includes(category.replace("’s Fashion", ""))) &&
            (p.name + p.category).toLowerCase().includes(query.toLowerCase()) &&
            p.price <= maxPrice,
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : sort === "rating"
                ? b.rating - a.rating
                : sort === "discount"
                  ? b.original - b.price - (a.original - a.price)
                  : b.reviews - a.reviews,
        ),
    [query, category, maxPrice, sort],
  )

  const navigate = (to: string) => {
    setPage(to)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const toggleWish = (id: number) => {
    const exists = wishlist.includes(id)
    setWishlist((w) => (exists ? w.filter((x) => x !== id) : [...w, id]))
    setToast(exists ? "Removed from wishlist" : "Saved to your wishlist")
  }
  const addCart = (id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
    setToast("Added to your shopping bag")
  }

  return (
    <div className="app">
      <div className="offer-bar">
        Complimentary delivery on orders above ₹999{" "}
        <span>Discover the season’s freshest finds</span>
      </div>
      <header>
        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
        <button className="logo" onClick={() => navigate("home")}>
          <span>Cloud</span>Cart<i>.</i>
        </button>
        <nav className={menu ? "open" : ""}>
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("shop")}>Shop</button>
          <button
            onClick={() => {
              setCategory("All")
              navigate("shop")
            }}
          >
            Categories
          </button>
          <button onClick={() => navigate("orders")}>My Orders</button>
        </nav>
        <div className="search">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value) setPage("shop")
            }}
            placeholder="Search beautiful finds"
            aria-label="Search products"
          />
        </div>
        <div className="actions">
          <button onClick={() => navigate("account")} aria-label="Account">
            <Icon name="user" />
          </button>
          <button onClick={() => navigate("wishlist")} aria-label="Wishlist">
            <Icon name="heart" />
            {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </button>
          <button onClick={() => navigate("cart")} aria-label="Shopping bag">
            <Icon name="bag" />
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <p className="kicker">New Season. New Favorites.</p>
              <h1>
                Find your favorites. <em>Love every little detail.</em>
              </h1>
              <p className="hero-sub">
                Discover fashion, technology, beauty, and everyday essentials —
                thoughtfully selected for you.
              </p>
              <div className="hero-buttons">
                <button className="primary" onClick={() => navigate("shop")}>
                  Shop now <Icon name="arrow" />
                </button>
                <button
                  className="text-button"
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore categories
                </button>
              </div>
              <div className="trust-row">
                <span>
                  <strong>Curated</strong> useful finds
                </span>
                <span>
                  <strong>Simple</strong> demo checkout
                </span>
                <span>
                  <strong>Easy</strong> navigation
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src={images.lifestyle}
                alt="Woman enjoying a day of shopping"
              />
              <div className="floating-card">
                <small>Today’s little luxury</small>
                <strong>Curated just for you</strong>
                <button onClick={() => navigate("shop")}>
                  Explore the edit <Icon name="arrow" />
                </button>
              </div>
              <span className="hero-note">
                Beautiful finds.
                <br />
                Thoughtfully chosen.
              </span>
            </div>
          </section>

          <section className="categories section" id="categories">
            <div className="section-head">
              <div>
                <p className="kicker">Browse your way</p>
                <h2>Shop by category</h2>
              </div>
              <button onClick={() => navigate("shop")}>
                View all <Icon name="arrow" />
              </button>
            </div>
            <div className="category-grid">
              {categories.map(([name, icon]) => (
                <button
                  key={name}
                  onClick={() => {
                    setCategory(name)
                    navigate("shop")
                  }}
                >
                  <span>{icon}</span>
                  <strong>{name}</strong>
                  <small>Explore collection</small>
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <div>
                <p className="kicker">Loved right now</p>
                <h2>Trending, for good reason</h2>
              </div>
              <button onClick={() => navigate("shop")}>
                Shop all <Icon name="arrow" />
              </button>
            </div>
            <div className="product-grid">
              {products.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wishlisted={wishlist.includes(p.id)}
                  onWish={() => toggleWish(p.id)}
                  onCart={() => addCart(p.id)}
                  onView={() => setSelected(p)}
                />
              ))}
            </div>
          </section>

          <section className="editorial section">
            <div>
              <p className="kicker">A smarter way to shop</p>
              <h2>
                Thoughtful picks.
                <br />
                <em>Joyful prices.</em>
              </h2>
              <p>
                From the things you need to the pieces you’ll treasure,
                CloudCart brings quality, value, and inspiration together.
              </p>
              <button className="primary" onClick={() => navigate("shop")}>
                Find your favourites <Icon name="arrow" />
              </button>
            </div>
            <div className="editorial-image">
              <img src={images.fashion} alt="Woman in elegant red clothing" />
              <span>
                Up to 50% off
                <br />
                <strong>the style edit</strong>
              </span>
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <div>
                <p className="kicker">Freshly added</p>
                <h2>New arrivals</h2>
              </div>
              <button onClick={() => navigate("shop")}>
                View all <Icon name="arrow" />
              </button>
            </div>
            <div className="product-grid">
              {products.slice(4, 8).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wishlisted={wishlist.includes(p.id)}
                  onWish={() => toggleWish(p.id)}
                  onCart={() => addCart(p.id)}
                  onView={() => setSelected(p)}
                />
              ))}
            </div>
          </section>

          <section className="promo-strip">
            <div>
              <p className="kicker">Everyday beauty</p>
              <h2>Small rituals, lovely results.</h2>
              <button
                onClick={() => {
                  setCategory("Beauty & Personal Care")
                  navigate("shop")
                }}
              >
                Shop beauty <Icon name="arrow" />
              </button>
            </div>
            <div>
              <p className="kicker">Warm spaces</p>
              <h2>Make home feel more like you.</h2>
              <button
                onClick={() => {
                  setCategory("Home & Living")
                  navigate("shop")
                }}
              >
                Shop home <Icon name="arrow" />
              </button>
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <div>
                <p className="kicker">Handpicked for you</p>
                <h2>Beauty, home & little joys</h2>
              </div>
              <button onClick={() => navigate("shop")}>
                Discover more <Icon name="arrow" />
              </button>
            </div>
            <div className="product-grid">
              {products.slice(8, 12).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wishlisted={wishlist.includes(p.id)}
                  onWish={() => toggleWish(p.id)}
                  onCart={() => addCart(p.id)}
                  onView={() => setSelected(p)}
                />
              ))}
            </div>
          </section>

          <section className="benefits">
            <div>
              <span>01</span>
              <h3>Curated quality</h3>
              <p>Products selected for value, usefulness, and delight.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Easy shopping</h3>
              <p>Clear choices, secure demo checkout, no clutter.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Cloud-ready vision</h3>
              <p>A transparent prototype designed to scale later.</p>
            </div>
          </section>
        </main>
      )}

      {(page === "shop" || page === "wishlist") && (
        <main className="listing section">
          <div className="listing-title">
            <p className="kicker">
              {page === "wishlist" ? "Saved with love" : "The complete edit"}
            </p>
            <h1>
              {page === "wishlist" ? "My wishlist" : "Find your next favourite"}
            </h1>
            <p>
              {page === "wishlist"
                ? "A little corner for everything that caught your eye."
                : `${filtered.length} thoughtfully selected products`}
            </p>
          </div>
          {page === "shop" && (
            <div className="filters">
              {[
                "All",
                "Electronics",
                "Men's Fashion",
                "Women's Fashion",
                "Footwear",
                "Beauty & Personal Care",
                "Home & Living",
                "Accessories",
                "Jewellery",
                "Kids & Baby",
                "Books & Stationery",
                "Sports & Fitness",
                "Kitchen & Dining",
              ].map((c) => (
                <button
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                  key={c}
                >
                  {c}
                </button>
              ))}
              <label className="price-filter">
                Up to {money(maxPrice)}
                <input
                  type="range"
                  min="499"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                />
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="popular">Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          )}
          <div className="product-grid">
            {(page === "wishlist"
              ? products.filter((p) => wishlist.includes(p.id))
              : filtered.slice(0, visibleProducts)
            ).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wishlisted={wishlist.includes(p.id)}
                onWish={() => toggleWish(p.id)}
                onCart={() => addCart(p.id)}
                onView={() => setSelected(p)}
              />
            ))}
          </div>
          {page === "shop" && visibleProducts < filtered.length && (
            <button
              className="primary load-more"
              onClick={() => setVisibleProducts((v) => v + 24)}
            >
              Load more products <Icon name="arrow" />
            </button>
          )}
          {page === "wishlist" && wishlist.length === 0 && (
            <div className="empty">
              <Icon name="heart" />
              <h2>Your wishlist is waiting for something lovely.</h2>
              <button className="primary" onClick={() => navigate("shop")}>
                Explore products
              </button>
            </div>
          )}
          {page === "shop" && filtered.length === 0 && (
            <div className="empty">
              <Icon name="search" />
              <h2>No lovely finds match that search.</h2>
              <button
                className="primary"
                onClick={() => {
                  setQuery("")
                  setCategory("All")
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </main>
      )}

      {page === "cart" && (
        <main className="cart-page section">
          <div className="listing-title">
            <p className="kicker">Almost yours</p>
            <h1>Your shopping bag</h1>
          </div>
          {cartCount === 0 ? (
            <div className="empty">
              <Icon name="bag" />
              <h2>Your shopping bag is empty.</h2>
              <button className="primary" onClick={() => navigate("shop")}>
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === +id)!
                  return (
                    <article className="cart-item" key={id}>
                      <img src={p.image} alt={p.name} />
                      <div>
                        <p className="eyebrow">{p.category}</p>
                        <h3>{p.name}</h3>
                        <strong>{money(p.price)}</strong>
                        <div className="qty">
                          <button
                            onClick={() =>
                              setCart((c) => ({
                                ...c,
                                [+id]: Math.max(1, qty - 1),
                              }))
                            }
                          >
                            −
                          </button>
                          <span>{qty}</span>
                          <button
                            onClick={() =>
                              setCart((c) => ({ ...c, [+id]: qty + 1 }))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove"
                        onClick={() =>
                          setCart((c) => {
                            const n = { ...c }
                            delete n[+id]
                            return n
                          })
                        }
                      >
                        <Icon name="close" />
                      </button>
                    </article>
                  )
                })}
              </div>
              <aside className="summary">
                <p className="kicker">Order summary</p>
                <h2>{money(cartTotal)}</h2>
                <div>
                  <span>Subtotal</span>
                  <strong>{money(cartTotal)}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>{cartTotal > 999 ? "Complimentary" : "₹79"}</strong>
                </div>
                <div className="total">
                  <span>Total</span>
                  <strong>
                    {money(cartTotal + (cartTotal > 999 ? 0 : 79))}
                  </strong>
                </div>
                <button
                  className="primary"
                  onClick={() => navigate("checkout")}
                >
                  Proceed to checkout <Icon name="arrow" />
                </button>
                <small>
                  Tax-inclusive demo pricing. No real payment will be collected.
                </small>
              </aside>
            </div>
          )}
        </main>
      )}

      {page === "checkout" && (
        <main className="checkout section">
          <div className="checkout-form">
            <p className="kicker">Secure demo checkout</p>
            <h1>Where should we send it?</h1>
            <div className="form-grid">
              <label>
                Full name
                <input placeholder="Your full name" required />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Mobile number
                <input placeholder="+91 98765 43210" required />
              </label>
              <label>
                State
                <input placeholder="Karnataka" required />
              </label>
              <label className="wide">
                House number and street
                <input placeholder="Flat, building, street" required />
              </label>
              <label>
                City
                <input placeholder="Bengaluru" required />
              </label>
              <label>
                PIN code
                <input placeholder="560001" required />
              </label>
            </div>
            <h3>Payment method</h3>
            <label className="payment">
              <input type="radio" defaultChecked name="pay" /> Cash on Delivery{" "}
              <span>Demo</span>
            </label>
            <label className="payment">
              <input type="radio" name="pay" /> UPI <span>Simulation only</span>
            </label>
            <label className="payment">
              <input type="radio" name="pay" /> Debit / Credit Card{" "}
              <span>No credentials collected</span>
            </label>
          </div>
          <aside className="summary">
            <p className="kicker">Your order</p>
            <h2>{money(cartTotal)}</h2>
            <p>
              {cartCount} item{cartCount !== 1 ? "s" : ""} in your bag
            </p>
            <button
              className="primary"
              onClick={() => {
                const order = {
                  id: `CC${Date.now().toString().slice(-8)}`,
                  date: new Date().toLocaleDateString("en-IN"),
                  items: Object.entries(cart),
                  total: cartTotal + (cartTotal > 999 ? 0 : 79),
                  status: "Order Placed",
                }
                setOrders((o) => [order, ...o])
                setCart({})
                setToast("Your order has been placed successfully!")
                navigate("orders")
              }}
            >
              Place demo order <Icon name="arrow" />
            </button>
            <small>
              This prototype does not request, process, or store payment
              credentials.
            </small>
          </aside>
        </main>
      )}

      {page === "orders" && (
        <main className="orders section">
          <div className="listing-title">
            <p className="kicker">From bag to doorstep</p>
            <h1>My orders</h1>
            <p>Track your demonstration orders in one place.</p>
          </div>
          {orders.length === 0 ? (
            <div className="empty">
              <Icon name="bag" />
              <h2>No orders yet.</h2>
              <button className="primary" onClick={() => navigate("shop")}>
                Start shopping
              </button>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div className="order-head">
                    <div>
                      <p className="eyebrow">Demo order</p>
                      <h2>{order.id}</h2>
                    </div>
                    <div>
                      <span>{order.date}</span>
                      <strong>{money(order.total)}</strong>
                    </div>
                  </div>
                  <div className="order-products">
                    {order.items.map(([id, qty]: [string, number]) => {
                      const p = products.find((x) => x.id === +id)
                      return p ? (
                        <div key={id}>
                          <img src={p.image} alt={p.name} />
                          <span>
                            {p.name}
                            <small>Quantity {qty}</small>
                          </span>
                        </div>
                      ) : null
                    })}
                  </div>
                  <div className="tracking">
                    {[
                      "Order Placed",
                      "Confirmed",
                      "Packed",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                    ].map((step, i) => (
                      <span className={i === 0 ? "active" : ""} key={step}>
                        <i>{i + 1}</i>
                        {step}
                      </span>
                    ))}
                  </div>
                  <small>
                    Conceptual demo tracking — no physical shipment is created.
                  </small>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {page === "account" && (
        <main className="account section">
          <div className="account-card">
            <p className="kicker">Demo account</p>
            <h1>Welcome to CloudCart</h1>
            <p>
              Sign in to explore the account experience. No production
              authentication service is connected.
            </p>
            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Demo only" />
            </label>
            <button
              className="primary"
              onClick={() => setToast("Demo sign-in successful")}
            >
              Continue with demo account <Icon name="arrow" />
            </button>
            <button
              className="guest"
              onClick={() => {
                setToast("Browsing as guest")
                navigate("home")
              }}
            >
              Continue as guest
            </button>
            <small>
              Passwords are not saved or transmitted by this prototype.
            </small>
          </div>
        </main>
      )}

      {page === "cloud" && (
        <main className="cloud section">
          <div className="listing-title">
            <p className="kicker">Cloud Operations Lab</p>
            <h1>See how modern commerce could scale.</h1>
            <p>
              An educational simulation — not live infrastructure monitoring.
            </p>
          </div>
          <section className="architecture">
            <div className="arch-flow">
              {[
                "Customer",
                "Frontend",
                "Cloud Backend",
                "Order Service",
                "Cloud Database",
              ].map((x, i) => (
                <div key={x}>
                  <button
                    className={arch === x ? "active" : ""}
                    onClick={() => setArch(x)}
                  >
                    <span>0{i + 1}</span>
                    {x}
                  </button>
                  {i < 4 && <b>→</b>}
                </div>
              ))}
            </div>
            <div className="arch-detail">
              <p className="kicker">Selected component</p>
              <h2>{arch}</h2>
              <p>
                {arch === "Cloud Backend"
                  ? "A proposed secure application layer that would coordinate catalogue, order, inventory, and authentication services."
                  : `The ${arch.toLowerCase()} is one stage in the proposed request path. Click another component to explore the system.`}
              </p>
            </div>
          </section>
          <section className="scaler">
            <div>
              <p className="kicker">Scalability simulator</p>
              <h2>{users.toLocaleString("en-IN")} active users</h2>
              <p>
                Move the slider to see how horizontal scaling adds application
                instances behind a load balancer.
              </p>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={users}
                onChange={(e) => setUsers(+e.target.value)}
              />
              <div className="scale-labels">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>
            <div className="instances">
              <span>Load balancer</span>
              <div>
                {Array.from({
                  length: Math.max(1, Math.ceil(users / 2500)),
                }).map((_, i) => (
                  <i key={i}>APP {i + 1}</i>
                ))}
              </div>
              <small>Illustrative capacity only</small>
            </div>
          </section>
          <section className="cloud-note">
            <div>
              <h3>Prototype today</h3>
              <p>
                Cart and wishlist data persist in your browser using
                localStorage. This is not a cloud database.
              </p>
            </div>
            <div>
              <h3>Production proposal</h3>
              <p>
                Managed database, object storage, authentication, encryption,
                monitoring, and autoscaling.
              </p>
            </div>
          </section>
        </main>
      )}

      {page === "overview" && (
        <main className="overview section">
          <p className="kicker">B.E. Cloud Computing Mini-Project</p>
          <h1>Commerce with a clearer cloud story.</h1>
          <p className="lead">
            CloudCart demonstrates an interactive e-commerce experience and
            explains how cloud infrastructure can support reliable online
            shopping operations.
          </p>
          <div className="overview-grid">
            {[
              [
                "Objective",
                "Create a polished shopping prototype while making cloud concepts tangible and presentation-ready.",
              ],
              [
                "Actual technology",
                "React, TypeScript, Vite, browser localStorage, and curated Unsplash photography.",
              ],
              [
                "Proposed solution",
                "A scalable frontend connected later to secure backend services, managed data, object storage, and monitoring.",
              ],
              [
                "Current limitation",
                "Authentication, payments, analytics, and infrastructure are educational simulations, not production integrations.",
              ],
              [
                "Future enhancements",
                "Cloud database, secure identity, media storage, order APIs, observability, and deployment automation.",
              ],
              [
                "Conclusion",
                "A transparent foundation that balances useful commerce interactions with accurate cloud education.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <span>CloudCart</span>
                <h2>{h}</h2>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </main>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="quick-view" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <Icon name="close" />
            </button>
            <img src={selected.image} alt={selected.name} />
            <div>
              <p className="eyebrow">{selected.category}</p>
              <h2>{selected.name}</h2>
              <div className="rating">
                <Icon name="star" />
                <strong>{selected.rating}</strong>
                <span>{selected.reviews} reviews</span>
              </div>
              <p className="modal-price">
                {money(selected.price)} <s>{money(selected.original)}</s>
              </p>
              <p>{selected.description}</p>
              <ul>
                <li>Carefully selected quality</li>
                <li>7-day easy returns</li>
                <li>Tax-inclusive sample price</li>
              </ul>
              <button
                className="primary"
                onClick={() => {
                  addCart(selected.id)
                  setSelected(null)
                }}
              >
                Add to bag <Icon name="bag" />
              </button>
            </div>
          </article>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}

      <footer>
        <div>
          <button className="logo" onClick={() => navigate("home")}>
            <span>Cloud</span>Cart<i>.</i>
          </button>
          <p>Discover more. Shop smarter.</p>
        </div>
        <div>
          <strong>Shop</strong>
          <button onClick={() => navigate("shop")}>All products</button>
          <button onClick={() => navigate("wishlist")}>Wishlist</button>
          <button onClick={() => navigate("orders")}>My orders</button>
          <button onClick={() => navigate("cart")}>Shopping bag</button>
        </div>
        <div>
          <strong>Project Information</strong>
          <button onClick={() => navigate("cloud")}>
            CloudCart — Cloud Architecture
          </button>
          <button onClick={() => navigate("overview")}>Project overview</button>
        </div>
        <div>
          <strong>Built transparently</strong>
          <p>
            This educational prototype uses localStorage. No real cloud or
            payment service is connected.
          </p>
        </div>
      </footer>
    </div>
  )
}
