import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import VacanciesRoutes from './routes/Vacancies';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="vacancies/*" element={<VacanciesRoutes />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
