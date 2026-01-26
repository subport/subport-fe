import { Link, useNavigate, useParams } from 'react-router-dom';
import Informationicon from '@/assets/icons/information-icon.svg?react';

import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';
import useGetPlanList from '@/hooks/queries/use-get-plan-list';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useState } from 'react';
import type { PlanType } from '../subscribe/add-subscribe-form';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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
  const navigate = useNavigate();
  const [openDrawer, setOpenDarwer] = useState(false);
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

  const selectedPlan = plans.find((plan) => plan.id.toString() === selectedId);
  const showUsdTooltip = selectedPlan?.amountUnit === 'USD';

  return (
    <>
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent
          onAnimationEnd={() => {
            if (open) {
              setOpenDarwer(true);
            }
            if (!open) {
              setOpenDarwer(false);
            }
          }}
        >
          <DrawerTitle className="mb-4 px-4 py-2 text-xl font-semibold text-white">
            <div className="flex items-center justify-between">
              <Tooltip open={open && openDrawer && showUsdTooltip}>
                <TooltipTrigger asChild>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1 left-1/2 size-0 -translate-x-1/2 bg-white"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  sideOffset={10}
                  avoidCollisions={false}
                  className="bg-primary text-background-black flex items-center gap-1"
                >
                  <Informationicon />
                  <span>
                    환율 및 카드사 수수료에 따라 매달 결제 금액이 달라집니다
                  </span>
                </TooltipContent>
              </Tooltip>
              <div className="items-cetner flex gap-2">
                <span className="text-xl">멤버십 종류</span>
                <Link
                  to="/subscribe/add"
                  target="_blank"
                  className="text-background-black flex items-center rounded-full bg-[#E9ECEF] px-2 py-1.5 text-xs font-bold"
                >
                  살펴보기
                </Link>
              </div>
              <button
                type="button"
                onClick={() => navigate('plan/edit')}
                className="bg-box-black block cursor-pointer rounded-full px-5 py-1.5 text-xs"
              >
                관리
              </button>
            </div>
          </DrawerTitle>

          <div className="scrollbar-hide mb-4 space-y-4 overflow-y-scroll">
            {plans.length > 0 && (
              <RadioGroup
                value={selectedId}
                onValueChange={(value) => setSelectedId(value)}
              >
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-box-black hover:bg-box-black/80 flex cursor-pointer items-center justify-between rounded-2xl px-5 py-4 transition-colors"
                    onClick={() => {
                      setSelectedId(plan.id.toString());
                    }}
                  >
                    <div>
                      <p className={cn('mb-2 text-lg font-semibold')}>
                        {plan.name}
                      </p>
                      <span className="text-sub-font-black text-sm">
                        {`${plan.durationMonths > 1 ? `${plan.durationMonths}개월` : '월'} ${Number(plan.amount).toLocaleString()}${plan.amountUnit === 'KRW' ? '₩' : '$'}`}
                      </span>
                    </div>

                    <RadioGroupItem value={plan.id.toString()} />
                  </div>
                ))}
              </RadioGroup>
            )}
            <Link
              to={`/subscribe/add/${id}/plan/add`}
              className="hover:bg-box-black/80 bg-box-black flex h-32 w-full items-center justify-center rounded-2xl transition-colors"
            >
              <Plus className="size-10" strokeWidth={2} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="secondary"
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
                  amountUnit: selectedPlan.amountUnit as 'USD' | 'KRW',
                });
                onClose();
              }}
              type="button"
              className="w-[65%]"
            >
              저장하기
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PlanListBottomModal;
