import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        product: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            price: true,
          },
        },
        quantity: true,
      },
    });
    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }

    const { productId, quantity } = await req.json();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId),
        productId: productId,
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          user: {
            connect: {
              id: parseInt(userId),
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
          quantity: quantity,
        },
      });
    }

    return NextResponse.json({ msg: "Product added to cart" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }

    const { productId } = await req.json();
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: parseInt(userId),
        productId: productId,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { msg: "Product not found in cart" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return NextResponse.json(
      { msg: "Product removed from cart" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to remove product from cart" },
      { status: 500 }
    );
  }
}
