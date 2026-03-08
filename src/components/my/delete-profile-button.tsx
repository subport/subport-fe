import QuitIcon from '@/assets/icons/quit-icon.svg';
import useDeleteProfileMutate from '@/hooks/mutations/use-delete-profile-mutate';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from '../modal/confirm-modal';
import { useNavigate } from 'react-router-dom';

function DeleteProfileButton() {
  const navigate = useNavigate();
  const { mutate: deleteProfile } = useDeleteProfileMutate({
    onSuccess: () => {
      navigate('/');
    },
  });

  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <img className="size-8" src={QuitIcon} alt="계정 탈퇴" />
          <div className="flex flex-col justify-between text-sm">
            <span className="text-start font-semibold">계정 탈퇴</span>
            <span className="text-sub-font-black text-xs">
              계정을 탈퇴하고 모든 데이터를 삭제해요
            </span>
          </div>
        </div>
        <ChevronRight />
      </button>

      {modal && (
        <ConfirmModal
          open={modal}
          onOpenChange={() => setModal(false)}
          title="계정을 탈퇴하시겠어요?"
          description="계정을 탈퇴하시면 기존 정보가 모두 사라집니다."
          onConfirm={deleteProfile}
          cancelText="아니요"
          confirmText="네"
        />
      )}
    </>
  );
}

export default DeleteProfileButton;
