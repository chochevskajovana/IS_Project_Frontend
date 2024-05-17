import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'; // Assuming you're using React Router for routing
import "./Register.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AuthenticationRepository from "../../../repository/authenticationRepository/AuthenticationRepository";
import "../../../App.css";

const RegisterPage = (props) => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterRequest = (e) => {
        e.preventDefault();

        const request = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }

        AuthenticationRepository.registerUser(request).then(() =>{
            navigate("/login");
        })
    }

    return (
        <div>
            <div id="loginRegisterForm" className={"p-4 border-auth"}>
                <h2 className="text-center">Register</h2>
                <Row>
                    <Col xs={12}>
                        <hr style={{color: '#ead2ff'}}/>
                        <p>Create a new account</p>
                        <Form method="post" onSubmit={handleRegisterRequest}>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Control
                                        id="firstName_field"
                                        className="form-control mb-3"
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        aria-label="readonly input example"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Control
                                        id="lastName_field"
                                        className="form-control mb-3"
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        aria-label="readonly input example"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Control
                                        id="username_field"
                                        className="form-control mb-3"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        aria-label="readonly input example"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
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
                                    <Form.Control
                                        id="email_field"
                                        className="form-control mb-3"
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        aria-label="readonly input example"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Button id="register_button" className="btn btn-primary w-100 log_in_button"
                                            type="submit"
                                            name="CreateUser">
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <div className="d-flex align-items-center justify-content-center mt-3">
                    <p className="me-2 mb-0">Already have an account?</p>
                    <Link to="/login" className="btn btn-primary log_in_button py-1 px-4 me-3">Log in</Link>
                </div>
            </div>

            <div className="bottom_right">
                <Link className={"btn btn-primary mt-3 py-2 px-4 w-100"} to={"/home"}>
                    Back to the main page
                </Link>
            </div>
        </div>

    )
}

export default RegisterPage;
