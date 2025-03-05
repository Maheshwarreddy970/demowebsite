'use client'

import { Icons } from '@/icons'
import React from 'react'
import { motion } from 'framer-motion';

export default function Heroserction() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            <div className={`absolute inset-0 overflow-hidden font-semibold `}>
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={'/b0MCHKyxCogsLlrolRnEnoL01I.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <motion.div 
            initial={{ opacity: 0 ,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.7, ease:'easeInOut',stiffness:100}}
            className=' overflow-hidden z-20 max-w-md h-[80vh]  bg-[rgba(102,79,53,0.41)] w-full opacity-100 backdrop-blur-md p-4  '>
                <div className=" relative w-full h-[82%] overflow-hidden">
                    <video
                        className="w-full h-full  object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={'/b0MCHKyxCogsLlrolRnEnoL01I.mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <a href='/project-collection/the-meadow-house' className=' font-semibold flex items-center justify-center gap-2 bg-[rgb(237,233,207)] rounded-[22px] opacity-100 absolute bottom-10 left-1/2 translate-x-[-50%] py-3 px-6  hover:text-white hover:bg-[rgb(170,136,103)] text-[14px] text-center hover:fill-white fill-[rgb(102,79,53)]  text-[rgb(102,79,53)]  '>
                    <Icons.ButtonIcon className=' size-5' ></Icons.ButtonIcon>
                    Get Started</a>
                </div>
                <h1 className="text-[32px] font-semibold  mt-1.5 text-center text-[rgb(237,233,207)] ">The Meadow House</h1>
                <p className="text-[14px] font-semibold text-left text-[rgb(237,233,207)] ">The Meadow House by Mark English Architects draws on Californian and Korean influences</p>
            </motion.div>
        </section>
    )
}