import { useIsAuthenticated } from "@azure/msal-react";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext, PermissionContext } from "../../router/Router";

export const ProtectRoutes = ({ children }) => {
    const isAutherazied = useIsAuthenticated()
    const currentAuthUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))


    if (isAutherazied || currentAuthUser.Status) {
        return children
    }
    return <Navigate to={'/'} replace />;
}