import SpendingSubscriptionRecords from '@/components/my/spending-subscription-records';
import SubscribeCalender from '@/components/my/subscribe-calender';
import useGetSpendingRecords from '@/hooks/queries/use-get-spending-records';
import useGetSpendingRecordsByDate from '@/hooks/queries/use-get-spending-records-by-date';
import { format, parse } from 'date-fns';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function MySubscribeSchedulePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get('month')
    ? parse(searchParams.get('month')!, 'yyyy-MM', new Date())
    : new Date();

  const day = searchParams.get('day')
    ? parse(searchParams.get('day')!, 'yyyy-MM-dd', new Date())
    : undefined;
  const { data: spendingRecords, isPending: isGetSpendingRecords } =
    useGetSpendingRecords(month);

  const { data: spendingRecordsByDate } = useGetSpendingRecordsByDate(day);

  useEffect(() => {
    if (searchParams.get('month')) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('month', format(new Date(), 'yyyy-MM'));
        return next;
      },
      { replace: true },
    );
  }, [searchParams, setSearchParams]);

  if (isGetSpendingRecords) return null;
  if (!spendingRecords) return null;

  return (
    <div>
      <div>
        <SubscribeCalender
          paymentDates={spendingRecords.paymentDates}
          totalAmount={spendingRecords.totalAmount}
          amountDiffFromPreviousMonth={
            spendingRecords.amountDiffFromPreviousMonth
          }
          onMonthChange={(d: Date) => {
            setSearchParams(
              (prev) => {
                const next = new URLSearchParams(prev);
                next.set('month', format(d, 'yyyy-MM'));
                next.delete('day');
                return next;
              },
              { replace: true },
            );
          }}
          onSelectDay={(d: Date | undefined) => {
            if (d) {
              setSearchParams(
                (prev) => {
                  const next = new URLSearchParams(prev);
                  next.set('day', format(d, 'yyyy-MM-dd'));

                  return next;
                },
                { replace: true },
              );
            }
          }}
          viewMonth={month}
          selectedDay={day}
        />
      </div>

      <div aria-hidden className="bg-box-black w-vw z-30 -mx-6 my-5 h-2.5" />

      <div className="scrollbar-hide h-full space-y-4 overflow-y-scroll pb-5">
        {day && (
          <p className="text-xl font-semibold">{`${format(day, 'M')}월 ${format(day, 'd')}일`}</p>
        )}

        {spendingRecordsByDate && (
          <>
            {spendingRecordsByDate.completedRecords.length > 0 && (
              <SpendingSubscriptionRecords
                selectedDate={day!}
                variant="complete"
                records={spendingRecordsByDate.completedRecords}
              />
            )}

            {spendingRecordsByDate.ongoingRecords.length > 0 && (
              <SpendingSubscriptionRecords
                selectedDate={day!}
                variant="ongoing"
                records={spendingRecordsByDate.ongoingRecords}
              />
            )}

            {spendingRecordsByDate.completedRecords.length === 0 &&
              spendingRecordsByDate.ongoingRecords.length === 0 && (
                <p className="text-sub-font-black h-full py-10 text-center">
                  결제 내역이 존재하지 않습니다
                </p>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default MySubscribeSchedulePage;
