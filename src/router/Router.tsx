import { useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';
import { Login } from '../pages/Login';
import { RegisterComp } from '../components/Auth/RegisterComp';
import { UserManagement } from '../pages/UserManagement';
import { UserGrid } from '../components/Auth/UserGrid';
import { UserDetail } from '../components/Auth/UserDetail';
import { WorkFlow } from '../pages/WorkFlow';
import axios from 'axios';
import { InvoiceDetailsTable } from '../pages/InvoiceDetailsTable';
import { useQuery } from 'react-query';

export const Router = () => {
  const [invNumber, setInvNumber] = useState<number>(0);




  const fetchTableData = () => {
    return axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice`)
  }


  const { isLoading, data, isError } = useQuery('tableData', fetchTableData)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setInvNumber={setInvNumber} isLoading={isLoading} data={data?.data} isError={isError} />} />
        <Route path='InvoiceDetailTable' element={<InvoiceDetailsTable setInvNumber={setInvNumber} data={data?.data} />} />
        <Route path='InvoiceDetail' element={<InvoiceDetail invNumber={invNumber} />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<RegisterComp />} />
        <Route path='UserManagement' element={<UserManagement />} />
        <Route path='WorkFlow' element={<WorkFlow />} >
        </Route>
      </Routes>
    </BrowserRouter>

  );
};
