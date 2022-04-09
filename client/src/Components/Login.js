import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { FaUserAlt, FaUnlockAlt } from 'react-icons/fa';
import signInPic from '../images/login.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

  const history=useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUSer = async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch("/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,password
        })
      });
  
      const data =res.json();
      console.log(data);
      
      if((res.status>=400 && res.status<=500) || !data){
        toast.error("Inavlid Login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      else{
        toast.success("Login succeccsul", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="login py-5">
        <div className="shadow-2xl container mx-auto flex justify-center items-center">
          <div className="left max-w-xs w-1/2">

            <form method="POST" className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">

              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                  <FaUserAlt /> <span className=" px-3">Email</span>
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" />
              </div>


              <div className="mb-6">
                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password">
                  <FaUnlockAlt /> <span className=" px-3">Password</span>
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="**********" />
              </div>


              <div className="flex items-center justify-between">
                <button className=" btn-primary rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="button" onClick={loginUSer}>
                  Sign In
                </button>
                <ToastContainer/>
                <NavLink className="inline-block align-baseline font-bold text-sm " to="/signup">
                  Don't have account?
                </NavLink>
              </div>


            </form>

            <p className="text-center text-gray-500 text-xs">
              &copy;2021 Foodiez Delivery All rights reserved.
            </p>

          </div>

          <div className="right max-w-xl signInPic w-1/2">
            <figure>
              <img className="px-6" src={signInPic} alt="Login Pic" />
            </figure>
          </div>

        </div>
      </section>
    </>
  )
}

export default Login
