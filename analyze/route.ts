import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSajuAnalysis } from '@/lib/engine'; // 📌 경로와 이름을 일치시켰습니다.
import { PlanTier } from '@/lib/plans';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { birthData, email } = body;

    let userTier: PlanTier = 'free';
    
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { plan: true }
      });
      
      if (user?.plan) {
        userTier = user.plan as PlanTier;
      }
    }

    // 📌 엔진 호출 (getSajuAnalysis)
    const result = getSajuAnalysis(birthData, userTier);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Saju Analyze Error]:', error);
    return NextResponse.json(
      { error: '사주 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
