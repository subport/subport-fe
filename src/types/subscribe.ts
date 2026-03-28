import type { UserSubscriptionSort } from '@/domains/subscription/user-subscription/model/types';

export type subscribeItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  defaultProvided: boolean;
};

export type subscribeListRes = {
  subscriptions: subscribeItem[];
};

export type subscribeItemRes = {
  type: string;
} & subscribeItem;

export type AddCustomSubscribeReq = {
  image: File | null;
  name: string;
  type: string;
  defaultImageName: string | null;
};

export type MemberSubscriptionsItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  amount: number;
  period: number;
  daysUntilPayment: number;
};

export type SubscriptionGroupMap = Record<string, MemberSubscriptionsItem[]>;

export type MemberSubscriptions = MemberSubscriptionsItem[];

export type MemberSubscribeAmounts = {
  currentMonthPaidAmount: number;
  currentMonthTotalAmount: number;
  paymentProgressPercent: number;
};

export type GroupedSubscriptionRes = MemberSubscribeAmounts & {
  subscriptions: SubscriptionGroupMap;
};

export type FlatSubscriptionRes = MemberSubscribeAmounts & {
  subscriptions: MemberSubscriptions;
};

export type SubscriptionsResBySort = {
  type: GroupedSubscriptionRes;
  nextPaymentDate: FlatSubscriptionRes;
  createdAt: FlatSubscriptionRes;
  name: FlatSubscriptionRes;
};

export type MemberSubscriptionsRes<S extends UserSubscriptionSort> =
  SubscriptionsResBySort[S];

export type MemberSubscriptionsParams =
  | { active: false }
  | { active: true; sortBy: UserSubscriptionSort };
