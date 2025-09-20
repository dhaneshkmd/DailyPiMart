
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  pricePi: number;
  images: string[];
  category: string;
  stock: number;
  active: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
  id: string;
  piUid: string;
  username: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'failed';
  amountPi: number;
  items: CartItem[];
  paymentId?: string;
  txid?: string;
  mode: 'testnet' | 'mainnet';
  createdAt: Date;
}
