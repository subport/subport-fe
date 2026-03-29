import type {
  FlatUserSubscriptionRes,
  GroupedUserSubscriptionRes,
  UserSubscriptionParams,
} from '../types/api';
import type {
  UserSubscriptionListView,
  UserSubscriptionSection,
} from '../types/view';

function mappingUserSubscriptionList(
  params: UserSubscriptionParams,
  response: GroupedUserSubscriptionRes | FlatUserSubscriptionRes,
): UserSubscriptionListView {
  const summary = {
    currentMonthPaidAmount: response.currentMonthPaidAmount,
    currentMonthTotalAmount: response.currentMonthTotalAmount,
    paymentProgressPercent: response.paymentProgressPercent,
  };

  if (params.active && params.sortBy === 'type') {
    const groupedList = response as GroupedUserSubscriptionRes;
    const sections: UserSubscriptionSection[] = Object.entries(
      groupedList.subscriptions,
    ).map(([title, items]) => ({
      title,
      items,
    }));

    return {
      summary,
      sections,
    };
  }

  const flatList = response as FlatUserSubscriptionRes;
  const sections: UserSubscriptionSection[] = [
    { items: flatList.subscriptions },
  ];

  return {
    summary,
    sections,
  };
}

export default mappingUserSubscriptionList;
