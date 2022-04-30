import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import EmptyCart from "../images/empty-cart.png"
import CartIcon from "../images/cart-black.png"
import axios from 'axios';
import { useSelector } from "react-redux"

import { generatePublicUrl } from "../urlConfig"

const Cart = () => {

    const auth = useSelector(state => state.auth)

    //getting full cart from session
    const [cart, setCart] = useState({
        ...JSON.parse(localStorage.getItem("cart"))
    })

    //incrementing value of a item in cart
    const increment = (item) => {
        axios.post("/increase-cart", item).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty == 0 ? "" : res.data.totalQty;
        })
    }

    //decrementing value of a item in cart
    const decrement = (item) => {
        axios.post('/decrease-cart', item).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty == 0 ? "" : res.data.totalQty;
        })
    }

    // removing item from cart
    const removeItem = (item) => {
        axios.post(`/remove-from-cart`, item).then(res => {
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(res.data.session.cart))
            setCart({
                ...JSON.parse(localStorage.getItem("cart"))
            })
            cartCounter.innerText = res.data.totalQty == 0 ? "" : res.data.totalQty;
        })
    }

    //displaying the cart
    const renderCart = () => {
        console.log(cart)

        let totalCart = []

        Object.entries(cart.items).map(item => {
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

        return (<>
            {totalCart.map(val =>
                <div className=" flex items-center my-8 justify-between">
                    <div className="flex items-center">
                        <img className="w-24" src={generatePublicUrl(val.item.productPicture)} alt="" />
                        <div className="flex-1 ml-4" >
                            <h1>{val.item.name}</h1>
                            <span>MEDIUM</span>
                        </div>
                    </div>
                    <span className="add-minus-quantity"
                    >
                        <button onClick={() => decrement(val.item)}><FaMinus /></button>
                        <input type="text" value={val.quantity} />
                        <button onClick={() => increment(val.item)}><FaPlus /></button>
                    </span>
                    <div className="font-bold text-lg">₹{val.item.price}</div>
                    <div className="font-bold text-lg">₹{(Number(val.item.price) * Number(val.quantity))}</div>
                    <span className="remove-item">
                        <button onClick={() => removeItem(val.item)}><FaTrashAlt /></button>
                    </span>
                </div>
            )}

        </>)

    }

    return (
        <>
            <section className="cart py-16">

                {cart.totalQty != 0 ? <>
                    <div className=" order container mx-auto w-1/2">
                        <div className="flex items-center border-b border-gray-300 pb-4">
                            <img src={CartIcon} alt="cart-icon" />
                            <h1 className=" font-bold ml-4 text-2xl">Order Summary</h1>
                        </div>
                        <div className="order-list">
                            {renderCart()}
                        </div>
                        <hr />
                        <div className="text-right py-5">
                            <div>
                                <span className="text-lg font-bold">Total Amount:</span>
                                <span className="amount text-2xl font-bold ml-2">₹{cart.totalPrice}</span>
                            </div>

                            {
                                auth.authenticate ? <div>
                                    <button className="btn-primary px-6 py-2 rounded-full text-white font-bold mt-6" type="submit">Order Now</button>
                                </div> :
                                    <>
                                        <NavLink className=" cart-login inline-block cursor-pointer px-6 py-2 rounded-full btn-primary text-white font-bold mt-6" to="/signin">Login to Continue</NavLink>
                                    </>
                            }
                        </div>
                    </div>
                </>
                    : <>
                        {/* ------------------------------empty cart section -----------------------------------*/}
                        <div className="empty-cart ">
                            <div className="container mx-auto text-center">
                                <h1 className=" text-3xl font-bold mb-2">Cart Empty 🙁</h1>
                                <p className="text-gray-500 text-lg mb-12">You Probably haven't ordered a yet. <br />
                                    To order a Dish, go to the main page</p>
                                <img className=" w-1/3 mx-auto" src={EmptyCart} alt="empty cart" />
                                <NavLink className=" cart-home inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12" to="/">Go back</NavLink>
                            </div>
                        </div>
                    </>
                }




            </section>
        </>
    )
}

export default Cart
