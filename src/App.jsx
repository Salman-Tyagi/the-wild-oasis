import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Dashboard';
import Users from './pages/Dashboard';
import PageNotFound from './pages/Dashboard';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='account' element={<Account />} />
          <Route path='bookings' element={<Bookings />} />
          <Route path='cabins' element={<Cabins />} />
          <Route path='login' element={<Login />} />
          <Route path='settings' element={<Settings />} />
          <Route path='users' element={<Users />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
