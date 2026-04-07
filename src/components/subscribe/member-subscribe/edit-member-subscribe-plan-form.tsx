import PlanSelectionList from '@/domains/subscription/plans/components/plan-selection-list';
import { Button } from '@/components/ui/button';
import useUpdateMemberSubscribePlanMutate from '@/hooks/mutations/use-update-member-subscribe-plan-mutate';
import useGetPlanList from '@/domains/subscription/plans/hooks/queries/use-get-plan-list';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function EditMemberSubscribePlanForm({
  subscribeId,
  prevPlanId,
}: {
  subscribeId: string;
  prevPlanId?: string;
}) {
  const { data: plans, isPending: isGetPlansPending } =
    useGetPlanList(subscribeId);
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState(prevPlanId);
  const { memberSubscribeId: currentMemberSubscirbeId } = useParams();
  const [disabled, setDisabled] = useState(true);

  const { mutate: updatePlan } = useUpdateMemberSubscribePlanMutate({
    onSuccess: () => {
      navigate(-1);

      toast.success('멤버십이 수정되었습니다.', {
        position: 'bottom-center',
      });
    },
  });

  const handleSelect = (selectPlanId: string) => {
    if (selectPlanId !== prevPlanId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    setCurrentPlan(selectPlanId);
  };

  const handleClick = () => {
    if (currentPlan && currentMemberSubscirbeId) {
      updatePlan({
        subscribeId: currentMemberSubscirbeId?.toString(),
        planId: currentPlan,
      });
    }
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
          멤버십 종류를 선택해주세요
        </p>
        <Link
          to={`manage/${subscribeId}`}
          className="bg-box-black rounded-full px-5 py-2 text-xs"
        >
          관리
        </Link>
      </div>
      <div className="scrollbar-hide flex-1 overflow-scroll">
        {!isGetPlansPending && plans && (
          <PlanSelectionList
            plans={plans.plans}
            value={currentPlan || prevPlanId}
            serviceId={subscribeId!}
            onSelect={(selectPlan) => handleSelect(selectPlan.id.toString())}
          />
        )}
      </div>
      <div className="rounded-t-2xl pt-4">
        <Button onClick={handleClick} disabled={disabled} className="w-full">
          저장하기
        </Button>
      </div>
    </section>
  );
}

export default EditMemberSubscribePlanForm;
