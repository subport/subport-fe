import FieldWrapper from '../ui/field-wrapper';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addSubscribeSchema,
  type AddSubscribeType,
} from '@/schema/add-subscribe-schema';
import useGetSubscriptionsById from '@/hooks/queries/use-get-subscriptions-by-id';
import { useEffect, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { cn, formatKRWInput } from '@/lib/utils';
import { Button } from '../ui/button';
import PlanListBottomModal from '../modal/plan-list-bottom-modal';

import DatePicker from '../form/date-picker';
import ErrorMessage from '../ui/error-message';
import { useAddSubscribe } from '@/store/use-subscribe-store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
export type PlanType = {
  id: string;
  name: string;
  price?: number;
  amountUnit: 'KRW' | 'USD';
};

function AddSubscribeForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: subscribe } = useGetSubscriptionsById(id);
  const addSubscribe = useAddSubscribe();
  const [plan, setPlan] = useState(false);
  const [selectPlan, setSelctPlan] = useState<PlanType>();
  const [dutchPay, setDutchPay] = useState(false);

  const form = useForm({
    resolver: zodResolver(addSubscribeSchema),
    defaultValues: {
      dutchPay: false,
      dutchPayAmount: '0',
      memo: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      planId: undefined,
      reminderDaysBeforeEnd: 1,
    },
  });

  const onSelectPlan = (plan: PlanType) => {
    setSelctPlan(plan);
    form.setValue('planId', Number(plan.id), { shouldValidate: true });
  };

  useEffect(() => {
    if (!dutchPay) {
      form.setValue('dutchPayAmount', '0', { shouldValidate: true });
    }
  }, [dutchPay, form]);

  const dutchPayAmount = form.watch('dutchPayAmount');
  const isDutchPayAmountValid = !dutchPay || dutchPayAmount !== '0';

  const onSubmit = (formData: AddSubscribeType) => {
    addSubscribe({
      subscriptionId: Number(id),
      dutchPay: formData.dutchPay,
      dutchPayAmount: formData.dutchPay ? formData.dutchPayAmount : null,
      planId: formData.planId,
      memo: formData.memo,
      reminderDaysBeforeEnd: formData.reminderDaysBeforeEnd,
      startDate: formData.startDate,
      price: formData.dutchPay
        ? (formData.dutchPayAmount as string)
        : (selectPlan!.price as unknown as string),
      amountUnit: selectPlan!.amountUnit,
    });

    navigate('/subscribe/add', { replace: true });
  };

  if (!subscribe) return <p>Loading</p>;

  return (
    <>
      <form
        id="add-subscribe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="scrollbar-hide flex-1 overflow-scroll"
      >
        <div className="mb-10 space-y-4">
          <FieldWrapper label="서비스 이름" id="service-name">
            <div className="text-lg">{subscribe.name}</div>
          </FieldWrapper>

          <Controller
            name="planId"
            control={form.control}
            render={() => (
              <FieldWrapper label="멤버십 종류" id="planId">
                <div
                  className={cn(
                    'w-full cursor-pointer text-lg',
                    selectPlan?.name ? 'text-white' : 'text-sub-font-black',
                  )}
                  onClick={() => setPlan(true)}
                >
                  {selectPlan?.name || '멤버십을 선택해주세요'}
                </div>
              </FieldWrapper>
            )}
          />

          <PlanListBottomModal
            open={plan}
            onClose={() => setPlan((prev) => !prev)}
            onSelect={onSelectPlan}
            defaultValue={selectPlan?.id}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              id="dutchPay"
              checked={dutchPay}
              onClick={() => {
                form.setValue('dutchPay', !dutchPay);
                setDutchPay((prev) => !prev);
              }}
              className="data-[state=checked]:bg-primary"
            />
            <label htmlFor="dutchPay" className="cursor-pointer">
              다른 사람과 함께 이용중이에요
            </label>
          </div>

          {dutchPay && (
            <Controller
              name="dutchPayAmount"
              control={form.control}
              render={({ field }) => (
                <FieldWrapper label="직접 입력" id="dutchPayAmount">
                  <div className="flex w-full items-center gap-2">
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      id="dutchPayAmount"
                      className="w-full text-right text-xl outline-none"
                      onChange={(e) => {
                        if (e.target.value.length > 8) return;
                        field.onChange(formatKRWInput(e.target.value));
                      }}
                      value={field.value ?? '0'}
                    />
                    <div className="text-sub-font-black text-lg">원</div>
                  </div>
                </FieldWrapper>
              )}
            />
          )}
          <Controller
            name="startDate"
            control={form.control}
            render={() => (
              <FieldWrapper label="결제 시작일" id="startDate">
                <DatePicker
                  onChange={({ year, month, day }) => {
                    const startDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day),
                    );

                    console.log(startDate);
                    form.setValue(
                      'startDate',
                      format(startDate, 'yyyy-MM-dd'),
                      {
                        shouldValidate: true,
                      },
                    );
                  }}
                />
              </FieldWrapper>
            )}
          />

          <Controller
            rules={{
              required: '알림주기는 최소 1일전 입니다.',
              min: { value: 1, message: '알림주기는 최소 1일전 입니다.' },
            }}
            name="reminderDaysBeforeEnd"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <div>
                  <FieldWrapper
                    error={fieldState.invalid}
                    label="알림주기"
                    id="reminderDaysBeforeEnd"
                    className={fieldState.invalid ? 'mb-2' : undefined}
                  >
                    <div className="flex w-full items-center gap-2">
                      <input
                        {...field}
                        inputMode="numeric"
                        min={0}
                        type="number"
                        id="reminderDaysBeforeEnd"
                        className="min-w-0 flex-1 text-right text-xl outline-none"
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          if (raw === '') {
                            field.onChange('');
                            form.setError('reminderDaysBeforeEnd', {
                              message: '알림주기는 최소 1일전 입니다.',
                            });
                            return;
                          }
                          const next = Number(raw);
                          if (next < 1 || next > 10) return;
                          form.clearErrors('reminderDaysBeforeEnd');
                          field.onChange(next);
                        }}
                        value={field.value ?? 1}
                      />
                      <div className="text-sub-font-black shrink-0 text-lg whitespace-nowrap">
                        일전
                      </div>
                    </div>
                  </FieldWrapper>
                  {fieldState.invalid && (
                    <ErrorMessage
                      message={fieldState.error?.message as string}
                    />
                  )}
                </div>
              );
            }}
          />

          <Controller
            name="memo"
            control={form.control}
            render={({ field }) => (
              <FieldWrapper label="메모" id="memo">
                <textarea
                  name="memo"
                  id="memo"
                  className="scrollbar-hide w-full resize-none text-lg outline-none"
                  placeholder="메모 남기기"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FieldWrapper>
            )}
          />
        </div>
      </form>

      <div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sub-font-black">지출금액</span>
          <span className="text-2xl font-semibold">
            {dutchPay
              ? `${form.watch('dutchPayAmount')} 원`
              : `${Number(selectPlan?.price || 0).toLocaleString()} 원`}
          </span>
        </div>

        <Button
          form="add-subscribe-form"
          type="submit"
          disabled={
            !form.formState.isValid ||
            (!selectPlan && !form.formState.isValid) ||
            !isDutchPayAmountValid
          }
          className="w-full self-end"
        >
          저장하기
        </Button>
      </div>
    </>
  );
}

export default AddSubscribeForm;
