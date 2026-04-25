import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSajuAnalysis } from '@/lib/engine';
import { PlanTier } from '@/lib/plans';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { birthData, email } = body;

    let userTier: PlanTier = 'free';
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { plan: true }
      });
      if (user?.plan) userTier = user.plan as PlanTier;
    }

    const result = getSajuAnalysis(birthData, userTier);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API Error]:', error);
    return NextResponse.json({ error: '처리 중 오류 발생' }, { status: 500 });
  }
}
