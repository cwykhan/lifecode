export type PlanTier = 'free' | 'SLAVE' | 'COMMONER' | 'MERCHANT' | 'NOBLE' | 'EMPEROR';

export interface PlanConfig {
  name: string;
  price: number;
  lines: number;
  priceId: string; // Paddle Price ID 연결용
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  free: { name: "무료", price: 0, lines: 1, priceId: "" },
  SLAVE: { name: "노예", price: 0, lines: 2, priceId: "" },
  COMMONER: { name: "평민", price: 5, lines: 4, priceId: "pri_01j..." }, // 여기에 Paddle ID 입력
  MERCHANT: { name: "상인", price: 15, lines: 8, priceId: "pri_01j..." },
  NOBLE: { name: "귀족", price: 30, lines: 16, priceId: "pri_01j..." },
  EMPEROR: { name: "왕·황제", price: 50, lines: 32, priceId: "pri_01j..." },
};
