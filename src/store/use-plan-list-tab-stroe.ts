import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

type PlanState = {
  planName: string;
  planId: number;
  price: number;
};

const initialState = {
  planId: 0,
  planName: '',
  price: 0,
};

export const usePlanSelectionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setPlan: ({ planName, planId, price }: PlanState) => {
          set({ planId, planName, price });
        },
      },
    })),
  ),
);

export const useGetSelectPlan = () => {
  const planId = usePlanSelectionStore((state) => state.planId);
  const planName = usePlanSelectionStore((state) => state.planName);
  const price = usePlanSelectionStore((state) => state.price);
  return { planId, planName, price };
};

export const usePlanSelection = () => {
  const {
    actions: { setPlan },
    planId,
    planName,
    price,
  } = usePlanSelectionStore();

  return {
    setPlan,
    planId,
    planName,
    price,
  };
};
