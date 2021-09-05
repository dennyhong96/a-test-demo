import { Product } from "@/types/Product";

export interface Cart {
  [productId: string]: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
  lineTotal: string;
}
