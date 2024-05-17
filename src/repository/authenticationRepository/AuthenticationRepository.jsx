import axios from "../../axios/axios";

const AuthenticationRepository = {
    loginUser: (request) => {
        return axios.post('/Auth/login', request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + request
            }
        })
    },

    registerUser: (request) => {
        return axios.post("/Auth/register", request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + request
            }
        })
    }
}

export default AuthenticationRepository;