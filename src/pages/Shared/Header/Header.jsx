import React, {useContext, useEffect} from 'react';
import {BiSolidPurchaseTag} from "react-icons/bi";
import {BsFillCartFill} from "react-icons/bs";
import {FaUsers} from "react-icons/fa";
import {Button, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import jwt from 'jwt-decode';
import ShoppingCartService from "../../../repository/shoppingCartRepository/ShoppingCartRepository";
import {TbLogout2} from "react-icons/tb";
import {ShoppingCartContext} from "../../../ShoppingCartContext";
import RolesService from "../../../repository/rolesRepository/RolesRepository";
import {FaComputer} from "react-icons/fa6";
import {AiOutlineHome} from "react-icons/ai";
import "../../../App.css";

const Header = (props) => {

    const {cartItems, updateCartItems} = useContext(ShoppingCartContext);

    useEffect(() => {
        if (token) {
            getNumberOfItemsInCart();
        }
    }, [])

    const getNumberOfItemsInCart = () => {
        ShoppingCartService.getShoppingCartForLoggedInUser()
            .then((data) => {
                updateCartItems((data.data.products).length)
            })
    }

    console.log("Num of cart items: ", cartItems);

    const token = localStorage.getItem('auth_token');
    let username = null;
    if (token) {
        const decoded_token = jwt(token);
        console.log(decoded_token);
        username = decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/home');
    }


    return (
        <>
            <header className="header sticky-top">
                <Navbar collapseOnSelect expand="lg"
                        className="navbar navbar-expand-lg bg-light-gray navbar-light py-3 py-lg-0 px-lg-5">
                    <div className="container-fluid p-2">
                        <h1 className="heading me-3 color-dark-purple"><i>VelvetVanity</i></h1>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto mb-2 mb-lg-0">
                                <Nav.Link as={Link} to="/home">
                                    <div className="d-flex color-dark-purple">
                                        <span className="me-1">Home</span>
                                        <span className="d-flex mt-auto mb-auto">
                                            <AiOutlineHome/>
                                         </span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/products">
                                    <div className="d-flex color-dark-purple">
                                        <span className="me-1">Products</span>
                                        <span className="d-flex mt-auto mb-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M168.5 72L256 165l87.5-93h-175zM383.9 99.1L311.5 176h129L383.9 99.1zm50 124.9H256 78.1L256 420.3 433.9 224zM71.5 176h129L128.1 99.1 71.5 176zm434.3 40.1l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4z"/></svg>
                                        </span>
                                    </div>
                                </Nav.Link>
                                {RolesService.hasRole(['Admin']) && (
                                    <Nav.Link as={Link} to="/orders">
                                        <div className="d-flex color-dark-purple">
                                            <span className="me-1">Orders</span>
                                            <span className="d-flex mt-auto mb-auto">
                                          <BiSolidPurchaseTag/>
                                        </span>
                                        </div>
                                    </Nav.Link>
                                )}
                                {RolesService.hasRole(['Admin']) && (
                                    <Nav.Link as={Link} to="/users">
                                        <div className="d-flex color-dark-purple">
                                            <span className="me-1">All users</span>
                                            <span className="d-flex mt-auto mb-auto">
                                          <FaUsers/>
                                        </span>
                                        </div>
                                    </Nav.Link>
                                )}
                                {/*<Nav.Link href="#">Add Product</Nav.Link>*/}
                                {/*<Nav.Link href="#">Add Pc</Nav.Link>*/}
                                {/*<Nav.Link href="#">Add To Role</Nav.Link>*/}
                            </Nav>
                            {RolesService.hasRole(['User']) && (
                                <Nav>
                                    <Nav.Link className={"mt-auto mb-auto"} as={Link} to="/cart">
                                        {token && (
                                            <div className={"d-flex align-items-center rounded-3 bg-light-purple color-dark-purple px-3 py-2"}>
                                                <>
                                                    <BsFillCartFill size={25}/>
                                                    {cartItems > 0 ? (
                                                        <div className="ms-1">{cartItems} items</div>
                                                    ) : (
                                                        <div className="ms-1">Cart is empty</div>
                                                    )}
                                                </>
                                            </div>
                                        )}
                                    </Nav.Link>
                                </Nav>
                            )}
                            <Nav>
                                {!username && <Button as={Link} to="/login" href="#">Login<TbLogout2 size={20}
                                                                                                     className={"mt-auto mb-auto ms-1"}/></Button>}
                                {username && <><span className={"mt-auto mb-auto me-2 color-dark-purple"}>Logged in as: <b>{username}</b></span>
                                    <Button onClick={handleLogout}>Logout<TbLogout2 size={20}
                                                                                    className={"mt-auto mb-auto ms-1 "}/></Button></>}
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </header>
        </>

    );
}

export default Header;
