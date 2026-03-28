import GroupedSubscribeList from '@/components/subscribe/member-subscribe/grouped-subscribe-list';
import SubscribeList from '@/components/subscribe/member-subscribe/subscribe-list';
import SubscribeListSkeleton from '@/components/subscribe/member-subscribe/subscribe-list-skeleton';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useGetMemberSubscriptions from '@/hooks/queries/use-get-member-subscriptions';
import type {
  MemberSubscribeAmounts,
  MemberSubscriptions,
  SubscriptionGroupMap,
} from '@/types/subscribe';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import OnBoardingBottomModal from '@/components/modal/onboarding-bottom-modal';
import MonthlySpendingCard from '@/components/subscribe/member-subscribe/monthly-spending-card';

import MessageIcon from '@/assets/icons/message-icon.svg?react';
import FeedbackEntryBottomModal from '@/components/modal/feedback-entry-bottom-modal';
import { STORAGE_KEY } from '@/constants/storage-key';
import { useGetAuthRole } from '@/store/use-auth-store';
import useSubscriptionListFilter from './hooks/use-subscription-list-filter';
import { SUBSCRIPTION_SORT_OPTIONS } from './constants';
import type { UserSubscriptionSort } from '../../user-subscription/model/types';

const DEFAULT_MONTHLY_CARD: MemberSubscribeAmounts = {
  currentMonthPaidAmount: 0,
  currentMonthTotalAmount: 0,
  paymentProgressPercent: 0,
};

const TODAY_DATE = new Date().toLocaleDateString('sv-SE');

function MainPage() {
  const { active, sortBy, changeSortBy, toggleActiveFilter } =
    useSubscriptionListFilter();

  const isOnBoardingConsumed =
    sessionStorage.getItem(STORAGE_KEY.firstLoginOnboardingConsumed) ===
    'consumed';
  const isFeedbackEntrySuppressed =
    sessionStorage.getItem(STORAGE_KEY.feedbackEntrySuppressed) === 'true';
  const role = useGetAuthRole();
  const isGuest = role === 'guest';
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowOnboarding =
    (location.state?.showOnboarding === true || isGuest) &&
    !isOnBoardingConsumed;
  const shouldSkipFeedbackEntry = location.state?.skipFeedbackEntry === true;
  const isMainPage = location.pathname === '/';
  const [isFeedbackEntryOpen, setIsFeedbackEntryOpen] = useState(() => {
    if (
      shouldShowOnboarding ||
      shouldSkipFeedbackEntry ||
      isFeedbackEntrySuppressed
    ) {
      return false;
    }

    const hiddenDate = localStorage.getItem(
      STORAGE_KEY.feedbackEntryHiddenUntil,
    );
    const hasSubmittedFeedback =
      localStorage.getItem(STORAGE_KEY.feedbackSubmitted) === 'true';

    return hiddenDate !== TODAY_DATE && !hasSubmittedFeedback;
  });
  const [monthlyCard, setMonthlyCard] =
    useState<MemberSubscribeAmounts>(DEFAULT_MONTHLY_CARD);

  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetMemberSubscriptions({ active, sortBy });

  console.log(subscriptions);
  useEffect(() => {
    if (!active || !subscriptions) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonthlyCard({
      currentMonthPaidAmount: subscriptions.currentMonthPaidAmount,
      currentMonthTotalAmount: subscriptions.currentMonthTotalAmount,
      paymentProgressPercent: subscriptions.paymentProgressPercent,
    });
  }, [active, subscriptions]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(STORAGE_KEY.feedbackEntrySuppressed);
    };
  }, []);

  const shouldRenderFeedbackEntry =
    isMainPage &&
    !shouldShowOnboarding &&
    !shouldSkipFeedbackEntry &&
    !isFeedbackEntrySuppressed &&
    isFeedbackEntryOpen;
  return (
    <>
      <div className="scrollbar-hide flex h-full flex-col gap-6 overflow-scroll pb-6">
        <div className="flex items-center justify-between">
          <Switch
            checked={active}
            onClick={toggleActiveFilter}
            className="cursor-pointer"
            variant="label-pill"
            onLabel="활성화"
            offLabel="비활성화"
          />

          <button
            className="relative cursor-pointer p-3"
            type="button"
            onClick={() => navigate('/feedback')}
          >
            <span className="bg-primary-light-active text-background-black absolute top-1.5 -left-5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              피드백
            </span>
            <MessageIcon className="size-8" />
          </button>
        </div>

        <div className="flex-1">
          {active && (
            <>
              <div className="mb-4 flex flex-col items-end gap-4">
                <MonthlySpendingCard
                  paidAmount={monthlyCard.currentMonthPaidAmount}
                  progressPercent={monthlyCard.paymentProgressPercent}
                  totalAmount={monthlyCard.currentMonthTotalAmount}
                />
                <Select
                  onValueChange={(sortBy: UserSubscriptionSort) =>
                    changeSortBy(sortBy)
                  }
                  defaultValue={sortBy}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent defaultValue={sortBy} position="popper">
                    {SUBSCRIPTION_SORT_OPTIONS.map((sort) => (
                      <SelectItem key={sort.value} value={sort.value}>
                        {sort.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {isGetSubscriptionsPending ? (
            <SubscribeListSkeleton />
          ) : (
            <>
              {active && subscriptions?.currentMonthTotalAmount === 0 && (
                <Link
                  to="/subscribe/add"
                  className="hover:bg-primary/90 bg-primary text-primary-foreground block w-full rounded-2xl py-4.5 text-center text-lg font-bold transition-colors"
                >
                  첫 구독 등록하기
                </Link>
              )}

              {!active && subscriptions!.subscriptions.length === 0 && (
                <p className="text-sub-font-black flex h-full items-center justify-center">
                  비활성화된 구독 서비스가 존재하지 않습니다.
                </p>
              )}

              {!active && (
                <SubscribeList
                  unActive
                  subscribeList={
                    subscriptions!.subscriptions as MemberSubscriptions
                  }
                />
              )}

              {sortBy === 'type' && (
                <GroupedSubscribeList
                  subscribeList={
                    subscriptions!.subscriptions as SubscriptionGroupMap
                  }
                />
              )}

              {sortBy !== 'type' && active && (
                <SubscribeList
                  subscribeList={
                    subscriptions!.subscriptions as MemberSubscriptions
                  }
                />
              )}
            </>
          )}
        </div>
      </div>

      <Outlet />

      {shouldShowOnboarding && (
        <OnBoardingBottomModal open={shouldShowOnboarding} />
      )}

      {shouldRenderFeedbackEntry && (
        <FeedbackEntryBottomModal
          open={isFeedbackEntryOpen}
          onOpenChange={() => setIsFeedbackEntryOpen(false)}
        />
      )}
    </>
  );
}

export default MainPage;
