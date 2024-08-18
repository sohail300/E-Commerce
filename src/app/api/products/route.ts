import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const limit = 8;
    const offset = (Number(page) - 1) * limit;

    const products = await prisma.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
