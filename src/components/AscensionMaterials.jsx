import React from 'react'


const AscensionMaterials = (props) => {
    return (
        <div>
            <h1 className = "font-bold p-4">Ascension Materials</h1>
            <button onClick = {() => console.log(props.data)}>data</button>
        </div>
    )
}

export default AscensionMaterials