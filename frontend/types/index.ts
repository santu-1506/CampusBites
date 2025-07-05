export interface Canteen {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  isOpen: boolean;
  discount?: string;
  featured?: boolean;
  imageUrl?: string;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  rating: number;
  isVeg: boolean;
  canteen: string;
}