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
      console.log(`[LifeCode] Webhook Received: ${eventType}`);
      return new Response('OK', { status: 200 });
    }
    return new Response('Invalid signature', { status: 401 });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
