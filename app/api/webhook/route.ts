import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.PADDLE_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);

  if (body.event_type === "transaction.completed") {
    const email = body.data.customer.email;

    await supabaseAdmin.from("subscriptions").upsert({
      email,
      status: "active",
      paddle_subscription_id: body.data.subscription_id,
    });
  }

  if (body.event_type === "subscription.canceled") {
    const email = body.data.customer.email;

    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("email", email);
  }

  return NextResponse.json({ received: true });
}
