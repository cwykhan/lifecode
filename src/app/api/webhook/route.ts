import { Paddle, Environment } from '@paddle/paddle-node-sdk';

const paddle = new Paddle({
  apiKey: process.env.PADDLE_API_KEY || '',
  environment: Environment.sandbox,
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('paddle-signature') || '';
    const body = await req.text();
    const event = paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET || '', signature);

    if (event) {
      const eventType = (event as any).eventType || (event as any).event_type;
      console.log(`[LifeCode] Webhook Verified: ${eventType}`);
      
      // 결제 완료(subscription.created 등) 시 DB 업데이트 로직 추가 가능
      return new Response('Success', { status: 200 });
    }
    return new Response('Forbidden', { status: 403 });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
