export type PlanTier = 'free' | 'p1' | 'p5' | 'p25' | 'p50';

export interface PlanDetail {
  label: string;
  price: number;
  lines: number;
}

export const PLANS: Record<PlanTier, PlanDetail> = {
  free: { label: 'Free', price: 0, lines: 3 },
  p1: { label: 'Standard', price: 1, lines: 8 },
  p5: { label: 'Premium', price: 5, lines: 15 },
  p25: { label: 'Elite', price: 25, lines: 30 },
  p50: { label: 'Royal', price: 50, lines: 50 },
};
