import React from 'react'

const ConsumablePreview = (props) => {
  return (
    <div>
        ConsumablePreview
        <button onClick = {() => console.log(props)}>props</button>
    </div>
  )
}

export default ConsumablePreview