import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";

const RadarChart = (props) => {
    const [aggregate, setAggregate] = useState([])
    const [selfData, setSelfData] = useState([])
    const [totalData, setTotalData] = useState([])

    // Helper function that returns the combined descriptor for multiple misspelled skill descriptors
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
    const getFinalName = (name) => {
        if (name == "Aimed Shot" || name == "Aimed Shot DMG" || name == "Level 1 Aimed Shot DMG") {
            return "Aimed Shot DMG"
        }
        if (name == "Fully-Charged Aimed Shot" || name == "Fully-Charged Aimed Shot DMG" || name == "Aimed Shot Charge Level 1 DMG") {
            return "Fully Charged Aimed Shot DMG"
        }
        if (name == "Low/High Plunge DMG" || name == "Low / High Plunge DMG") {
            return "Low / High Plunge DMG"
        }
        return name
    }

        // This function returns the frequency of all types of skill data and orders them in order of importance.
    // This is helpful because there are a lot of misnamed skill descriptors and typos that I count as the same skill.
    const getCounts = () => {
        let hashmap = {}
        props.rosterData.map(character => {
            try {
                character.skillTalents[0]?.upgrades.map(skill => {
                    let name = getFinalName(skill.name)
                    if (hashmap[name]) {
                        hashmap[name] += 1
                    } else {
                        hashmap[name] = 1
                    }
                })
            } catch (error) {
                hashmap["error"] += 1
            }
            
        })
        const arr = []
        Object.keys(hashmap).map(entry => {
            if (entry != "error") {
                arr.push({
                    "name" : entry,
                    "value" : hashmap[entry]
                })    
            }
        })

        return arr.sort((a,b) => a.value < b.value)
    }

    // Get all average values of skill descriptors
    const getAverageValues = () => {
        const names = {}
        props.rosterData.map(character => {
            try {
                character.skillTalents[0]?.upgrades.map(skill => {
                    let finalName = getFinalName(skill.name)
                    if (finalName.includes('Low')) {
                        // For Low / High Plunge DMG
                        let val = skill.value.replaceAll('%','')
                        val = val.split('/')

                        if (Object.keys(names).includes(finalName)) {
                            // If the skill descriptor already exists in hashmap
                            names[finalName].count += 1
                            names[finalName].value.low += Number(val[0])
                            names[finalName].value.high += Number(val[1])
                        } else { 
                            // New skill descriptor
                            names[finalName] = {
                                "count" : 1,
                                "value" : {
                                    "low" : Number(val[0]),
                                    "high" : Number(val[1])
                                }
                            }                        
                        }
                    } else {
                        let val = skill.value.replaceAll('%','')
                        
                        // For values with multiple numbers e.g a sum of numbers, we add them together. Except for division                    
                        val = eval(val)

                        if (Object.keys(names).includes(finalName)) {
                            // If the skill descriptor already exists in hashmap
                            names[finalName].count += 1
                            names[finalName].value += val
                        } else { 
                            // New skill descriptor
                            names[finalName] = {
                                "count" : 1,
                                "value" : val
                            }                        
                        }
                    }
                })
            } catch (error) {
                // console.log("Error in hash ")
            }
        })

        Object.keys(names).map(entry => {
            if (entry == "Low / High Plunge DMG") {
                names[entry].value.low = names[entry].value.low / names[entry].count
                names[entry].value.high = names[entry].value.high / names[entry].count
            } else {
                names[entry] = names[entry].value / names[entry].count
            }
            
        })

        setAggregate(names)
    }

    // Prepares chart data
    const prepareChart = () => {
        const names = [
            "1-Hit DMG",
            "2-Hit DMG",
            "3-Hit DMG",
            "4-Hit DMG",
            "5-Hit DMG",
            "Plunge DMG"            
        ]

        const data = []
        names.map(entry => {
            data.push(aggregate[entry]?.toFixed(2))
        })
        setTotalData(data)
        
        const data2 = []
        let selfSkills = props.charPreviewData.skillTalents[0].upgrades
        const dict = {}
        selfSkills.map(entry => {
            dict[entry.name] = Number(eval(entry.value.replaceAll('%', '')))
        })
        names.map(entry => {
            let desc = dict[entry]
            if (desc == undefined) {
                data2.push(0)
            } else {
                data2.push(dict[entry])
            }
            
        })
        setSelfData(data2)
    }

    useEffect(() => {
        getAverageValues()
    }, [])

    useEffect(() => {
        prepareChart()
    }, [aggregate, props.charPreviewData])
    const state = {
        series: [
            {
                name: props.charPreviewData.name,
                data: selfData,
            },
            {
                name: "Average",
                data: totalData,
            },
        ],
        options: {
            // chart: {
                // height: 800,
                // type: 'radar',
            // },
            // title: {
            //     text: "Stats"
            // },
            yaxis: {
                stepSize: 20
            },
            // Skill Descriptors
            xaxis: { 
                categories: [
                    "1-Hit DMG",
                    "2-Hit DMG",
                    "3-Hit DMG",
                    "4-Hit DMG",
                    "5-Hit DMG",
                    "Plunge DMG"            
                ]
            },
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
            }
        }
    };
    return (
        <div className="flex items-center justify-center">
            {/* <button onClick = {() => console.log(props.rosterData)}>all</button>
            <button onClick = {() => console.log(props.charPreviewData.skillTalents[0].upgrades)}>this char</button>
            <button onClick = {() => console.log(getAverageCounts())}>getAverageCount</button>
            <button onClick = {() => console.log(getAverageValues())}>getAverageValues</button>
            <button onClick = {() => console.log("aaaaa".split('+'))}>test</button> */}
            {/* <button onClick = {() => props.showChart(prev => !prev)}>Toggle Table/Chart</button> */}
            {/* <button onClick = {() => console.log(aggregate)}>aggregate</button>
            <button onClick = {() => console.log(getCounts())}>get counts</button>
            <button onClick = {() => console.log(selfData)}>chart data</button>
             */}

            <div className="">
                <div className="mixed-chart">
                    <Chart
                    options={state.options}
                    series={state.series}
                    type="radar"
                    width="700"
                    />
                </div>
            </div>
        </div>
  )
}

export default RadarChart