'use client'

import { Icons } from '@/icons';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const articles = [
    {
        src: '/istockphoto-1405772777-612x612.jpg',
        title: 'The concept of biophilia—human beings\' inherent connection to nature.',
    },
    {
        src: '/xY2ltysjjeDPAv2h8IdjICqEio_1.png',
        title: 'Smart Homes and Buildings: Integrating Technology and Design',
    },
    {
        src: '/TTdNsUIJ7hNa3fW196hmNHfRznM.png',
        title: 'Wellness-Centric Design: Creating Healthy Interiors',
    }
];

export default function page() {
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <section>
            <div className=' w-full bg-[#aa8867] grid grid-cols-2 h-screen '>
                <div className=' flex flex-col gap-28 pl-20 justify-center'>
                    <div className=' flex items-center gap-2 '>
                        <img src='/b79bf2b3-bd8b-410f-8022-7be6172fe960.svg' className=' size-24' alt='svg icon '></img>
                        <div className='text-[1.75rem] text-[rgb(62,54,46)] tracking-tightest leading-none'>
                            <span className=' font-semibold'>OAKWOOD</span>
                            <br></br>
                            <span className='font-thin'>
                                ARCHITECTS
                            </span>
                        </div>
                    </div>
                    <h1 className=' text-[66px] leading-[1.2em] tracking-[-2px] text-left text-[rgb(62,54,46)] max-w-2xl'>Where housing innovation is shaped.</h1>
                </div>
                <div className='h-full w-full relative'>
                    <img className='  absolute left-0 top-0 w-full h-full object-cover   ' src='bWFZ6VKV9dQV7yjOspAjXxx0D4.avif'></img>
                </div>
            </div>
            <div className='bg-[#3e362e] flex flex-col gap-3 py-[9.75rem] px-[2.5rem]'>
                <h1 className='text-[112px] tracking-[-6.8px] leading-[1em] text-[#AA8867] text-center'>Explore Journal</h1>
                <p className='text-[1.5rem] max-w-2xl mx-auto tracking-[-0.0375rem] text-center text-[rgb(170,136,103)]'>
                    Highlights of cases that we passionately built with forward-thinking clients and friends over the years.
                </p>
                <div className='grid lg:grid-cols-3 px-10 gap-6 mt-10'>
                    {articles.map((article, index) => (
                        <div key={index} className='bg-white p-4'>
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
                            <a href='/' className='text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center'>
                                <Icons.ButtonIcon className='size-[1.12rem]' />Read
                            </a>
                        </div>
                    ))}
                </div>
                <div className=' flex  items-center justify-center'>
                    <a className='z-10 flex items-center justify-center gap-2 rounded-[22px] py-3 px-6  font-medium text-white hover:bg-[rgb(112,79,46)] bg-[rgb(170,136,103)] text-[14px] text-center fill-white ]   '>
                        <Icons.ButtonIcon className=' size-5' ></Icons.ButtonIcon>
                        Explore More
                    </a>
                </div>
            </div>
            <section className=' bg-[#664f35] pt-36'>
                <div className=' flex flex-col gap-6'>
                    <h1 className=' text-[112px] tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</h1>
                    <TextRotate></TextRotate>
                </div>
                <AnimatedLogoCloud></AnimatedLogoCloud>
            </section>
        </section>
    )
}


const text = ['Hospitality','Showroom', 'Offices']

const TextRotate = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((state) => {
                if (state >= text.length - 1) return 0
                return state + 1
            })
        }, 2000)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="relative flex w-full items-center justify-center text-center">
            <AnimatePresence>
                <motion.div
                    className="absolute text-[47px] tracking-[-1.4px] text-center text-[rgb(237,233,207)]"
                    key={index}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ ease: 'easeInOut', delay: 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    {text[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const logos = [
    {
        url: '/Y1SlBye7bzROKCM4Z8mb5VbHg.avif',
    },
    {
        url: '/Vxz3I7vSm7BfUriKNWDn6GkGDU.avif',
    },
    {
        url: '/TTdNsUIJ7hNa3fW196hmNHfRznM.png',
    },
    {
        url: '/fpSz08cqO9CONW7pXT8QyafavKA_1.png',
    },
    {
        url: '/ClPv4MxK9a7IemxIhEl4txbDyA4.avif',
    },
]

const AnimatedLogoCloud = () => {
    return (
        <div className="w-full py-12">
            <div className="mx-auto w-full px-4 md:px-8">
                <div
                    className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                >
                    <motion.div
                        animate={{ translateX: '-50%' }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                        className="flex shrink-0 flex-row justify-around gap-2 pr-6"
                    >
                        {logos.map((logo, i) => (
                            <img
                                key={i}
                                src={logo.url}
                                className="h-[25rem] w-[28rem] object-cover  dark:brightness-0 dark:invert"
                                alt={'images'}
                            />
                        ))}
                        {/** second set of logo */}
                        {logos.map((logo, i) => (
                            <img
                                key={i}
                                src={logo.url}
                                className="h-[25rem] w-[28rem] object-cover  dark:brightness-0 dark:invert"
                                alt={'images'}
                            />
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
