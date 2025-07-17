const categories = [
  {
    id: 1,
    name: "Category 1",
    imageSrc: "https://picsum.photos/200/300?random=1",
    subCategories: [
      { id: 101, name: "SubCategory 1-1", imageSrc: "https://picsum.photos/100/100?random=101" },
      { id: 102, name: "SubCategory 1-2", imageSrc: "https://picsum.photos/100/100?random=102" },
    ],
  },
  {
    id: 2,
    name: "Category 2 with long name",
    imageSrc: "https://picsum.photos/200/300?random=2",
    subCategories: [
      { id: 201, name: "SubCategory 2-1", imageSrc: "https://picsum.photos/100/100?random=201" },
      { id: 202, name: "SubCategory 2-2", imageSrc: "https://picsum.photos/100/100?random=202" },
    ],
  },
  {
    id: 3,
    name: "Category 3",
    imageSrc: "https://picsum.photos/200/300?random=3",
    subCategories: [
      { id: 301, name: "SubCategory 3-1", imageSrc: "https://picsum.photos/100/100?random=301" },
    ],
  },
  {
    id: 4,
    name: "Category 4",
    imageSrc: "https://picsum.photos/200/300?random=4",
    subCategories: [],
  },
  {
    id: 5,
    name: "Category 5",
    imageSrc: "https://picsum.photos/200/300?random=5",
    subCategories: [
      { id: 501, name: "SubCategory 5-1", imageSrc: "https://picsum.photos/100/100?random=501" },
      { id: 502, name: "SubCategory 5-2", imageSrc: "https://picsum.photos/100/100?random=502" },
      { id: 503, name: "SubCategory 5-3", imageSrc: "https://picsum.photos/100/100?random=503" },
    ],
  },
  {
    id: 6,
    name: "Category 6",
    imageSrc: "https://picsum.photos/200/300?random=6",
    subCategories: [],
  },
  {
    id: 7,
    name: "Category 7",
    imageSrc: "https://picsum.photos/200/300?random=7",
    subCategories: [
      { id: 701, name: "SubCategory 7-1", imageSrc: "https://picsum.photos/100/100?random=701" },
    ],
  },
  {
    id: 8,
    name: "Category 8",
    imageSrc: "https://picsum.photos/200/300?random=8",
    subCategories: [],
  },
  {
    id: 9,
    name: "Category 9",
    imageSrc: "https://picsum.photos/200/300?random=9",
    subCategories: [
      { id: 901, name: "SubCategory 9-1", imageSrc: "https://picsum.photos/100/100?random=901" },
      { id: 902, name: "SubCategory 9-2", imageSrc: "https://picsum.photos/100/100?random=902" },
    ],
  },
  {
    id: 10,
    name: "Category 10",
    imageSrc: "https://picsum.photos/200/300?random=10",
    subCategories: [],
  },
  {
    id: 11,
    name: "Category 11",
    imageSrc: "https://picsum.photos/200/300?random=11",
    subCategories: [],
  },
  {
    id: 12,
    name: "Category 12",
    imageSrc: "https://picsum.photos/200/300?random=12",
    subCategories: [],
  },
  {
    id: 13,
    name: "Category 13",
    imageSrc: "https://picsum.photos/200/300?random=13",
    subCategories: [],
  },
  {
    id: 14,
    name: "Category 14",
    imageSrc: "https://picsum.photos/200/300?random=14",
    subCategories: [],
  },
  {
    id: 15,
    name: "Category 15",
    imageSrc: "https://picsum.photos/200/300?random=15",
    subCategories: [],
  },
  {
    id: 16,
    name: "Category 16",
    imageSrc: "https://picsum.photos/200/300?random=16",
    subCategories: [],
  },
];


const products = [
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