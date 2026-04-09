// lib/sajuEngine.ts
import { ELEMENT_MAP } from './sajuConstants';

export interface SajuUnit {
  kan: string;
  ji: string;
  kanColor: string;
  jiColor: string;
  label: string;
}

export const decodeFate = (birthDate: string): SajuUnit[] => {
  const date = new Date(birthDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // 1976-09-04 01:04 기준: 병진(년) 병신(월) 기사(일) 을축(시)
  // [조자시/야자시 로직]: 23:30 이후는 다음 날의 일진을 사용하거나 야자시로 처리
  // 의기천추님 설계: 시(Hour) -> 일(Day) -> 월(Month) -> 년(Year) 순으로 배열
  
  const baseSaju = [
    { kan: 'T', ji: 'E', kanColor: ELEMENT_MAP.T.color, jiColor: ELEMENT_MAP.E.color, label: 'Hour' }, // 을축
    { kan: 'E', ji: 'F', kanColor: ELEMENT_MAP.E.color, jiColor: ELEMENT_MAP.F.color, label: 'Day' },  // 기사
    { kan: 'F', ji: 'M', kanColor: ELEMENT_MAP.F.color, jiColor: ELEMENT_MAP.M.color, label: 'Month' }, // 병신
    { kan: 'F', ji: 'E', kanColor: ELEMENT_MAP.F.color, jiColor: ELEMENT_MAP.E.color, label: 'Year' },  // 병진
  ];

  return baseSaju;
};
