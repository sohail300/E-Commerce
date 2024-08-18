import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const OrderConfirmationEmail = (totalAmount: number) => (
  <Html>
    <Head />
    <Preview>
      Your order has been confirmed - Thank you for shopping with us!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Confirmed!</Heading>
        <Text style={text}>Dear Valued Customer,</Text>
        <Text style={text}>
          Great news! We have received your order and it is being processed with
          care. We are excited to get your items to you as soon as possible.
        </Text>
        <Section style={orderDetails}>
          <Text style={totalText}>Order Total: ₹{totalAmount.toFixed(2)}</Text>
        </Section>
        <Text style={text}>
          Thank you for choosing us. We truly appreciate your business!
        </Text>
        <Text style={footer}>
          If you have any questions, please do not hesitate to contact our
          customer support.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  maxWidth: "600px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  textTransform: "uppercase" as const,
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const orderDetails = {
  margin: "30px 0",
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "4px",
};

const totalText = {
  fontWeight: "bold",
  fontSize: "18px",
  color: "#2b2b2b",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "30px",
  textAlign: "center" as const,
};
