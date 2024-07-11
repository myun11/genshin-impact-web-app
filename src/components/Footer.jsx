import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { TbApi } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className = "inline-flex w-screen bg-gray-700 items-center justify-center">
        Socials:
        <SocialIcon network="linkedin" bgColor='gray' url="https://www.linkedin.com/in/michael-yun-6562a3207/"/>
        <SocialIcon network="github" bgColor='gray' url="https://github.com/myun11/genshin-impact-web-app"/>
        <SocialIcon network="mailto" bgColor='gray' onClick={() => window.location = 'mailto:yun.michael.ds@gmail.com'}/>
        
        <button className = "bg-gray-500 rounded-full"><TbApi /></button>
        <button className = "bg-gray-500"><FaLinkedin /></button>
        <button className = "bg-gray-500"><FaGithub /></button>    
    </div>
  )
}

export default Footer