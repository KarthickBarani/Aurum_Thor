import axios from 'axios';
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosGet, axiosPost } from '../../helpers/Axios';
import { UserSvg } from '../Svg/Svg';
import { AuthContext, PermissionContext } from '../../router/Router';


export const LoginComp = (props: {
  setPermission: Function
}) => {

  const CurrentRole = useContext(AuthContext)
  const CurrentPermission = useContext(PermissionContext)
  console.log(CurrentRole)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const formInput = 'form-control form-control-solid mt-1';
  const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';
  const [step, setStep] = useState<boolean>(false)


  const navigation = useNavigate()

  const onSubmit = () => {
    setLoading(true)
    axiosPost('/Auth', formik.values)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        if (res.data.Status === true) {
          if (res.data.User.Roles && res.data.User.Roles.filter(role => role.IsActive).length > 0) {
            setStep(res.data.Status)
          } else {
            setStep(false)
            toast.error('Permission denied !!', { position: 'bottom-center' })
          }
        } else {
          navigation('/')
        }
        if (!res.data.Status) {
          toast.error(res.data.Message)
        }
        CurrentRole?.authSetMethod(res.data)
        setLoading(false)
      })
      .catch(err => {
        toast.error('Something went wrong!',)
        console.error(err)
        navigation('/')
        setLoading(false)
      })
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

  const LoginForm = () => <>
    <div className='text-center mb-15 mb-lg-15'>
      <h3 className='font-size-h1'>Sign In</h3>
      <p className='text-muted font-weight-bold'>
        Enter your username and password
      </p>
    </div>

    <form onSubmit={formik.handleSubmit}>
      <span className="text-danger">{message}</span>
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

  </>

  const RoleForm = ({ User }) => <>
    <div className="d-flex flex-column h-100">
      <div className="d-flex m-1 p-3 gap-3 justify-content-center">
        <div className='d-flex flex-column text-center'>
          <p className='text-gray-900 fs-2 fw-bold'>{`${User.FirstName} ${User.LastName}`}</p>
          <p className='text-gray-400 '>{User.EmailAddress}</p>
        </div>
      </div>
      <div className='d-flex justify-content-around'>
        {
          User && User.Roles.filter(role => role.IsActive).map(role => (
            <div
              key={role.RoleId}
              className="symbol symbol-150px"
              role={'button'}
              onClick={() => {
                navigation('/Home')
                axiosGet(`/Role/${role.RoleId}`)
                  .then(res => {
                    CurrentPermission?.permissionSetMethod(res.data)
                  })
                  .catch(() => {
                    toast.error('Something Went Wrong !!!')
                  })
              }}>
              <div className="symbol-label fs-2 fw-semibold text-success bg-hover-light-success d-flex flex-column text-center">
                <UserSvg clsName='svg-icon svg-icon-success svg-icon-3x'></UserSvg>
                <p className='text-gray-900 fs-4 fw-bold'>{role.Name}</p>
                <p className='text-gray-400 fs-6'>{role.Descprition}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  </>


  return (
    <>
      <div className='container-fluid' style={{ height: '90vh' }}>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col col-sm-8 col-lg-5 align-items-center'>
            <div className='card card-flush shadow-sm h-350px'>
              <div className='card-body'>
                {
                  CurrentRole?.authUser && CurrentRole?.authUser.User?.Roles && CurrentRole?.authUser.User?.Roles.length > 0
                    ?
                    step
                      ?
                      <RoleForm User={CurrentRole?.authUser.User} />
                      : <LoginForm />
                    :
                    <LoginForm />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
