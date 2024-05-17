import jwt from "jwt-decode";

const RolesService = {
    hasRole: (authorizedRoles) => {

        const token = localStorage.getItem('auth_token');

        let userRole = null;
        if (token) {
            const decoded_token = jwt(token);
            console.log(decoded_token);
            userRole = decoded_token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const isAuthorized = authorizedRoles.filter((role) => userRole.includes(role));
            return isAuthorized.length > 0;
        }
    },
}

export default RolesService;