import {useState, useEffect} from "react";
import ProductService from "../../../repository/productRepository/ProductRepository";
import ProductTerm from "../ProductTerm/ProductTerm";
import "../ProductTerm/ProductTerm.css"
import "./ProductsList.css"
import AddEditProductModal from "../AddEditProductModal/AddEditProductModal";
import RolesService from "../../../repository/rolesRepository/RolesRepository";
import {Button, Card} from "react-bootstrap";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false)

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        ProductService.getProducts()
            .then((data) => {
                setProducts(data.data);
                console.log(data.data)
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
    }

    const handleProductEdited = () => {
        getProducts(); // Refresh the product list
    };

    const handleAddProductClick = () => {
        setShowAddModal(true);
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    }

    return (
        <div className={"container"}>
            <h2 className={"text-center mt-3"}>List of all products</h2>
            <hr className={"mt-0"}/>
            <div className={"w-100 h-100"}>
                <AddEditProductModal showModal={showAddModal}
                                     handleClose={handleCloseAddModal}
                                     getProducts={getProducts}/>
                {RolesService.hasRole(['Admin']) && (
                    <button className={"d-flex ms-auto mt-3 btn btn-primary px-3 rounded-4"}
                            onClick={handleAddProductClick}>Add
                        new product
                    </button>
                )}
                <div className="row equal-height-row">
                    {products.length > 0 ? (products.map((product, index) => (
                        <ProductTerm product={product}
                                     key={index}
                                     getProducts={getProducts}
                                     handleClose={handleCloseAddModal}
                                     showModal={handleAddProductClick}/>
                    ))) : (
                        <h3 className={"text-center my-5"}>
                            <i className={"text-secondary no-notification-message"}>There are no products</i>
                        </h3>
                    )}
                </div>
            </div>

        </div>
    );
}

export default ProductList;