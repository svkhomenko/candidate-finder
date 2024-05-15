import { Navigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks/use-app-selector';
import { HR } from '~/consts/consts';

const Home = () => {
  const { user } = useAppSelector((state) => state.profile);

  if (user.id && user.role === HR) {
    return <Navigate to="/resumes" replace />;
  }

  return <Navigate to="/vacancies" replace />;
};

export default Home;
