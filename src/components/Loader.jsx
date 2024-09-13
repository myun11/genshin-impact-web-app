import React from 'react'
import 'ldrs/tailChase'

const Loader = (props) => {
    return (
        <div>
            <div className = "mt-12 flex items-center justify-center" aria-live="polite" aria-busy={props.loading}>

                {props.loading && <l-tail-chase
                size="150"
                speed="1.75"
                color="white" 
                ></l-tail-chase>}
            </div>            
        </div>
      )
}

export default Loader