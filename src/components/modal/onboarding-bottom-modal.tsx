import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import OnBoardingSearchIcon from '@/assets/icons/onboarding-search-icon.png';
import OnBoardingNotiIcon from '@/assets/icons/onboarding-notification-icon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnBoardingBottomModalProps {
  open: boolean;
}

function OnBoardingBottomModal({ open }: OnBoardingBottomModalProps) {
  const navigate = useNavigate();

  const [onboardingStep, setOnBoardingStep] = useState<
    'exchangeRateNotice' | 'notificationSetting' | null
  >('exchangeRateNotice');

  return (
    <Drawer open={open}>
      <DrawerContent className="bg-white data-[vaul-drawer-direction=bottom]:rounded-t-[30px]">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            {onboardingStep === 'exchangeRateNotice' && '환율 적용 기준 안내'}
            {onboardingStep === 'notificationSetting' && (
              <>
                구독 결제 <br />
                이메일 알림을 받아보세요!
              </>
            )}
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="text-sub-font-black mx-auto text-sm/relaxed">
          {onboardingStep === 'exchangeRateNotice' && (
            <>
              해외 결제 구독은 오후 12시 기준 환율로 계산돼요. <br /> 실제 결제
              금액과 차이가 있을 수 있어요.
            </>
          )}

          {onboardingStep === 'notificationSetting' && (
            <>
              결제 예정일 3일 전에 이메일로 미리 알려드려요. <br />
              알림 시점은 언제든지 설정에서 변경할 수 있어요.
            </>
          )}
        </DrawerDescription>
        <img
          src={
            onboardingStep === 'exchangeRateNotice'
              ? OnBoardingSearchIcon
              : OnBoardingNotiIcon
          }
          aria-hidden
          className="mx-auto my-4 h-auto w-20"
        />
        <DrawerFooter>
          {onboardingStep === 'exchangeRateNotice' && (
            <Button onClick={() => setOnBoardingStep('notificationSetting')}>
              확인했어요
            </Button>
          )}
          {onboardingStep === 'notificationSetting' && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  navigate('/', { replace: true, state: null });
                  sessionStorage.setItem(
                    'first-login-onboarding-consumed',
                    'consumed',
                  );
                }}
                variant={'cancel'}
                className="w-full max-w-1/3"
              >
                나중에
              </Button>
              <Button
                onClick={() => {
                  navigate('/my/reminder', { state: null });
                  sessionStorage.setItem(
                    'first-login-onboarding-consumed',
                    'consumed',
                  );
                }}
                className="flex-1"
              >
                알림 받기
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default OnBoardingBottomModal;
