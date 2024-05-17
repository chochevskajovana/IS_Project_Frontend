import axios from "../../axios/axios";

const UsersService = {

    getAllUsers: () => {
        return axios.get("/User");
    },

    uploadUsers: (file) => {
        return axios.post("/User/importUsers", file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: "blob",
        });
    }


}

export default UsersService;