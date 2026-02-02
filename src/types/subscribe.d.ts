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
};

export type MemberSubscriptionSort =
  | 'type'
  | 'nextPaymentDate'
  | 'createdAt'
  | 'name';

export type MemberSubscribeItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  amount: number;
  period: number;
  daysUntilPayment: number;
};

export type SubscriptionGroupMap = Record<string, MemberSubscribeItem[]>;

export type MemberSubscriptions = MemberSubscribeItem[];

export type GroupedSubscriptionRes = {
  currentMonthTotalAmount: number;
  subscriptions: SubscriptionGroupMap;
};

export type FlatSubscriptionRes = {
  currentMonthTotalAmount: number;
  subscriptions: MemberSubscriptions;
};

export type SubscriptionsResBySort = {
  type: GroupedSubscriptionRes;
  nextPaymentDate: FlatSubscriptionRes;
  createdAt: FlatSubscriptionRes;
  name: FlatSubscriptionRes;
};

export type MemberSubscriptionsRes<S extends MemberSubscriptionSort> =
  SubscriptionsResBySort[S];

export type MemberSubscriptionsParams =
  | { active: false }
  | { active: true; sortBy: MemberSubscriptionSort };
