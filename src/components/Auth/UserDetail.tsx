import axios from 'axios';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { useHydrate, useQuery } from 'react-query';
import { Loading } from '../Loading';
import { Error } from '../Error';
import React, { useState, useEffect } from 'react';
import { AxiosGet, AxiosInsert, AxiosUpdate } from '../../helpers/Axios';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type userFormFields = {
  EmailAddress: string;
};

export const UserDetail = React.memo(
  (props?: { data: any; setIsClicked: Function }) => {
    console.log(props?.data);
    const [isEmailExists, setIsEmailExists] = useState<string>('');

    const navigation = useNavigate();

    const validate = (values: any) => {
      const errors = {} as userFormFields;
      if (!values.EmailAddress) {
        errors.EmailAddress = 'Email is required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EmailAddress)
      ) {
        errors.EmailAddress = 'Invalid email address';
      }
      return errors;
    };

    const confirm = (header) => {
      Swal.fire({
        text: header,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-light-info',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          props?.setIsClicked(false);
        }
      });
    };
    const emailHandleBlur = (e) => {
      console.log(e.target.value);
      let userId: null = null;
      let email: string = e.target.value;
      AxiosGet(`/api/v1/UserProfile/Exists/${userId}/${email}`).then((data) => {
        console.log(data);
        setIsEmailExists(data?.Message);
        if (data?.Message) {
          // errors.EmailAddress = 'Email already exists';
        }
        console.log(isEmailExists);
      });
    };
    const formik = useFormik({
      initialValues: {
        Id: props?.data.Id,
        UserName: props?.data.UserName,
        FirstName: props?.data.FirstName,
        MiddleName: props?.data.MiddleName,
        LastName: props?.data.LastName,
        Active: props?.data.Active,
        DisplayName: props?.data.DisplayName,
        EmailAddress: props?.data.EmailAddress,
      },
      validate: validate,
      onSubmit: (values) => {
        console.log(values);
        let formData = JSON.stringify(values, (key, value) => {
          if (key === 'Active') {
            value ? (value = true) : (value = false);
          }
          return value;
        });

        AxiosUpdate('/api/v1/UserProfile', formData).then((data) => {
          data === true ? confirm('User updated successfully') : null;
        });
      },
    });

    const formikNewForm = useFormik({
      initialValues: {
        UserName: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        DisplayName: '',
        EmailAddress: '',
        Password: '12345',
        Active: '',
      },
      validate: validate,
      onSubmit: (values) => {
        console.log(values);
        let formData = JSON.stringify(values);
        AxiosInsert('/api/v1/UserProfile', formData).then((data) => {
          data === true ? confirm('User inserted successfully') : null;
        });
      },
    });
    const formInput = 'form-control form-control-solid mb-1';
    const formSelect = 'form-select form-select-solid';
    const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';
    return props?.data ? (
      <form onSubmit={formik.handleSubmit}>
        <div className='container-fluid'>
          <div className='card card-flush card-stretch shadow-sm'>
            <div className='card-header bg-white'>
              <h3 className='card-title fw-bolders'>User Details</h3>
              <div className='card-toolbar'></div>
            </div>

            <div className='card-body'>
              <div className='row'>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      First Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='FirstName'
                        name='FirstName'
                        type='text'
                        value={formik.values.FirstName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Middle Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='MiddleName'
                        name='MiddleName'
                        type='text'
                        value={formik.values.MiddleName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Last Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='LastName'
                        name='LastName'
                        type='text'
                        value={formik.values.LastName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    Email Address
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='EmailAddress'
                      name='EmailAddress'
                      type='email'
                      value={formik.values.EmailAddress}
                      onChange={formik.handleChange}
                    />
                  </div>

                  {formik.errors.EmailAddress ? (
                    <div style={{ color: 'red' }}>
                      {formik.errors.EmailAddress}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    Display Name
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='DisplayName'
                      name='DisplayName'
                      type='text'
                      value={formik.values.DisplayName}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    User Name
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='UserName'
                      name='UserName'
                      type='text'
                      value={formik.values.UserName}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-check py-auto'>
                    <label
                      htmlFor='Active'
                      className='form-check-label mt-5 fw-bolder fs-6 gray-700  '
                    >
                      IsActive
                    </label>
                    <input
                      type='checkbox'
                      id='Active'
                      name='Active'
                      className='form-check-input form-check-solid mt-5'
                      checked={formik.values.Active ? true : false}
                      value={formik.values.Active}
                      onChange={(e) =>
                        formik.setFieldValue('Active', e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
                    <button
                      type='submit'
                      className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6'
                    >
                      Update User
                    </button>

                    <button
                      type='button'
                      className='btn btn-light-dark font-weight-bold px-9 py-3 my-6'
                      onClick={() => props.setIsClicked(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    ) : (
      <form onSubmit={formikNewForm.handleSubmit}>
        <div className='container-fluid'>
          <div className='card card-flush card-stretch shadow-sm'>
            <div className='card-header bg-white'>
              <h3 className='card-title fw-bolders'>User Details</h3>
              <div className='card-toolbar'></div>
            </div>

            <div className='card-body'>
              <div className='row'>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      First Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='FirstName'
                        name='FirstName'
                        type='text'
                        value={formikNewForm.values.FirstName}
                        onChange={formikNewForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Middle Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='MiddleName'
                        name='MiddleName'
                        type='text'
                        value={formikNewForm.values.MiddleName}
                        onChange={formikNewForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Last Name
                    </label>
                    <div className='input-group input-group-solid'>
                      <input
                        className={formInput}
                        id='LastName'
                        name='LastName'
                        type='text'
                        value={formikNewForm.values.LastName}
                        onChange={formikNewForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    Email Address
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='EmailAddress'
                      name='EmailAddress'
                      type='text'
                      value={formikNewForm.values.EmailAddress}
                      onChange={formikNewForm.handleChange}
                      onBlur={emailHandleBlur}
                    />
                  </div>
                  {isEmailExists && (
                    <div style={{ color: 'red' }}>{isEmailExists}</div>
                  )}
                  {formikNewForm.errors.EmailAddress ? (
                    <div style={{ color: 'red' }}>
                      {formikNewForm.errors.EmailAddress}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    Display Name
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='DisplayName'
                      name='DisplayName'
                      type='text'
                      value={formikNewForm.values.DisplayName}
                      onChange={formikNewForm.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='vendorName' className={formLabel}>
                    User Name
                  </label>
                  <div className='input-group input-group-solid'>
                    <input
                      className={formInput}
                      id='UserName'
                      name='UserName'
                      type='text'
                      value={formikNewForm.values.UserName}
                      onChange={formikNewForm.handleChange}
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-check py-auto'>
                    <label
                      htmlFor='Active'
                      className='form-check-label mt-5 fw-bolder fs-6 gray-700  '
                    >
                      IsActive
                    </label>
                    <input
                      type='checkbox'
                      id='Active'
                      name='Active'
                      className='form-check-input form-check-solid mt-5'
                      checked={formikNewForm.values.Active ? true : false}
                      value={formikNewForm.values.Active}
                      onChange={formikNewForm.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
                    {isEmailExists ? (
                      <button
                        type='submit'
                        className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6'
                        disabled
                      >
                        Add User
                      </button>
                    ) : (
                      <button
                        type='submit'
                        className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6'
                      >
                        Add User
                      </button>
                    )}
                    <button
                      type='button'
                      className='btn btn-light-dark font-weight-bold px-9 py-3 my-6'
                      onClick={() => formikNewForm.resetForm()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);
