import { PLANS, PlanTier } from '@/lib/plans';

export interface SajuResult {
  title: string;
  basicInfo: string;
  analysis: string[];
  advice: string;
  rankName: string;
}

// 📌 반드시 'getSajuAnalysis'라는 이름으로 export 되어야 합니다.
export const getSajuAnalysis = (
  birthData: { year: number; month: number; day: number; hour?: number },
  tier: PlanTier = 'free'
): SajuResult => {
  const plan = PLANS[tier] || PLANS.free;
  const { year, month, day } = birthData;

  const baseAnalysis = [
    "태어난 날의 기운이 강하여 자수성가할 운명입니다. 🌟",
    "초년운은 다소 기복이 있으나 중년 이후 안정을 찾습니다. 🧘",
    "목(木)의 기운이 부족하니 푸른 계열의 옷이 길합니다. 👕",
    "올해는 문서운이 좋으니 새로운 계약이나 공부에 적합합니다. 📖",
    "인간관계에서 구설수를 조심해야 하는 시기입니다. 🤐",
    "재물운은 북쪽에서 들어오니 이사나 이동 시 참고하세요. 🧭",
    "건강면에서는 소화기 계통을 주의 깊게 살펴야 합니다. 🍎",
    "창의적인 업무에서 두각을 나타낼 잠재력이 큽니다. 🎨",
    "주변의 조력자를 만나 큰 위기를 넘기게 될 상입니다. 🤝",
    "하반기에는 예상치 못한 횡재수가 기다리고 있습니다. 💰",
    "결단력이 필요한 시점에 타인의 의견에 휘둘리지 마세요. ⚓",
    "장기적인 투자가 결실을 맺는 해가 될 것입니다. 🌳",
    "예술적 감각이 뛰어나 취미 활동이 직업으로 이어질 수 있습니다. 🎭",
    "가정 내 화목이 곧 성공의 밑거름이 되는 사주입니다. 🏠",
    "명예운이 상승하는 시기이니 대외 활동을 늘리세요. 🏆",
    "스스로를 믿고 나아갈 때 하늘이 돕는 형국입니다. ✨"
  ];

  const slicedAnalysis = baseAnalysis.slice(0, plan.lines);

  const getAdviceByTier = (tier: PlanTier): string => {
    switch (tier) {
      case 'p50': return "천하를 호령할 황제의 기운입니다. 👑";
      case 'p25': return "귀족의 품격을 타고나셨군요. 🎩";
      case 'p5':  return "상인의 영민함이 돋보입니다. 💎";
      case 'p1':  return "성실함이 최고의 무기입니다. 🛠️";
      default:    return "현재 무료 등급입니다. 더 깊은 분석은 업그레이드가 필요합니다. 🔓";
    }
  };

  return {
    title: `${year}년 ${month}월 ${day}일 사주 운세`,
    rankName: plan.label,
    basicInfo: `등급: ${plan.label}`,
    analysis: slicedAnalysis,
    advice: getAdviceByTier(tier)
  };
};
