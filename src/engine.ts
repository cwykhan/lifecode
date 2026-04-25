/**
 * LifeCode Core Engine
 * Path: @/lib/engine
 * Logic by Ui-gi-cheon-chu
 */
import { Solar, Lunar } from 'lunar-javascript';
import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from '@/constants/saju';

export interface SajuResult {
  year: { stem: string; branch: string };
  month: { stem: string; branch: string };
  day: { stem: string; branch: string };
  hour: { stem: string; branch: string };
}

export function calculateLifeCode(
  year: number,
  month: number,
  day: number,
  hour: number,
  isLunar: boolean = false
): SajuResult {
  let solar: Solar;

  if (isLunar) {
    const lunar = Lunar.fromYmd(year, month, day);
    solar = lunar.getSolar();
  } else {
    solar = Solar.fromYmd(year, month, day);
  }

  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  // 의기천추 고유 매핑 함수
  const mapStem = (stem: string) => {
    const stemMap: Record<string, string> = {
      '甲': 'KAP', '乙': 'UL', '丙': 'BYEONG', '丁': 'JEONG', '戊': 'MU',
      '己': 'KI', '庚': 'GYEONG', '辛': 'SIN', '壬': 'IM', '癸': 'KYE'
    };
    return HEAVENLY_STEMS[stemMap[stem] as keyof typeof HEAVENLY_STEMS];
  };

  const mapBranch = (branch: string) => {
    const branchMap: Record<string, string> = {
      '子': 'JA', '丑': 'CHUK', '寅': 'IN', '卯': 'MYO', '辰': 'JIN', '巳': 'SA',
      '午': 'OH', '未': 'MI', '申': 'SIN', '酉': 'YU', '戌': 'SUL', '亥': 'HAE'
    };
    return EARTHLY_BRANCHES[branchMap[branch] as keyof typeof EARTHLY_BRANCHES];
  };

  return {
    year: { stem: mapStem(eightChar.getYearGan()), branch: mapBranch(eightChar.getYearZhi()) },
    month: { stem: mapStem(eightChar.getMonthGan()), branch: mapBranch(eightChar.getMonthZhi()) },
    day: { stem: mapStem(eightChar.getDayGan()), branch: mapBranch(eightChar.getDayZhi()) },
    hour: { stem: mapStem(eightChar.getHourGan()), branch: mapBranch(eightChar.getHourZhi()) },
  };
}
