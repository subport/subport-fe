import type { AddCustomSubscribeReq } from '@/types/subscribe';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateYYYYMMDD = (date: Date) => {
  const pad2 = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};

export function formatKRWInput(raw: string) {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits === '') return '';
  const normalized = digits.replace(/^0+(?=\d)/, '');
  return new Intl.NumberFormat('ko-KR').format(Number(normalized || '0'));
}

export function formatUSDInput(raw: string) {
  let v = raw.replace(/[^\d.]/g, '');

  if (v === '') return '';

  const firstDot = v.indexOf('.');
  if (firstDot !== -1) {
    const before = v.slice(0, firstDot + 1);
    const after = v.slice(firstDot + 1).replace(/\./g, '');
    v = before + after;
  }

  const [intPartRaw, fracRaw = ''] = v.split('.');
  const intDigits = intPartRaw.replace(/^0+(?=\d)/, '');
  const intNumber = Number(intDigits || '0');

  const formattedInt = new Intl.NumberFormat('en-US').format(intNumber);

  const hasDot = firstDot !== -1;

  const frac = fracRaw.slice(0, 2);

  if (hasDot) return `${formattedInt}.${frac}`;
  return formattedInt;
}

export function deleteComma(v: string) {
  return v.split(',').join('');
}

export function buildCustomSubscribeFormData(
  subscribeInfo: AddCustomSubscribeReq,
) {
  const formData = new FormData();

  if (subscribeInfo.image) {
    formData.append('image', subscribeInfo.image);
  }
  formData.append(
    'request',
    new Blob(
      [JSON.stringify({ name: subscribeInfo.name, type: subscribeInfo.type })],
      {
        type: 'application/json',
      },
    ),
  );

  return formData;
}
