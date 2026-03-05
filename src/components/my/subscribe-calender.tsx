import 'react-day-picker/style.css';

import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { formatKRWInput } from '@/lib/utils';
import CalenDerTrigger from '../calender/calender-trigger';
import type { PaymentDates } from '@/api/calender';
import SpendingStateDot from './spending-state-dot';

interface SubscribeCalenderProps {
  totalAmount: number;
  amountDiffFromPreviousMonth: number;
  onMonthChange: (d: Date) => void;
  onSelectDay: (d: Date | undefined) => void;
  viewMonth: Date;
  selectedDay: Date | undefined;
  paymentDates: PaymentDates;
}

function SubscribeCalender({
  totalAmount,
  amountDiffFromPreviousMonth,
  onMonthChange,
  onSelectDay,
  viewMonth,
  selectedDay,
  paymentDates,
}: SubscribeCalenderProps) {
  return (
    <>
      <CalenDerTrigger
        onSelectedDay={onSelectDay}
        onMonthChange={onMonthChange}
        currentDate={viewMonth}
      />

      <div className="py-5">
        <p className="text-2xl font-semibold">{`${formatKRWInput(totalAmount.toString())}원`}</p>
        <p className="text-sm text-[#5EC3B6]">
          {amountDiffFromPreviousMonth < 0
            ? `지난달보다 ${formatKRWInput(Math.abs(amountDiffFromPreviousMonth).toString())}원 줄었어요`
            : `지난달보다 ${formatKRWInput(amountDiffFromPreviousMonth.toString())}원 늘었어요`}
        </p>
      </div>

      <DayPicker
        month={viewMonth}
        required
        showOutsideDays
        animate
        mode="single"
        selected={selectedDay}
        onSelect={onSelectDay}
        onMonthChange={onMonthChange}
        hideNavigation
        locale={ko}
        lang="ko-KR"
        classNames={{
          months: 'w-full',
          month_grid: 'w-full',
          outside: 'bg-background-black',
          day: ' relative bg-box-black  rounded-lg w-1/7 border-2 border-box-black transition-all',
          day_button:
            'flex w-full h-full items-end  pt-5 [@media(min-width:390px)]:pt-7  [@media(min-width:430px)]:pt-8  pb-1 justify-center cursor-pointer',
          week: 'flex justify-between gap-1.5',
          weeks: 'space-y-1.5',
          weekdays: 'flex justify-between',
          weekday: 'w-[42px] text-sub-font-black font-medium text-sm py-2',
          selected: 'border-2  border-white',
          today: '',
        }}
        components={{
          Day: ({ day, children, ...rest }) => {
            const date = day.date.getDate();
            const hasSpending = !!paymentDates[date];

            return (
              <>
                <td {...rest}>
                  {hasSpending && (
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5">
                      {paymentDates[date].hasSubscription && (
                        <SpendingStateDot state={'ongoing'} />
                      )}
                      {paymentDates[date].hasSpending && (
                        <SpendingStateDot state={'complete'} />
                      )}
                    </div>
                  )}

                  {children}
                </td>
              </>
            );
          },
        }}
        disabled={(date) =>
          date.getMonth() !== viewMonth?.getMonth() ||
          date.getFullYear() !== viewMonth?.getFullYear()
        }
      />
    </>
  );
}

export default SubscribeCalender;
