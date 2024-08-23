import React from 'react'

const Home = () => {
  return (
    <div className='p-4 align-middle justify-center dark:text-white bg-paimon bg-center w-screen bg-cover bg-slate-200 dark:bg-slate-800 bg-no-repeat min-h-screen'>
        <br/><br/><br/><br/>
        <h1>Welcome to Sumeru.gg</h1>
               
        <div className="p-4 mx-auto bg-slate-900">
          <p className="text-xl">
          This web application serves as a data hub for users to plan and compare between various assets in the online game of Genshin Impact. 
          Sumeru.gg provides data on character profiles, weapons, items and more. Everything you need in one place!
          </p>
          
          <div>
            <h2>Skills Used:</h2>
            <li>ReactJS</li>
            <li>TailwindCSS</li>
            <li>RESTful APIs</li>
            <li>Responsive Design</li>
            <li>Regex</li>
          </div>
        </div>
    </div>
  )
}

export default Home