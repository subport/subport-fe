import { cn, formatKRWInput } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import useGetSubscriptions from '@/hooks/queries/use-get-subscriptions';
import { Button } from '@/components/ui/button';
import { useSubScribe } from '@/store/use-subscribe-store';
import SubscribeListFallback from '@/components/ui/fallback/subscribe-list-fallback';
import { useAddSubscribeMutate } from '@/hooks/mutations/use-add-subscribe-mutate';

function AddSubscribePage() {
  const navigate = useNavigate();
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetSubscriptions();

  const { removeSubscribe, addSubscriptions, resetSubscribe } = useSubScribe();

  const { mutate: addSubscribe, isPending: isAddSubscribePending } =
    useAddSubscribeMutate({
      onSuccess: () => {
        navigate('/', { replace: true });
        resetSubscribe();
      },
    });
  const selectedIds = new Set(addSubscriptions.map((s) => s.subscriptionId));
  const getSelectSubscribe = (id: number) => {
    console.log(id);
    const selectSubscribe = addSubscriptions.filter(
      (subscribe) => subscribe.subscriptionId === id,
    );
    console.log(selectSubscribe);

    return selectSubscribe[0];
  };

  const sortedSubscriptions = subscriptions?.sort((a, b) => {
    // 선택 된 구독 항목 정렬
    const aSel = selectedIds.has(a.id) ? 0 : 1;
    const bSel = selectedIds.has(b.id) ? 0 : 1;
    return aSel - bSel;
  });

  const onAddSubscribe = async () => {
    const response = await Promise.all(
      addSubscriptions.map((subscribe) =>
        addSubscribe({
          dutchPay: subscribe.dutchPay,
          dutchPayAmount: subscribe.dutchPayAmount,
          memo: subscribe.memo,
          planId: subscribe.planId,
          reminderDaysBeforeEnd: subscribe.reminderDaysBeforeEnd,
          startDate: subscribe.startDate,
          subscriptionId: subscribe.subscriptionId,
        }),
      ),
    );

    console.log(response);
  };

  if (isGetSubscriptionsPending) return <SubscribeListFallback />;
  return (
    <div className="flex h-full flex-col gap-4">
      <ul className="scrollbar-hide space-y-4 overflow-scroll">
        {sortedSubscriptions?.map((subscribe) => {
          const selectSubscribe = selectedIds.has(subscribe.id);

          return (
            <div
              key={subscribe.id}
              onClick={() => {
                if (selectSubscribe) {
                  removeSubscribe(subscribe.id);
                  return;
                }

                navigate(`/subscribe/add/${subscribe.id}`);
              }}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-xl p-4 text-sm transition-all',
                selectSubscribe
                  ? 'bg-primary text-background-black py-5'
                  : 'bg-box-black',
              )}
            >
              <div className="flex items-center gap-2">
                <img
                  src={subscribe.logoImageUrl}
                  className={cn(
                    selectSubscribe ? 'size-11' : 'size-10',
                    'rounded-lg object-contain',
                  )}
                  alt={`${subscribe.name} 로고 이미지`}
                />
                <div className="flex flex-col font-semibold">
                  <p>{subscribe.name}</p>
                  {selectSubscribe && (
                    <span>{`${formatKRWInput(getSelectSubscribe(subscribe.id).price.toString())}${getSelectSubscribe(subscribe.id).amountUnit === 'KRW' ? '원' : '$'}`}</span>
                  )}
                </div>
              </div>
              <Checkbox checked={selectSubscribe} />
            </div>
          );
        })}
      </ul>
      {addSubscriptions.length > 0 && (
        <Button
          disabled={isAddSubscribePending}
          onClick={onAddSubscribe}
          className="w-full"
        >
          다음으로
        </Button>
      )}
    </div>
  );
}

export default AddSubscribePage;
