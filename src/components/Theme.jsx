import React, { useState, useEffect } from 'react'

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
  
    return (
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-md"
      >
        {isDarkMode ? "Toggle Light Mode" : " Toggle Dark Mode"}
      </button>
    );
}

export default Theme