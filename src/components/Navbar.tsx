"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = session?.user;
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <h2 className="text-2xl font-bold">E-Commerce</h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/products">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Products
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cart
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    await signOut();
                    router.push("/signin");
                  }}
                  variant="outline"
                  className="text-red-600 hover:text-red-800 border-red-600 hover:border-red-800"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="default"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <Link href="/products">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-600 hover:text-gray-900"
                  >
                    Products
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-600 hover:text-gray-900"
                  >
                    Cart
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    await signOut();
                    router.push("/signin");
                  }}
                  variant="outline"
                  className="w-full text-left text-red-600 hover:text-red-800 border-red-600 hover:border-red-800"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="default"
                    className="w-full text-left bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
