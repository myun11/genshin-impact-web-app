import React from 'react'
import { SocialIcon } from 'react-social-icons'
import api from '../images/api.png'

const Footer = () => {
  return (
    <div className = "inline-flex bg-gray-700 ">
        
        <div >
            <SocialIcon network="linkedin" bgColor='gray' url="https://www.linkedin.com/in/michael-yun-6562a3207/"/>
            <SocialIcon network="github" bgColor='gray' url="https://github.com/myun11/genshin-impact-web-app"/>
            
            <button> </button>
            <button className = "bg-gray-500"><img src={api}></img></button>
        </div>
        
    </div>
  )
}

export default Footer