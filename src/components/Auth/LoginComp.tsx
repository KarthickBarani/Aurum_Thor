import axios from 'axios';
import { useFormik } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../Interface/Interface';


export const LoginComp = (props: {
  setAuthUser: Function
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const formInput = 'form-control form-control-solid mt-1';
  const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';



  const navigation = useNavigate()

  const onSubmit = () => {
    setLoading(true)
    axios.post<AuthUser>(process.env.REACT_APP_BACKEND_BASEURL + '/api/v1/Auth', formik.values).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      res.data.Status === true ? navigation('/Home') : navigation('/')
      props.setAuthUser(res.data)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      navigation('/')
      setLoading(false)
    }
    )
  }
  const initialValues = {
    username: '',
    password: '',
    domain: ''
  }

  const formik = useFormik(
    {
      initialValues,
      onSubmit
    }
  )


  return (
    <>
      <div className='container-fluid' style={{ height: '90vh' }}>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col col-sm-8 col-lg-5 align-items-center'>
            <div className='card card-flush shadow-sm'>
              <div className='card-body'>
                <div>
                  <div className='text-center mb-15 mb-lg-15'>
                    <h3 className='font-size-h1'>Sign In</h3>
                    <p className='text-muted font-weight-bold'>
                      Enter your username and password
                    </p>
                  </div>

                  <form onSubmit={formik.handleSubmit}>
                    <div className='form-group text-start'>
                      <label htmlFor='username' className={formLabel}>
                        username
                      </label>
                      <input
                        className={formInput}
                        id='username'
                        name='username'
                        type='text'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></input>
                    </div>
                    <div className='form-group text-start'>
                      <label htmlFor='password' className={formLabel}>
                        password
                      </label>
                      <input
                        className={formInput}
                        id='password'
                        name='password'
                        type={'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></input>
                    </div>
                    <div className='form-group d-flex flex-stack'>
                      <a href='/' className='text-dark-50 text-hover-primary my-3 mr-2'>
                        Forgot Password ?
                      </a>
                      <button
                        type={'submit'}
                        className='btn btn-primary btn-sm font-weight-bold my-3'
                      >
                        {isLoading ? <>Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span></> : 'Sign In'}
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
