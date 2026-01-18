import { Link, useParams } from 'react-router-dom';

import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';
import useGetPlanList from '@/hooks/queries/use-get-plan-list';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useState } from 'react';
import type { PlanType } from '../subscribe/add-subscribe-form';

interface PlanListBottomModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: ({ id, name, price }: PlanType) => void;
  defaultValue?: string;
}

function PlanListBottomModal({
  open,
  onClose,
  onSelect,
  defaultValue,
}: PlanListBottomModalProps) {
  console.log(defaultValue);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultValue,
  );
  const { id } = useParams();
  const { data: plans } = useGetPlanList(id as string);

  const handleOpenChange = () => {
    setSelectedId(defaultValue);
    onClose();
  };

  if (!plans) return null;

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerTitle className="mb-4 px-4 py-2 text-xl font-semibold text-white">
          <div className="flex items-center justify-between">
            <div className="items-cetner flex gap-2">
              <span>멤버십 종류</span>
              <Link
                to="/add-subscribe"
                target="_blank"
                className="block rounded-full bg-[#95A3B9] px-2.5 py-1.5 text-xs font-light"
              >
                살펴보기
              </Link>
            </div>
            <Link
              to="/add-subscribe"
              className="bg-box-black block rounded-full px-3.5 py-2.5 text-xs"
            >
              직접입력
            </Link>
          </div>
        </DrawerTitle>

        <div className="scrollbar-hide mb-4 space-y-4 overflow-y-scroll">
          <RadioGroup
            value={selectedId}
            onValueChange={(value) => setSelectedId(value)}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-box-black flex cursor-pointer items-center justify-between rounded-2xl p-4"
                onClick={() => setSelectedId(plan.id.toString())}
              >
                <div>
                  <p className="mb-2 text-xl font-semibold">{plan.name}</p>
                  <span className="text-sub-font-black">
                    {`${plan.durationMonths > 1 ? `${plan.durationMonths}개월` : '월'} ${Number(plan.amount).toLocaleString()}원`}
                  </span>
                </div>
                <RadioGroupItem value={plan.id.toString()} />
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={'secondary'}
            onClick={handleOpenChange}
            className="w-[30%]"
          >
            닫기
          </Button>
          <Button
            onClick={() => {
              const selectedPlan = plans.find(
                (plan) => plan.id.toString() === selectedId,
              );

              if (!selectedPlan) return;

              onSelect({
                id: selectedPlan.id.toString(),
                name: selectedPlan.name,
                price: selectedPlan.amount,
              });
              onClose();
            }}
            type="button"
            className="w-[70%]"
          >
            저장하기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PlanListBottomModal;
