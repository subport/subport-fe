import { addCustomSubscribe } from '@/api/subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useAddCustomSubscribeMutate(callbacks?: useMutationCallbacks) {
  return useMutation({
    mutationFn: addCustomSubscribe,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useAddCustomSubscribeMutate;
