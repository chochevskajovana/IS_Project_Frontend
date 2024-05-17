import React from "react";
import decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";

const ProtectedRoute = ({ authorizedRoles, ...rest }) => {
    const isAuthorized = (authorizedRoles) => {
        if (authorizedRoles.length === 0) return true;

        const token = localStorage.getItem("auth_token");

        let userRole = null;
        if (token) {
            const decoded_token = jwt(token);
            console.log(decoded_token);
            userRole =
                decoded_token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const isAuthorized = authorizedRoles.filter((role) =>
                userRole.includes(role)
            );
            return isAuthorized.length > 0;
        }
        return false;
    };

    const isAuthenticated = () => {
        try {
            const token = localStorage.getItem("auth_token");
            decode(token);
            return true;
        } catch (error) {
            return false;
        }
    };

    return isAuthenticated() ? (
        isAuthorized(authorizedRoles) ? (
            <Outlet />
        ) : (
            <Navigate
                to={{
                    pathname: "/forbidden",
                }}
            />
        )
    ) : (
        <Navigate
            to={{
                pathname: "/login",
            }}
        />
    );
};

export default ProtectedRoute;
