import EditMyAccountForm from '@/components/my/edit-my-accrount-form';
import EditPayMentDateNotificationForm from '@/components/my/edit-payment-date-notification-form';
import MySubscriptionsList from '@/components/my/my-subscriptions-list';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MyPageSectionPage() {
  const { section } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (
      section !== 'subscribe' &&
      section !== 'reminder' &&
      section !== 'edit-account'
    ) {
      navigate('/my', { replace: true });
      return;
    }
  }, [section, navigate]);
  return (
    <section className="h-full">
      {section === 'subscribe' && <MySubscriptionsList />}
      {section === 'reminder' && <EditPayMentDateNotificationForm />}
      {section === 'edit-account' && <EditMyAccountForm />}
    </section>
  );
}

export default MyPageSectionPage;
