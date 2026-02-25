import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSubscribeForm from '@/components/subscribe/add-subscribe-form';
import type { AddSubscribeType } from '@/schema/add-subscribe-schema';
import { useAddSubscribe } from '@/store/use-subscribe-store';

function AddSubscribeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addSubscribe = useAddSubscribe();

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
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스 정보를 입력해주세요
      </p>

      <AddSubscribeForm id={id as string} onSubmit={onSubmit} />
    </div>
  );
}

export default AddSubscribeFormPage;
