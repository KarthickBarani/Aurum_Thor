import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/components/Navbar';
import { Home } from '../pages/Home';
import { InvoiceDetail } from '../pages/InvoiceDetail';
import { Login } from '../pages/Login';
import { UserManagement } from '../pages/UserManagement';
import { Settings } from '../pages/Settings';
import { WorkFlow } from '../pages/WorkFlow';
import { InvoiceDetailsTable } from '../pages/InvoiceDetailsTable';
import { vendors, departments, locations, subsidiary, account, AuthUser, userProfileType } from '../components/Interface/Interface'
import { Inbox } from '../pages/Inbox';
import { ProtectRoutes } from '../components/Auth/ProtectRoutes';
import { Vendor } from '../pages/Vendor';
import { axiosGet } from '../helpers/Axios';
import { Invoice } from '../pages/Invoice';
import { AssignRoles } from '../components/Auth/AssignRoles'
import { LoginForm } from '../components/Auth/LoginForm';




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
  const [authUser, setAuthUser] = useState<AuthUser>({} as AuthUser)
  const [users, setUsers] = useState<userProfileType[]>([] as userProfileType[])
  const [vendors, setVendor] = useState<vendors[]>([] as vendors[])
  const [departments, setDepartments] = useState<departments>([] as departments)
  const [locations, setLocation] = useState<locations>([] as locations)
  const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)
  const [account, setAccount] = useState<account>([] as account)
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
          }
          >
            <Route path='' element={<LoginForm />} />
            <Route path='Roles' element={<AssignRoles User={authUser?.User} />} />
          </Route>
          <Route path='Home' element={
            <ProtectRoutes>
              <Home setInvNumber={setInvNumber} userId={authUser?.User?.Id} />
            </ProtectRoutes>
          } />
          <Route path='Approval' element={
            <ProtectRoutes>
              <InvoiceDetailsTable userId={authUser?.User?.Id} setInvNumber={setInvNumber} />
            </ProtectRoutes>
          }
          />
          <Route path='InvoiceDetail' element={
            <ProtectRoutes >
              <InvoiceDetail users={users} userid={authUser?.User?.Id} invNumber={invNumber} vendors={vendors}
                departments={departments} locations={locations} subsidiary={subsidiaries} account={account} />
            </ProtectRoutes>
          }
          />
          <Route path='UserManagement' element={
            <ProtectRoutes>
              <AuthContext.Provider value={Auth}>
                <UserManagement />
              </AuthContext.Provider>
            </ProtectRoutes>
          } />
          <Route path='Invoice' element={
            <ProtectRoutes>
              <Invoice />
            </ProtectRoutes>
          } />
          <Route path='Inbox' element={
            <ProtectRoutes>
              <Inbox />
            </ProtectRoutes>
          } />
          <Route path='Vendor' element={
            <ProtectRoutes>
              <Vendor />
            </ProtectRoutes>
          } />
          <Route path='Settings' element={
            <ProtectRoutes>
              <Settings />
            </ProtectRoutes>
          }
          />
          <Route path='WorkFlow' element={
            <ProtectRoutes>
              <WorkFlow vendors={vendors} departments={departments} locations={locations} account={account} />
            </ProtectRoutes>
          } />
        </Routes>
      </BrowserRouter>
    </PermissionContext.Provider>
  </>
  )

}


