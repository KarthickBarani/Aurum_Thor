import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterLink = () => {
    const navigation = useNavigate();
    const switchViewToRegister = () => {
        navigation('/Register');
    }

    return (
        <>
        <div className="mt-5 mb-lg-0 flex-column-auto">
						<span className="font-weight-bold text-dark-50">Dont have an account yet?</span>
						<a href="javascript:;" className="font-weight-bold ml-2 px-2" id="kt_login_signup" onClick={switchViewToRegister}>Sign Up!</a>
					</div>
        </>
    )
}