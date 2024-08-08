import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ">
        <ul>
          <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Art">Art</a></li>
          <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Factions">Factions</a></li>
          <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Constellation">Constellation</a></li>
          <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Passive Talents">Passive Talents</a></li>
          <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Skill Talents">Skill Talents</a></li>
        </ul>
      </div>
      <div id="Art" style={{ height: '100vh', padding: '20px' }}>
        <h1>Art</h1>
      </div>
      <div id="Factions" style={{ height: '100vh', padding: '20px' }}>
        <h1>Factions</h1>
      </div>
      <div id="Constellation" style={{ height: '100vh', padding: '20px' }}>
        <h1>Constellation</h1>
      </div>
      <div id="Passive Talents" style={{ height: '100vh', padding: '20px' }}>
        <h1>Passive Talents</h1>
      </div>
      <div id="Skill Talents" style={{ height: '100vh', padding: '20px' }}>
        <h1>Skill Talents</h1>
      </div>
    </div>
  )
}

export default Sidebar