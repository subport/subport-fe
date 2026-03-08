import { Link } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlanType } from '../subscribe/add-subscribe-form';
import { useState } from 'react';
import type { PlanItem } from '@/types/plan';

type PlanSelectorProps = {
  subscribeId: string;
  defaultValue?: string;
  onSelect: (selectPlan: PlanType) => void;
  plans: PlanItem[];
};

function PlanSelector({
  subscribeId,
  defaultValue,
  onSelect,
  plans,
}: PlanSelectorProps) {
  const [currentPlan, setCurrentPlan] = useState(defaultValue || null);

  const handleValueChange = (value: string) => {
    const selectedPlan = plans!.find((plan) => plan.id.toString() === value)!;
    setCurrentPlan(value);

    if (!selectedPlan) return;
    onSelect({
      amountUnit: selectedPlan.amountUnit,
      id: selectedPlan.id,
      name: selectedPlan.name,
      price: selectedPlan.amount,
    });
  };

  return (
    <div className="scrollbar-hide space-y-4 overflow-y-scroll">
      {plans && plans.length > 0 && (
        <>
          <RadioGroup value={currentPlan}>
            {plans.map((plan) => (
              <div
                onClick={() => handleValueChange(plan.id.toString())}
                key={plan.id}
                className="bg-box-black hover:bg-box-black/80 flex cursor-pointer items-center justify-between rounded-2xl px-5 py-4 transition-colors"
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
          <Link
            to={`/subscribe/${subscribeId}/plan/add`}
            className="hover:bg-box-black/80 bg-box-black flex h-32 w-full items-center justify-center rounded-2xl transition-colors"
          >
            <Plus className="size-10" strokeWidth={2} />
          </Link>
        </>
      )}
      {plans && plans.length <= 0 && (
        <Link
          to={`/subscribe/${subscribeId}/plan/add`}
          className="hover:bg-box-black/80 bg-box-black flex h-32 w-full items-center justify-center rounded-2xl transition-colors"
        >
          <Plus className="size-10" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}

export default PlanSelector;
