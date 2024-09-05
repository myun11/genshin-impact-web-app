import React from 'react'

const Home = (props) => {
  return (
    <div className='p-4 align-middle justify-center text-black dark:text-white bg-paimon bg-center w-screen bg-cover bg-slate-200 dark:bg-slate-800 bg-no-repeat min-h-screen'>
      <br/><br/><br/><br/>
      <div className="">
        <div className="md:w-3/5 p-4 mx-auto bg-slate-300 dark:bg-slate-800 bg-opacity-50 space-y-5">
          <h1 className="md:text-8xl">Welcome to Sumeru.gg</h1>
          <p className="text-md lg:text-2xl">
            This web application serves as a data hub for users to plan and compare between various assets in the online game of Genshin Impact. 
            Sumeru.gg provides data on character profiles, weapons, items and more. Everything you need in one place!
          </p>
        </div>
        <div className="md:w-3/5 p-4 mx-auto">
          <div className="grid grid-cols-2 p-2 my-4 gap-5">
            <button className="group relative transition lg:h-52 h-20 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Characters")}>
              <h2 className="md:text-2xl lg:text-4xl">Characters</h2>
              <p className="p-4 max-md:hidden">
                An assortment of characters with filter tools for querying specific needs.
                Select your desired character to view detailed information including their skills, ascension materials, and more.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
            </button>
            <button className="group relative transition lg:h-52 h-20 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Weapons")}>
              <h2 className="md:text-2xl lg:text-4xl">Weapons</h2>
              <p className="p-4 max-md:hidden">
                A grid of weapons with filter tools to find your ideal weapon.
                Select your desired weapon to view detailed information including rarity and location of the weapon.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>              
            </button>
            <button className="group relative transition lg:h-52 h-20 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Artifacts")}>
              <h2 className="md:text-2xl lg:text-4xl">Artifacts</h2>
              <p className="p-4 max-md:hidden">
                A table of different artifacts organized by their class set.
                View set bonuses here.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div> 
            </button>
            <button className="group relative transition lg:h-52 h-20 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Consumables")}>
              <h2 className="md:text-2xl lg:text-4xl">Consumables</h2>
              <p className="p-4 max-md:hidden">
                A collection of different consumables and their buffs.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div> 
            </button>
          </div>
        </div>
        <div className="justify-center">
          <ul className="text-md lg:text-sm lg:w-1/2 lg:mx-auto list-disc rounded-lg ">
            <h2>Skills Used:</h2>
            <li>ReactJS</li>
            <li>TailwindCSS</li>
            <li>RESTful APIs</li>
            <li>Responsive Design</li>
            <li>Regex</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home