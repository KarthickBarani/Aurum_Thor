import React, { useState, useEffect } from 'react';


import { columnProps, TableFilterComponent, TestGrid } from '../components/components/TableComponent';
import { AddSvg, EditSvg, RemoveSvg, UsersSvg, ViewSvg } from '../components/Svg/Svg';
import { Link, NavLink } from 'react-router-dom';
import { UserForm } from '../components/UserManagement/UserForm';
import { RoleDetails } from '../components/UserManagement/RoleDetails';
import { RoleDataType, RoleForm } from '../components/UserManagement/RoleForm';
// import { Modal, ModalContent, ModalHeader } from '../components/components/Model';
import { Modal } from "react-bootstrap"
import { axiosGet } from '../helpers/Axios';
import { PermissionDetails } from '../components/UserManagement/PermissionDetails';
import axios from 'axios';


type UserProfileData = {
  Id: String;
  EnterpriseId: null | number;
  CompanyId: null | number;
  CreatedTimeStamp: string;
  LastModifiedtimeStamp: null | string;
  Password: string;
  UserName: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DisplayName: string;
  EmailAddress: string;
  Active: boolean;
  ResetRequired: boolean;
  RoleId: number;
};

type UserProfile = {
  Id: String;
  EnterpriseId: null | number;
  CompanyId: null | number;
  CreatedTimeStamp: string;
  LastModifiedtimeStamp: null | string;
  Password: string;
  UserName: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DisplayName: string;
  EmailAddress: string;
  Active: boolean;
  ResetRequired: boolean;
  RoleId: number;
}
export const UserManagement = () => {

  const defalutUserData: UserProfile = {
    Id: '',
    EnterpriseId: 0,
    CompanyId: 0,
    CreatedTimeStamp: '',
    LastModifiedtimeStamp: '',
    Password: '',
    UserName: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DisplayName: '',
    EmailAddress: '',
    Active: false,
    ResetRequired: false,
    RoleId: 0
  }

  const defalutRoleData = {
    RoleId: 0,
    Name: '',
    Description: '',
    IsActive: false,
    Operations: []
  }

  const [currentUserId, setCurrentUserId] = useState<number>(0)
  const [currentRoleId, setCurrentRoleId] = useState<number>(0)
  const [toggleUserType, setToggleUserType] = useState<'View' | 'Add' | 'Update'>('View')
  const [toggleRoleType, setToggleRoleType] = useState<'View' | 'Add' | 'Update'>('View')
  const [toggleTabType, setToggleTabType] = useState<'User' | 'Role' | 'Permission'>('User')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)



  const [userData, setUserData] = useState<UserProfile[]>([])
  const [permissionData, setPermissionData] = useState([])
  const [RoleData, setRoleData] = useState<RoleDataType[]>([] as RoleDataType[])
  const [operation, setOperation] = useState(['Full Access', 'Add/Edit/Remove', 'API'])


  useEffect(() => {
    axiosGet('/UserProfile')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))

    // axiosGet('/Role/Operations')
    // .then(res=>{
    //   setRoleData()
    // })  
    axios.get('https://637b6a216f4024eac20cf00e.mockapi.io/api/v1/permission/permissions')
      .then(res => setPermissionData(res.data))
      .catch(err => console.log(err))
  }, [toggleUserType])


  const userColumns: columnProps = [
    {
      id: 1,
      header: 'Action',
      accessor: 'Action',
      className: 'min-w-25px',
      cell: (data) => (
        <div className="d-flex justify-content-center gap-2 ">
          <span role={'button'} >
            <ViewSvg role={'button'} clsName='svg-icon svg-icon-primary svg-icon-2' function={() => {
              setCurrentUserId(data.Id)
              setModalIsOpen(true)
            }} />
          </span>
        </div>
      ),
    },
    {
      id: 2,
      header: 'Name',
      accessor: 'Name',
      cell: (data: UserProfile) => (
        <div className="d-flex align-items-center">
          {/* <div className="symbol symbol-50px">
            <div className="symbol-label fs-2 fw-semibold text-success">{data.FirstName[0]}</div>
          </div> */}
          <div className="d-flex flex-column">
            <h5 className='text-gray-800 fw-bolder'>{`${data.FirstName} ${data.LastName}`}</h5>
            <span className="text-gray-500 fw-bold ">{data.UserName}</span>
          </div>
        </div>
      ),
      className: 'min-w-100px',
    },
    {
      id: 3,
      header: 'Email',
      accessor: 'EmailAddress',
      // cell: (data: UserProfile) => (
      //   <span className="text-gray-500 fw-bold ">{data.EmailAddress}</span>
      // ),
    },
    {
      id: 4,
      header: 'Status',
      accessor: 'Status',
      cell: (data: UserProfile) => (<span className={`badge badge-light-${data.Active ? 'success' : 'danger'}`}>{data.Active ? 'Active' : 'Inactive'}</span>),
    },
  ]




  return (
    <>
      <div className="container-fluid">
        <div className="row my-10">
          <div className="col">
            <h4 className="text-white" >User Management</h4>
          </div>
        </div>
        <div className="row justify-content-between g-5">
          <div className="col">
            <div className="card card-flush " style={{ height: "75vh" }}>
              <div className="card-header">
                <h4 className="card-title">User Management</h4>
                <div className="toolbar">
                  <button className="btn btn-sm btn-light-primary" onClick={() => {
                    setCurrentUserId(0)
                    setCurrentRoleId(0)
                    setModalIsOpen(true)
                  }}><AddSvg clsName='svg-icon svg-icon-3 svg-icon-primary ' />Add New</button>
                </div>
              </div>
              <div className="card-body overflow-hidden">

                <div className="d-flex h-100 flex-column flex-lg-row w-">
                  <div className="d-flex">
                    <div className="menu menu-rounded menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-5 fw-semibold w-250px" >
                      <div className="menu-item">
                        <div className="menu-content pb-2">
                          <span className="menu-section text-muted text-uppercase fs-7 fw-bold">User</span>
                        </div>
                      </div>
                      <div className="menu-item">
                        <Link to={''} className={`menu-link border-3 border-start border-primary ${toggleTabType === 'User' ? 'active' : ''}`} onClick={() => setToggleTabType('User')}>
                          <span className="menu-title">Users List</span>
                          <span className="menu-badge fs-7 fw-normal text-muted">{userData.length}</span>
                        </Link>
                      </div>
                      <div className="menu-item">
                        <div className="menu-content pb-2">
                          <span className="menu-section text-muted text-uppercase fs-7 fw-bold" >Role</span>
                        </div>
                      </div>
                      <div className="menu-item">
                        <Link to={''} className={`menu-link border-3 border-start border-primary ${toggleTabType === 'Role' ? 'active' : ''}`} onClick={() => setToggleTabType('Role')}>
                          <span className="menu-title">Role List</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 hover-scroll-overlay-y p-5">
                    <>
                      {
                        toggleTabType === 'User'
                          ?
                          <TestGrid data={userData} columns={userColumns} setData={() => { }} />
                          :
                          null
                      }
                      {
                        toggleTabType === 'Role'
                          ?
                          < RoleDetails setModalIsOpen={setModalIsOpen} setRole={setCurrentRoleId} />
                          :
                          null
                      }
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(prev => !prev)} size={'xl'} scrollable={true} centered={true} >
        <Modal.Header closeButton={true}>
          <Modal.Title>{toggleTabType === 'User' ? 'Add User' : 'Role & Permission'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            toggleTabType === 'User'
              ?
              <UserForm setModalIsOpen={setModalIsOpen} userId={currentUserId} />
              :
              null
          }
          {
            toggleTabType === 'Role'
              ?
              <RoleForm setModalIsOpen={setModalIsOpen} RoleId={currentRoleId} />
              :
              null
          }
        </Modal.Body>
      </Modal>
    </>
  )

}
