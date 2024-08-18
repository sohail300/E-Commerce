import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { CartItemProps } from "@/schema/interface";

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  getCartItems,
  applyDiscount,
  calculateTotals,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const increment = async (id: number) => {
    try {
      setIsSubmitting(true);
      console.log(id);

      const response = await axios.post("/api/cart/increment", { id });
      if (response.status === 200) {
        toast({
          title: "Quantity incremented",
        });
        getCartItems();
        calculateTotals();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to increment quantity",
      });
      getCartItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const decrement = async (id: number) => {
    try {
      setIsSubmitting(true);
      console.log(id);

      const response = await axios.post("/api/cart/decrement", { id });
      if (response.status === 200) {
        toast({
          title: "Quantity decremented",
        });
        getCartItems();
        calculateTotals();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to decrement quantity",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  async function addToCart(id: number, quantity: number) {
    try {
      setIsSubmitting(true);
      console.log(id);

      const response = await axios.post(`/api/cart`, {
        productId: id,
        quantity: quantity,
      });

      if (response.status === 200) {
        toast({
          title: "Product added to cart",
        });
        getCartItems();
        calculateTotals();
      }
    } catch (error) {
      toast({
        title: "Error adding product to cart",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
          onClick={() => decrement(id)}
          disabled={isSubmitting}
        >
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => addToCart(id, parseInt(e.target.value) || 0)}
          className="w-16 text-center"
          disabled={isSubmitting}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => increment(id)}
          disabled={isSubmitting}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
