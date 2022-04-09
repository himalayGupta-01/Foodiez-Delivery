import React, { useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaUnlockAlt } from 'react-icons/fa';
import signUpPic from "../images/signup.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: "", cpassword: ""
    });

    const handelInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    };


    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, cpassword } = user;

        const res = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, email, phone, password, cpassword
            })
        })

        const data = await res.json();

        if ((res.status >= 400 && res.status<=500) || !data) {
            toast.error("Invalid Registration", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.success("Registration sucessful", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            history.push("/signin");
        }

    }

    return (
        <>
            <section className="signup py-5">
                <div className="shadow-2xl container mx-auto flex justify-center items-center">

                    <div className="left max-w-xs w-1/2">
                        <form method="POST" className="bg-white shadow-md rounded px-4 pt-6 pb-6 mb-4 mt-4">

                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="name">
                                    <FaUserAlt /> <span className=" px-3">Name</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" id="name" type="text" autoComplete="off" value={user.name} onChange={handelInput} placeholder="Enter your Name" />
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                                    <FaEnvelope /> <span className=" px-3">Email</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" autoComplete="off" value={user.email} onChange={handelInput} placeholder="Enter your Email" />
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="phone">
                                    <FaPhoneAlt /> <span className=" px-3">Phone Number</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phone" id="phoneNumber" type="number" autoComplete="off" value={user.phone} onChange={handelInput} placeholder="Enter your Phone number" />
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                                    <FaUnlockAlt /> <span className=" px-3">Password</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" value={user.password} onChange={handelInput} placeholder="**********" />
                            </div>


                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                                    <FaUnlockAlt /> <span className=" px-3">Confirm Password</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="cpassword" id="cpassword" type="password" value={user.cpassword} onChange={handelInput} placeholder="**********" />
                            </div>


                            <div className="flex items-center justify-between">
                                <button className=" btn-primary rounded-full text-white font-bold py-2 px-4 focus:shadow-outline" name="signup" value="signup" onClick={PostData} type="button">
                                    Sign Up
                                </button>
                                <ToastContainer/>
                                <NavLink className="inline-block align-baseline font-bold text-sm " to="/signin">
                                    Already have an account?
                                </NavLink>
                            </div>


                        </form>

                        <p className="text-center text-gray-500 text-xs">
                            &copy;2021 Foodiez Delivery All rights reserved.
                        </p>

                    </div>

                    <div className='signup-image max-w-lg w-1/2'>
                        <figure>
                            <img className="px-4" src={signUpPic} alt="registration pic" />
                        </figure>
                    </div>

                </div>

            </section>
        </>
    );
};

export default SignUp;
