import axios from "../../axios/axios";

const ProductService = {
    getProducts: () => {
        return axios.get("/Products");
    },

    getProductById: (productId) => {
        return axios.get(`/Products/${productId}`)
    },

    addProduct: (name, description, imagePath, price) => {
        const productData = {
            name: name,
            description: description,
            imagePath: imagePath,
            price: price,
        };

        return axios.post("/Products", productData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    editProduct: (id, name, description, imagePath, price) => {
        const productData = {
            id: id,
            name: name,
            description: description,
            imagePath: imagePath,
            price: price,
        };

        return axios.put("/Products", productData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    deleteProduct: (id) => {
        return axios.delete(`/Products/${id}`);
    },
}

export default ProductService;