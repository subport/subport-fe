export type PlanItem = {
  id: number;
  name: string;
  amount: number;
  amountUnit: string;
  durationMonths: number;
};

export type PlanList = {
  plans: PlanItem[];
};

export type AddPlanReq = {
  name: string;
  amount: number;
  amountUnit: 'KRW' | 'USD';
  durationMonths: number;
};
