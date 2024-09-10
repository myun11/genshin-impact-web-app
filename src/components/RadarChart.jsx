import React, { useState, useEffect } from 'react'

const RadarChart = (props) => {
    const [data, setData] = useState([])
    const [aggregate, setAggregate] = useState([])

    // Most common are

    // BOTH
    // 1-6 hit dmg,

    // MELEE
    // Charged Attack DMG
    // Charged Attack Stamina Cost

    // RANGED
    // Aimed Shot || Aimed Shot DMG || Level 1 Aimed Shot DMG
    // Fully-Charged Aimed Shot || Fully-Charged Aimed Shot DMG || Aimed Shot Charge Level 1 DMG 

    // BOTH
    // Plunge DMG
    // Low/High Plunge DMG || Low / High Plunge DMG

    const calculate = () => {
        let hashmap = {
            "error" : 0
        }
        props.rosterData.map(character => {
            try {
                character.skillTalents[0]?.upgrades.map(skill => {
                    if (hashmap[skill.name]) {
                        hashmap[skill.name] += 1
                    } else {
                        hashmap[skill.name] = 1
                    }
                })
            } catch (error) {
                hashmap["error"] += 1
            }
            
        })
        console.log(hashmap)
    }
    useEffect(() => {
        calculate()
    }, [])
    return (
        <div>
            <button onClick = {() => console.log(props.rosterData)}>all</button>
            <button onClick = {() => console.log(props.charPreviewData.skillTalents[0].upgrades)}>this char</button>
            <button onClick = {() => console.log(aggregate)}>aggregate</button>
            <button onClick = {() => {
                calculate()
            }}>Calculate Averages</button>
            <button onClick = {() => console.log(eval("55.25% + 55.25%"))}>eval</button>
            {/* <button onClick = {() => props.showChart(prev => !prev)}>Toggle Table/Chart</button> */}
            Begin radar chart.
        </div>
  )
}

export default RadarChart