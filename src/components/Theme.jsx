import React, { useState, useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Theme = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    if (isDarkMode) {
      return (
        <button
          onClick={toggleTheme}
          className="w-14 lg:w-full h-full px-4 py-2 border border-white bg-gray-800 text-white rounded-3xl"
        >
          <div className="inline-flex mx-auto items-center justify-center text-center content-center m-auto space-x-1.5">
          <MdOutlineDarkMode /> <p className="max-lg:hidden">Dark</p>
          </div>
          
        </button>
      )
    } else {
      return (
        <button
          onClick={toggleTheme}
          className="w-14 lg:w-full h-full px-4 py-2 border border-black bg-slate-300 text-black rounded-3xl"
        >
          <div className="inline-flex mx-auto items-center justify-center text-center content-center m-auto space-x-1.5">
          <MdOutlineLightMode /> <p className="max-lg:hidden">Light</p>
          </div>
        </button>
      )
    }
}

export default Theme