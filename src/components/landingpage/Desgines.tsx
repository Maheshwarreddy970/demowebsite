'use client'

import React from 'react'

import { motion } from 'framer-motion';

export default function Desgines() {
    return (
        <>
            <section className='h-screen w-full bg-[#3e362e] overflow-hidden py-3 flex justify-center items-center'>
                <div className=' relative w-full max-w-6xl h-full '>
                    <motion.img
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        viewport={{ amount: 0.5 }}
                        className=' h-full w-full object-cover' src='/DErGBXCKfVwGZjfxm4iDjYawu9s.avif'></motion.img>
                    <motion.div
                        initial={{ left: -150 }}
                        whileInView={{ left: 100 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        viewport={{ amount: 0.5 }}
                        className='text-[9rem] hidden md:block font-semibold tracking-[-2.6px] text-left text-[rgb(237,233,207)] absolute top-1/2 translate-y-[-50%] left-20'>
                        Interior
                    </motion.div>
                    <motion.div
                        initial={{ right: -150 }}
                        whileInView={{ right: 100 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        viewport={{ amount: 0.5 }}
                        className='text-[9rem] hidden md:block font-semibold tracking-[-2.6px] text-left text-[rgb(237,233,207)] absolute top-1/2 translate-y-[-50%] right-20'>
                        Design
                    </motion.div>
                    <motion.div
                        initial={{ y: 150 }}
                        whileInView={{ y: -50 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        viewport={{ amount: 0.5 }}
                        className='text-[7rem] leading-[8rem] block md:hidden font-semibold tracking-[-2.6px] text-left text-[rgb(237,233,207)] absolute top-1/2 translate-y-[-50%] left-[10%] '>
                        Interior
                        <br></br>
                        Design
                    </motion.div>
                </div>
            </section>
        </>
    )
}