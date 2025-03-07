'use client';

import React from 'react'
;
import { motion } from 'framer-motion';
import { Icons } from '@/icons';
import { TextAnimate } from '@/components/ui/text-animate';
import Link from 'next/link';

const data = [
    {
        id: "01",
        title: "Environmental",
        description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    },
    {
        id: "02",
        title: "Economic",
        description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    },
    {
        id: "03",
        title: "Social",
        description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    }
];

const articles = [
    {
        src: '/GJm3LUcMAVTkElRg8tIQOoi3I8.avif',
        title: 'The concept of biophilia—human beings\' inherent connection to nature.',
    },
    {
        src: '/kV49z4hfHOq0o1EAK3C4qmJ7oE.avif',
        title: 'Smart Homes and Buildings: Integrating Technology and Design',
    },
    {
        src: '/LplpVPUpxDHnVTfRW8XsfQNw.avif',
        title: 'Wellness-Centric Design: Creating Healthy Interiors',
    }
];

export default function page() {
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <section className=' overflow-hidden'>
            <div className=' w-full bg-[#0c652d]  lg:grid lg:grid-cols-2  overflow-hidden  h-[150vh] lg:h-screen '>
                <div className=' flex flex-col gap-28 lg:pl-20 justify-center'>
                    <TextAnimate animation="slideLeft" className='text-[64px] tracking-[-1.5px] font-semibold  leading-[1.1em] px-5 py-28 lg:px-0 lg:py-0 text-center lg:text-left text-[#ede9cf] max-w-xl'>
                        Sustainable Architecture: The Future of Green Building
                    </TextAnimate>
                </div>
                <div className='h-full w-full relative'>
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={'/4mDy69ld7kd0xOcgkPtdJDBmMOI.mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className=' bg-[rgb(129,201,149)] text-[#0c652d] px-4 lg:px-16 py-28'>
                <TextAnimate animation="slideLeft" className=' text-[50px] font-bold max-w-2xl tracking-[-2.2px] text-left text-[rgb(12,101,45)]'>Sustainability main pillars for a responsible construction</TextAnimate>
                <div className="mt-24">
                    {data.map((award, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} key={index} className="  lg:grid lg:grid-cols-4 gap-6 py-6 lg:mx-10  mx-4 font-semibold border-t border-[#0c652d]">
                            <div className="col-span-1 text-[60px] tracking-[-2.2px] text-left lg:text-center text-[#0c652d]">
                                {award.id}
                            </div>
                            <div className="col-span-1 text-[50px] tracking-[-2.2px] text-left text-[#0c652d]">
                                {award.title}
                            </div>
                            <div className="col-span-2 text-[18px] tracking-[0.2px] text-left text-[#0c652d]">
                                {award.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className=' bg-[rgb(244,239,235)] py-36'>
                <TextAnimate animation="slideLeft" by="character" className=' font-bold px-4 lg:px-14 text-[70px] lg:text-[112px] tracking-[-0.04em] leading-[1.4em] text-[rgb(51,51,51)]'>Sustainability                </TextAnimate>
                <div className='grid lg:grid-cols-3 lg:px-10 gap-6 mt-10 '>
                    {articles.map((article, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} key={index} className='bg-white p-4'>
                            <div className='w-full h-[24.25rem]'>
                                <motion.img
                                    variants={imageVariants}
                                    initial='exit'
                                    whileHover='hover'
                                    animate='exit'
                                    src={article.src}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <h1 className='text-[22px] mt-5 leading-7 text-left'>{article.title}</h1>
                            <Link href='/' className='text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center'>
                                <Icons.ButtonIcon className='size-[1.12rem]' />Read
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
