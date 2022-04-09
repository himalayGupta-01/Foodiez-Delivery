import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaShoppingCart } from 'react-icons/fa';
import logo from '../images/3697355.png'


const Navbar = () => {

    return (
        <>
            <nav className=" container mx-auto flex items-center justify-between ">
                <div>
                <NavLink className="logo-link" to="/"> <img src={logo} alt="logo" /> </NavLink>
                </div>
                <div>
                <ul className=" flex items-center font-bold">
                            <li className=" ml-6">
                                <NavLink exact activeClassName="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className=" ml-6">
                                <NavLink activeClassName="nav-link active" to="/contact">Contact</NavLink>
                            </li>
                            <li className=" ml-6">
                                <NavLink activeClassName="nav-link active" to="/signin">Login</NavLink>
                            </li>
                            <li className=" ml-6">
                                <NavLink activeClassName="nav-link active" to="/signup">SignUp</NavLink>
                            </li>
                            <li className=" ml-6 ">
                                <NavLink className="nav-link px-4 py-2 rounded-full flex items-center " id='cart-icon' to="/cart"><span id='cartCounter'></span><FaShoppingCart/></NavLink>
                            </li>
                        </ul>
                </div>
            </nav>
            
        </>
    )
}

export default Navbar
