import { NextRequest, NextResponse } from "next/server";
import { userRegisterSchema } from "@/schema/userRegister";
import prisma from "@/lib/db";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const parsedInput = userRegisterSchema.safeParse(await req.json());

    if (parsedInput.success === false) {
      return NextResponse.json(
        { msg: parsedInput.error.message },
        { status: 400 }
      );
    }
    const { email, password } = parsedInput.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { msg: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
