import AddCustomSubscribeForm from '@/components/subscribe/add-custom-subscribe-form';

import useAddCustomSubscribeMutate from '@/hooks/mutations/use-add-custom-subscribe-mutate';
import type { AddCustomSubscribeReq } from '@/types/subscribe';

function AddCustomSubscribePage() {
  const { mutate: addCustomSubscribe, isPending: isAddCustomSubscribePending } =
    useAddCustomSubscribeMutate();

  const onSubmit = (formData: AddCustomSubscribeReq) => {
    addCustomSubscribe(formData);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스를 추가하시겠어요?
      </p>

      <AddCustomSubscribeForm
        onSubmit={onSubmit}
        disabled={isAddCustomSubscribePending}
      />
    </div>
  );
}

export default AddCustomSubscribePage;
