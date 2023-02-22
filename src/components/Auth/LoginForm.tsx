import { useContext, useEffect, useRef, useState } from "react"
import { axiosPost } from "../../helpers/Axios"
import { toastAlert } from "../../Function/toast"
import { AuthContext } from "../../router/Router"
import { useNavigate } from "react-router-dom"
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../../authConfig"
import { SweetAlert } from "../../Function/alert"
import { error } from "console"

export const LoginForm = () => {


    const { instance } = useMsal()
    const CurrentRole = useContext(AuthContext)
    const navigation = useNavigate()


    useEffect(() => {
        instance.loginPopup(loginRequest)
            .then((value) => {
                signinWithSSO(value.account?.username)
            })
            .catch(e => {
                console.log(e);
            });

        return () => { }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        instance.loginPopup(loginRequest)
            .then((value) => {
                signinWithSSO(value.account?.username)
            })
            .catch(e => {
                console.log(e);
            });
    }



    const userNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    const signinWithSSO = (userName) => {
        setLoading(true)
        axiosPost('/Auth', {
            UserName: userName,
            Password: '',
            IsSSO: true
        })
            .then(res => {
                if (res.data.Status) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    CurrentRole?.authSetMethod(res.data)
                    console.log(res.data)
                    navigation('/Roles')
                } else {
                    // toastAlert('error', res.data.Message)
                    SweetAlert({
                        icon: 'error',
                        title: res.data.Message,
                        titleText: res.data.Message
                    })
                }
            })
            .catch(err => toastAlert('error', err.toString()))
            .finally(() => setLoading(false))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosPost('/Auth', { userName: userNameRef.current?.value, password: passwordRef.current?.value, IsSSO: false })
            .then(res => {
                CurrentRole?.authSetMethod(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                if (res.data.Status === true) {
                    if (res.data.User.Roles && res.data.User.Roles.filter(role => role.IsActive).length > 0) {
                        navigation('/Roles')
                    } else {
                        SweetAlert({
                            icon: 'error',
                            title: 'Permission denied !!',
                            titleText: res.data.Message
                        })
                        // toastAlert('error', 'Permission denied !!')
                    }
                } else {
                    SweetAlert({
                        icon: 'error',
                        titleText: res.data.Message
                    })
                    // toastAlert('error', res.data.Message)
                }
                setLoading(false)
            })
            .catch(err => {
                toastAlert('error', 'Something went wrong!',)
                setLoading(false)
            })
    }

    const formInput = 'form-control form-control-solid form-control-sm mt-1';
    const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';

    const LoginTemplate = () => {
        return (<>
            <div className='text-center mb-15 mb-lg-15'>
                <h3 className='font-size-h1'>Sign In</h3>
                <p className='text-muted font-weight-bold'>
                    Enter your username and password
                </p>
            </div>

            <form>
                <div className='form-group text-start'>
                    <label htmlFor='username' className={formLabel}>
                        username
                    </label>
                    <input
                        className={formInput}
                        ref={userNameRef}
                        id='username'
                        name='username'
                        type='text'
                    ></input>
                </div>
                <div className='form-group text-start'>
                    <label htmlFor='password' className={formLabel}>
                        password
                    </label>
                    <input
                        className={formInput}
                        ref={passwordRef}
                        id='password'
                        name='password'
                        type={'password'}
                    ></input>
                </div>
                <div className='form-group d-flex flex-stack'>
                    <a href='/' className='text-dark-50 text-hover-primary my-3 mr-2'>
                        Forgot Password ?
                    </a>
                    <button
                        onClick={submitHandler}
                        className='btn btn-light-primary btn-sm font-weight-bold my-3'
                    >
                        {isLoading ? <>Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span></> : 'Sign In'}
                    </button>
                </div>
            </form>
            <div className="separator separator-content my-14"><span className="w-250px fw-bold">Or</span></div>
            <div className="d-block ">
                <button className='btn btn-light btn-sm w-100' onClick={handleLogin} ><span className="svg-icon svg-icon-light-primary svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)" /><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)" /><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)" /><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)" /></svg>
                </span>Microsoft 365</button>
            </div>
        </>
        )
    }

    const AuthUserTemplate = ({ account }) => {
        console.log(account)
        return (
            <>
                <div className="d-flex flex-column h-100">
                    <div className="d-flex m-1 p-3 gap-3 justify-content-center">
                        <div className='d-flex flex-column text-center'>
                            <p className='text-gray-900 fs-2 fw-bold'>{`${account.name}`}</p>
                            <p className='text-gray-400 '>{account.username}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <button
                            className="btn btn-light-primary btn-sm w-100"
                            onClick={signinWithSSO}
                        >{isLoading ? <>Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span></> : 'Sign In'}</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <LoginTemplate />
        </div>
    )
}