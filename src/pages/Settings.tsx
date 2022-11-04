import React, { useEffect, useState } from 'react';
import { AddField } from '../components/Settings/AddField';
import { SettingsGrid } from '../components/Settings/SettingsGrid';
import axios from 'axios';
import { useHydrate, useQuery } from 'react-query';
import { arrayBuffer } from 'stream/consumers';
import { axiosGet } from '../helpers/Axios';
type settings = {
  Field: string;
  Label: string;
}[];

export const Settings = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [fields, setFields] = useState<settings>([]);
  const [invoice, setInvoice] = useState<settings>([]);
  const [lineItem, setLineItem] = useState<settings>([]);
  const [expenseItem, setExpenseItem] = useState<settings>([]);
  const [page, setPage] = useState<string>('Invoice');

  useEffect(() => {
    axiosGet('/Settings')
      .then((res?: any) => {
        // const { Id, Type, Value } = res?.data[0];
        // console.log(Value);
        console.log(res?.data[0].Value);
        // setInvoice([
        //   ...res?.data[0].Value,
        //   res?.data[0].Value.map((invoice) => {
        //     console.log(invoice.Label && invoice.Label.join(' |'));
        //     return invoice.Label && invoice.Label.join(' |');
        //   }),
        // ]);

        setInvoice(res?.data[0].Value);
        setLineItem(res?.data[1].Value);
        setExpenseItem(res?.data[2].Value);
      })
      .catch((err) => console.log(err));
  }, []);

  const clickHandler = () => {
    setClicked(false);
  };
  return (
    <>
      <div className='container-fluid'>
        <div className='row my-10'>
          <div className='col'>
            <h4 className='text-white'>Settings</h4>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div
              className='card card-flush shadow-sm'
              style={{ minHeight: '100vh' }}
            >
              <div className='card-header bg-white'>
                <h3 className='w-50 px-10 py-5 my-3 fw-bolder fs-4 text-gray-800'>
                  Settings Page
                </h3>
                <div className='card-toolbar'></div>
              </div>

              <div className='card-body'>
                <button
                  type='button'
                  className='btn btn-light-primary w-150px m-2'
                  data-bs-toggle={'modal'}
                  data-bs-target='#kt_modal_1'
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '85px',
                  }}
                  onClick={clickHandler}
                >
                  Add New Field
                </button>
                <ul className='nav nav-tabs mx-10 mb-5 fs-6'>
                  <li className='nav-item'>
                    <a
                      className='nav-link active'
                      data-bs-toggle='tab'
                      href='#kt_tab_pane_4'
                      onClick={() => {
                        setClicked(false);
                        setPage('Invoice');
                      }}
                    >
                      Invoice
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link'
                      data-bs-toggle='tab'
                      href='#kt_tab_pane_5'
                      onClick={() => {
                        setClicked(false)
                        setPage('Line Item');
                      }}
                    >
                      Line Item
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link'
                      data-bs-toggle='tab'
                      href='#kt_tab_pane_6'
                      onClick={() => {
                        setClicked(false)
                        setPage('Expense');
                      }}
                    >
                      Expense Item
                    </a>
                  </li>
                </ul>

                <div className='tab-content' id='myTabContent'>
                  <div
                    className='tab-pane fade show active'
                    id='kt_tab_pane_4'
                    role='tabpanel'
                  >
                    {!clicked ? (
                      <SettingsGrid
                        setClicked={setClicked}
                        setFields={setFields}
                        data={invoice}
                        page={page}
                      />
                    ) : (
                      <AddField
                        setClicked={setClicked}
                        data={fields}
                        clicked={clicked}
                        page={page}
                      />
                    )}
                  </div>
                  <div
                    className='tab-pane fade'
                    id='kt_tab_pane_5'
                    role='tabpanel'
                  >
                    {!clicked ? (
                      <SettingsGrid
                        setClicked={setClicked}
                        setFields={setFields}
                        data={lineItem}
                        page={page}
                      />
                    ) : (
                      <AddField
                        setClicked={setClicked}
                        data={fields}
                        clicked={clicked}
                        page={page}
                      />
                    )}
                  </div>
                  <div
                    className='tab-pane fade'
                    id='kt_tab_pane_6'
                    role='tabpanel'
                  >
                    {!clicked ? (
                      <SettingsGrid
                        setClicked={setClicked}
                        setFields={setFields}
                        data={expenseItem}
                        page={page}
                      />
                    ) : (
                      <AddField
                        setClicked={setClicked}
                        data={fields}
                        clicked={clicked}
                        page={page}
                      />
                    )}
                  </div>
                </div>

                <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
                  <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Add New Field</h5>

                        <div
                          className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        >
                          <span className='svg-icon svg-icon-2x'></span>
                        </div>
                      </div>

                      <div className='modal-body'>
                        <AddField
                          setClicked={setClicked}
                          data={fields}
                          clicked={clicked}
                          page={page}
                        />
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
