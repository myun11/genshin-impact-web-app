import React from 'react'

const Home = (props) => {
  return (
    <div className='p-4 align-middle justify-center dark:text-white bg-paimon bg-center w-screen bg-cover bg-slate-200 dark:bg-slate-800 bg-no-repeat min-h-screen'>
        <br/><br/><br/><br/>
        <h1>Welcome to Sumeru.gg</h1>
               
        <div className="p-4 mx-auto">
          <p className="text-md lg:text-2xl">
          This web application serves as a data hub for users to plan and compare between various assets in the online game of Genshin Impact. 
          Sumeru.gg provides data on character profiles, weapons, items and more. Everything you need in one place!
          </p>

          <div className="grid grid-cols-2 lg:w-4/5 p-2 my-4 gap-2">
            <button className=" max-md:h-20 max-md:text-xl rounded-lg bg-slate-500 hover:bg-slate-400" onClick = {() => props.setPage("Characters")}>Characters</button>
            <button className=" max-md:h-20 max-md:text-xl rounded-lg bg-slate-500 hover:bg-slate-400" onClick = {() => props.setPage("Weapons")}>Weapons</button>
            <button className=" max-md:h-20 max-md:text-xl rounded-lg bg-slate-500 hover:bg-slate-400" onClick = {() => props.setPage("Artifacts")}>Artifacts</button>
            <button className="text-justify max-md:h-20 max-md:text-xl rounded-lg bg-slate-500 hover:bg-slate-400" onClick = {() => props.setPage("Consumables")}>Consumables</button>
          </div>
          
          <ul className="text-md lg:text-2xl list-disc rounded-lg bg-slate-900">
            <h2>Skills Used:</h2>
            <li>ReactJS</li>
            <li>TailwindCSS</li>
            <li>RESTful APIs</li>
            <li>Responsive Design</li>
            <li>Regex</li>
          </ul>
        </div>
    </div>
  )
}

export default Home