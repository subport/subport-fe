import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 천 단위 포맷팅 함수
export function formatNumberWithComma(
  value: number | string,
  max: number = Number.MAX_SAFE_INTEGER,
) {
  if (value.toString().length === 0) return 0;

  const digits = String(value).replace(/[^\d]/g, '');
  if (digits === '') return '';

  const trimmed = digits.replace(/^0+(?=\d)/, '');
  const clamped = String(Math.min(Number(trimmed || '0'), max));

  return clamped.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatDateYYYYMMDD = (date: Date) => {
  const pad2 = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};
