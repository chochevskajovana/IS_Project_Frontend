import "./ProductTerm.css"
import "../ProductsList/ProductsList.css"
import ProductService from "../../../repository/productRepository/ProductRepository";
import swal from "sweetalert";
import {useContext, useState} from "react";
import AddEditProductModal from "../AddEditProductModal/AddEditProductModal";
import ShoppingCartService from "../../../repository/shoppingCartRepository/ShoppingCartRepository";
import Swal from 'sweetalert2';
import {ShoppingCartContext} from "../../../ShoppingCartContext";
import RolesService from "../../../repository/rolesRepository/RolesRepository";
import {Card} from "react-bootstrap";

const ProductTerm = (props) => {

    const [selectedProductForEdit, setSelectedProductForEdit] = useState({});

    const [showEditModal, setShowEditModal] = useState(false);

    const {cartItems, updateCartItems} = useContext(ShoppingCartContext);

    const getNumberOfItemsInCart = () => {
        ShoppingCartService.getShoppingCartForLoggedInUser()
            .then((data) => {
                updateCartItems((data.data.products).length);
                console.log("Data after add", data.data.products.length);
            })
    }

    const handleShowEditProductModal = () => {
        setShowEditModal(true);
    }

    const handleCloseEditProductModal = () => {
        setSelectedProductForEdit({});
        setShowEditModal(false);
    }

    const deletedSuccesfullyAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Product deleted sucessfuly',
        })
    }


    const addToCartSucessful = (product) => {
        Swal.fire({
            title: product.name + ' added to cart!',
            imageUrl: product.imagePath,
            imageWidth: 400,
            imageAlt: 'Custom image',
            confirmButtonText: "Continue shopping!"
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

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id)
            .then(() => {
                deletedSuccesfullyAlert();
                props.getProducts();
                props.handleClose();
            }).catch(() => {
            errorAlert();
        })
    }

    const ConfirmationDelete = (id) => {
        Swal.fire({
            title: "Do you really want to delete this item?",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
            }
        })
    }

    const AddToCart = (product) => {
        ShoppingCartService.addProductInShoppingCart(product.id)
            .then(() => {
                addToCartSucessful(product);
                getNumberOfItemsInCart();
            });
    }

    return (
        <Card  style={{ width: '19rem' }} className={`cursor-pointer ms-4 my-3`}
             key={props.key}>
            <AddEditProductModal showModal={showEditModal}
                                 handleClose={handleCloseEditProductModal}
                                 selectedProductForEdit={selectedProductForEdit}
                                 getProducts={props.getProducts}
            />
            <div className={`mt-4 shadow-sm event-card`}
                // onClick={handleCardClick}
            >
                <div className={"card-image mb-2"}>
                    <img
                        src={props.product.imagePath}
                        alt="Product"
                    />
                </div>



                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>{props.product.description}</Card.Text>

                <div className={"bottom-content"}>
                    <div className="bottom-content p-3">
                        <div className="d-flex">
                            <div>
                                <span
                                    className={"mt-1 justify-content-center badge px-3 py-2 rounded-4 capacity"}>
                                $ {props.product.price}
                            </span>
                            </div>
                            <div className={"d-flex ms-auto"}>
                                {RolesService.hasRole(['User']) && (
                                    <a className={"btn btn-primary rounded-4 me-2"}
                                       onClick={() => AddToCart(props.product)}>Add to cart</a>
                                )}
                                {RolesService.hasRole(['Admin']) && (
                                    <>
                                        <a className={"btn btn-outline-secondary rounded-4  me-2"}
                                           onClick={() => {
                                               setSelectedProductForEdit(props.product);
                                               handleShowEditProductModal();
                                           }}
                                        >Edit</a>
                                        <a className={"btn btn-outline-danger rounded-4 "}
                                           onClick={() => ConfirmationDelete(props.product.id)}
                                        >Delete</a>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ProductTerm;