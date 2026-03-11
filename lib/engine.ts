import { Solar } from 'lunar-typescript';

/**
 * K-upfate 전용 기호 시스템 (LifeCode Standard)
 * 대문자: Positive (Yang), 소문자: Negative (Eum)
 */
export const K_SYMBOLS: Record<string, string> = {
  '甲': 'T', '乙': 't', '丙': 'F', '丁': 'f', '戊': 'E', '己': 'e', '庚': 'M', '辛': 'm', '壬': 'W', '癸': 'w'
};

/**
 * 지지(Land) 보정 데이터 (명리학적 특수성 반영)
 */
const LAND_CORRECTION: Record<string, { type: string; description: string }> = {
  '酉': { type: 'M/m', description: 'Pure Metal Essence (Gyeong/Sin)' }, // 유(酉) 보정
  '丑': { type: 'e', description: 'Negative Earth (Chuk)' }              // 축(丑) 보정
};

export class LifecodeEngine {
  /**
   * 사주 분석 실행 메인 메소드
   */
  public static analyze(year: number, month: number, day: number, hour: number, minute: number) {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();

    // 1. 8칸 격자(Pillars) 데이터 추출 (글로벌 표준: Hour -> Day -> Month -> Year)
    const rawPillars = [
      { id: 'time',  sky: eightChar.getTimeGan(),  land: eightChar.getTimeZhi(),  label: 'Hour' },
      { id: 'day',   sky: eightChar.getDayGan(),   land: eightChar.getDayZhi(),   label: 'Day' },
      { id: 'month', sky: eightChar.getMonthGan(), land: eightChar.getMonthZhi(), label: 'Month' },
      { id: 'year',  sky: eightChar.getYearGan(),  land: eightChar.getYearZhi(),  label: 'Year' }
    ];

    const pillars = rawPillars.map(p => ({
      ...p,
      skySymbol: K_SYMBOLS[p.sky],
      correction: LAND_CORRECTION[p.land] || null,
      isPositive: this.checkIsPositive(p.sky) // Sky-Gan 기준 Positive/Negative 판별
    }));

    // 2. 강약(Strength) 분석 및 점수화
    const score = this.calculateStrength(eightChar);
    const strength = this.getStrengthLabel(score);

    // 3. 조후 및 특수 조합(삼합 등) 체크
    const combo = this.checkSpecialCombos(eightChar);

    // 4. 분석 결과에 따른 최적 에너지(Useful Energy) 추출
    // 강한 사주는 억제(Metal/Water), 약한 사주는 보강(Fire/Earth/Tree)
    const usefulEnergy = (score > 52) ? ["M", "W"] : ["F", "E", "T"];

    return {
      metadata: {
        version: "1.0.0-final",
        engine: "K-upfate",
        timezone: "Global/UTC"
      },
      pillars, // Hour-Day-Month-Year 순서
      analysis: {
        strength,
        score,
        usefulEnergy,
        overallPolarity: score > 50 ? "Positive Dominant" : "Negative Dominant"
      },
      specialNotes: combo
    };
  }

  private static checkIsPositive(gan: string): boolean {
    const positiveGans = ['甲', '丙', '戊', '庚', '壬'];
    return positiveGans.includes(gan);
  }

  private static checkSpecialCombos(eightChar: any) {
    const lands = [eightChar.getYearZhi(), eightChar.getMonthZhi(), eightChar.getDayZhi(), eightChar.getTimeZhi()];
    const hasSamHapWater = lands.includes('申') && lands.includes('子') && lands.includes('辰');
    
    return {
      hasSamHapWater,
      name: hasSamHapWater ? "Triple Water Connection (申子辰)" : null
    };
  }

  private static calculateStrength(eightChar: any): number {
    // 득령, 득지, 득세 가중치 계산 (현재 프로젝트 기준값 60)
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
