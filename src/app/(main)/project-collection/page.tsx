'use client'

import { Icons } from '@/icons';
import React from 'react'

import { motion } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';
import Link from 'next/link';
import { TextRotate } from '@/components/TextRotate';
import { AnimatedImagesCloud } from '@/components/AnimatedImagesCloud';
import data from "@/lib/data.json";


export default function page() {
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <section>
            <div className=' w-full bg-[#ede9cf] grid lg:grid-cols-2 overflow-hidden  h-screen '>
                <div className=' flex flex-col gap-28 lg:pl-20 justify-center'>
                    <TextAnimate animation="slideLeft" className=' mx-auto text-7xl lg:text-[64px] tracking-[-1.5px] font-semibold  leading-[1.1em] text-center  lg:text-left text-[rgb(102,79,53)] max-w-xl'>Explore Our Interior Design Project Collection</TextAnimate>
                </div>
                <div className='h-full w-full relative'>
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
            </div>
            <div className='bg-[#664f35] flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem]'>
                <TextAnimate animation="slideLeft" className=' text-[84px] lg:text-[112px] font-semibold tracking-[-6.8px] leading-[1em] text-[rgb(170,136,103)] text-center'>Project Collection</TextAnimate>
                <div className='grid lg:grid-cols-3 lg:px-10 gap-8 mt-28'>
                    {data.workCollection.projects.map((project, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }}
                            key={index} className='bg-[rgb(170,136,103)] p-4'>
                            <div className='w-full h-[24.25rem]'>
                                <motion.img
                                    variants={imageVariants}
                                    initial='exit'
                                    whileHover='hover'
                                    animate='exit'
                                    src={project.titleimg[0]}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <h1 className='text-[22px] mt-5 leading-7 text-left'>{project.title}</h1>
                            <Link href='/' className='text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center'>
                                <Icons.ButtonIcon className='size-[1.12rem]' />Read
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
            <section className=' bg-[#664f35] pt-36 overflow-hidden'>
                <div className=' flex flex-col gap-6 '>
                    <TextAnimate animation="slideLeft" className=' text-[112px] font-semibold tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</TextAnimate>
                    <TextRotate></TextRotate>
                </div>
                <AnimatedImagesCloud></AnimatedImagesCloud>
            </section>
        </section>
    )
}
