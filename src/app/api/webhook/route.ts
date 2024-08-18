import prisma from "@/lib/db";
import { mailer } from "@/utils/mailer";
import { NextResponse } from "next/server";
import Stripe from "stripe";
// 4000003560000008

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY!);

export async function POST(req: Request) {
  try {
    const event = await req.json();

    if (process.env.STRIPE_ENDPOINT_SECRET) {
      // Get the signature sent by Stripe
      const signature = req.headers.get("stripe-signature");
      if (!signature) {
        throw new Error("No stripe signature found");
      }

      try {
        stripeInstance.webhooks.constructEvent(
          await req.text(),
          signature,
          process.env.STRIPE_ENDPOINT_SECRET
        );
      } catch (err) {
        console.log(
          "Webhook signature verification failed",
          (err as Error).message
        );
        return NextResponse.json(
          { msg: "Internal server error" },
          { status: 500 }
        );
      }
    }

    switch (event.type) {
      case "customer.updated":
        console.log("customerUpdated");
        const customerUpdated = event.data.object;
        console.log(customerUpdated);

        const { userid, amount } = customerUpdated.metadata;
        console.log(userid, amount);

        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userid),
          },
        });

        if (user) {
          mailer(user.email, parseInt(amount) / 100);
          console.log("Mail sent");
          await prisma.cartItem.deleteMany({
            where: {
              userId: parseInt(userid),
            },
          });
          break;
        }

      case "checkout.session.completed":
        console.log("completed");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log("Error occured:", err);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
