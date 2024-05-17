import { Route, Routes } from 'react-router-dom';
import VacanciesPage from '~/pages/VacancyPages/VacanciesPage';
// import VacancyPage from '~/pages/VacancyPages/VacancyPage';
import HRsRoute from '~/components/ProtectedRoute/HRsRoute';
import CreateVacancy from '~/pages/VacancyPages/CreateVacancy';
import NotFound from '~/pages/NotFound/NotFound';

const VacanciesRoutes = () => (
  <Routes>
    <Route index element={<VacanciesPage />} />
    {/* <Route path="/:id" element={<VacancyPage />} /> */}
    <Route element={<HRsRoute />}>
      <Route path="/create" element={<CreateVacancy />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default VacanciesRoutes;
