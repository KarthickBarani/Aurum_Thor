import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';
import { Login } from '../pages/Login';
import { RegisterComp } from '../components/Auth/RegisterComp';
import { UserManagement } from '../pages/UserManagement';
import { UserGrid } from '../components/Auth/UserGrid';
import { UserDetail } from '../components/Auth/UserDetail';
import { Settings } from '../pages/Settings';
import { WorkFlow } from '../pages/WorkFlow';
import axios from 'axios';
import { InvoiceDetailsTable } from '../pages/InvoiceDetailsTable';
import { useQuery } from 'react-query';
import { vendors, departments, locations, subsidiary } from '../components/Interface'



export const Router = () => {
  const [invNumber, setInvNumber] = useState<number>(0);


  const [vendors, setVendor] = useState<vendors>([] as vendors)
  const [departments, setDepartments] = useState<departments>([] as departments)
  const [locations, setLocation] = useState<locations>([] as locations)
  const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)


  const fetchTableData = () => {
    return axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice`)
  }

  useEffect(() => {
    axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor').then(res => {
      setVendor(res.data)
    }).catch(err => console.log(err))
    axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor/Departments').then(res => {
      setDepartments(res.data)
    }).catch(err => console.log(err))
    axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor/Locations').then(res => {
      setLocation(res.data)
    }).catch(err => console.log(err))
    axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor/Subsidiaries').then(res => {
      setSubsidiaries(res.data)
    }).catch(err => console.log(err))
  }, [])


  const { isLoading, data, isError } = useQuery('tableData', fetchTableData)

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setInvNumber={setInvNumber} isLoading={isLoading} data={data?.data} isError={isError} />} />
        <Route path='InvoiceDetailTable' element={<InvoiceDetailsTable isLoading={isLoading} isError={isError} setInvNumber={setInvNumber} data={data?.data} />} />
        <Route path='InvoiceDetail' element={<InvoiceDetail invNumber={invNumber} vendors={vendors}
          departments={departments} locations={locations} subsidiary={subsidiaries} setVendor={setVendor} setDepartments={setDepartments} setLocation={setLocation} setSubsidiaries={setSubsidiaries} />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<RegisterComp />} />
        <Route path='UserManagement' element={<UserManagement />} />
        <Route path='Settings' element={<Settings />} />
        <Route path='WorkFlow' element={<WorkFlow vendors={vendors} departments={departments} locations={locations} setVendor={setVendor} setDepartments={setDepartments} setLocation={setLocation} />} />
      </Routes>
    </BrowserRouter>

  );
};
