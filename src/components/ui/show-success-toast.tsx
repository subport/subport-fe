import { type ComponentType } from 'react';
import { toast } from 'sonner';

type ShowSuccessToastProps = {
  Content: ComponentType;
  duration?: number;
};
function showSuccessToast({ Content, duration = 1800 }: ShowSuccessToastProps) {
  const id = toast.custom(() => <Content />, {
    duration: Infinity,
    unstyled: true,
    dismissible: false,
    className:
      '!fixed !inset-0 !top-0 !left-0 !right-0 !bottom-0 !m-0 !h-screen !w-screen !max-w-none !translate-x-0 !translate-y-0 !transform-none !bg-transparent !border-0 !p-0 !shadow-none !flex !items-center !justify-center !pointer-events-auto',
  });

  window.setTimeout(() => {
    toast.dismiss(id);
  }, duration);
}

export default showSuccessToast;
