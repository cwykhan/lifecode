import { NextRequest, NextResponse } from 'next/server';
import { PlanTier, PLANS } from '@/lib/plans';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const tier = (data.tier as PlanTier) || 'free';
    const config = PLANS[tier];

    return NextResponse.json({
      success: true,
      tier: config.name,
      analysis: Array(config.lines).fill(0).map((_, i) => `Data Stream ${i+1} verified.`)
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
