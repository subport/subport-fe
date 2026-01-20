export type subscribeItem = {
  id: number;
  name: string;
  logoImageUrl: string;
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
