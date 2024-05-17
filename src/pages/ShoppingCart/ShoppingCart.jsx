import "./ShoppingCart.css";
import {useEffect, useState} from "react";
import ProductService from "../../repository/productRepository/ProductRepository";
import ShoppingCartService from "../../repository/shoppingCartRepository/ShoppingCartRepository";
import Swal from "sweetalert2";
import swal from "sweetalert";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import ShoppingCartTerm from "./ShoppingCartTerm/ShoppingCartTerm";
import {loadStripe} from "@stripe/stripe-js";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";

const ShoppingCart = (props) => {

    const [items, setItems] = useState([]);

    const [totalCartPrice, setTotalCartPrie] = useState('');

    const [respons, setResponse] = useState({});

    const stripePromise = loadStripe('pk_test_51NNc7MJYxaVpIsNPsejTvjlgTvs0QiY0oroPNPGRWl1vnEbTJSMR9LQr9kBAHozJEKHEbGUkXWxN6FY2lriz1fYt00e5JHaUCw');

    const [order, setOrder] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getShoppingCart();
    }, []);

    const getShoppingCart = () => {
        ShoppingCartService.getShoppingCartForLoggedInUser()
            .then((data) => {
                setItems(data.data.products);
                setTotalCartPrie(data.data.totalPrice);
                console.log(data.data)
            })
            .catch((error) => {
                console.error("Error fetching shopping cart items:", error);
            })
    }


    const handleCheckout = () => {
        ShoppingCartService.checkout().then(async (data) => {
            setResponse(data.data);
            console.log(data.data)
            const stripe = await loadStripe(data.data.pubKey);
            await stripe.redirectToCheckout({sessionId: data.data.sessionId});
        });
    }


    return (
        <>
            {items.length > 0 ? (
                <div>
                    <div className="container">
                        <p className="text-center mt-3 fw-semibold fs-3 cart-heading">My shopping cart</p>
                        <hr style={{color: '#ead2ff'}}/>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <div className="types">
                                    <p className="text-center m-auto py-2">Product image</p>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="types">
                                            <p className="text-center m-auto py-2">Name</p>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <div className="types">
                                            <p className="text-center m-auto py-2">Price</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="types">
                                            <p className="text-center m-auto py-2">Quantity</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="types">
                                            <p className="text-center m-auto py-2">Total price</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-3">
                        {items.length > 0 ? (
                                items.map((item) => (
                                        <ShoppingCartTerm item={item}
                                                          getShoppingCart={getShoppingCart}/>
                                    )
                                )
                            ) :
                            (
                                <div>There are no items</div>
                            )
                        }
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-9">
                                <div className="row justify-content-end">
                                    <div className="col-3">
                                        <div className="types">
                                            <p className="text-center m-auto py-2">Total order price</p>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex">
                                        <p className="text-center m-auto">${totalCartPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container ">
                        <div className="row d-flex justify-content-end">
                            <div className="col-3 d-flex justify-content-end mt-3">
                                <a
                                    className="btn btn-primary w-75"
                                    onClick={handleCheckout}
                                    type="submit"
                                >
                                    Checkout
                                </a>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-end mb-5">
                            <div className="col-3 d-flex justify-content-end mt-1">
                                <a className="btn btn-secondary w-75"
                                   href={`{% url 'delete_order' ${order.id} %}`}>Delete Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={"container mb-0"} >
                    <h2 className={"text-center mt-3 mb-3"}>Your shopping cart is empty!</h2>
                    <hr className={"mt-0"} />
                    <div className={"d-flex justify-content-center"} style={{background: '#edd6ff'}}>
                        <img  src={"https://media.istockphoto.com/id/1425479333/photo/shopping-basket-with-price-tag-and-percent-sale-and-discount-on-purchases-of-goods-online.jpg?s=612x612&w=0&k=20&c=dqwcaeDBG2oZZ45Jvmel5haNg8VQ_qXWbTAVyaFwUFE="}/>
                    </div>
                    <Link to={"/products"} className={"btn btn-primary mt-2 w-100"}>Go buy some products!</Link>
                </div>
            )}

        </>
    );
}

export default ShoppingCart;
