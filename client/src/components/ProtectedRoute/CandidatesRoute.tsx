import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import { CANDIDATE } from '~/consts/consts';

const CandidatesRoute = () => {
  const { user } = useAppSelector((state) => state.profile);

  if (user.id && user.role === CANDIDATE) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default CandidatesRoute;
