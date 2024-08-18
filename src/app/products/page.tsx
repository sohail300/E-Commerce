"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { Product } from "@/components/Product";
import Loader from "@/components/Loader";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const dummyProducts: Product[] = [
    {
      id: 1,
      name: "Smartphone Pro X",
      image: "https://via.placeholder.com/300x300.png?text=Smartphone+Pro+X",
      price: 99900,
    },
    {
      id: 2,
      name: "Wireless Earbuds Elite",
      image:
        "https://via.placeholder.com/300x300.png?text=Wireless+Earbuds+Elite",
      price: 14900,
    },
    {
      id: 3,
      name: '4K Smart TV 55"',
      image: 'https://via.placeholder.com/300x300.png?text=4K+Smart+TV+55"',
      price: 59900,
    },
    {
      id: 4,
      name: "Gaming Laptop Ultra",
      image: "https://via.placeholder.com/300x300.png?text=Gaming+Laptop+Ultra",
      price: 149900,
    },
    {
      id: 5,
      name: "Fitness Tracker Watch",
      image:
        "https://via.placeholder.com/300x300.png?text=Fitness+Tracker+Watch",
      price: 9900,
    },
    {
      id: 6,
      name: "Robotic Vacuum Cleaner",
      image:
        "https://via.placeholder.com/300x300.png?text=Robotic+Vacuum+Cleaner",
      price: 39900,
    },
    {
      id: 7,
      name: "Electric Coffee Maker",
      image:
        "https://via.placeholder.com/300x300.png?text=Electric+Coffee+Maker",
      price: 7900,
    },
    {
      id: 8,
      name: "Bluetooth Portable Speaker",
      image: "https://via.placeholder.com/300x300.png?text=Bluetooth+Speaker",
      price: 12900,
    },
    {
      id: 9,
      name: "Digital SLR Camera",
      image: "https://via.placeholder.com/300x300.png?text=Digital+SLR+Camera",
      price: 89900,
    },
    {
      id: 10,
      name: "Air Purifier Deluxe",
      image: "https://via.placeholder.com/300x300.png?text=Air+Purifier+Deluxe",
      price: 29900,
    },
    {
      id: 11,
      name: "Electric Toothbrush Pro",
      image:
        "https://via.placeholder.com/300x300.png?text=Electric+Toothbrush+Pro",
      price: 8900,
    },
    {
      id: 12,
      name: "Wireless Charging Pad",
      image:
        "https://via.placeholder.com/300x300.png?text=Wireless+Charging+Pad",
      price: 3900,
    },
    {
      id: 13,
      name: "Smart Home Security Camera",
      image: "https://via.placeholder.com/300x300.png?text=Security+Camera",
      price: 19900,
    },
    {
      id: 14,
      name: "Ergonomic Office Chair",
      image:
        "https://via.placeholder.com/300x300.png?text=Ergonomic+Office+Chair",
      price: 24900,
    },
    {
      id: 15,
      name: "Noise-Cancelling Headphones",
      image:
        "https://via.placeholder.com/300x300.png?text=Noise-Cancelling+Headphones",
      price: 34900,
    },
    {
      id: 16,
      name: "Multi-function Instant Pot",
      image: "https://via.placeholder.com/300x300.png?text=Instant+Pot",
      price: 11900,
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      console.log(response.data.products);

      setProducts(response.data.products);
      setFilteredProducts(response.data.products);

      // setProducts(dummyProducts);
      // setFilteredProducts(dummyProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price / 100 >= priceRange[0] &&
        product.price / 100 <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, products]);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-8">Products</h1>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Product
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <Slider
                id="price-range"
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts?.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          {filteredProducts?.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found matching your criteria.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
