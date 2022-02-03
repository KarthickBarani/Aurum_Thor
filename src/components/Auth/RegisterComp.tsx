import React, { useState, useEffect } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { baseURL } from '../../helpers/AxiosInstance';
import { AxiosGet, AxiosInsert } from '../../helpers/Axios';
import { useFormik, Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';

type registerFormFields = {
  EmailAddress: string;
  Password: string;
  cfrmpassword: string;
  UserName: string;
};
type roles = {
  RoleId: number;
  Name: string;
  Description: string;
  IsActive: boolean;
}[];

export const RegisterComp = () => {
  const formInput = 'form-control form-control-solid mt-1';
  const formSelect = 'form-select form-select-solid';
  const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';
  const requiredFormLabel = 'required form-label fw-bolder fs-6 gray-700 mt-2';

  const [isInserted, setIsInserted] = useState<boolean>(false);
  const [isNotInserted, setIsNotInserted] = useState<boolean>(true);
  const [isEmailExists, setIsEmailExists] = useState<string>('');
  const [userRoles, setUserRoles] = useState<roles>([] as roles);
  //   let isEmailExists: string = '';
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get('https://invoiceprocessingapi.azurewebsites.net/api/v1/role')
      .then((res?: any) => {
        setUserRoles(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const switchViewToLogin = () => {
    setTimeout(() => navigation('/Login'), 1);
  };
  let roles: string[] = ['<--select-->', 'Finance Team', 'Admin'];

  const validate = (values: any) => {
    const errors = {} as registerFormFields;
    if (!values.EmailAddress) {
      errors.EmailAddress = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EmailAddress)
    ) {
      errors.EmailAddress = 'Invalid email address';
    }
    if (!values.UserName) {
      errors.UserName = 'Username is required';
    }

    if (!values.Password) {
      errors.Password = 'Password is required';
    } else if (values.Password.length < 6) {
      errors.Password = 'Password can not be less than 6 characters';
    }

    if (values.Password.localeCompare(values.cfrmpassword)) {
      errors.cfrmpassword = 'Password and Confirm Password is not same';
    }
    console.log(errors);
    return errors;
  };

  const confirmRegister = () => {
    Swal.fire({
      text: 'Successfully Registered',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Login',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigation('/Login');
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
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      UserName: '',
      Password: '',
      cfrmpassword: '',
      role: '',
    },
    validate: validate,
    onSubmit: (values, isSubmitting) => {
      let formData = JSON.stringify(values, (key, value) => {
        if (key === 'cfrmpassword') {
          return undefined;
        }
        return value;
      });
      AxiosInsert('/api/v1/UserProfile', formData).then((data) => {
        data === true ? confirmRegister() : setIsNotInserted(false);
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='container-fluid'>
        <div className='row my-10'>
          <div className='col'>
            <h4 className='text-white'>Login</h4>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div
              className='card card-flush shadow-sm'
              style={{ minHeight: '70vh' }}
            >
              <div className='card-body'>
                <div className='d-flex flex-column-fluid flex-center mt-30 mt-lg-0'>
                  <div
                    className='login-form login-signup'
                    style={{ width: '100%', maxWidth: '400px' }}
                  >
                    <div className='text-center '>
                      <h3 className='font-size-h1'>User Register</h3>
                      <p className='text-muted font-weight-bold'>
                        Enter your details
                      </p>
                    </div>
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col-6'>
                          <div className='form-group text-start'>
                            <label htmlFor='FirstName' className={formLabel}>
                              first Name
                            </label>
                            <input
                              className={formInput}
                              id='FirstName'
                              name='FirstName'
                              type='text'
                              onChange={formik.handleChange}
                              value={formik.values.FirstName}
                            ></input>
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className='form-group text-start'>
                            <label htmlFor='LastName' className={formLabel}>
                              Last Name
                            </label>
                            <input
                              className={formInput}
                              id='LastName'
                              name='LastName'
                              type='text'
                              onChange={formik.handleChange}
                              value={formik.values.LastName}
                            ></input>
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label
                              htmlFor='UserName'
                              className={requiredFormLabel}
                            >
                              Username
                            </label>
                            <input
                              className={formInput}
                              id='UserName'
                              name='UserName'
                              value={formik.values.UserName}
                              onChange={formik.handleChange}
                              type='text'
                            ></input>
                            {formik.errors.UserName ? (
                              <div style={{ color: 'red' }}>
                                {formik.errors.UserName}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label
                              htmlFor='EmailAddress'
                              className={requiredFormLabel}
                            >
                              Email
                            </label>
                            <input
                              className={formInput}
                              id='EmailAddress'
                              name='EmailAddress'
                              value={formik.values.EmailAddress}
                              onChange={formik.handleChange}
                              onBlur={emailHandleBlur}
                              type='email'
                            ></input>
                            {isEmailExists && (
                              <div style={{ color: 'red' }}>
                                {isEmailExists}
                              </div>
                            )}
                            {formik.errors.EmailAddress ? (
                              <div style={{ color: 'red' }}>
                                {formik.errors.EmailAddress}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label
                              htmlFor='Password'
                              className={requiredFormLabel}
                            >
                              Password
                            </label>
                            <input
                              className={formInput}
                              id='Password'
                              name='Password'
                              type='Password'
                              value={formik.values.Password}
                              onChange={formik.handleChange}
                            ></input>
                            {formik.errors.Password ? (
                              <div style={{ color: 'red' }}>
                                {formik.errors.Password}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label htmlFor='cfrmpassword' className={formLabel}>
                              Confirm Password
                            </label>
                            <input
                              className={formInput}
                              id='cfrmpassword'
                              name='cfrmpassword'
                              type='password'
                              value={formik.values.cfrmpassword}
                              onChange={formik.handleChange}
                            ></input>
                            {formik.errors.cfrmpassword ? (
                              <div style={{ color: 'red' }}>
                                {formik.errors.cfrmpassword}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>

                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label htmlFor='role' className={formLabel}>
                              Role
                            </label>
                            <select
                              id='role'
                              name='role'
                              className={formSelect}
                              value={formik.values.role}
                              onChange={formik.handleChange}
                            >
                              {userRoles.map((role) => (
                                <option key={role.RoleId}>{role.Name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {isInserted && (
                          <div>
                            User Added Successfully. Navigating to{' '}
                            {
                              <NavLink to="/Login?status='registered'">
                                Login
                              </NavLink>
                            }
                            Page{' '}
                          </div>
                        )}
                        {isNotInserted && <div> {isNotInserted} </div>}
                        <div className='col-12'>
                          <div className='form-group d-flex flex-wrap justify-content-between align-items-center'>
                            {isEmailExists ? (
                              <button
                                type='submit'
                                className='btn btn-primary font-weight-bold px-9 py-3 my-6'
                                disabled
                              >
                                Submit
                              </button>
                            ) : (
                              <button
                                type='submit'
                                className='btn btn-primary font-weight-bold px-9 py-3 my-6'
                              >
                                Submit
                              </button>
                            )}
                            <button
                              type='button'
                              className='btn btn-secondary font-weight-bold px-9 py-3 my-6'
                              onClick={switchViewToLogin}
                            >
                              Cancel
                            </button>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
