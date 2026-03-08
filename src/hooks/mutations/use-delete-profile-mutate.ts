import { deleteProfile } from '@/api/profile';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useDeleteProfileMutate(callbacks?: useMutationCallbacks) {
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useDeleteProfileMutate;
