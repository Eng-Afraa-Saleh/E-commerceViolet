import type { Product } from "../types";
import item1 from "/image/Items/item1.jpg";
import item2 from "/image/Items/item2.jpg";
import item3 from "/image/Items/item3.jpg";
import item4 from "/image/Items/item4.jpg";
import item5 from "/image/Items/item5.jpg";
import item6 from "/image/Items/item6.jpg";
import item7 from "/image/Items/item7.jpg";
import item8 from "/image/Items/item8.png";

 export const products: Product[] = [
  {
    id: '1',
    name: 'Velvet Dusk Evening Gown',
    price: 129.99,
    originalPrice: 219.99,
    discountPercentage: 40,
    description: 'A stunning deep violet floor-length gown with premium velvet finish and elegant slit.',
    category: 'Occasion',
    image: item1,
    featured: true,
  },
  {
    id: '2',
    name: 'Lavender Oversized Hoodie',
    price: 45.00,
    description: 'Ultra-soft fleece oversized hoodie in a calming lavender shade. Perfect for cozy street style.',
    category: 'Streetwear',
    image: item2,
    featured: true,
  },
  {
    id: '3',
    name: 'Urban Violet Sneakers',
    price: 89.00,
    originalPrice: 149.00,
    discountPercentage: 40,
    description: 'High-performance athletic sneakers with unique violet accents and air-cushion technology.',
    category: 'Shoes',
    image: item3,
    featured: true,
  },
  {
    id: '4',
    name: 'Amethyst Crystal Pendant',
    price: 32.00,
    originalPrice: 45.00,
    discountPercentage: 28,
    description: 'Handcrafted sterling silver necklace featuring a raw amethyst crystal point.',
    category: 'Jewelry',
    image: item4,
    featured: false,
  },
  {
    id: '5',
    name: 'Midnight Silk Slip Dress',
    price: 75.00,
    description: 'Luxurious silk slip dress that transitions perfectly from day to night.',
    category: 'Dresses',
    image: item5,
    featured: false,
  },
  {
    id: '6',
    name: 'Cyberpunk Shield Shades',
    price: 24.99,
    originalPrice: 49.99,
    discountPercentage: 50,
    description: 'Futuristic oversized sunglasses with iridescent purple lenses and UV400 protection.',
    category: 'Accessories',
    image: item6,
    featured: true,
  },
  {
    id: '7',
    name: 'Violet Quilted Handbag',
    price: 110.00,
    description: 'Elegant quilted leather handbag with gold chain strap and multiple compartments.',
    category: 'Bags',
    image: item7,
    featured: false,
  },
  {
    id: '8',
    name: 'Cropped Lilac Puffer',
    price: 68.00,
    originalPrice: 120.00,
    discountPercentage: 43,
    description: 'Water-resistant cropped puffer jacket in high-gloss lilac finish.',
    category: 'Outerwear',
    image: item8,
    featured: true,
  },
];
