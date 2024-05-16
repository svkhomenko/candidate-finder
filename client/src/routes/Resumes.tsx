import { Route, Routes } from 'react-router-dom';
import ResumesPage from '~/pages/ResumePages/ResumesPage';
import CandidatesRoute from '~/components/ProtectedRoute/CandidatesRoute';
import ResumeCreate from '~/pages/ResumePages/CreateResume';
import NotFound from '~/pages/NotFound/NotFound';

const ResumesRoutes = () => (
  <Routes>
    <Route index element={<ResumesPage />} />
    <Route element={<CandidatesRoute />}>
      <Route path="/create" element={<ResumeCreate />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default ResumesRoutes;
