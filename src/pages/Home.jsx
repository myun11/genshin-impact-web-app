import React from 'react'

const Home = (props) => {
  return (
    // <div className = "min-h-screen w-full">
     <div className='relative bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full min-h-screen  '>
      <div className="absolute inset-0 z-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00a_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00a_100%)]"></div>
      <div className = "w-full absolute top-24 ">
        <div className="xl:w-3/5 mx-auto p-4  bg-slate-300 dark:bg-slate-800 dark:bg-opacity-50 bg-opacity-50 space-y-5 rounded-3xl">
          <h1 className="md:text-5xl font-extrabold">Welcome to Sumeru.dev</h1>
          <p className="text-base lg:w-1/2 lg:flex-col item-center justify-center mx-auto">
            This web application serves as a data hub for users to plan and compare between various assets in the online game of Genshin Impact.
            Sumeru.dev provides data on character profiles, weapons, items and more. Everything you need in one place!
          </p>
        </div>
        <div className="xl:w-3/5 flex items-center justify-center mx-auto px-4">
          <div className="grid grid-cols-2 p-2 gap-5">
            <button className="group relative transition box-content h-20 md:h-32 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => {
              props.setPage("Characters")
              props.setCharPreviewState(false)
              props.setCharPreviewData([])
              window.scrollTo(0, 0)
            }}>
              <h2 className="md:text-2xl lg:text-4xl md:font-bold">Characters</h2>
              <p className="lg:p-2 md:text-sm max-md:hidden">
                An assortment of characters with filter tools for querying specific needs.
                View detailed information including their skills, ascension materials, and more.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div>
            </button>
            <button className="group relative transition box-content h-20  md:h-32 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => {
              props.setPage("Weapons")
              window.scrollTo(0, 0)
            }}>
              <h2 className="md:text-2xl lg:text-4xl md:font-bold">Weapons</h2>
              <p className="lg:p-2 md:text-sm max-md:hidden">
                A grid of weapons with filter tools to find your ideal weapon.
                Select your desired weapon to view detailed information including rarity and location of the weapon.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div>              
            </button>
            <button className="group relative transition box-content h-20  md:h-32 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => {
              props.setPage("Artifacts")
              window.scrollTo(0, 0)
            }}>
              <h2 className="md:text-2xl lg:text-4xl md:font-bold">Artifacts</h2>
              <p className="lg:p-2 md:text-sm max-md:hidden">
                A table of different artifacts organized by their class set.
                View set bonuses here.
              </p>
              <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div> 
            </button>
            <button className="group relative transition box-content h-20  md:h-32 rounded-lg border-2 border-black dark:border-slate-800 bg-slate-100 dark:bg-slate-500" onClick = {() => {
              props.setPage("Consumables")
              window.scrollTo(0, 0)
            }}>
              <span className = "">
                <h2 className="md:text-2xl lg:text-4xl md:font-bold">Consumables</h2>
                <p className="lg:p-2 md:text-sm max-md:hidden">
                  A collection of different consumables and their buffs.
                </p>
              </span>
              <div className="absolute inset-0 h-full w-0 bg-gray-600 bg-opacity-30 dark:bg-white/30 transition-[width] group-hover:w-full"></div> 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home