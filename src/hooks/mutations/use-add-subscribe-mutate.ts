import { addSubscribe } from '@/api/subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

export const useAddSubscribeMutate = (callbacks?: useMutationCallbacks) => {
  return useMutation({
    mutationFn: addSubscribe,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
};
