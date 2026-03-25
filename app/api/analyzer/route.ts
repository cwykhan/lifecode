import { NextRequest, NextResponse } from 'next/server';
import { PlanTier, PLANS } from '@/lib/plans';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthData, email } = body;

    // 초기값 'free' 할당 에러 해결
    let userTier: PlanTier = 'free';

    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user?.tier) userTier = user.tier as PlanTier;
    }

    const config = PLANS[userTier];

    return NextResponse.json({
      success: true,
      tier: config.name,
      analysis: Array(config.lines).fill(0).map((_, i) => `[Node-${i+1}] 분석 데이터 동기화 완료.`)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
