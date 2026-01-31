import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSubscribeForm from '@/components/subscribe/add-subscribe-form';

function AddSubscribeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO : 구독 목록에 없는 ID라면 add-subscribe 페이지로 이동
    if (!id) {
      navigate(-1);
    }
  }, [id, navigate]);

  return (
    <div className="flex h-full flex-col">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스 정보를 입력해주세요
      </p>

      <AddSubscribeForm id={id as string} />
    </div>
  );
}

export default AddSubscribeFormPage;
