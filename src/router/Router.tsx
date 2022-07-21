import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';
import { Login } from '../pages/Login';
import { RegisterComp } from '../components/Auth/RegisterComp';
import { UserManagement } from '../pages/UserManagement';

import { Settings } from '../pages/Settings';
import { WorkFlow } from '../pages/WorkFlow';
import axios from 'axios';
import { InvoiceDetailsTable } from '../pages/InvoiceDetailsTable';
import { useQuery } from 'react-query';
import { vendors, departments, locations, subsidiary, account, AuthUser, invDetailsType, userProfileType } from '../components/Interface'
import { AxiosGet } from '../helpers/Axios';




export const Router = () => {


  const [invNumber, setInvNumber] = useState<number>(0)

  const [authUser, setAuthUser] = useState<AuthUser>(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user')))))
  const [users, setUsers] = useState<userProfileType[]>([] as userProfileType[])
  const [vendors, setVendor] = useState<vendors>([] as vendors)
  const [departments, setDepartments] = useState<departments>([] as departments)
  const [locations, setLocation] = useState<locations>([] as locations)
  const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)
  const [account, setAccount] = useState<account>([] as account)
  const [datum, setData] = useState<invDetailsType[]>([] as invDetailsType[])
  const [pending, setPending] = useState<invDetailsType[]>([] as invDetailsType[])
  const [approval, setApproval] = useState<invDetailsType[]>([] as invDetailsType[])


  const fetchTableData = () => {
    return axios.get(process.env.REACT_APP_BACKEND_BASEURL + 'Invoice')
  }



  useEffect(() => {
    AxiosGet('vendor')
      .then(res => setVendor(res))
      .catch(err => console.log(err))
    AxiosGet('vendor/Departments')
      .then(res => setDepartments(res))
      .catch(err => console.log(err))
    AxiosGet('vendor/Locations')
      .then(res => setLocation(res))
      .catch(err => console.log(err))
    AxiosGet('vendor/Subsidiaries')
      .then(res => setSubsidiaries(res))
      .catch(err => console.log(err))
    AxiosGet('vendor/Accounts')
      .then(res => setAccount(res))
      .catch(err => console.log(err))
    AxiosGet('UserProfile')
      .then(res => setUsers(res))
      .catch(err => console.log(err))
    AxiosGet(`Invoice/Approvals/${authUser?.User?.Id}`)
      .then(res => {
        setApproval(res)
        setData(res)
      })
      .catch(err => console.log(err))
    AxiosGet(`Invoice/Pendings/${authUser?.User?.Id}`)
      .then(res => setPending(res))
      .catch(err => console.log(err))
  }, [authUser])



  const { isLoading, data, isError, refetch } = useQuery('tableData', fetchTableData, { refetchOnWindowFocus: true })





  return (
    <BrowserRouter>
      <Navbar user={authUser} setAuthUser={setAuthUser} />
      <Routes>
        <Route path='/' element={<Login setAuthUser={setAuthUser} />} />
        <Route path='/Home' element={<Home setInvNumber={setInvNumber} isLoading={isLoading} data={data?.data} userId={authUser?.User?.Id} isError={isError} />} />
        <Route path='InvoiceDetailTable' element={<InvoiceDetailsTable data={datum} approval={approval} pending={pending} setData={setData} setInvNumber={setInvNumber} />} />
        <Route path='InvoiceDetail' element={<InvoiceDetail refetch={refetch} users={users} userid={authUser?.User?.Id} invNumber={invNumber} vendors={vendors}
          departments={departments} locations={locations} subsidiary={subsidiaries} account={account} />} />
        <Route path='Register' element={<RegisterComp />} />
        <Route path='UserManagement' element={<UserManagement />} />
        <Route path='Settings' element={<Settings />} />
        <Route path='WorkFlow' element={<WorkFlow vendors={vendors} departments={departments} locations={locations} account={account} />} />
      </Routes>
    </BrowserRouter>
  );
};
