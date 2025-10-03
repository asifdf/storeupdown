export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  initialPrice: number;
  currentBid?: number;
  isAuctionActive: boolean;
  auctionEndTime?: Date;
  location: string;
  createdAt: Date;
}

export interface Bid {
  id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  timestamp: Date;
  isAccepted: boolean;
}

export interface User {
  id: string;
  name: string;
  rating: number;
  avatar?: string;
}

export interface AuctionState {
  currentPrice: number;
  buyerPrice: number;
  sellerPrice: number;
  isNegotiating: boolean;
  finalPrice?: number;
}
