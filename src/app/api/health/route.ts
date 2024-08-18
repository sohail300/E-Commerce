import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("healthy");
    return NextResponse.json({ status: "healthy" }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
