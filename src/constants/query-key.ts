import type { UserSubscriptionParams } from '@/domains/subscription/user-subscription/types/api';

export const QUERY_KEY = {
  subscriptions: {
    all: ['subscribe'],
    search: (searchTerm: string) => ['subscribe', searchTerm],
    byId: (id: string) => ['subscribe', id],
    types: ['subscribe-type'],
  },

  plans: {
    list: (subscribeId: string) => ['plan', 'list', subscribeId],
    byId: (planId: string) => ['plan', planId],
  },

  memberSubscriptions: {
    all: (params: UserSubscriptionParams) => ['member-subscriptions', params],
    byId: (subscribeId: string) => ['member-subscriptions', subscribeId],
  },

  my: {
    profile: ['my', 'profile'],
    account: ['my', 'account'],
    reminderSettings: ['my', 'reminder-settings'],
  },

  spendingRecords: {
    all: ['spending-records'],
    yearMonth: (yearMonth: string) => ['spending-records', yearMonth],
    byDate: (date: string) => ['spending-records', 'by-date', date],
  },

  faq: {
    all: ['faq', 'all'],
  },
};
