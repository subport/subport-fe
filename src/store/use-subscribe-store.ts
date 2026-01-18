import type { AddSubscribeRequestType } from '@/schema/add-subscribe-schema';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type AddSubscribeState = AddSubscribeRequestType & {
  price: string;
};

const initialState = {
  addSubscriptions: [] as AddSubscribeState[],
};

export const useSubScribeStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        addSubscribe: (subscribe: AddSubscribeState) => {
          const subscribeList = get();
          set({
            addSubscriptions: [...subscribeList.addSubscriptions, subscribe],
          });
        },
        removeSubscribe: (subscribeId: number) => {
          const subscribeList = get();
          set({
            addSubscriptions: subscribeList.addSubscriptions.filter(
              (subscribe) => subscribe.subscriptionId !== subscribeId,
            ),
          });
        },
        resetSubscribe: () => {
          set({ addSubscriptions: [] });
        },
      },
    })),
    { name: 'use-subscribe-store' },
  ),
);

export const useGetAddSubscribeList = () => {
  const subscriptions = useSubScribeStore((state) => state.addSubscriptions);

  return subscriptions;
};

export const useAddSubscribe = () => {
  const addSubscribe = useSubScribeStore((state) => state.actions.addSubscribe);

  return addSubscribe;
};

export const useSubScribe = () => {
  const {
    actions: { addSubscribe, removeSubscribe, resetSubscribe },
    addSubscriptions,
  } = useSubScribeStore();

  return {
    removeSubscribe,
    addSubscribe,
    addSubscriptions,
    resetSubscribe,
  };
};
