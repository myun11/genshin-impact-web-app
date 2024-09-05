import React, { useState } from 'react'
import Sumeru_Icon from '../images/Sumeru_Icon.webp'
import Sumeru_Icon1 from '../images/Sumeru_Icon1.png'
import Theme from './Theme';

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
        <div className="">
            <nav className="bg-slate-400 dark:bg-slate-700 p-4 text-left fixed w-screen z-50 top-100">
                {/* Mobile */}
                <div className="lg:hidden m-auto mx-auto flex items-center justify-between">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-left bg-slate-300 dark:bg-gray-800 text-black dark:text-gray-300 focus:outline-none"
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
                    <div onClick = {() => {
                        props.setPage('Home')
                        setIsOpen(false)
                    }} className="text-black dark:text-white text-lg font-bold">
                        <img className="w-14" src={Sumeru_Icon1}/> 
                        {/* <div className="m-auto font-bold text-3xl text-gray-300 hover:text-white">.GG</div> */}
                    </div>
                    <Theme/>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                    <a
                        className="block text-black dark:text-gray-300 py-2"
                        onClick={() => {
                            setIsOpen(false)
                            props.setPage('Home')
                        }}
                    >
                        Home
                    </a>
                    <a
                        className="block text-black dark:text-gray-300 py-2"
                        onClick={() => {
                            setIsOpen(false)
                            props.setPage('Characters')
                        }}
                    >
                        Characters
                    </a>
                    <a
                        className="block text-black dark:text-gray-300 py-2"
                        onClick={() => {
                            setIsOpen(false)
                            props.setPage('Weapons')
                        }}
                    >
                        Weapons
                    </a>
                    <a
                        className="block text-black dark:text-gray-300 py-2"
                        onClick={() => {
                            setIsOpen(false)
                            props.setPage('Artifacts')
                        }}
                    >
                        Artifacts
                    </a>
                    <a
                        className="block text-black dark:text-gray-300 py-2"
                        onClick={() => {
                            setIsOpen(false)
                            props.setPage('Consumables')
                        }}
                    >
                        Consumables
                    </a>
                    </div>
                )}
                {/* PC */}
                <div className="max-lg:hidden flex justify-between align-middle">
                    {/* Web App Icon */}
                    <div className = "inline-flex space-x-10">
                        <div onClick = {() => props.setPage('Home')} className="inline-flex align-middle">
                            <img className="w-14" src={Sumeru_Icon1}/> 
                            {/* <div className="m-auto font-bold text-3xl text-gray-300 hover:text-white">.GG</div> */}
                        </div>
                        <a href='#' onClick = {() => props.setPage('Characters')}  className="hover:border-b-4 border-b-black dark:border-b-white font-bold m-auto text-3xl text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">Characters</a>
                        <a href='#' onClick = {() => props.setPage('Weapons')}     className="hover:border-b-4 border-b-black dark:border-b-white font-bold m-auto text-3xl text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">Weapons</a>
                        <a href='#' onClick = {() => props.setPage('Artifacts')}   className="hover:border-b-4 border-b-black dark:border-b-white font-bold m-auto text-3xl text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">Artifacts</a>
                        <a href='#' onClick = {() => props.setPage('Consumables')} className="hover:border-b-4 border-b-black dark:border-b-white font-bold m-auto text-3xl text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">Consumables</a>
                    </div>
                    <div className = "px-4">
                        <Theme/>
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar