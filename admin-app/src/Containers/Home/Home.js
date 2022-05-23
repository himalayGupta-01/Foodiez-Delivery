import React, { useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import './style.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialData } from "../../actions/Action"
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';


const Home = (props) => {
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const order = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [category, product, order,dispatch])

    const getChart = () => {

        const dateWithOrders = {};

        order.orders.forEach(val => {
            let key = `${new Date((val.createdAt).toString()).toLocaleDateString().split("/")[1]}/${new Date((val.createdAt).toString()).toLocaleDateString().split("/")[0]}/${new Date((val.createdAt).toString()).toLocaleDateString().split("/")[2]}`;

            if (key in dateWithOrders) {
                let a = dateWithOrders[key];
                dateWithOrders[key] = a + 1
            }
            else
                dateWithOrders[key] = 1
        })

        const allData = {
            labels: Object.keys(dateWithOrders),
            datasets: [
                {
                    label: "Number of Orders in Specific Date",
                    data: Object.entries(dateWithOrders).map(val => val[1]),
                    backgroundColor: [
                        "#ffbb11",
                        "#42acc7",
                        "#8ce841",
                        "#e245ed",
                        "#50AF95",
                    ]
                }
            ]
        };
        return <Bar
            data={allData}
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: "Orders In Date"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }
            }}
        />

    }

    return (
        <Layout sidebar>
            <div className="container mt-4 d-flex flex-column" style={{ minHeight: "80vh" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="card text-center">
                        <div className="card-header">
                            Categories
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total Categories Created</h5>
                            <p className="card-text">{category.categories.length}</p>
                            <NavLink to="/category" className="btn btn-primary">View All Categories</NavLink>
                        </div>
                        {category.categories.length !== 0 ?
                            <div className="card-footer text-muted">
                                Last Added on {new Date((category.categories[category.categories.length - 1].createdAt).toString()).toLocaleDateString().split("/")[1]}/{new Date((category.categories[category.categories.length - 1].createdAt).toString()).toLocaleDateString().split("/")[0]}/{new Date((category.categories[category.categories.length - 1].createdAt).toString()).toLocaleDateString().split("/")[2]}
                            </div> : ""}
                    </div>


                    <div className="card text-center">
                        <div className="card-header">
                            Products
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total Available Products</h5>
                            <p className="card-text">{product.products.length}</p>
                            <NavLink to="/products" className="btn btn-success">View All Products</NavLink>
                        </div>
                        {product.products.length !== 0 ?
                            <div className="card-footer text-muted">
                                Last Added on {new Date((product.products[product.products.length - 1].createdAt).toString()).toLocaleDateString().split("/")[1]}/{new Date((product.products[product.products.length - 1].createdAt).toString()).toLocaleDateString().split("/")[0]}/{new Date((product.products[product.products.length - 1].createdAt).toString()).toLocaleDateString().split("/")[2]}
                            </div> : ""}
                    </div>

                    <div className="card text-center">
                        <div className="card-header">
                            Orders
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total Pending Orders</h5>
                            <p className="card-text">{(order.orders.filter(val => val.status !== "Delivered")).filter((val) => val.status !== "Order Cancelled").length}</p>
                            <NavLink to="/orders" className="btn btn-warning">View All Orders</NavLink>
                        </div>
                        {order.orders.length !== 0 ?
                            <div className="card-footer text-muted">
                                Last Recieved on {new Date((order.orders[order.orders.length - 1].createdAt).toString()).toLocaleDateString().split("/")[1]}/{new Date((order.orders[order.orders.length - 1].createdAt).toString()).toLocaleDateString().split("/")[0]}/{new Date((order.orders[order.orders.length - 1].createdAt).toString()).toLocaleDateString().split("/")[2]}
                            </div> : ""}
                    </div>
                </div>

                <div style={{ width: "50%", height: "60%" }} className="mt-5 d-flex justify-content-center align-self-center align-items-center">
                    {getChart()}

                </div>
            </div>
        </Layout>
    )
}

export default Home
