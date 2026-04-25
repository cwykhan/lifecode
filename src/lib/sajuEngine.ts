// lib/sajuEngine.ts
import { Solar } from 'lunar-javascript';
import { KAN_DATA, JI_DATA } from './sajuConstants';

export interface SajuUnit {
  kan: string;
  ji: string;
  kanColor: string;
  jiColor: string;
  label: string;
}

export const decodeFate = (birthDate: string): SajuUnit[] => {
  const solar = Solar.fromDate(new Date(birthDate));
  const lunar = solar.getLunar();
  const eightChars = lunar.getEightChar();

  const raw = [
    { k: eightChars.getTimeGan(), j: eightChars.getTimeZhi(), l: 'Hour' },
    { k: eightChars.getDayGan(), j: eightChars.getDayZhi(), l: 'Day' },
    { k: eightChars.getMonthGan(), j: eightChars.getMonthZhi(), l: 'Month' },
    { k: eightChars.getYearGan(), j: eightChars.getYearZhi(), l: 'Year' },
  ];

  return raw.map(item => ({
    kan: KAN_DATA[item.k as keyof typeof KAN_DATA]?.code || '?',
    ji: JI_DATA[item.j as keyof typeof JI_DATA]?.code || '?',
    kanColor: KAN_DATA[item.k as keyof typeof KAN_DATA]?.color || 'text-white',
    jiColor: 'text-white', // 지지 색상은 필요에 따라 정의
    label: item.l
  }));
};
