import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { priceId } = await req.json();

  return NextResponse.json({
    priceId,
  });
}
