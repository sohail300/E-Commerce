import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function Product({
  id,
  name,
  price,
  image,
}: {
  id: number;
  name: string;
  price: number;
  image: string;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addToCart() {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/api/cart/increment`, {
        productId: id,
      });

      if (response.status === 200) {
        toast({
          title: "Product added to cart",
        });
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
    <Card className="flex flex-col">
      <CardContent className="p-4">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="w-full h-48 object-contain mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">₹{price / 100}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          className="w-full flex flex-row justify-center items-center"
          disabled={isSubmitting}
          onClick={addToCart}
        >
          {isSubmitting && <Loader2 className=" animate-spin mr-2" />}
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
