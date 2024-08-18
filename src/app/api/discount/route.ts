import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }

    const { discountCode } = await req.json();

    // This is a placeholder. In a real app, you'd verify the discount code here.
    let discount = 0;
    if (discountCode === "10") {
      discount = 10000;
    }

    return NextResponse.json({ discount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to apply discount" },
      { status: 500 }
    );
  }
}
