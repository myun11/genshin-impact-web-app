import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const RadarChart = (props) => {
    const [aggregate, setAggregate] = useState({
        "1-Hit DMG": 51.52434782608696,
        "2-Hit DMG": 49.83623188405798,
        "3-Hit DMG": 63.836515151515165,
        "4-Hit DMG": 71.79685185185187,
        "5-Hit DMG": 68.90962962962963,
        "Charged Attack DMG": 119.39692308343362,
        "Charged Attack Stamina Cost": 32,
        "Plunge DMG": 60.96060000000003,
        "Low / High Plunge DMG": {
            "count": 50,
            "value": {
                "low": 122.12340000000002,
                "high": 152.4188
            }
        },
        "Aimed Shot DMG": 43.81166666666666,
        "Fully Charged Aimed Shot DMG": 124,
        "Arataki Kesagiri Combo Slash DMG": 91.2,
        "Arataki Kesagiri Final Slash DMG": 190.1,
        "Masque of the Red Death Increase": 120.4,
        "6-Hit DMG": 76.12333333333333,
        "Charged Attack Spinning DMG": 60.82857142857143,
        "Charged Attack Final DMG": 108.056,
        "Spiritbreath Thorn DMG": 11.17,
        "Charged Attack Cyclic DMG": 57.333333333333336,
        "Frostflake Arrow DMG": 128,
        "Frostflake Arrow Bloom DMG": 218,
        "Charged Attack": 128.83,
        "Normal Attack DMG": 28,
        "DMG per Star Jade": 49.6,
        "Height DMG": 0.6666666666666666,
        "Scarlet Seal Stamina Consumption Decrease Per Seal": 15,
        "Scarlet Seal Duration": 10
    })
    const [selfData, setSelfData] = useState([])
    const [totalData, setTotalData] = useState([])
    const [xaxis, setXaxis] = useState([])

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
                        let val = skill.value.replaceAll('%','').replaceAll('/s', '')
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

    // Helper Function for returning count when entering a skill descriptor
    const returnCount = (skill) => {
        let counts = getCounts()
        let dict = {}
        counts.map(entry => {
            dict[entry.name] = entry.value
        })
        return dict[getFinalName(skill)]
    }


    // Prepares chart data
    const prepareChart = () => {

        // Parse current character skill descriptors and rank among top 8
        // Excluded descriptors for now. Maybe future improvement
        const excludedNames = [
            "Charged Attack Stamina Cost", 
            "Max Duration",
            "Low / High Plunge DMG",
            "Charged Attack Stamina Cost"
        ]
        
        // Start here
        let selfSkills = props.charPreviewData.skillTalents[0].upgrades
        const names = []
        selfSkills.map(entry => {
            let name = entry.name
            // Excludes excludedNames and only counts descriptors with 5 counts or more in total.
            if (!excludedNames.includes(getFinalName(name)) && returnCount(getFinalName(name)) > 5) {
                if (!names.includes(name)) {
                    names.push(name)
                }    
            }
        })
        const sortedNames = names.sort((a,b) => {
            let frequency_a = returnCount(getFinalName(a))
            let frequency_b = returnCount(getFinalName(b))
            return frequency_a < frequency_b
        })
        console.log("sorted names is ", sortedNames)
        console.log("selfSkills: ", selfSkills)
        const dict = {}
        selfSkills.map(entry => {
            console.log("step: ", entry)
            if (getFinalName(entry.name) != "Max Duration") {
                dict[entry.name] = Number(eval(entry.value.replaceAll('%', '').replaceAll('/s', '')))
            }
        })

        console.log("dict is: ", dict)
        const data = []
        sortedNames.map(entry => {
            data.push(dict[entry])            
        })
        setSelfData(data)

        const data2 = []
        sortedNames.map(entry => {
            if (!excludedNames.includes(getFinalName(entry))) {
                let val = aggregate[getFinalName(entry)]
                data2.push(val?.toFixed(2))
            }
        })
        setTotalData(data2)
        setXaxis(sortedNames)
        
    }

    // useEffect(() => {
    //     getAverageValues()
    // }, [])

    useEffect(() => {
        prepareChart()
    }, [props.charPreviewData])
    const state = {

    };
    return (
        <div className="flex items-center justify-center">
            {/* <button onClick = {() => console.log(props.rosterData)}>all</button>
            <button onClick = {() => console.log(props.charPreviewData.skillTalents[0].upgrades)}>this char</button>
            <button onClick = {() => console.log(getCounts())}>getAverageCount</button>
            <button onClick = {() => console.log(getAverageValues())}>getAverageValues</button>
            <button onClick = {() => console.log(returnCount("1-Hit DMG"))}>returnsCount</button>
            <button onClick = {() => console.log(aggregate)}>aggregate</button>
            <button onClick = {() => console.log(getCounts())}>get counts</button>
            <button onClick = {() => console.log(selfData)}>self data</button>
            <button onClick = {() => {
                let test = "55.25% + 55.25%"
                console.log(Number(eval(test.replaceAll('%', '').replaceAll('/s', ''))))
            }}>test</button> */}
            

            {/* <button onClick = {() => props.showChart(prev => !prev)}>Toggle Table/Chart</button> */}
            
                 
                <div className="">
                    <HighchartsReact
                        highcharts={totalData}
                        options={{
                            chart: {
                                polar: true
                            },
                        
                            title: {
                                text: 'Highcharts Polar Chart'
                            },
                        
                            subtitle: {
                                text: 'Also known as Radar Chart'
                            },
                        
                            pane: {
                                startAngle: 0,
                                endAngle: 360
                            },
                        
                            xAxis: {
                                tickInterval: 45,
                                min: 0,
                                max: 360,
                                labels: {
                                    format: '{value}°'
                                }
                            },
                        
                            yAxis: {
                                min: 0
                            },
                        
                            plotOptions: {
                                series: {
                                    pointStart: 0,
                                    pointInterval: 45
                                },
                                column: {
                                    pointPadding: 0,
                                    groupPadding: 0
                                }
                            },
                        
                            series: [{
                                type: 'column',
                                name: 'Column',
                                data: [8, 7, 6, 5, 4, 3, 2, 1],
                                pointPlacement: 'between'
                            }, {
                                type: 'line',
                                name: 'Line',
                                data: [1, 2, 3, 4, 5, 6, 7, 8]
                            }, {
                                type: 'area',
                                name: 'Area',
                                data: [1, 8, 2, 7, 3, 6, 4, 5]
                            }]
                        }}
                    />
                </div>


            
        </div>
  )
}

export default RadarChart