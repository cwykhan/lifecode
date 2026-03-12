import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSajuAnalysis } from '@/lib/engine'; // 경로를 @/lib/engine으로 통일
import { PlanTier } from '@/lib/plans';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { birthData, email } = body;

    // 1. 유저 플랜 조회 (기본값 free)
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

    // 2. 사주 엔진 호출
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
