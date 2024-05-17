import axios from "../../axios/axios";

const OrderService = {

    getAllOrders: () => {
        return axios.get("/Order/getAllOrders");
    },

    createInvoice: (id) => {
        return axios.post(`/Order/createInvoice/${id}`, {}, {
            responseType: "blob",
        });
    },

    exportOrders: () => {
        return axios.get(`/Order/exportAllOrders`, {
            responseType: 'arraybuffer',
        });
    }



}

export default OrderService;