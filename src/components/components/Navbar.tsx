
import { NavLink, Link } from 'react-router-dom';
import { ApprovalSvg, DashboardSvg, MailSvg, SettingSvg, UsersSvg, WorkFlowSvg } from '../Svg/Svg';
import { AuthUser } from '../Interface/Interface';
import { useContext } from 'react';
import { AuthContext, PermissionContext } from '../../router/Router';


export const Navbar = () => {

  const currentRole = useContext(AuthContext)
  const currentPermission = useContext(PermissionContext)


  return (

    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <NavLink to={'/'} className="navbar-brand fw-bolder fs-1" ><span className="svg-icon svg-icon-light svg-icon-3hx"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M18 22C19.7 22 21 20.7 21 19C21 18.5 20.9 18.1 20.7 17.7L15.3 6.30005C15.1 5.90005 15 5.5 15 5C15 3.3 16.3 2 18 2H6C4.3 2 3 3.3 3 5C3 5.5 3.1 5.90005 3.3 6.30005L8.7 17.7C8.9 18.1 9 18.5 9 19C9 20.7 7.7 22 6 22H18Z" fill="currentColor" />
          <path d="M18 2C19.7 2 21 3.3 21 5H9C9 3.3 7.7 2 6 2H18Z" fill="currentColor" />
          <path d="M9 19C9 20.7 7.7 22 6 22C4.3 22 3 20.7 3 19H9Z" fill="currentColor" />
        </svg></span> Aurum Tech</NavLink>
        <button className="navbar-toggler btn btn-icon-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="svg-icon svg-icon-light svg-icon-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="currentColor" />
            <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="currentColor" />
          </svg>
          </span>
        </button>

        {
          currentRole?.authUser && currentRole?.authUser.Status && currentRole?.authUser.User.Roles.length > 0
            ? <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto fw-bold fs-6">
                {/* 
                <li className="nav-item">
                  <NavLink to={'/InvoiceDetailTable'} className="nav-link" >
                    <ApprovalSvg clsName='svg-icon svg-icon-light svg-icon-1' />
                    Approval</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/UserManagement'} className="nav-link" >
                    <UsersSvg clsName='svg-icon svg-icon-light svg-icon-1' />
                    User Management</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/WorkFlow'} className="nav-link">
                    <WorkFlowSvg clsName='svg-icon svg-icon-light svg-icon-1' />
                    Work Flow</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/Inbox'} className="nav-link"><MailSvg clsName='svg-icon svg-icon-light svg-icon-1' /> Inbox</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/Vendor'} className="nav-link">
                    <UsersSvg clsName='svg-icon svg-icon-light svg-icon-1' />
                    Vendor </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/Settings'} className="nav-link">
                    <SettingSvg clsName='svg-icon svg-icon-light svg-icon-1' />
                    Setting </NavLink>
                </li> */}
                {/* {
                  props.role && props.role.Permission.filter(permission => permission.Access).map(permission => (
                    <li className="nav-item">
                    <NavLink to={`/${permission.Name}`} className="nav-link">
                    {permission.Name}
                    </NavLink>
                    </li>))
                  } */}
                {
                  currentPermission?.permission
                    ?
                    <>
                      <li className="nav-item">
                        <NavLink to={'/Home'} className="nav-link " >
                          Dashboard</NavLink>
                      </li>
                      {
                        currentPermission?.permission && currentPermission.permission.Permission
                          .filter((permission) => permission.Access)
                          .map(
                            permission => (
                              (<li key={permission.PermissionId} className="nav-item">
                                <NavLink to={`/${permission.Name}`} className="nav-link">
                                  {permission.Name}
                                </NavLink>
                              </li>)
                            )
                          )
                      }
                    </>
                    :
                    null
                }

                {
                  currentRole.authUser.Status
                    ?
                    <>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={''} id="navbarDropdown" role="button" data-bs-toggle="dropdown" data-bs-offset="50,50" aria-expanded="false">
                          <div className="symbol symbol-25px align-self-center ">
                            <div className="symbol-label fs-4 fw-bold text-success">{currentRole.authUser?.User?.FirstName[0]}</div>
                          </div>
                          &nbsp; {currentRole.authUser.User?.DisplayName}
                        </Link>
                        <ul className="dropdown-menu shadow-lg dropdown-menu-end text-center w-auto" aria-labelledby="navbarDarkDropdownMenuLink">
                          <div className="d-flex w-100 p-2">
                            <div className="symbol symbol-50px align-self-center ">
                              <div className="symbol-label fs-2 fw-bold text-success">{currentRole.authUser?.User?.FirstName[0]}</div>
                            </div>
                            <div className='mx-2 align-self-end'>
                              <p className='pt-4 fs-5 text-start text-gray-800' >{currentRole.authUser?.User?.LastName} {currentRole.authUser?.User?.FirstName}<br /><span className='fs-7 text-start text-gray-400'>{currentRole.authUser?.User?.UserName}</span></p>
                            </div>
                          </div>
                          <hr className='dropdown-divider text-gray-500' />
                          <NavLink onClick={() => {
                            localStorage.clear()
                            currentRole.authSetMethod(null)
                            currentPermission?.permissionSetMethod(null)
                          }} to={'/'} className="dropdown-item text-start"> <span className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="8.5" y="11" width="12" height="2" rx="1" fill="black" />
                            <path d="M10.3687 11.6927L12.1244 10.2297C12.5946 9.83785 12.6268 9.12683 12.194 8.69401C11.8043 8.3043 11.1784 8.28591 10.7664 8.65206L7.84084 11.2526C7.39332 11.6504 7.39332 12.3496 7.84084 12.7474L10.7664 15.3479C11.1784 15.7141 11.8043 15.6957 12.194 15.306C12.6268 14.8732 12.5946 14.1621 12.1244 13.7703L10.3687 12.3073C10.1768 12.1474 10.1768 11.8526 10.3687 11.6927Z" fill="black" />
                            <path opacity="0.5" d="M16 5V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 13.5523 5 13 5H6C5.44771 5 5 5.44772 5 6V18C5 18.5523 5.44771 19 6 19H13C13.5523 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18V19C16 20.1046 15.1046 21 14 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14C15.1046 3 16 3.89543 16 5Z" fill="black" />
                          </svg></span> Logout</NavLink>
                        </ul>
                      </li>
                    </>
                    :
                    null
                }
              </ul>
            </div>
            : null
        }
      </nav >
    </div>
  )
}


