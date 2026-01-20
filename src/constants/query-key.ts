export const QUERY_KEY = {
  subscriptions: {
    all: ['subscribe'],
    byId: (id: string) => ['subscribe', id],
    types: ['subscribe', 'type'],
  },

  plans: {
    list: (subscribeId: string) => ['plan', 'list', subscribeId],
    byId: (planId: string) => ['plan', planId],
  },
};
