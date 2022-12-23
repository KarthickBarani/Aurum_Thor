import { LoginComp } from '../components/Auth/LoginComp';
import { AuthUser } from '../components/Interface/Interface';

export const Login = (props: { setPermission: Function }) => {


    return (
        <>
            <LoginComp setPermission={props.setPermission} />
        </>
    )
}