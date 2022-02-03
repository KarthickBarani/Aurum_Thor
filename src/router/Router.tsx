import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';
import { Login } from '../pages/Login';
import { RegisterComp } from '../components/Auth/RegisterComp';
import { UserManagement } from '../pages/UserManagement';
import { UserGrid } from '../components/Auth/UserGrid';
import { UserDetail } from '../components/Auth/UserDetail';
export const Router = () => {
  const [Data, setInvNumber] = useState({});
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home setInvNumber={setInvNumber} />} />
          <Route path='InvoiceDetail' element={<InvoiceDetail data={Data} />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<RegisterComp />} />
          <Route path='UserManagement' element={<UserManagement />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
