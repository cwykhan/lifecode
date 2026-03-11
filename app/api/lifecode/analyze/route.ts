// app/api/lifecode/analyze/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { LifecodeEngine } from '@/lib/lifecode/engine';

export async function POST(req: Request) {
  try {
    const { name, birthDate, email, gender } = await req.json();
    const date = new Date(birthDate);

    // K-upfate lifecode 엔진 실행
    const analysis = LifecodeEngine.analyze(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );

    // DB 저장 로직
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email },
        update: {},
        create: { email }
      });

      return await tx.sajuProfile.create({
        data: {
          userId: user.id,
          name,
          birthDate: date,
          gender,
          pillars: analysis.pillars,
          strength: analysis.strength,
          score: analysis.score,
          usefulEnergy: analysis.usefulEnergy
        }
      });
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
