import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import { HR } from '~/consts/consts';

const HRsRoute = () => {
  const { user } = useAppSelector((state) => state.profile);

  if (user.id && user.role === HR) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default HRsRoute;
