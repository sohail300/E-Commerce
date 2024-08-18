import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const { discountCode } = await req.json();
    console.log(discountCode);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        cart: {
          include: {
            product: true,
          },
        },
      },
    });

    if (user) {
      let amount = 0;
      for (const item of user.cart) {
        if (item.product) {
          amount += item.product.price * item.quantity;
        }
      }

      let discount = 0;
      if (discountCode === "10") {
        discount = 10000;
      }
      amount = amount - discount;
      console.log(amount);

      const customer = await stripeInstance.customers.create({
        metadata: {
          userid: userId as string,
          amount,
        },
      });

      const session = await stripeInstance.checkout.sessions.create({
        line_items: [
          {
            // price: process.env.STRIPE_PRICE_ID,
            price_data: {
              unit_amount: amount,
              currency: "INR",
              product_data: {
                name: "Product",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer: customer.id,
        success_url: `${process.env.FRONTEND_URL}/payment/success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/canceled`,
      });

      console.log(session.url);

      // res.redirect(303, session.url);

      return NextResponse.json({ url: session.url, status: 200 });
    } else {
      return NextResponse.json({ msg: "User doesnt exist", status: 403 });
    }
  } catch (err) {
    console.log("Error occured:", err);
    return NextResponse.json({ msg: "Internal server error", status: 500 });
  }
}
