import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="h-full">
      <Switch className="cursor-pointer">활성화</Switch>

      <div className="mb-10 pt-10">
        <p className="mb-4 flex items-center text-lg">
          월<span className="mr-1 ml-2 text-xl font-bold">15000</span>원
        </p>
        <Link
          to="/subscribe/add"
          className="hover:bg-primary/90 bg-primary text-primary-foreground block w-full rounded-2xl py-4.5 text-center text-lg font-bold transition-colors"
        >
          첫 구독 등록하기
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
