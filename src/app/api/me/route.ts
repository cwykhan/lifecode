import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const email = req.headers.get("x-user-email");
  if (!email) return NextResponse.json({ plan: 0 });

  // Replace with Supabase query
  return NextResponse.json({ plan: 0 });
}
