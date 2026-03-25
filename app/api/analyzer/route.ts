import { NextRequest, NextResponse } from 'next/server';
import { PlanTier, TIERS } from '@/lib/plans';

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json() as { tier: PlanTier };
    const config = TIERS[tier] || TIERS.SLAVE;

    // 황제 등급 32줄 분석 엔진 시뮬레이션
    const analysis = Array(config.lines).fill(0).map((_, i) => 
      `[Analysis-Node-${i + 1}] Cosmic data stream synchronized. Frequency: ${Math.random().toFixed(4)}Hz.`
    );

    return NextResponse.json({
      success: true,
      tier: config.name,
      analysis: analysis
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
