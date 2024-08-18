import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }

    const { productId } = await req.json();
    console.log(productId);
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId),
        productId: productId,
      },
    });

    if (!cartItem) {
      // Add the product to the cart with quantity 1
      await prisma.cartItem.create({
        data: {
          userId: parseInt(userId),
          productId: productId,
          quantity: 1,
        },
      });
      return NextResponse.json(
        { msg: "Product added to cart" },
        { status: 201 }
      );
    }

    // If the product is already in the cart, increment the quantity
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { msg: "Quantity incremented successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to increment quantity" },
      { status: 500 }
    );
  }
}
