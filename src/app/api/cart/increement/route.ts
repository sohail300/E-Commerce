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
