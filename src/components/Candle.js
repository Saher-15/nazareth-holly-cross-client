import React from "react";
import "./Candle.css";

function Candle() {
    return (
        <section className="hero" style={{ backgroundImage: "url('images/candle.jpg')" }}>
            
            <div className="class1div">
                <div>
                    <label htmlFor="name" className="class1label">
                        First name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="last-name" className="class1label">
                        Last name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="address" className="class1label">
                        Address
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="organization"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="email" className="class1label">
                        Email
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="class1label">
                        Phone number
                    </label>
                    <div className="relative mt-2.5">
                        <input
                            type="tel"
                            name="phone-number"
                            id="phone-number"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="class1label" className="class1label">
                        Pray
                    </label>
                    <div className="mt-25">
                        <textarea
                            name="pray"
                            id="pray"
                            rows="4"
                            className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                    </div>
                </div>


                <div className="mt-10">
                    <button type="submit" className="class10">
                        Let's talk
                    </button>
                </div>


            </div>
        </section>
    );
}

export default Candle;
