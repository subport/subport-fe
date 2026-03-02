import { client } from './client';

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqRes = {
  faqs: FaqItem[];
};

export const getFaqList = async () => {
  const response = await client.get<FaqRes>('/api/faqs');

  return response.data;
};
