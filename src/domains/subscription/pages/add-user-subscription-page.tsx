import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { AddSubscribeType } from '@/schema/add-subscribe-schema';
import { useAddSubscribe } from '@/store/use-subscribe-store';
import PageTitle from '@/components/ui/page-title';
import useGetServiceById from '../services/hooks/queries/use-get-service-by-id';
import AddUserSubscriptionForm from '@/domains/subscription/user-subscription/components/add-user-subscription-form';
import AddUserSubscriptionFormSkeleton from '../user-subscription/components/ui/add-user-subscription-form-skeleton';

function AddUserSubscriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addSubscribe = useAddSubscribe();

  const {
    data: subscriptionService,
    isPending: isGetSubscriptionServicePending,
  } = useGetServiceById(id!);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id, navigate]);

  const onSubmit = (
    formData: AddSubscribeType & {
      subscriptionId: number;
      price: string;
      amountUnit: 'KRW' | 'USD';
    },
  ) => {
    addSubscribe(formData);

    navigate(-1);
  };
  return (
    <div className="flex h-full flex-col">
      <PageTitle>
        구독 서비스 정보를 <br /> 입력해주세요
      </PageTitle>

      {isGetSubscriptionServicePending ? (
        <AddUserSubscriptionFormSkeleton />
      ) : (
        <AddUserSubscriptionForm
          serviceName={subscriptionService!.name}
          id={id as string}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

export default AddUserSubscriptionPage;
