import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ProfileRoutes from './routes/Profile';
import VacanciesRoutes from './routes/Vacancies';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailConfirmation from './pages/Auth/EmailConfirmation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email" element={<EmailConfirmation />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile/*" element={<ProfileRoutes />} />
        </Route>

        <Route path="vacancies/*" element={<VacanciesRoutes />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
