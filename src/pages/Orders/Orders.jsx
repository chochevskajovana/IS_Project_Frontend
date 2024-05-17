import "./Orders.css";
import {useEffect, useState} from "react";
import OrderService from "../../repository/ordersRepository/OrderRepository";
import Swal from "sweetalert2";
import swal from "sweetalert";

const Orders = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders();
    }, [])

    const getAllOrders = () => {
        OrderService.getAllOrders()
            .then((data) => {
                setOrders(data.data);
            })
    }

    const CreateInvoice = (id) => {
        OrderService.createInvoice(id)
            .then((response) => {
                const blob = new Blob([response.data]);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                const contentDisposition = response.headers.get("Content-Disposition");
                const match = contentDisposition && contentDisposition.match(/filename=([^;]+)/);
                const fileName = match && match[1];

                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                var title = "Invoice created successfully!";
                var text = "You can find the invoice in your downloads folder";
                SuccessfulAlert(title, text);
            })
            .catch(() => {
                errorAlert();
            });
    };

    const ExportOrders = () => {
        OrderService.exportOrders()
            .then((response) => {
                const contentDisposition = response.headers.get("Content-Disposition");
                console.log(contentDisposition);
                const match = contentDisposition && contentDisposition.match(/filename=([^;]+)/);
                const fileName = match && match[1];

                const blob = new Blob([response.data], { type: response.headers.get("Content-Type") });

                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.style.display = "none";

                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                var title = "Orders exported successfully!";
                var text = "You can find the file in your downloads folder!";
                SuccessfulAlert(title, text)
            })
            .catch(() => {
                errorAlert();
            });
    };



    const SuccessfulAlert = (title, text) => {
        Swal.fire({
            title: title,
            text: text,
            icon: "success",
            confirmButtonText: "Great!"
        })
    }

    const errorAlert = () => {
        swal({
            title: "Something went wrong",
            text: 'The invoice was not created, try again.',
            icon: "error",
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
            }
        })
    }

    return (
        <div className={"container"}>
            <h2 className={"text-center mt-4"}>List of all orders</h2>
            <hr className={"mt-0"}/>
            <button  className={"d-flex ms-auto mt-3 btn btn-primary px-3 rounded-4"}
                     onClick={() => ExportOrders()}>
                Export orders
            </button>
            <table className={"table user-table table-responsive table-borderless table-striped mb-1 mt-3"}>
                <thead className={"table-header-css"}>
                <tr className={"rounded-4"}>
                    <th scope={"col"} className={"pe-3"}>Order Id</th>
                    <th scope={"col"}>Username</th>
                    <th scope={"col"}>Email</th>
                    <th scope={"col"} className={"pe-4"}>Products</th>
                    <th scope={"col"} className={"pe-4"}>Total order price</th>
                    <th scope={"col"} className={"pe-4"}></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => {
                    let orderTotal = 0;

                    return (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user.username}</td>
                            <td>{order.user.email}</td>

                            {order.productInOrders.map((product) => {
                                orderTotal += product.price * product.quantity;

                                return (
                                    <td key={product.id} className={"d-flex flex-column"}>
                                        <div className={"product-in-td"}>
                                            <span className={"me-3"}><b>Name:</b> {product.name}</span>
                                            <span className={"me-3"}><b>Price:</b> {product.price}</span>
                                            <span><b>Quantity:</b> {product.quantity}</span>
                                        </div>
                                    </td>
                                );
                            })}

                            <td>
                                <div>{orderTotal}</div>
                            </td>
                            <td>
                                <button className={"btn btn-primary"} onClick={() => CreateInvoice(order.id)}>Create Invoice</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

}

export default Orders;