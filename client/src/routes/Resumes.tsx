import { Route, Routes } from 'react-router-dom';
import ResumesPage from '~/pages/ResumePages/ResumesPage';
import NotFound from '~/pages/NotFound/NotFound';

const ResumesRoutes = () => (
  <Routes>
    <Route index element={<ResumesPage />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default ResumesRoutes;
