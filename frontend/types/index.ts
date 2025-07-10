export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  address?: string;
  dateOfBirth?: string;
  role: 'student' | 'canteen' | 'admin';
  campus: string;
  canteenId?: string;
  isVerified?: boolean;
  isBanned?: boolean;
  is_verified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Canteen {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  isOpen: boolean;
  is_verified?: boolean;
  isBanned?: boolean;
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

export interface Order {
  _id: string;
  student: string;
  canteen: {
    _id: string;
    name: string;
  };
  items: Array<{
    _id: string;
    item: {
      _id: string;
      name: string;
      price: number;
      image?: string;
    };
    quantity: number;
  }>;
  total: number;
  status: 'placed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  // Customer details for canteen view
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  payment?: {
    method: 'cod' | 'upi' | 'card';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    upiDetails?: {
      upiId: string;
      paymentApp: string;
    };
    cardDetails?: {
      lastFourDigits: string;
      cardType: string;
      holderName: string;
    };
    paidAt?: string;
  };
  createdAt: string;
  updatedAt: string;
}
