import React, { useState } from 'react'
import Sumeru_Icon from '../images/Sumeru_Icon.webp'
import Sumeru_Icon1 from '../images/Sumeru_Icon1.png'


const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        // <button className= "w-1/6 hover:bg-red-300" onClick = {() => props.setPage('Home')}><img src={Sumeru_Icon1}/></button>
        // {/* <a onClick = {() => props.setPage('Home')} className="text-gray-300 hover:text-white">Home</a> */}
        // <button onClick = {() => props.setPage('Characters')} className="text-gray-300 hover:text-white">Characters</button>
        // <button onClick = {() => props.setPage('Weapons')} className="text-gray-300 hover:text-white">Weapons</button>
        // <button onClick = {() => props.setPage('Artifacts')} className="text-gray-300 hover:text-white">Artifacts</button>
        // <button onClick = {() => props.setPage('Consumables')} className="text-gray-300 hover:text-white">Consumables</button>
        // <button onClick = {() => props.setPage('Dev')} className="text-gray-300 hover:text-white">Dev</button>
        <div>
            <nav className="bg-red-800 p-4 fixed w-full z-10 top-0">
            <div className="container flex justify-between items-center">
                <div className="text-white text-lg font-bold"><img className="w-1/12" src={Sumeru_Icon}/></div>
                <div className="hidden md:flex space-x-4">
                    <a href='#' onClick = {() => props.setPage('Characters')} className="text-3xl text-gray-300 hover:text-white">Characters</a>
                    <a href='#' onClick = {() => props.setPage('Weapons')} className="text-3xl text-gray-300 hover:text-white">Weapons</a>
                    <a href='#' onClick = {() => props.setPage('Artifacts')} className="text-3xl text-gray-300 hover:text-white">Artifacts</a>
                    <a href='#' onClick = {() => props.setPage('Consumables')} className="text-3xl text-gray-300 hover:text-white">Consumables</a>
                </div>
                <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-300 focus:outline-none"
                >
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    {isOpen ? (
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                        />
                    )}
                    </svg>
                </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                <a
                    href="#home"
                    className="block text-gray-300 hover:text-white py-2"
                    onClick={() => setIsOpen(false)}
                >
                    Home
                </a>
                <a
                    href="#about"
                    className="block text-gray-300 hover:text-white py-2"
                    onClick={() => setIsOpen(false)}
                >
                    About
                </a>
                <a
                    href="#services"
                    className="block text-gray-300 hover:text-white py-2"
                    onClick={() => setIsOpen(false)}
                >
                    Services
                </a>
                <a
                    href="#contact"
                    className="block text-gray-300 hover:text-white py-2"
                    onClick={() => setIsOpen(false)}
                >
                    Contact
                </a>
                </div>
            )}
            </nav>
        </div>
    )
}

export default Navbar