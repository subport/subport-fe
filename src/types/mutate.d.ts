import type { AxiosError } from 'axios';

export type useMutationCallbacks<TData = unknown> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError) => void;
};
