import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSajuAnalysis } from '@/lib/lifecode/engine'; // 경로 오류 수정 완료
import { PlanTier } from '@/lib/plans';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { birthData, email } = body;

    // 1. 이메일 정보가 있다면 DB에서 해당 유저의 플랜(Plan) 조회
    let userTier: PlanTier = 'free';
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { plan: true }
      });
      
      // DB에 저장된 paddle price_id를 PlanTier 형식으로 변환하거나 매칭
      // (기본값은 free이며, 실제 로직에 맞춰 확장 가능)
      if (user?.plan) {
        userTier = user.plan as PlanTier;
      }
    }

    // 2. 사주 엔진 호출 (등급에 따른 결과 생성)
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
