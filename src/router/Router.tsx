import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useQuery, useQueryClient } from 'react-query';
import { vendors, departments, locations, subsidiary, account, AuthUser, userProfileType } from '../components/Interface/Interface'
import { Inbox } from '../pages/Inbox';
import { ProtectRoutes } from '../components/Auth/ProtectRoutes';
import { Vendor } from '../pages/Vendor';
import { axiosGet } from '../helpers/Axios';

type authContextProps = {
  authUser: AuthUser
  authSetMethod: Function
}
type permissionContextProps = {
  permission: roleProps
  permissionSetMethod: Function
}

type permissionProps = {
  PermissionId: number,
  Name: string,
  Ordinal: number,
  Access: boolean,
  Sections: any[]
}
type roleProps = {
  RoleId: number,
  Name: string,
  Description: string,
  IsActive: boolean,
  Permission: permissionProps[]
}

export const AuthContext = createContext<authContextProps | null>(null)
export const PermissionContext = createContext<permissionContextProps | null>(null)



export const Router = () => {

  const [invNumber, setInvNumber] = useState<number>(0)
  // const [authUser, setAuthUser] = useState<AuthUser>(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user')))))
  const [authUser, setAuthUser] = useState<AuthUser>({} as AuthUser)
  const [users, setUsers] = useState<userProfileType[]>([] as userProfileType[])
  const [vendors, setVendor] = useState<vendors[]>([] as vendors[])
  const [departments, setDepartments] = useState<departments>([] as departments)
  const [locations, setLocation] = useState<locations>([] as locations)
  const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)
  const [account, setAccount] = useState<account>([] as account)
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const [permission, setPermission] = useState<any>(null)

  const authSetMethod = useCallback(data => {
    setAuthUser(data)
  }, [])

  const permissionSetMethod = useCallback(data => {
    setPermission(data)
  }, [])

  const Auth = useMemo(() => ({
    authUser,
    authSetMethod
  }), [authUser, authSetMethod])

  const Permision = useMemo(() => ({
    permission,
    permissionSetMethod
  }), [permission, permissionSetMethod])

  const fetchTableData = () => {
    return axiosGet('/Invoice')
  }

  useEffect(() => {
    axiosGet('/vendor')
      .then(res => setVendor(res.data))
      .catch(err => console.log(err))
    axiosGet('/vendor/Departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err))
    axiosGet('/vendor/Locations')
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
    axiosGet('/vendor/Subsidiaries')
      .then(res => setSubsidiaries(res.data))
      .catch(err => console.log(err))
    axiosGet('/vendor/Accounts')
      .then(res => setAccount(res.data))
      .catch(err => console.log(err))
    axiosGet('/UserProfile')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))

  }, [])



  const { isLoading, data, isError, refetch } = useQuery('tableData', fetchTableData, { refetchOnWindowFocus: true, refetchInterval })


  return (<>
    <PermissionContext.Provider value={Permision}>
      <BrowserRouter>
        <AuthContext.Provider value={Auth}>
          <Navbar />
        </AuthContext.Provider>
        <Routes>
          <Route path='/' element={
            <AuthContext.Provider value={Auth}>
              <Login setPermission={setPermission} />
            </AuthContext.Provider>
          } />
          <Route path='Home' element={
            <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
              <Home setInvNumber={setInvNumber} isLoading={isLoading} data={data?.data} userId={authUser?.User?.Id} isError={isError} setRefetchInterval={setRefetchInterval} />
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
              <AuthContext.Provider value={Auth}>
                <UserManagement />
              </AuthContext.Provider>
            </ProtectRoutes>
          } />
          <Route path='Inbox' element={
            <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
              <Inbox />
            </ProtectRoutes>
          } />
          <Route path='Vendor' element={
            <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
              <Vendor />
            </ProtectRoutes>
          } />
          <Route path='Settings' element={
            <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
              <Settings />
            </ProtectRoutes>
          }
          />
          <Route path='WorkFlow' element={
            <ProtectRoutes user={JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))?.Status}>
              <WorkFlow vendors={vendors} departments={departments} locations={locations} account={account} />
            </ProtectRoutes>
          } />
        </Routes>
      </BrowserRouter>
    </PermissionContext.Provider>
  </>
  )

}


