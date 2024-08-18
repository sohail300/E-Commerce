"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import CartItem from "@/components/CartItem";
import Loader from "@/components/Loader";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Cart = () => {
  interface CartItem {
    product: {
      id: number;
      name: string;
      image: string;
      description: string;
      price: number;
    };
    quantity: number;
  }

  const [discountCode, setDiscountCode] = useState("");
  const [submitting, setIsSubmitting] = useState(false);
  const [gettingDiscount, setGettingDiscount] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const total = subtotal - discount;
    return { subtotal, total };
  };

  const applyDiscount = async () => {
    try {
      setGettingDiscount(true);
      const response = await axios.post("/api/discount", { discountCode });

      if (response.data.discount) {
        setDiscount(10000);
      }
    } catch (error) {
      setDiscount(0);
      console.log(error);
    } finally {
      setGettingDiscount(false);
    }
  };

  async function getCartItems() {
    try {
      const response = await axios.get("/api/cart");
      if (response.status === 200) {
        setItems(response.data.cartItems);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function placeItems() {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/payment", { discountCode });
      console.log(response);
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  id={item.product.id}
                  name={item.product.name}
                  price={item.product.price}
                  image={item.product.image}
                  quantity={item.quantity}
                  getCartItems={getCartItems}
                  applyDiscount={applyDiscount}
                  calculateTotals={calculateTotals}
                />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product.name} (x{item.quantity})
                </span>
                <span>
                  ₹{((item.product.price / 100) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>₹{(calculateTotals().subtotal / 100).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                className="flex flex-row justify-center items-center"
                disabled={gettingDiscount}
                onClick={applyDiscount}
              >
                {gettingDiscount && <Loader2 className=" animate-spin mr-2" />}
                Apply
              </Button>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-₹{(discount / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{(calculateTotals().total / 100).toFixed(2)}</span>
            </div>

            <Button
              className="w-full flex flex-row justify-center items-center"
              disabled={submitting}
              onClick={placeItems}
            >
              {submitting && <Loader2 className=" animate-spin mr-2" />}
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
