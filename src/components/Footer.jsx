import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { TbApi } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className = "inline-flex w-screen h-40 bg-gray-700 items-center justify-center">
        
        <SocialIcon network="linkedin" bgColor='gray' url="https://www.linkedin.com/in/michael-yun-6562a3207/"/>
        <SocialIcon network="github" bgColor='gray' url="https://github.com/myun11/genshin-impact-web-app"/>
        <SocialIcon network="mailto" bgColor='gray' onClick={() => window.location = 'mailto:yun.michael.ds@gmail.com'}/>
        
        &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
        <SocialIcon network="github" bgColor='gray' url="https://github.com/genshindev/api"/>
        <SocialIcon network="github" bgColor='gray' url="https://github.com/wanderer-moe/api"/>    
    </div>
  )
}

export default Footer