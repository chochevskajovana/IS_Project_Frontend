import "./Footer.css"
import {Link} from "react-router-dom";
import React from "react";

const Footer = (props) => {
    return (
        <>
            <div>
                <div className={"middle-section footer-dark pt-3"}>
                    <div className={"container row"}>
                        <div className={"col-1"}></div>
                        <div className={"col-6"}>
                            <img alt="makeup"
                                src="https://media.istockphoto.com/id/1472528497/photo/beauty-cosmetic-makeup-product-layout-fashion-and-beauty-concept-cosmetics-make-up-brushes.jpg?s=612x612&w=0&k=20&c=Ui2aHSCd1f_0YKp6m7hVGD7CxQoWuZ0ZMbhNgMyENuw="/>
                        </div>
                        <div className={"col-5 mt-2"}>
                            <h5 className="ms-4"><i>VelvetVanity</i></h5>
                            <p className={"ms-4 pt-1"}><i>
                                Discover a world where beauty meets empowerment at VelvetVanity.
                                Elevate your confidence through the art of makeup, where self-expression becomes a
                                celebration
                                of your unique allure.
                            </i></p>
                            <div className="ms-4">
                                <ul className={"d-flex"}>
                                    <li className={"me-4"}><Link to="/home">Home</Link></li>
                                    <li className={"me-4"}><Link to="/products">Products</Link></li>
                                    <li className={"me-4"}><Link to="/cart">Cart</Link></li>
                                </ul>
                                <p className={"small"}>© 2024 IS: Jovana Chochevska - 201107</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer;