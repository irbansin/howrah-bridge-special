import rawMenuItems from "./menuItems.json";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "chowmein" | "fried-rice" | "starters" | "special";
  image: string;
  rating: number;
  tags: string[];
  customizable: boolean;
  spiceLevels?: string[];
  extras?: { name: string; price: number }[];
}

export const menuItems: MenuItem[] = rawMenuItems as MenuItem[];
