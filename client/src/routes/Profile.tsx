import { Route, Routes } from 'react-router-dom';
import ProfilePage from '~/pages/Profile/ProfilePage';
import ProfileResumes from '~/pages/ResumePages/ProfileResumes';
import NotFound from '~/pages/NotFound/NotFound';

const VacanciesRoutes = () => (
  <Routes>
    <Route index element={<ProfilePage />} />
    <Route path="/resumes" element={<ProfileResumes />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default VacanciesRoutes;
