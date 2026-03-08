import { addCustomSubscribe } from '@/api/subscribe';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { subscribeItem } from '@/types/subscribe';
import { useMutation } from '@tanstack/react-query';

import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';

function useAddCustomSubscribeMutate(
  callbacks?: useMutationCallbacks<{ id: number }>,
) {
  return useMutation({
    mutationFn: addCustomSubscribe,
    onSuccess: (data, variables) => {
      console.log(data);
      const prevSubscriptions = queryClient.getQueryData<subscribeItem[]>(
        QUERY_KEY.subscriptions.all,
      );
      if (!prevSubscriptions) return;

      queryClient.setQueryData<subscribeItem[]>(QUERY_KEY.subscriptions.all, [
        {
          id: data.id,
          name: variables.name,
          logoImageUrl: variables.image
            ? URL.createObjectURL(variables.image)
            : SubscribeFallbackImage,
          defaultProvided: false,
        },
        ...prevSubscriptions,
      ]);
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useAddCustomSubscribeMutate;
