import type { MemberSubscriptions } from '@/types/subscribe';
import SubscribeCard from './subscribe-card';

function SubscribeList({
  subscribeList,
  unActive = false,
}: {
  subscribeList: MemberSubscriptions;
  unActive?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-4">
      {subscribeList.map((subscribe) => (
        <SubscribeCard
          unActive={unActive}
          key={subscribe.id}
          subscribeInfo={subscribe}
        />
      ))}
    </ul>
  );
}

export default SubscribeList;
