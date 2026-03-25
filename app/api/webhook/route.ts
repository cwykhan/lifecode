import { Paddle, Environment } from '@paddle/paddle-node-sdk';

// 1. Paddle 인스턴스 초기화
const paddle = new Paddle({
  apiKey: process.env.PADDLE_API_KEY || '',
  environment: Environment.sandbox, // 소문자 s 필수
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('paddle-signature') || '';
    const body = await req.text();

    // 2. 웹훅 이벤트 검증 및 역직렬화
    const event = paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET || '', signature);

    if (event) {
      // 3. 타입 에러 방지를 위한 동적 접근 (eventType vs event_type)
      const eventType = (event as any).eventType || (event as any).event_type;
      console.log(`[LifeCode] Webhook Event Received: ${eventType}`);
      
      // 비즈니스 로직 처리 구간
      return new Response('OK', { status: 200 });
    }

    return new Response('Invalid signature', { status: 401 });
  } catch (error: any) {
    console.error(`[LifeCode] Webhook Error: ${error.message}`);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
