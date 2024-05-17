import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'; // Assuming you're using React Router for routing
import './LoginPage.css';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import AuthenticationRepository from "../../../repository/authenticationRepository/AuthenticationRepository";
import Swal from "sweetalert2";
import "../../../App.css";

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginRequest = e => {
        e.preventDefault();
        const request = {
            username: username,
            password: password
        };
        AuthenticationRepository.loginUser(request)
            .then((data) => {
                if (data.status === 200) {
                    localStorage.setItem("auth_token", data.data);
                    navigate("/home");
                } else {
                    errorAlert();
                    setUsername('');
                    setPassword('');
                }
            })
            .catch((error) => {
                console.error('API Error:', error);
                errorAlert();
                setUsername('');
                setPassword('');
            });
        ;
    };

    const errorAlert = () => {
        Swal.fire({
            title: "Invalid credentials, try again!",
            icon: "error",
        }).then((willDelete) => {
            if (willDelete) {
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div >
            <div id="loginRegisterForm" className={"p-4 border-auth"}>
                <h2 className="text-center">Log in</h2>
                <Row>
                    <Col xs={12}>
                        <hr style={{color: '#ead2ff'}}/>
                        <p>Please login to your account</p>
                        <Form method="post" onSubmit={handleLoginRequest}>
                            <Row>
                                <Col xs={12}>
                                    <Form.Control
                                        id="login_field"
                                        className="form-control mb-3"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        aria-label="readonly input example"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Form.Control
                                        id="password_field"
                                        className="form-control mb-3"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        aria-label="readonly input example"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Button id="log_in_button" className="btn btn-primary w-100 log_in_button"
                                            type="submit">
                                        Log in
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <div className="d-flex align-items-center justify-content-center mt-3">
                    <p className="me-2 mb-0">Don't have an account?</p>
                    <Link to="/register" className="btn btn-primary log_in_button py-1 px-4 me-3">
                        Register
                    </Link>
                </div>
            </div>

            <div className="bottom_right">
                <Link className={"btn btn-primary py-2 px-4 w-100"} to={"/home"}>
                    Back to the main page
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
