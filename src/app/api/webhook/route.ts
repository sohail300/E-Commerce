import prisma from "@/lib/db";
import { mailer } from "@/utils/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    switch (event.type) {
      case "customer.updated":
        console.log("customerUpdated");
        const customerUpdated = event.data.object;
        console.log(customerUpdated);

        const { userid, amount } = customerUpdated.metadata;

        console.log(userid, amount);
        const user = await prisma.user.findUnique({
          where: {
            id: userid,
          },
        });

        if (user) {
          mailer(user.email, amount);
          console.log("Mail sent");
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
