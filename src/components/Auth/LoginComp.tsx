import React from 'react';
import { RegisterLink } from './RegisterLink';

export const LoginComp = () => {
  const formInput = 'form-control form-control-solid mt-1';
  const formSelect = 'form-select form-select-solid';
  const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';

  return (
    <>
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
                    className='login-form login-signin'
                    style={{ width: '100%', maxWidth: '400px' }}
                  >
                    <div className='text-center mb-15 mb-lg-15'>
                      <h3 className='font-size-h1'>Sign In</h3>
                      <p className='text-muted font-weight-bold'>
                        Enter your username and password
                      </p>
                    </div>
                    <div className='container-fluid'>
                      <div className='row'>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label htmlFor='userName' className={formLabel}>
                              Username
                            </label>
                            <input
                              className={formInput}
                              id='userName'
                              name='userName'
                              type='text'
                            ></input>
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group text-start'>
                            <label htmlFor='password' className={formLabel}>
                              Password
                            </label>
                            <input
                              className={formInput}
                              id='password'
                              name='password'
                              type='password'
                            ></input>
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='form-group d-flex flex-wrap justify-content-between align-items-center'>
                            <a
                              href='javascript:;'
                              className='text-dark-50 text-hover-primary my-3 mr-2'
                              id='kt_login_forgot'
                            >
                              Forgot Password ?
                            </a>
                            <button
                              type='button'
                              className='btn btn-primary font-weight-bold px-9 py-4 my-3'
                            >
                              Sign In
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
    </>
  );
};
