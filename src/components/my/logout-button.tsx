import { logout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmModal from '../modal/confirm-modal';
import { tokenStorage } from '@/lib/token-storage';

function LogoutButton({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      tokenStorage.clearToken();
      location.reload();
    },
  });

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        {children}
      </button>

      <ConfirmModal
        cancelText="아니요"
        confirmText="네"
        description="로그아웃하고 다른 계정으로 로그인 하시겠어요?"
        onConfirm={handleLogout}
        onOpenChange={() => setModal(false)}
        open={modal}
        title="로그아웃 하시겠어요?"
      />
    </>
  );
}

export default LogoutButton;
