import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
function RootRoute() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default RootRoute;
