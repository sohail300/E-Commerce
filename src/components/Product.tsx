import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useToast } from "./ui/use-toast";

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

  async function addToCart() {
    try {
      const response = await axios.post(`/api/cart`, {
        productId: id,
        quantity: 1,
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
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">₹{price}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={addToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
