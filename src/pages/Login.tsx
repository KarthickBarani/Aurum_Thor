import React from "react";
import { LoginComp } from '../components/Auth/LoginComp';

export const Login = (props: { setAuthUser: Function }) => {


    return (
        <>
            <LoginComp setAuthUser={props.setAuthUser} />
        </>
    )
}