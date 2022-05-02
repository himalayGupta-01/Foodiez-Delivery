import React, {useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import { getInitialData } from '../../actions/initialData.action';
import NewModal from "../../Components/UI/Modal/NewModal";
import { generatePublicUrl } from '../../urlConfig';
import { updateOrder } from "../../actions/Order.actions"
import "./style.css";

const Orders = (props) => {
    const [orderStatus, setOrderStatus] = useState("")
    const [currentOrder, setCurrentOrder] = useState({})
    const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);

    const [idToOperate, setIdToToOperate] = useState("");

    const order = useSelector(state => state.order)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getInitialData())
    })


    //to show the orders
    const renderOrders = () => {
        return (
            <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                <thead style={{ textAlign: "center" }}>
                    <tr>
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Payment Mode</th>
                        <th>Update Status</th>
                        <th style={{ textAlign: "center" }}>View Items</th>

                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {
                        order.orders.length > 0 ?
                            order.orders.map((order, index) =>
                                <tr key={order._id}>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{`${new Date((order.createdAt).toString()).toLocaleDateString().split("/")[1]}/${new Date("2022-05-02T00:57:04.231Z").toLocaleDateString().split("/")[0]}/${new Date("2022-05-02T00:57:04.231Z").toLocaleDateString().split("/")[2]}`}</td>
                                    <td>{new Date((order.createdAt).toString()).toLocaleTimeString()}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.address}</td>
                                    <td>{order.paymentType}</td>
                                    <td>{order.status}</td>

                                    <td style={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}>
                                        <Button variant="outline-primary" onClick={(e) => {
                                            e.preventDefault();
                                            setIdToToOperate(order._id)
                                            handleShowUpdateOrderModal(order);
                                        }}>View Order and Update</Button>
                                    </td>
                                </tr>


                            )
                            :
                            null
                    }


                </tbody>
            </Table>
        )
    }

    const handleShowUpdateOrderModal = (ord) => {
        setCurrentOrder(ord);
        setOrderStatus(ord.status)
        setShowUpdateOrderModal(true);
    }
    const handleClose = () => {
        setShowUpdateOrderModal(false);
    }

    const renderCart = () => {

        let totalCart = []

        Object.entries(currentOrder.items.items).map(item => {
            Object.entries(item[1]).map(itemValue => {
                if (itemValue[0] === "item") {
                    totalCart.push({
                        item: {
                            ...itemValue[1]
                        },
                        quantity: item[1].qty
                    })
                }
            })
        })

        return (<section className="cart py-16">

            <div className=" order container mx-auto w-1/2">
                <div className="flex items-center border-b border-gray-300 pb-4">
                    <h2 className=" font-bold ml-4 text-2xl">Order Summary</h2>
                </div>

                <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {
                            totalCart.map((val) =>
                                <tr key={order._id}>
                                    <td> <h4>{val.item.name}</h4></td>
                                    <td><h5>{val.quantity}</h5></td>
                                    <br />
                                </tr>

                            )
                        }

                    </tbody>
                </Table>

                <div style={{ justifyContent: "space-between", alignItems: "center" }} className="d-flex text-right py-5">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <h2 className="text-lg font-bold">Total Amount:</h2>
                        <h4 className="amount text-2xl font-bold ml-2">₹{currentOrder.items.totalPrice}</h4>
                    </div>
                    <div>
                        <h5>Update Status</h5>
                        <select
                            disabled={orderStatus === "Delivered" ? true : false}
                            className="form-control form-select"
                            value={orderStatus}
                            onChange={(e) => {
                                setOrderStatus(e.target.value)
                            }}
                        >
                            <option key="Order Placed" value="Order Placed">Order Placed</option>
                            <option key="Order Confirmed" value="Order Confirmed">Order Confirmed</option>
                            <option key="Being Cooked" value="Being Cooked">Being Cooked</option>
                            <option key="Out For Delivery" value="Out For Delivery">Out for Delivery</option>
                            <option key="Delivered" value="Delivered">Delivered</option>

                        </select>
                    </div>
                </div>
            </div>

        </section>)


    }

    const renderUpdateOrderModal = () => {
        if (!currentOrder) {
            return null
        }

        return <>
            <NewModal
                // size="lg"
                dontShowSubmitButton={currentOrder.status === "Delivered" ? true : false}
                show={showUpdateOrderModal}
                handleClose={handleClose}
                modelTitle={"View and Update Order"}
                operation={update}
            >
                {renderCart()}

            </NewModal>
        </>
    }

    const update = () => {

        dispatch(updateOrder(idToOperate, orderStatus));
        dispatch(getInitialData());
        setShowUpdateOrderModal(false);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Orders</h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderOrders()}
                    </Col>
                </Row>
            </Container>
            {showUpdateOrderModal ? renderUpdateOrderModal() : null}
        </Layout>
    )
}
export default Orders
