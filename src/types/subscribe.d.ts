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
