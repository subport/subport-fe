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
