import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop for professionals with M3 Pro chip, 18GB RAM, and 512GB SSD storage.",
    price: 2499,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
    category: "Laptops",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "16-inch Display"]
  },
  {
    id: "2", 
    name: "Dell XPS 13",
    description: "Ultra-portable laptop with stunning InfinityEdge display and all-day battery life.",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop",
    category: "Laptops",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: ["Intel i7", "16GB RAM", "512GB SSD", "13.4-inch Display"]
  },
  {
    id: "3",
    name: "iPad Pro 12.9-inch",
    description: "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop",
    category: "Tablets",
    rating: 4.8,
    reviews: 312,
    inStock: true,
    features: ["M2 Chip", "128GB Storage", "12.9-inch Display", "Apple Pencil Ready"]
  },
  {
    id: "4",
    name: "Gaming Desktop PC",
    description: "High-performance gaming desktop with RTX 4080, Intel i9, and RGB lighting.",
    price: 2899,
    originalPrice: 3299,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=400&fit=crop",
    category: "Desktops",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: ["RTX 4080", "Intel i9", "32GB RAM", "1TB NVMe SSD"]
  },
  {
    id: "5",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio.",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    category: "Audio",
    rating: 4.6,
    reviews: 428,
    inStock: true,
    features: ["Noise Cancelling", "30h Battery", "Wireless", "Premium Audio"]
  },
  {
    id: "6",
    name: "Smartphone Pro",
    description: "Latest flagship smartphone with triple camera system and all-day battery life.",
    price: 999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop",
    category: "Phones",
    rating: 4.8,
    reviews: 892,
    inStock: false,
    features: ["Triple Camera", "128GB Storage", "All-day Battery", "5G Ready"]
  }
];