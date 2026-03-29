import type { UserSubscribeSummary, UserSubscriptionItem } from './api';

export type UserSubscriptionSection = {
  title?: string;
  items: UserSubscriptionItem[];
};

export type UserSubscriptionListView = {
  summary: UserSubscribeSummary;
  sections: UserSubscriptionSection[];
};
