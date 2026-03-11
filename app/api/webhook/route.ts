import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Paddle, Environment } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY || '', {
  environment: Environment.Sandbox, // 실배포 시 Production으로 변경
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('paddle-signature') || '';
    const body = await req.text();

    // 1. Webhook 검증 (보안)
    const event = paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET || '', signature);

    if (event && event.eventType === 'transaction.completed') {
      const customerId = event.data.customerId;
      const email = event.data.customer?.email;
      const priceId = event.data.items[0].priceId;

      // 2. DB 업데이트: 이메일 기준으로 유저 등급(plan) 수정
      if (email) {
        await prisma.user.update({
          where: { email: email },
          data: { 
            plan: priceId, // Paddle Price ID 저장
            updatedAt: new Date()
          },
        });
        console.log(`[LifeCode] Upgrade Success: ${email} to ${priceId}`);
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('[Webhook Error]:', error);
    return NextResponse.json({ status: 'error' }, { status: 400 });
  }
}
