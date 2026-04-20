import { Outlet, useParams } from 'react-router-dom';
import useGetUserSubscriptionById from '../../hooks/queries/use-get-user-subscription-by-id';
import { Loader2 } from 'lucide-react';

function UserSubscriptionEditLayout() {
  const { userSubscribeId } = useParams();
  const { data: userSubscription, isPending } = useGetUserSubscriptionById(
    userSubscribeId!,
  );

  if (isPending)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="text-primary animate-spin" />
      </div>
    );

  if (!userSubscription) return <p>데이터 없음</p>;
  return <Outlet context={{ userSubscription }} />;
}

export default UserSubscriptionEditLayout;
