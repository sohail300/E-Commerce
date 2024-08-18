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

export const OrderConfirmationEmail = (
  customerName: string,
  totalAmount: number
) => (
  <Html>
    <Head />
    <Preview>Your order has been confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Confirmation</Heading>
        <Text style={text}>Dear {customerName},</Text>
        <Text style={text}>
          Thank you for your order. We are pleased to confirm that we have
          received it and are processing it now.
        </Text>
        <Section style={orderDetails}>
          <Text style={totalText}>Total Amount: ${totalAmount.toFixed(2)}</Text>
        </Section>
        <Text style={text}>Thank you for shopping with us!</Text>
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
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const orderDetails = {
  margin: "30px 0",
};

const totalText = {
  fontWeight: "bold",
  marginTop: "15px",
};
