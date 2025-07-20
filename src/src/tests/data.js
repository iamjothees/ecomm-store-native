import mediaType from "@/constants/enums/mediaType";

const categories = [
  {
    id: 1,
    name: "Category 1",
    slug: "category-1",
    imageSrc: "https://picsum.photos/200/300?random=1",
    subCategories: [
      { id: 101, name: "SubCategory 1-1", slug: "subcategory-1-1", imageSrc: "https://picsum.photos/100/200?random=101" },
      { id: 102, name: "SubCategory 1-2", slug: "subcategory-1-2", imageSrc: "https://picsum.photos/100/200?random=102" },
    ],
    contents: [
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=101", },
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=102", },
    ],
  },
  {
    id: 2,
    name: "Category 2 with long name",
    slug: "category-2-with-long-name",
    imageSrc: "https://picsum.photos/200/300?random=2",
    subCategories: [
      { id: 201, name: "SubCategory 2-1", slug: "subcategory-2-1", imageSrc: "https://picsum.photos/100/200?random=201" },
      { id: 202, name: "SubCategory 2-2", slug: "subcategory-2-2", imageSrc: "https://picsum.photos/100/200?random=202" },
    ],
    contents: [
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=201", },
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=202", },
    ],
  },
  {
    id: 3,
    name: "Category 3",
    slug: "category-3",
    imageSrc: "https://picsum.photos/200/300?random=3",
    subCategories: [
      { id: 301, name: "SubCategory 3-1", slug: "subcategory-3-1", imageSrc: "https://picsum.photos/100/200?random=301" },
    ],
    contents: [
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=301", },
    ],
  },
  {
    id: 4,
    name: "Category 4",
    slug: "category-4",
    imageSrc: "https://picsum.photos/200/300?random=4",
    subCategories: [],
    contents: [
      { type: mediaType.IMAGE, src: "https://picsum.photos/500/200?random=401", },
    ],
  },
  {
    id: 5,
    name: "Category 5",
    slug: "category-5",
    imageSrc: "https://picsum.photos/200/300?random=5",
    subCategories: [
      { id: 501, name: "SubCategory 5-1", slug: "subcategory-5-1", imageSrc: "https://picsum.photos/100/200?random=501" },
      { id: 502, name: "SubCategory 5-2", slug: "subcategory-5-2", imageSrc: "https://picsum.photos/100/200?random=502" },
      { id: 503, name: "SubCategory 5-3", slug: "subcategory-5-3", imageSrc: "https://picsum.photos/100/200?random=503" },
    ],
  },
  {
    id: 6,
    name: "Category 6",
    slug: "category-6",
    imageSrc: "https://picsum.photos/200/300?random=6",
    subCategories: [],
  },
  {
    id: 7,
    name: "Category 7",
    slug: "category-7",
    imageSrc: "https://picsum.photos/200/300?random=7",
    subCategories: [
      { id: 701, name: "SubCategory 7-1", slug: "subcategory-7-1", imageSrc: "https://picsum.photos/100/200?random=701" },
    ],
  },
  {
    id: 8,
    name: "Category 8",
    slug: "category-8",
    imageSrc: "https://picsum.photos/200/300?random=8",
    subCategories: [],
  },
  {
    id: 9,
    name: "Category 9",
    slug: "category-9",
    imageSrc: "https://picsum.photos/200/300?random=9",
    subCategories: [
      { id: 901, name: "SubCategory 9-1", slug: "subcategory-9-1", imageSrc: "https://picsum.photos/100/200?random=901" },
      { id: 902, name: "SubCategory 9-2", slug: "subcategory-9-2", imageSrc: "https://picsum.photos/100/200?random=902" },
    ],
  },
  {
    id: 10,
    name: "Category 10",
    slug: "category-10",
    imageSrc: "https://picsum.photos/200/300?random=10",
    subCategories: [],
  },
  {
    id: 11,
    name: "Category 11",
    slug: "category-11",
    imageSrc: "https://picsum.photos/200/300?random=11",
    subCategories: [],
  },
  {
    id: 12,
    name: "Category 12",
    slug: "category-12",
    imageSrc: "https://picsum.photos/200/300?random=12",
    subCategories: [],
  },
  {
    id: 13,
    name: "Category 13",
    slug: "category-13",
    imageSrc: "https://picsum.photos/200/300?random=13",
    subCategories: [],
  },
  {
    id: 14,
    name: "Category 14",
    slug: "category-14",
    imageSrc: "https://picsum.photos/200/300?random=14",
    subCategories: [],
  },
  {
    id: 15,
    name: "Category 15",
    slug: "category-15",
    imageSrc: "https://picsum.photos/200/300?random=15",
    subCategories: [],
  },
  {
    id: 16,
    name: "Category 16",
    slug: "category-16",
    imageSrc: "https://picsum.photos/200/300?random=16",
    subCategories: [],
  },
];

const products = [
  {
    "id": "apsara-pencils",
    "slug": "apsara-pencils",
    "name": "Apsara Absolute Extra Dark Pencils",
    "description": "High-quality pencils for smooth and dark writing.",
    "price": 35,
    "mrp": 50,
    "imageUrl": "https://picsum.photos/200/300?random=1",
    "media": [
      {
        "type": "image",
        "url": "https://picsum.photos/200/200?random=media1"
      },
      {
        "type": "image",
        "url": "https://picsum.photos/400/300?random=media2"
      },
      {
        "type": "image",
        "url": "https://picsum.photos/300/300?random=media3"
      },
      {
        "type": "video",
        "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }
    ],
    "variants": [
      {
        "name": "Color",
        "values": ["Black", "Blue"]
      },
      {
        "name": "Size",
        "values": ["10 pcs", "20 pcs"]
      }
    ],
    "info_tags": [
      {
        "icon": "truck",
        "label": "Free Shipping",
      },
      {
        "icon": "clock",
        "label": "30 days return",
      },
      {
        "icon": "heart",
        "label": "100% satisfaction",
      },
      {
        "icon": "tag",
        "label": "New Arrivals",
      },
    ],
    "specs": [
      {"label": "Material", "value": "Wood"},
      {"label": "Lead Type", "value": "Extra Dark"},
      {"label": "Eraser Tip", "value": "Yes"},
      {"label": "Length", "value": "10 cm"},
      {"label": "Thickness", "value": "0.5 mm"},
      {"label": "Weight", "value": "10 g"},
    ],
    "faqs": [
      {"q": "Are these pencils suitable for exams?", "a": "Yes, they meet standard exam writing quality."},
      {"q": "Do they come pre-sharpened?", "a": "Yes, all pencils are pre-sharpened."},
      {"q": "How long are the pencils?", "a": "Each pencil is 10 cm long."},
      {"q": "How thick are the pencils?", "a": "Each pencil is 0.5 mm thick."},
      {"q": "How much weight do the pencils have?", "a": "Each pencil weighs 10 g."},
    ],
    "relatedProducts": [
      {
        "name": "Nataraj Pencils",
        "price": 30,
        "imageUrl": "https://picsum.photos/200/300?random=related1"
      },
      {
        "name": "Camlin Geometry Box",
        "price": 120,
        "imageUrl": "https://picsum.photos/200/300?random=related2"
      }
    ]
  },
  {id: 1, name: "Product 1", price: "₹100", featured_image: { uri: "https://picsum.photos/200/300?random=1" }},
  {id: 2, name: "Product 2", price: "₹200", featured_image: { uri: "https://picsum.photos/200/300?random=2" }},
  {id: 3, name: "Product 3", price: "₹300", featured_image: { uri: "https://picsum.photos/200/300?random=3" }},
  {id: 4, name: "Product 4", price: "₹400", featured_image: { uri: "https://picsum.photos/200/300?random=4" }},
  {id: 5, name: "Product 5", price: "₹500", featured_image: { uri: "https://picsum.photos/200/300?random=5" }},
  {id: 6, name: "Product 6", price: "₹600", featured_image: { uri: "https://picsum.photos/200/300?random=6" }},
  {id: 7, name: "Product 7", price: "₹700", featured_image: { uri: "https://picsum.photos/200/300?random=7" }},
  {id: 8, name: "Product 8", price: "₹800", featured_image: { uri: "https://picsum.photos/200/300?random=8" }},
  {id: 9, name: "Product 9", price: "₹800", featured_image: { uri: "https://picsum.photos/200/300?random=9" }},
  {id: 10, name: "Product 10", price: "₹800", featured_image: { uri: "https://picsum.photos/200/300?random=10" }},
]

export { categories as testCategories };
export { products as testProducts };