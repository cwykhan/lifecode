import { PLANS, PlanTier } from './plans';

export function getSajuAnalysis(tier: PlanTier) {
  const config = PLANS[tier] || PLANS.free;
  // 아키텍트 등급에 따른 분석 로직
  return Array(config.lines).fill(0).map((_, i) => `Saju Data Point ${i + 1} generated.`);
}
