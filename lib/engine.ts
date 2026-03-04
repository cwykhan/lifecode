import { Solar } from 'lunar-typescript';

// K-upfate lifecode 전용 기호 시스템
export const K_SYMBOLS: Record<string, string> = {
  '甲': 'T', '乙': 't', '丙': 'F', '丁': 'f', '戊': 'E', '己': 'e', '庚': 'M', '辛': 'm', '壬': 'W', '癸': 'w'
};

export class LifecodeEngine {
  public static analyze(year: number, month: number, day: number, hour: number, minute: number) {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();

    // 1. 8칸 격자(Pillars) 데이터 추출 (Sky-Land 구조)
    const pillars = {
      year:  { sky: K_SYMBOLS[eightChar.getYearGan()], land: eightChar.getYearZhi() },
      month: { sky: K_SYMBOLS[eightChar.getMonthGan()], land: eightChar.getMonthZhi() },
      day:   { sky: K_SYMBOLS[eightChar.getDayGan()], land: eightChar.getDayZhi() },
      time:  { sky: K_SYMBOLS[eightChar.getTimeGan()], land: eightChar.getTimeZhi() }
    };

    // 2. 강약(Strength) 분석 (득령/득지/득세 가중치 점수화)
    const score = this.calculateStrength(eightChar); 
    const strength = this.getStrengthLabel(score);

    // 3. 조후 및 특수 조합(삼합 등) 체크
    const lands = [eightChar.getYearZhi(), eightChar.getMonthZhi(), eightChar.getDayZhi(), eightChar.getTimeZhi()];
    const hasSamHapWater = lands.includes('申') && lands.includes('子') && lands.includes('辰');
    
    // 분석 결과에 따른 최적 에너지(용신) 추출
    const usefulEnergy = (score > 52) ? ["M", "W"] : ["F", "E", "T"];

    return {
      pillars,
      strength,
      score,
      usefulEnergy,
      isSpecial: hasSamHapWater,
      comboName: hasSamHapWater ? "Triple Water Connection (申子辰)" : null
    };
  }

  private static calculateStrength(eightChar: any): number {
    // 내부 정밀 계산 로직 (기본값 설정)
    return 60; 
  }

  private static getStrengthLabel(score: number): string {
    if (score > 80) return 'EXTREMELY_STRONG';
    if (score > 55) return 'STRONG';
    if (score > 45) return 'BALANCED';
    if (score > 20) return 'WEAK';
    return 'EXTREMELY_WEAK';
  }
}
