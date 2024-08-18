export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  getCartItems: () => void;
  applyDiscount: () => void;
  calculateTotals: () => void;
}
