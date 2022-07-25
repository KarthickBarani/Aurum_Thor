import React, { useState, useEffect } from 'react';
import { AddUser } from '../components/Auth/AddUser';

import { AxiosGet } from '../helpers/Axios';
import { useHydrate, useQuery } from 'react-query';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';
import { Table } from '../components/Home/Table';
import { Loading } from '../components/components/Loading';
import { Error } from '../components/components/Error';
import { UserGrid } from '../components/Auth/UserGrid';
import { UserDetail } from '../components/Auth/UserDetail';

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
}[];
export const UserManagement = () => {
  const [isClicked, setIsClicked] = useState<boolean>();
  const [userDetail, setUserDetail] = useState<UserProfileData>();

  let today: string = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1
    }-${new Date().getDate() < 10
      ? `0${new Date().getDate()}`
      : new Date().getDate()
    }`;

  const fetchUsers = () => {
    return axios.get(
      `https://invoiceprocessingapi.azurewebsites.net/api/v1/UserProfile`
    );
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    ['UserProfileData', isClicked],
    fetchUsers
  );

  return (
    <>
      <div className='container-fluid'>
        <div className='row my-10'>
          <div className='col'>
            <h4 className='text-white'>User Management</h4>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div
              className='card card-flush shadow-sm'
              style={{ minHeight: '100vh' }}
            >
              <h3 className='w-50 px-10 py-5 my-3 fw-bolder fs-4 text-gray-800'>
                User Management
              </h3>
              <ul className='nav nav-tabs mx-10 mb-5 fs-6'>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    data-bs-toggle='tab'
                    href='#kt_tab_pane_4'
                  >
                    Users
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    data-bs-toggle='tab'
                    href='#kt_tab_pane_5'
                  >
                    Roles
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    data-bs-toggle='tab'
                    href='#kt_tab_pane_6'
                  >
                    Permissions
                  </a>
                </li>
              </ul>

              <div className='tab-content' id='myTabContent'>
                <div
                  className='tab-pane fade show active'
                  id='kt_tab_pane_4'
                  role='tabpanel'
                >
                  <div
                    className='d-flex flex-column flex-md-row rounded p-10'
                    style={{ minHeight: '85vh' }}
                  >
                    <ul
                      className='nav nav-tabs nav-pills flex-row border flex-md-column me-5 mb-3 mb-md-0 fs-6'
                      style={{ border: '1px solid' }}
                    >
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link active btn btn-flex btn-active-light-success'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_4'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>
                              View Active Users
                            </span>
                            <span className='fs-7'>Edit or Remove Users</span>
                          </span>
                        </a>
                      </li>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link btn btn-flex btn-active-light-success'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_5'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>Add Users</span>
                            <span className='fs-7'>Add New User</span>
                          </span>
                        </a>
                      </li>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link btn btn-flex btn-active-light-success'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_6'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>All Users</span>
                            <span className='fs-7'>View All Users</span>
                          </span>
                        </a>
                      </li>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link btn btn-flex btn-active-light-danger'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_7'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>
                              Deleted Users
                            </span>
                            <span className='fs-7'>View Deleted Users</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div
                      className='tab-content'
                      id='myTabContent'
                      style={{ width: '80%' }}
                    >
                      <div
                        className='tab-pane fade show active'
                        id='kt_vtab_pane_4'
                        role='tabpanel'
                      >
                        {isLoading ? (
                          <Loading />
                        ) : isError ? (
                          <Error />
                        ) : data?.data && !isClicked ? (
                          <UserGrid
                            setUserDetail={setUserDetail}
                            setIsClicked={setIsClicked}
                            data={data?.data.filter(
                              (arr) => arr.Active === true
                            )}
                            page='UserManagement'
                          />
                        ) : (
                          <UserDetail
                            data={userDetail}
                            setIsClicked={setIsClicked}
                          />
                        )}
                      </div>
                      <div
                        className='tab-pane fade'
                        id='kt_vtab_pane_5'
                        role='tabpanel'
                      >
                        <UserDetail data='' setIsClicked={setIsClicked} />
                      </div>
                      <div
                        className='tab-pane fade'
                        id='kt_vtab_pane_6'
                        role='tabpanel'
                      >
                        {isLoading ? (
                          <Loading />
                        ) : isError ? (
                          <Error />
                        ) : data?.data && !isClicked ? (
                          <UserGrid
                            setUserDetail={setUserDetail}
                            setIsClicked={setIsClicked}
                            data={data?.data}
                            page='UserManagement'
                          />
                        ) : (
                          <UserDetail
                            data={userDetail}
                            setIsClicked={setIsClicked}
                          />
                        )}
                      </div>
                      <div
                        className='tab-pane fade'
                        id='kt_vtab_pane_7'
                        role='tabpanel'
                      >
                        {isLoading ? (
                          <Loading />
                        ) : isError ? (
                          <Error />
                        ) : data?.data && !isClicked ? (
                          <UserGrid
                            setUserDetail={setUserDetail}
                            setIsClicked={setIsClicked}
                            data={data?.data.filter(
                              (arr) => arr.Active === false
                            )}
                            page='UserManagement'
                          />
                        ) : (
                          <UserDetail
                            data={userDetail}
                            setIsClicked={setIsClicked}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='tab-pane fade'
                  id='kt_tab_pane_5'
                  role='tabpanel'
                >
                  <div
                    className='d-flex flex-column flex-md-row rounded p-10'
                    style={{ minHeight: '85vh' }}
                  >
                    <ul className='nav nav-tabs nav-pills flex-row border flex-md-column me-5 mb-3 mb-md-0 fs-6'>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link active btn btn-flex btn-active-light-success'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_10'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>View Roles</span>
                            <span className='fs-7'>Edit or Remove Roles</span>
                          </span>
                        </a>
                      </li>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link btn btn-flex btn-active-light-info'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_11'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>Add Roles</span>
                            <span className='fs-7'>Add New Role</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content' id='myTabContent'>
                      <div
                        className='tab-pane fade show active'
                        id='kt_vtab_pane_10'
                        role='tabpanel'
                      >
                        {/* Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. */}
                      </div>
                      <div
                        className='tab-pane fade'
                        id='kt_vtab_pane_11'
                        role='tabpanel'
                      >
                        {/* Nulla est ullamco ut irure incididunt nulla Lorem Lorem minim irure officia enim reprehenderit. */}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='tab-pane fade'
                  id='kt_tab_pane_6'
                  role='tabpanel'
                >
                  <div
                    className='d-flex flex-column flex-md-row rounded p-10'
                    style={{ minHeight: '85vh' }}
                  >
                    <ul className='nav nav-tabs nav-pills flex-row border flex-md-column me-5 mb-3 mb-md-0 fs-6'>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link active btn btn-flex btn-active-light-success'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_12'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>
                              View Permissions
                            </span>
                            <span className='fs-7'>
                              Edit or Remove Permissions
                            </span>
                          </span>
                        </a>
                      </li>
                      <li className='nav-item me-0 mb-md-2'>
                        <a
                          className='nav-link btn btn-flex btn-active-light-info'
                          data-bs-toggle='tab'
                          href='#kt_vtab_pane_13'
                        >
                          <span className='svg-icon svg-icon-2'>
                            <svg>...</svg>
                          </span>
                          <span className='d-flex flex-column align-items-start'>
                            <span className='fs-4 fw-bolder'>
                              Add Permissions
                            </span>
                            <span className='fs-7'>Add New Permission</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content' id='myTabContent'>
                      <div
                        className='tab-pane fade show active'
                        id='kt_vtab_pane_12'
                        role='tabpanel'
                      >
                        {/* Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. */}
                      </div>
                      <div
                        className='tab-pane fade'
                        id='kt_vtab_pane_13'
                        role='tabpanel'
                      >
                        {/* Nulla est ullamco ut irure incididunt nulla Lorem Lorem minim irure officia enim reprehenderit. */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
