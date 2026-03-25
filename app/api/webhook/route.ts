import { Paddle, Environment } from '@paddle/paddle-node-sdk';

// 1. Paddle 인스턴스 초기화 (소문자 sandbox로 수정 및 오타 제거)
const paddle = new Paddle({
  apiKey: process.env.PADDLE_API_KEY || '',
  environment: Environment.sandbox, 
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('paddle-signature') || '';
    const body = await req.text();

    // 2. 웹훅 이벤트 검증
    // 최신 SDK에서는 eventType 대신 event_type을 사용하거나, 
    // 유효성 검사 후 전체 이벤트를 처리하는 방식을 권장합니다.
    const event = paddle.webhooks.unmarshal(body, process.env.PADDLE_WEBHOOK_SECRET || '', signature);

    if (event) {
      console.log(`Event received: ${event.eventType || (event as any).event_type}`);
      
      // 여기에 비즈니스 로직(예: EMPEROR 등급 활성화)을 추가합니다.
      return new Response('Webhook processed', { status: 200 });
    }

    return new Response('Invalid event', { status: 400 });
  } catch (e: any) {
    console.error(`Webhook Error: ${e.message}`);
    return new Response(`Webhook Error: ${e.message}`, { status: 500 });
  }
}
