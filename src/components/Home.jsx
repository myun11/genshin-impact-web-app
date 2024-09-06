import React from 'react'

const Home = (props) => {
  return (
    <div className='relative bg-slate-200 dark:bg-slate-800 p-4 text-black dark:text-white w-screen min-h-screen '>
      <div className="absolute inset-0 z-0 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00a_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00a_100%)]"></div>
        <div className = "absolute top-48 h-fit">
          <div className="md:w-4/5 p-4 mx-auto bg-slate-300 dark:bg-slate-800 dark:bg-opacity-50 bg-opacity-50 space-y-5 rounded-3xl">
            <h1 className="md:text-8xl font-extrabold">Welcome to Sumeru.gg</h1>
            <p className="text-md lg:text-2xl">
              This web application serves as a data hub for users to plan and compare between various assets in the online game of Genshin Impact. 
              Sumeru.gg provides data on character profiles, weapons, items and more. Everything you need in one place!
            </p>
          </div>
          <div className="md:w-4/5 p-4 mx-auto">
            <div className="grid grid-cols-2 p-2 my-4 gap-5">
              <button className="group relative transition box-content h-20 md:h-52 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Characters")}>
                <h2 className="md:text-2xl lg:text-4xl md:font-bold">Characters</h2>
                <p className="p-4 md:text-sm lg:text-xl max-md:hidden">
                  An assortment of characters with filter tools for querying specific needs.
                  Select your desired character to view detailed information including their skills, ascension materials, and more.
                </p>
                <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div>
              </button>
              <button className="group relative transition box-content h-20  md:h-52 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Weapons")}>
                <h2 className="md:text-2xl lg:text-4xl md:font-bold">Weapons</h2>
                <p className="p-4 md:text-sm lg:text-xl max-md:hidden">
                  A grid of weapons with filter tools to find your ideal weapon.
                  Select your desired weapon to view detailed information including rarity and location of the weapon.
                </p>
                <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div>              
              </button>
              <button className="group relative transition box-content h-20  md:h-52 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Artifacts")}>
                <h2 className="md:text-2xl lg:text-4xl md:font-bold">Artifacts</h2>
                <p className="p-4 md:text-sm lg:text-xl max-md:hidden">
                  A table of different artifacts organized by their class set.
                  View set bonuses here.
                </p>
                <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div> 
              </button>
              <button className="group relative transition box-content h-20  md:h-52 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => props.setPage("Consumables")}>
                <h2 className=" md:text-2xl lg:text-4xl md:font-bold">Consumables</h2>
                <p className="p-4 md:text-sm lg:text-xl max-md:hidden">
                  A collection of different consumables and their buffs.
                </p>
                <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div> 
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home