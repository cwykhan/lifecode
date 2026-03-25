import { NextRequest, NextResponse } from 'next/server';
import { PlanTier, TIERS } from '@/lib/plans';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const tier = (data.tier as PlanTier) || 'SLAVE';
    const config = TIERS[tier];

    return NextResponse.json({
      success: true,
      tier: config.name,
      analysis: Array(config.lines).fill(0).map((_, i) => `Cosmic Data Node ${i+1} verified.`)
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
