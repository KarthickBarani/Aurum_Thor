import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from './Header';
import Swal from 'sweetalert2';
import { AddField } from './AddField';

export const SettingsGrid = (props: {
  setClicked: Function;
  setFields: Function;
  data: any;
  page: string;
}) => {
  const navigation = useNavigate();

  const data: any = props.data;
  console.log(data);
  const columns = Header;
  const hideCols = ['IsActive', 'SystemField', 'IsRemoved'];
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

  const addField = () => {};

  return (
    <div className='card card-flush card-stretch shadow-sm'>
      <div className='card-header'>
        <span className='card-title fw-bolder fs-4 text-gray-800'>
          {props.page}
        </span>

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
                          props.setClicked(true);
                          props.setFields(row.original);
                          console.log(row.original);
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
