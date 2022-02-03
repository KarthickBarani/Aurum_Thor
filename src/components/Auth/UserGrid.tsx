import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserHeader } from './UserHeader';

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
}[];

export const UserGrid = (props: {
  setUserDetail: Function;
  setIsClicked: Function;
  data: any;
  page: string;
}) => {
  const navigation = useNavigate();

  const data: UserProfileData = props.data;

  // const columns = Column

  // const hideCols = ['terms', 'updated', 'assignment', 'currency']
  const columns = UserHeader;
  const hideCols = [
    'Password',
    'MiddleName',
    'ResetRequired',
    'RoleId',
    'EnterpriseId',
    'CompanyId',
    'CreatedTimeStamp',
    'LastModifiedtimeStamp',
  ];
  const initialState = { ...columns, hiddenColumns: hideCols };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    setGlobalFilter,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <div className='card card-flush card-stretch shadow-sm'>
      <div className='card-header'>
        <span className='card-title fw-bolder fs-4 text-gray-800'> Users</span>

        <div className='card-toolbar'>
          <span className='sm-ms-auto'>
            <input
              value={globalFilter || ''}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
              }}
              className='form-control form-control-solid'
              placeholder='Search Here'
            />
          </span>
          <button
            type='button'
            className='btn btn-light m-2'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-start'
          >
            Columns
          </button>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4'
            data-kt-menu='true'
          >
            <div className='menu-item px-3 el'>
              <input type='checkbox' {...getToggleHideAllColumnsProps()} />{' '}
              Toggle All
              {allColumns.map((column) => {
                return (
                  <div key={column.id}>
                    <label>
                      <input
                        type='checkbox'
                        {...column.getToggleHiddenProps()}
                      />{' '}
                      {column.Header}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='card-body '>
        <div className='tab-content'>
          <div
            className='tab-pane fade show active'
            id='myApprovalTab'
            role='tabpanel'
          >
            <div className='table-responsive'>
              <table
                {...getTableProps()}
                className='table table-rounded table-hover gs-3 gx-3 '
              >
                <thead className='fw-bolder fs-6'>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render('Header')}
                          <span className=' ps-3 text-end'>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? '     ◢'
                                : '     ◣'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className='fw-bold fs-7'>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        role={'button'}
                        onClick={() => {
                          props.setIsClicked(true);
                          props.setUserDetail(row.original);
                          // setTimeout(() => );
                          //     navigation('/UserDetail', {
                          //       state: { userId: row.original.Id },
                          //     }),
                          //   1
                          // );
                        }}
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
