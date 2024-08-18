import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  updateQuantity: (id: number, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  updateQuantity,
}) => {
  return (
    <div className="flex items-center py-4 border-b">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">₹{(price / 100).toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateQuantity(id, quantity - 1)}
        >
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => updateQuantity(id, parseInt(e.target.value) || 0)}
          className="w-16 text-center"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
