import useGetMemberSubscriptions from '@/hooks/queries/use-get-member-subscriptions';
import SubscribeListFallback from '../ui/fallback/subscribe-list-fallback';
import UserSubscriptionList from '@/domains/subscription/user-subscription/components/user-subscription-list';
import mappingUserSubscriptionList from '@/domains/subscription/user-subscription/model/mapper';

function MySubscriptionsList() {
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetMemberSubscriptions({ active: true, sortBy: 'createdAt' });

  if (isGetSubscriptionsPending) return <SubscribeListFallback />;
  if (!subscriptions) return <p>목록 불러오기 실패</p>;

  const userSubscriptionList = mappingUserSubscriptionList(
    { active: true, sortBy: 'createdAt' },
    subscriptions,
  );
  return (
    <div className="scrollbar-hide h-full overflow-scroll pb-4">
      {userSubscriptionList.sections.length > 0 && (
        <>
          <p className="mb-4 text-lg font-semibold">{`${subscriptions.subscriptions.length}건 구독 중`}</p>
          <UserSubscriptionList sections={userSubscriptionList.sections} />
        </>
      )}
      {userSubscriptionList.sections.length === 0 && (
        <>
          <p className="text-sub-font-black flex h-full items-center justify-center">
            구독하고 있는 서비스가 존재하지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

export default MySubscriptionsList;
