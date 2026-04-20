import MySubscriptionsList from '@/components/my/my-subscriptions-list';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MySubscribeSchedulePage from './my-subscribe-schedule-page';

function MyPageSectionPage() {
  const { section } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (
      section !== 'subscribe' &&
      section !== 'reminder' &&
      section !== 'edit-account' &&
      section !== 'schedule'
    ) {
      navigate('/my', { replace: true });
      return;
    }
  }, [section, navigate]);
  return (
    <section className="h-full">
      {section === 'subscribe' && <MySubscriptionsList />}
      {section === 'schedule' && <MySubscribeSchedulePage />}
    </section>
  );
}

export default MyPageSectionPage;
