import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '../components/components/Navbar';
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
import { vendors, departments, locations, subsidiary, account, AuthUser, userProfileType } from '../components/Interface/Interface'
import { Inbox } from '../pages/Inbox';
import { ProtectRoutes } from '../components/Auth/ProtectRoutes';




export const Router = () => {

  const [invNumber, setInvNumber] = useState<number>(0)
  const [authUser, setAuthUser] = useState<AuthUser>(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user')))))
  const [users, setUsers] = useState<userProfileType[]>([] as userProfileType[])
  const [vendors, setVendor] = useState<vendors>([] as vendors)
  const [departments, setDepartments] = useState<departments>([] as departments)
  const [locations, setLocation] = useState<locations>([] as locations)
  const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)
  const [account, setAccount] = useState<account>([] as account)

  const BASEURL = process.env.REACT_APP_BACKEND_BASEURL


  const fetchTableData = () => {
    return axios.get(BASEURL + '/api/v1/Invoice')
  }




  useEffect(() => {
    axios.get(BASEURL + '/api/v1/vendor')
      .then(res => setVendor(res.data))
      .catch(err => console.log(err))
    axios.get(BASEURL + '/api/v1/vendor/Departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err))
    axios.get(BASEURL + '/api/v1/vendor/Locations')
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
    axios.get(BASEURL + '/api/v1/vendor/Subsidiaries')
      .then(res => setSubsidiaries(res.data))
      .catch(err => console.log(err))
    axios.get(BASEURL + '/api/v1/vendor/Accounts')
      .then(res => setAccount(res.data))
      .catch(err => console.log(err))
    axios.get(BASEURL + '/api/v1/UserProfile')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [authUser])



  const { isLoading, data, isError, refetch } = useQuery('tableData', fetchTableData, { refetchOnWindowFocus: true, refetchInterval: 5000 })


  return (<>
    <BrowserRouter>
      <Navbar user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))} setAuthUser={setAuthUser} />
      <Routes>
        <Route path='/' element={<Login setAuthUser={setAuthUser} />} />
        <Route path='/Home' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <Home setInvNumber={setInvNumber} isLoading={isLoading} data={data?.data} userId={authUser?.User?.Id} isError={isError} />
          </ProtectRoutes>
        } />
        <Route path='InvoiceDetailTable' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <InvoiceDetailsTable userId={authUser?.User?.Id} setInvNumber={setInvNumber} />
          </ProtectRoutes>
        }
        />
        <Route path='InvoiceDetail' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status} >
            <InvoiceDetail refetch={refetch} users={users} userid={authUser?.User?.Id} invNumber={invNumber} vendors={vendors}
              departments={departments} locations={locations} subsidiary={subsidiaries} account={account} />
          </ProtectRoutes>
        }
        />
        <Route path='Register' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <RegisterComp />
          </ProtectRoutes>
        }
        />
        <Route path='UserManagement' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <UserManagement />
          </ProtectRoutes>
        } />
        <Route path='Inbox' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <Inbox />
          </ProtectRoutes>
        } />
        {/* <Route path='Settings' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <Settings />
          </ProtectRoutes>
        }
        /> */}
        <Route path='WorkFlow' element={
          <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
            <WorkFlow vendors={vendors} departments={departments} locations={locations} account={account} />
          </ProtectRoutes>
        } />
      </Routes>
    </BrowserRouter>
  </>
  )

}


