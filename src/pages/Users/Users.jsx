import './Users.css';
import {useEffect, useState} from "react";
import UsersService from "../../repository/usersRepository/UsersRepository";
import ImportUsersModal from "./ImportUsersModal/ImportUsersModal";
import jwt from "jwt-decode";

const Users = (props) => {

    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('auth_token');

    let userRole = null;
    if (token) {
        const decoded_token = jwt(token);
        console.log(decoded_token);
        userRole = decoded_token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }


    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = () => {
        UsersService.getAllUsers()
            .then((data) => {
                setUsers(data.data);
            })
    }

    const handleClosImportUsersModal = () => {
        setShowModal(false);
    }


    const ImportUsers = () => {
        setShowModal(true);
    }


    return (
        <div className={"container mt-3"}>
            <ImportUsersModal showModal={showModal}
                              handleClose={handleClosImportUsersModal}
                              getAllUsers={getAllUsers}/>
            <h2 className={"text-center mt-4"}>List of all users</h2>
            <hr className={"mt-0"}/>
            <button className={"d-flex ms-auto mt-3 btn btn-primary px-3 rounded-4"}
                    onClick={() => ImportUsers()}>
                Import users
            </button>
            <table className={"table user-table table-responsive table-borderless table-striped mb-1 mt-3"}>
                <thead className={"table-header-css"}>
                <tr className={"rounded-4"}>
                    <th scope={"col"}>User Id</th>
                    <th scope={"col"}>Username</th>
                    <th scope={"col"}>First name</th>
                    <th scope={"col"}>Last name</th>
                    <th scope={"col"}>Email</th>
                    <th scope={"col"}>Role</th>
                    {/*<th scope={"col"} className={"pe-4"}></th>*/}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    let orderTotal = 0;

                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            {/*<td>*/}
                            {/*    <button className={"btn btn-primary"} onClick={() => CreateInvoice(order.id)}>Create Invoice</button>*/}
                            {/*</td>*/}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );


}

export default Users;