import React, { useState, useEffect } from 'react'
import axios from 'axios'
import heroPic from "../images/food4.jpg"
import heroPic2 from "../images/pizza.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const Home = () => {
    const [menu, setMenu] = useState([]);
    let url='http://localhost:8000';
    useEffect(() => {
        axios.get(url).then(res => {
            setMenu(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [url])

    let cartCounter=document.querySelector('#cartCounter')

    function updateCart(pizza){
        axios.post('/update-cart',pizza).then(res=>{
            cartCounter.innerText=res.data.totalQty;
        })
    }

    const handleInput=(pizza)=>{
        updateCart(pizza);
        toast.success("product added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    let menuSection=document.querySelector('.menu')

    const moveToMenu=()=>{
        menuSection.scrollIntoView({behavior:'smooth'});
    }

    return (
        <>
            <section className="hero py-5">
                <div className=" container mx-auto flex items-center justify-between">
                    <div className=" px-32 w-1/2">
                        <h6 className=" text-lg pb-4"><em>Are you hungry?</em></h6>
                        <h1 className=" text-6xl font-bold">Don't wait !!</h1>
                        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 btn-primary" onClick={() => moveToMenu()}>Order Now</button>
                    </div>
                    <div className=" w-1/2">
                        <img className="heroPic" src={heroPic} alt="hero pic" />
                    </div>
                </div>
            </section>

            <section className="hero py-5">
                <div className="menu container mx-auto py-8">
                <h1 className="text-xl font-bold mb-8">All Pizzas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16">
                    {menu.map(menus=>{
                    return(<div key={menus._id} className="w-full md:w-64">
                        <img className="h-40 mb-4 mx-auto" src={heroPic2} alt="" />
                        <div className="text-center">
                            <h2 className="mb-4 text-lg">{menus.name}</h2>
                            <span className="size py-1 px-4 rounded-full uppercase text-xs">{menus.size}</span>
                            <div className="flex items-center justify-around mt-6">
                                <span className="font-bold text-lg">₹{menus.price}</span>
                                <button onClick={() => handleInput(menus)}
                                    className="add-to-cart py-1 px-6 rounded-full flex items-center font-bold">
                                    <span>+</span>
                                    <span className="ml-4">Add</span>
                                </button>
                                <ToastContainer/>
                            </div>
                        </div>
                    </div>)
                    })
                    }

                </div>
                </div>
            </section>
        </>
    )
}

export default Home
