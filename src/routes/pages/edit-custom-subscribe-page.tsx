import AddCustomSubscribeForm from '@/components/subscribe/add-custom-subscribe-form';
import useUpdateCustomSubscribeMutate from '@/hooks/mutations/use-update-custom-subscribe-mutate';
import useGetSubscriptionsById from '@/hooks/queries/use-get-subscriptions-by-id';
import type { AddCustomSubscribeReq } from '@/types/subscribe';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function EditCustomSubscribePage() {
  const navigate = useNavigate();
  const { subscribeId } = useParams();

  const { mutate: updateSubscribe, isPending: isUpdateSubscribePending } =
    useUpdateCustomSubscribeMutate({
      onSuccess: () => {
        toast.success('수정되었어요', {
          position: 'bottom-center',
        });

        navigate(-1);
      },
    });
  const { data: subscribe, isPending: isGetSubscribePending } =
    useGetSubscriptionsById(subscribeId!);

  console.log(subscribe);

  const onSubmit = (formData: AddCustomSubscribeReq) => {
    console.log(formData);
    updateSubscribe({
      subscribeId: subscribeId!.toString(),
      subscribeInfo: formData,
    });
  };

  if (isGetSubscribePending) return <p>로딩</p>;

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스 정보를 입력해주세요
      </p>
      <AddCustomSubscribeForm
        prevLogoImage={subscribe?.logoImageUrl}
        name={subscribe?.name}
        type={subscribe?.type}
        onSubmit={onSubmit}
        disabled={isUpdateSubscribePending}
      />
    </div>
  );
}

export default EditCustomSubscribePage;
