import { updatePlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { type PlanItem } from '@/types/plan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdatePlanMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);

      const prevPlanList = queryClient.getQueryData<PlanItem[]>(
        QUERY_KEY.plans.list(variables.subscribeId.toString()),
      );

      const prevPlanItem = queryClient.getQueryData<PlanItem>(
        QUERY_KEY.plans.byId(variables.planId.toString()),
      );

      if (!prevPlanList || !prevPlanItem)
        throw new Error('멤버십 정보를 불러오지 못했습니다.');

      const updatedPlanItem = {
        name: variables.name,
        amount: variables.amount,
        id: variables.planId,
        amountUnit: variables.amountUnit,
        durationMonths: variables.durationMonths,
        defaultProvided: prevPlanItem.defaultProvided,
      };

      const updatedPlanList = prevPlanList.map((plan) =>
        plan.id === variables.planId ? updatedPlanItem : plan,
      );

      queryClient.setQueryData(
        QUERY_KEY.plans.list(variables.subscribeId.toString()),
        updatedPlanList,
      );

      queryClient.setQueryData(
        QUERY_KEY.plans.byId(variables.planId.toString()),
        updatedPlanItem,
      );
    },
  });
}

export default useUpdatePlanMutate;
