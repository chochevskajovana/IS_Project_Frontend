import {Col, Form, InputGroup, Modal, ModalBody, ModalFooter, Row} from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import React, {useState} from "react";
import ProductService from "../../../repository/productRepository/ProductRepository";
import swal from "sweetalert";
import {Formik} from "formik";
import Swal from "sweetalert2";

const AddEditProductModal = (props) => {

    const {Formik} = formik;

    const [productToRefresh, setSelectedProductToRefresh] = useState({});

    const getProductById = (id) => {
        ProductService.getProductById(id)
            .then((data) => {
                setSelectedProductToRefresh(data.data);
            })
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        imagePath: yup.string().required(),
        price: yup.string().required(),
    });

    const addProductSuccessfulAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: message,
        })
    }

    const errorAlert = () => {
        Swal.fire({
            title: "Something went wrong",
            icon: "error",
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
            }
        })
    }

    const addProduct = (name, description, imagePath, price) => {
        ProductService.addProduct(name, description, imagePath, price)
            .then(() => {
                addProductSuccessfulAlert("Product added successfully!");
                props.getProducts();
                props.handleClose();
            }).catch(() => {
            errorAlert();
        })
    }

    const editProduct = (id, name, description, imagePath, price) => {
        ProductService.editProduct(id, name, description, imagePath, price)
            .then(() => {
                addProductSuccessfulAlert("Product edited successfully");
                props.getProducts();
                props.handleClose();
            }).catch(() => {
            errorAlert();
        })
    }


    const onFormSubmit = (values) => {
        console.log(values.name)
        console.log(values.description)
        console.log(values.imagePath)
        console.log(values.price)
        const name = values.name !== "" ? values.name : null;
        const description = values.description !== "" ? values.description : null;
        const imagePath = values.imagePath !== "" ? values.imagePath : null;
        const price = values.price !== "" ? values.price : null;

        if (props.selectedProductForEdit?.id) {
            editProduct(props.selectedProductForEdit?.id, name, description, imagePath, price);
        } else {
            addProduct(name, description, imagePath, price);
        }

    }

    return (
        <Modal show={props.showModal} onHide={props.handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.selectedProductForEdit?.id ? "Edit product" : "Add Product"}</Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={schema}
                onSubmit={onFormSubmit}
                initialValues={{
                    name: props.selectedProductForEdit?.name ? props.selectedProductForEdit?.name : '',
                    description: props.selectedProductForEdit?.description ? props.selectedProductForEdit?.description : '',
                    imagePath: props.selectedProductForEdit?.imagePath ? props.selectedProductForEdit?.imagePath : '',
                    price: props.selectedProductForEdit?.price ? props.selectedProductForEdit?.price : '',
                }}
            >
                {({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <ModalBody>
                            {/* Example of a form field */}
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>Product name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isValid={touched.price && !errors.price}
                                        isInvalid={touched.price && !!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik03">
                                    <Form.Label>Product description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik04">
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imagePath"
                                        value={values.imagePath}
                                        onChange={handleChange}
                                        isValid={touched.imagePath && !errors.imagePath}
                                        isInvalid={touched.imagePath && !!errors.imagePath}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.imagePath}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default AddEditProductModal;