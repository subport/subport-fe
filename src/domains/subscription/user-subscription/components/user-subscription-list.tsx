import SubscribeCard from '@/components/subscribe/member-subscribe/subscribe-card';
import type { UserSubscriptionSection } from '../types/view';

interface UserSubscriptionListProps {
  active?: boolean;
  sections: UserSubscriptionSection[];
}

function UserSubscriptionList({
  sections,
  active = true,
}: UserSubscriptionListProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, idx) => (
        <div key={section.title || `subscription-list-${idx}`}>
          <>
            {section.title && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold">{section.title}</p>
                <span>{`${section.items.length}건`}</span>
              </div>
            )}

            <ul className="flex flex-col gap-4">
              {section.items.map((item) => (
                <li key={item.id}>
                  <SubscribeCard subscribeInfo={item} unActive={!active} />
                </li>
              ))}
            </ul>
          </>
        </div>
      ))}
    </div>
  );
}

export default UserSubscriptionList;
