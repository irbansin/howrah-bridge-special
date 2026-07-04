export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "rolls" | "burgers" | "chinese" | "drinks";
  image: string;
  rating: number;
  tags: string[];
  customizable: boolean;
  spiceLevels?: string[];
  extras?: { name: string; price: number }[];
}

export const menuItems: MenuItem[] = [
  {
    id: "egg-roll",
    name: "Classic Kolkata Egg Roll",
    description: "Flaky, layered paratha wrapped around a crispy fried egg, filled with red onions, fresh cucumbers, green chillies, and our house-secret masala blend.",
    price: 120,
    category: "rolls",
    image: "/images/roll.png",
    rating: 4.8,
    tags: ["Classic", "Vegetarian Option", "Best Seller"],
    customizable: true,
    spiceLevels: ["Mild", "Medium", "Spicy", "Kolkata Fire"],
    extras: [
      { name: "Extra Egg", price: 20 },
      { name: "Add Cheese", price: 30 },
      { name: "Double Onion", price: 10 }
    ]
  },
  {
    id: "chicken-roll",
    name: "Kolkata-Howrah Double Chicken Roll",
    description: "Flaky paratha stuffed with double portion of succulent tandoori chicken tikka chunks, charred bell peppers, sliced red onions, and fresh cilantro-mint chutney.",
    price: 180,
    category: "rolls",
    image: "/images/roll.png",
    rating: 4.9,
    tags: ["Chef Special", "High Protein", "Must Try"],
    customizable: true,
    spiceLevels: ["Medium", "Spicy", "Kolkata Fire"],
    extras: [
      { name: "Extra Chicken Tikka", price: 50 },
      { name: "Add Cheese Slice", price: 30 },
      { name: "Egg Layer", price: 20 }
    ]
  },
  {
    id: "paneer-roll",
    name: "Spiced Paneer Tikka Roll",
    description: "Spiced cottage cheese cubes charred in the tandoor, rolled in a flaky paratha with pickled onions, green pepper strips, and a tangy tamarind-mint glaze.",
    price: 160,
    category: "rolls",
    image: "/images/roll.png",
    rating: 4.7,
    tags: ["Vegetarian", "Spicy"],
    customizable: true,
    spiceLevels: ["Mild", "Medium", "Spicy"],
    extras: [
      { name: "Extra Paneer", price: 40 },
      { name: "Add Cheese", price: 30 },
      { name: "Wheat Paratha", price: 15 }
    ]
  },
  {
    id: "gt-burger",
    name: "G.T. Road Lamb Burger",
    description: "A thick, juicy hand-pressed spiced lamb patty infused with roasted garam masala, topped with mint mayo, pickled red onions, fresh lettuce, and melting cheddar on a toasted sesame brioche.",
    price: 240,
    category: "burgers",
    image: "/images/burger.png",
    rating: 4.9,
    tags: ["Gourmet", "Signature", "High Protein"],
    customizable: true,
    spiceLevels: ["Mild", "Medium", "Spicy"],
    extras: [
      { name: "Double Patty", price: 90 },
      { name: "Fried Egg", price: 20 },
      { name: "Extra Cheese", price: 30 }
    ]
  },
  {
    id: "aloo-tikki-burger",
    name: "Kolkata Cabin Aloo Tikki Burger",
    description: "Crispy beetroot-potato tikka, flavored with roasted cumin and ginger, topped with spiced ketchup, cucumber wheels, onions, and processed cheese in a soft bun.",
    price: 130,
    category: "burgers",
    image: "/images/burger.png",
    rating: 4.6,
    tags: ["Vegetarian", "Local Fusion"],
    customizable: true,
    spiceLevels: ["Mild", "Medium", "Spicy"],
    extras: [
      { name: "Extra Tikki", price: 30 },
      { name: "Extra Cheese", price: 30 }
    ]
  },
  {
    id: "masala-fries",
    name: "Bridge Side Masala Fries",
    description: "Crispy double-cooked golden French fries tossed in a fiery home-ground blend of chaat masala, red chilli powder, and black salt. Served with Sriracha mayo.",
    price: 110,
    category: "burgers",
    image: "/images/fries.png",
    rating: 4.7,
    tags: ["Vibrant Side", "Vegetarian", "Crunchy"],
    customizable: false
  },
  {
    id: "chowmein-chicken",
    name: "Tangra Street Chicken Chow Mein",
    description: "Kolkata-style Hakka noodles stir-fried in a roaring wok with shredded chicken, crunchy cabbage, carrots, bell peppers, dark soy sauce, vinegar, and green chillies.",
    price: 190,
    category: "chinese",
    image: "/images/noodles.png",
    rating: 4.8,
    tags: ["Indo-Chinese", "Comfort Food", "Best Seller"],
    customizable: true,
    spiceLevels: ["Mild", "Medium", "Spicy", "Tangra Special"],
    extras: [
      { name: "Extra Chicken", price: 40 },
      { name: "Scrambled Egg", price: 20 },
      { name: "Extra Veggies", price: 20 }
    ]
  },
  {
    id: "chilli-paneer",
    name: "Tangra Dry Chilli Paneer",
    description: "Crispy batter-fried paneer cubes tossed in a spicy, savory glaze of soy sauce, chilli paste, garlic, fresh green chillies, onion bulbs, and green bell peppers.",
    price: 210,
    category: "chinese",
    image: "/images/noodles.png",
    rating: 4.7,
    tags: ["Indo-Chinese", "Vegetarian", "Spicy"],
    customizable: true,
    spiceLevels: ["Medium", "Spicy", "Extremely Spicy"],
    extras: [
      { name: "Extra Paneer", price: 45 },
      { name: "Add Mushroom", price: 30 }
    ]
  },
  {
    id: "gondhoraj-limeade",
    name: "Gondhoraj Lime Mint Mojito",
    description: "A refreshing mocktail showcasing the highly aromatic native Bengali Gondhoraj Lime, muddled with fresh mint leaves, black salt, sugar syrup, and soda.",
    price: 90,
    category: "drinks",
    image: "/images/limeade.png",
    rating: 4.9,
    tags: ["Signature Drink", "Extremely Refreshing"],
    customizable: false
  },
  {
    id: "masala-chai",
    name: "Clay Pot Cutting Masala Chai",
    description: "Strong, piping hot milk tea brewed with crushed ginger, green cardamom, cloves, cinnamon, and black tea leaves. Served authentic style.",
    price: 40,
    category: "drinks",
    image: "/images/chai.png",
    rating: 4.9,
    tags: ["Heritage Drink", "Best Seller"],
    customizable: false
  },
  {
    id: "sandesh-cheesecake",
    name: "Baked Saffron Sandesh Cheesecake",
    description: "A rich fusion dessert. Creamy, baked cheesecake made with traditional fresh chhena (Sandesh), infused with cardamom and saffron, topped with pistachios.",
    price: 150,
    category: "drinks",
    image: "/images/cheesecake.png",
    rating: 4.8,
    tags: ["Fusion Dessert", "Chef Special", "Sweet"],
    customizable: false
  }
];
