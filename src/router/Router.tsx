import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';

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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
