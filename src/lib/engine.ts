import { Solar } from 'lunar-javascript';
// 의기천추님의 독자적 시스템 반영 (甲=T, 乙=t...)
import { SAJU_MAPPING, TEN_GODS_MAP } from '@/constants/saju';

// 십신(TenStar) 직접 매핑 테이블 - 라이브러리 함수 대신 이걸 사용합니다.
const TEN_STAR_LOGIC: Record<string, Record<string, string>> = {
  '甲': { '甲': '比肩', '乙': '劫財', '丙': '食神', '丁': '傷官', '戊': '偏財', '己': '正財', '庚': '偏官', '辛': '正官', '壬': '偏印', '癸': '正印' },
  '乙': { '乙': '比肩', '甲': '劫財', '丁': '食神', '丙': '傷官', '己': '偏財', '戊': '正財', '辛': '偏官', '庚': '正官', '癸': '偏印', '壬': '正印' },
  '丙': { '丙': '比肩', '丁': '劫財', '戊': '食神', '己': '傷官', '庚': '偏財', '辛': '正財', '壬': '偏官', '癸': '正官', '甲': '偏印', '乙': '正印' },
  '丁': { '丁': '比肩', '丙': '劫財', '己': '食神', '戊': '傷官', '辛': '偏財', '庚': '正財', '癸': '偏관', '壬': '正官', '乙': '偏印', '甲': '正印' },
  '戊': { '戊': '比肩', '己': '劫財', '庚': '食神', '辛': '傷官', '壬': '偏財', '癸': '正財', '甲': '偏官', '乙': '正官', '丙': '偏印', '丁': '正印' },
  '己': { '己': '比肩', '戊': '劫財', '辛': '食神', '庚': '傷官', '癸': '偏財', '壬': '正財', '乙': '偏官', '甲': '正官', '丁': '偏印', '丙': '正印' },
  '庚': { '庚': '比肩', '辛': '劫財', '壬': '食神', '癸': '傷官', '甲': '偏財', '乙': '正財', '丙': '偏官', '丁': '正官', '戊': '偏印', '己': '正印' },
  '辛': { '辛': '比肩', '庚': '劫財', '癸': '食神', '壬': '傷官', '乙': '偏財', '甲': '正財', '丁': '偏官', '丙': '正官', '己': '偏印', '戊': '正印' },
  '壬': { '壬': '比肩', '癸': '劫財', '甲': '食神', '乙': '傷官', '丙': '偏財', '丁': '正재', '戊': '偏官', '己': '正官', '庚': '偏印', '辛': '正印' },
  '癸': { '癸': '比肩', '壬': '劫財', '乙': '食神', '甲': '傷官', '丁': '偏財', '丙': '正財', '己': '偏관', '戊': '正官', '辛': '偏印', '庚': '正印' }
};

export function calculateLifeCode(y: number, m: number, d: number, h: number) {
  try {
    const solar = Solar.fromYmdHms(y, m, d, h, 0, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    
    const dGan = eightChar.getDayGan(); // 일간(기준점)

    const parseSaju = (gan: string, zhi: string, isDay: boolean = false) => ({
      stem: SAJU_MAPPING.STEMS[gan as keyof typeof SAJU_MAPPING.STEMS] || gan,
      branch: SAJU_MAPPING.BRANCHES[zhi as keyof typeof SAJU_MAPPING.BRANCHES] || zhi,
      // 라이브러리 함수 호출 대신 로직 테이블에서 직접 매핑
      tenGod: isDay ? 'ME' : (TEN_GODS_MAP[TEN_STAR_LOGIC[dGan]?.[gan]] || '-')
    });

    return {
      year: parseSaju(eightChar.getYearGan(), eightChar.getYearZhi()),
      month: parseSaju(eightChar.getMonthGan(), eightChar.getMonthZhi()),
      day: parseSaju(dGan, eightChar.getDayZhi(), true),
      hour: parseSaju(eightChar.getHourGan(), eightChar.getHourZhi())
    };
  } catch (error) {
    console.error("Calculation Error:", error);
    return null;
  }
}
