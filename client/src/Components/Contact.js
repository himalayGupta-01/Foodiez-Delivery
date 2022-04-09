import React from 'react'
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaUserAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <>
            <section className="menu py-5">
                <div className="contact_info">
                    <div className="container mx-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-16">
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaEnvelope />
                                <div className="contact_info_content ">
                                    <div className="contact_info_title">
                                        Mail
                                    </div>
                                    <div className="contact_info_text">
                                        Foodiez@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaMapMarkerAlt />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        Pune,MH,India
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item flex justify-evenly items-center shadow-lg">
                                <FaPhoneAlt />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 1234 565 256
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="menu container mx-auto py-8">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="left max-w-xl w-1/2">

                        <form method="POST" className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">

                            <div className="mb-6">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="text"> <FaUserAlt /> <span className=" px-3">Name</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="name" id="name" type="name" placeholder="Enter your Name" />
                            </div>

                            <div className="mb-4">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="email">
                                    <FaEnvelope /><span className=" px-3">Email</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder="Enter your email" />
                            </div>


                            {/* <div className="mb-6">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex" htmlFor="password"><span className=" px-3">Password</span>
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="**********" />
                            </div> */}

                            <div class="mt-8">
                                <span class="uppercase text-sm text-gray-600 font-bold">Message</span>
                                <textarea
                                    class="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                            </div>

                            <div className="flex items-center justify-center">
                                <button className=" btn-primary rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="button" onClick>
                                    Send
                                </button>
                            </div>


                        </form>

                    </div>
                </div>
            </section>


        </>
    )
}

export default Contact
