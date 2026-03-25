// lib/plans.ts
export type PlanTier = 'SLAVE' | 'COMMONER' | 'MERCHANT' | 'NOBLE' | 'EMPEROR';

export interface PlanConfig {
  name: string;
  price: number;
  lines: number;
}

export const TIERS: Record<PlanTier, PlanConfig> = {
  SLAVE: { name: "노예", price: 0, lines: 2 },
  COMMONER: { name: "평민", price: 5, lines: 4 },
  MERCHANT: { name: "상인", price: 15, lines: 8 },
  NOBLE: { name: "귀족", price: 30, lines: 16 },
  EMPEROR: { name: "왕·황제", price: 50, lines: 32 },
}
