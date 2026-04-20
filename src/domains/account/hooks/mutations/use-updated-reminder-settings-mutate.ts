import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { ReminderSettingsRes } from '@/types/profile';
import { useMutation } from '@tanstack/react-query';
import { updatedReminderSettings } from '../../api/account';

function useUpdatedReminderSettings(
  callbacks?: useMutationCallbacks<ReminderSettingsRes>,
) {
  return useMutation({
    mutationFn: updatedReminderSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY.my.reminderSettings, data);

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdatedReminderSettings;
