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
        <li key={subscribe.id}>
          <SubscribeCard unActive={unActive} subscribeInfo={subscribe} />
        </li>
      ))}
    </ul>
  );
}

export default SubscribeList;
