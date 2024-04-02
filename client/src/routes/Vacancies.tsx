import { Route, Routes } from 'react-router-dom';
import VacancyPage from '~/pages/VacancyPages/VacancyPage';
// import VacancyCreateForm from '~/pages/VacancyPages/VacancyCreate/VacancyCreateForm';
import NotFound from '~/pages/NotFound/NotFound';

const VacanciesRoutes = () => (
  <Routes>
    <Route path="/:id" element={<VacancyPage />} />
    {/* <Route path="/create" element={<VacancyCreateForm />} /> */}
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default VacanciesRoutes;
