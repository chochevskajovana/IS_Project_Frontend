import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import Swal from "sweetalert2";
import ShoppingCartService from "../../../repository/shoppingCartRepository/ShoppingCartRepository";
import swal from "sweetalert";
import "./ShoppingCartTerm.css";
import {useContext} from "react";
import {ShoppingCartContext} from "../../../ShoppingCartContext";

const ShoppingCartTerm = (props) => {

    const {cartItems, updateCartItems} = useContext(ShoppingCartContext);

    const getNumberOfItemsInCart = () => {
        ShoppingCartService.getShoppingCartForLoggedInUser()
            .then((data) => {
                updateCartItems((data.data.products).length);
                console.log("Data after add", data.data.products.length);
            })
    }

    const deletedSuccesfullyAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Product deleted sucessfuly',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    const errorAlert = () => {
        swal({
            title: "Something went wrong",
            icon: "error",
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
            }
        })
    }

    const deleteProductFromCart = (id) => {
        ShoppingCartService.deleteProductFromShoppingCart(id)
            .then(() => {
                deletedSuccesfullyAlert();
                getNumberOfItemsInCart();
                props.getShoppingCart();
            }).catch(() => {
            errorAlert();
        })
    }

    const ConfirmationDelete = (id) => {
        Swal.fire({
            title: "Do you really want to delete this item from the shopping cart?",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductFromCart(id)
            }
        })
    }

    const increaseQuantity = (id) => {
        ShoppingCartService.increaseQuantityForProduct(id)
            .then(() => {
                props.getShoppingCart();
            })
    }

    const decreaseQuantity = (id) => {
        ShoppingCartService.decreaseQuantityForProduct(id)
            .then(() => {
                props.getShoppingCart();
            })
    }

    return(
        <div className="row mt-2" key={props.item.id}>
            <div className="col-2">
                <div className="row">
                    <div className="col-12">
                        <span className={"ps-4 ms-4"}>
                            <img className="w-50 rounded-3" src={props.item.imagePath} alt=""/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-10">
                <div className="row h-100 d-flex justify-content-center align-items-center p-0">
                    <div className="col-7">
                        <p className="text-center m-auto mb-1"><b><i>{props.item.name}</i></b></p>
                        <p className="text-center m-auto small">{props.item.description}</p>
                    </div>
                    <div className="col-1">
                        <p className="text-center m-auto py-2">${props.item.price}</p>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <p className="text-center mt-auto mb-auto mx-3 py-2 item_quantity">{props.item.quantity}</p>
                        <div className="d-flex flex-column quantity mt-auto mb-auto">
                            <BiSolidUpArrow className={"quantity-arrow"} onClick={() => {
                                increaseQuantity(props.item.productId)
                            }}/>
                            <BiSolidDownArrow className={"quantity-arrow"} onClick={() => {
                                decreaseQuantity(props.item.productId);
                            }}/>
                        </div>
                    </div>
                    <div className="col-2 d-flex">
                        <p className="text-center m-auto">${props.item.totalPrice}</p>
                        <a className="btn btn-outline-secondary btn-sm delete_cart_item"
                           onClick={() => {
                               ConfirmationDelete(props.item.productId);
                           }}>Delete Item</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ShoppingCartTerm;