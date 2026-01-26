import HomeIcon from '@/assets/icons/home-icon.svg?react';
import AddIcon from '@/assets/icons/add-icon.svg?react';
import MyPageIcon from '@/assets/icons/my-page-icon.svg?react';
import { Link, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const { pathname } = useLocation();
  return (
    <div className="bottom-nav absolute bottom-0 left-0 z-10 w-full rounded-[40px] bg-white/10 py-3 backdrop-blur-2xl">
      <div className="flex items-center justify-center gap-12">
        <Link to="/">
          <HomeIcon
            className="transition-colors"
            fill={pathname === '/' ? '#6FCFC3' : '#ffffff'}
          />
        </Link>
        <Link to="/subscribe/add" className="rounded-2xl bg-[#B2B4B6] p-2">
          <AddIcon fill="#ffffff" />
        </Link>
        <Link to="/my">
          <MyPageIcon
            className="transition-colors"
            fill={pathname === '/my' ? '#6FCFC3' : '#ffffff'}
          />
        </Link>
      </div>
    </div>
  );
}

export default BottomNavigation;
