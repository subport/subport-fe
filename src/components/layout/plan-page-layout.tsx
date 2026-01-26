import { Outlet } from 'react-router-dom';

function PlanPageLayout() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Outlet />
    </div>
  );
}

export default PlanPageLayout;
