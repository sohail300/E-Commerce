"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { Product } from "@/components/Product";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

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
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(`/api/products?page=${page}`);
      console.log(response.data.products);

      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage);
    }
  };

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
                max={1500}
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

          {/* Pagination controls */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
