export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Leather Journal",
    price: 34.99,
    description: "Premium leather-bound journal with 200 pages of high-quality paper. Perfect for daily writing, sketching, or planning.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    category: "Notebooks",
    featured: true,
  },
  {
    id: "2",
    name: "Fountain Pen Set",
    price: 89.99,
    description: "Elegant fountain pen set with 6 ink cartridges. Smooth writing experience with a sophisticated design.",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80",
    category: "Pens",
    featured: true,
  },
  {
    id: "3",
    name: "Sticky Note Collection",
    price: 12.99,
    description: "Colorful sticky notes in various sizes. Perfect for organizing thoughts, reminders, and quick notes.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    category: "Office",
    featured: true,
  },
  {
    id: "4",
    name: "Desk Organizer",
    price: 45.99,
    description: "Bamboo desk organizer with multiple compartments for pens, papers, and office supplies.",
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&q=80",
    category: "Office",
  },
  {
    id: "5",
    name: "Watercolor Set",
    price: 56.99,
    description: "Professional watercolor paint set with 24 vibrant colors and premium brushes included.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    category: "Art Supplies",
  },
  {
    id: "6",
    name: "Bullet Journal Kit",
    price: 28.99,
    description: "Complete bullet journaling kit with dotted journal, stencils, and colored pens.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
    category: "Notebooks",
  },
  {
    id: "7",
    name: "Washi Tape Set",
    price: 15.99,
    description: "Decorative washi tape set with 12 unique patterns. Perfect for planners and scrapbooking.",
    image: "https://images.unsplash.com/photo-1611532736280-ecdec4dd0e2f?w=800&q=80",
    category: "Accessories",
  },
  {
    id: "8",
    name: "Calligraphy Pen Set",
    price: 42.99,
    description: "Complete calligraphy set with multiple nibs and ink bottles. Ideal for lettering enthusiasts.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    category: "Pens",
  },
  {
    id: "9",
    name: "Planner 2024",
    price: 32.99,
    description: "Hardcover yearly planner with monthly and weekly spreads. Includes goal-setting pages and habit trackers.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    category: "Notebooks",
  },
];
