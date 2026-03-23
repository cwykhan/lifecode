import { PLANS, PlanTier } from '@/lib/plans';

export interface SajuResult {
  title: string;
  rankName: string;
  analysis: string[];
  advice: string;
}

export const getSajuAnalysis = (
  birthData: { year: number; month: number; day: number; hour?: number },
  tier: PlanTier = 'free'
): SajuResult => {
  const plan = PLANS[tier] || PLANS.free;
  
  const pool = [
    "자수성가할 운명으로 독립심이 매우 강합니다. 🌟",
    "중년 이후 재물운이 크게 열리는 흐름입니다. 🧘",
    "지혜롭고 영민하여 전문 분야에서 성공할 가능성이 높습니다. 🎓",
    "올해는 귀인을 만나 예상치 못한 도움을 받을 징조입니다. 🤝",
    "재물 창고가 열리는 시기이니 관리에 힘쓰세요. 💰",
    "창의적인 업무에서 독보적인 두각을 나타냅니다. 🎨",
    "가정의 화목이 곧 성공의 밑거름이 되는 사주입니다. 🏠",
    "명예운이 상승하니 대외 활동을 늘리는 것이 길합니다. 🏆"
    // (필요에 따라 문장을 더 추가하세요)
  ];

  return {
    title: `${birthData.year}년 ${birthData.month}월 ${birthData.day}일 분석`,
    rankName: plan.label,
    analysis: pool.slice(0, plan.lines),
    advice: tier === 'free' ? "더 깊은 분석은 업그레이드 후 확인 가능합니다." : "행운을 빕니다!"
  };
};
