export const QUERY_KEY = {
  subscriptions: {
    all: ['subscribe'],
    byId: (id: string) => ['subscribe', id],
  },

  plans: {
    list: (subscribeId: string) => ['plan', 'list', subscribeId],
    byId: (planId: string) => ['plan', planId],
  },
};
