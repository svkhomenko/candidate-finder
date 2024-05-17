import { Route, Routes } from 'react-router-dom';
import ProfilePage from '~/pages/Profile/ProfilePage';
import ProfileResumes from '~/pages/ResumePages/ProfileResumes';
import ProfileVacancies from '~/pages/VacancyPages/ProfileVacancies';
import CandidatesRoute from '~/components/ProtectedRoute/CandidatesRoute';
import HRsRoute from '~/components/ProtectedRoute/HRsRoute';
import NotFound from '~/pages/NotFound/NotFound';

const VacanciesRoutes = () => (
  <Routes>
    <Route index element={<ProfilePage />} />
    <Route element={<CandidatesRoute />}>
      <Route path="/resumes" element={<ProfileResumes />} />
    </Route>
    <Route element={<HRsRoute />}>
      <Route path="/vacancies" element={<ProfileVacancies />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default VacanciesRoutes;
