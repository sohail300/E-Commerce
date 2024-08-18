import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/components/Email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function mailer(email: string, name: string, amount: number) {
  try {
    const { data, error } = await resend.emails.send({
      from: "E-Commerce <contact@heysohail.me>",
      to: email,
      subject: "Order Confirmation",
      react: OrderConfirmationEmail(name, amount),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
