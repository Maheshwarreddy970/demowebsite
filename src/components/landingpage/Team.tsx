'use client'

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

export default function Team() {
    return (
        <>
            <section className='flex flex-col  bg-white overflow-hidden gap-[100px]   w-full h-min py-[3.7rem] pr-[5rem] pl-[10rem]  mx-auto relative'>
                <div className="text-[112px] tracking-[-6.8px] leading-[1em] text-left text-[rgb(170,136,103)]"
                >
                    Our talented
                    team
                </div>
                <p className='text-[24px] pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>Highlights of cases that we passionately built
                    with forward- thinking clients and friends over
                    the years.
                </p>
                <div className="grid grid-cols-7">
                    <div className="col-span-4 mt-14 group">
                        <img src='/TENqsYWRqz8AtyaU1tq6ttYQLqs.avif' className=' object-cover w-full pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className="col-span-3 group p-4">
                        <div className=' mt-80'>
                            <img src='/T9DhxklqlCELPRaNFy0te6cDMec.avif' className='w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>
                        <div className=' flex flex-col gap-6'>
                            <div className="flex items-center gap-6 justify-start">
                                <img
                                    src="/4b82a821-5705-4ea8-be11-a60951a0bebe.svg"
                                    alt="icon"
                                    className="size-7"
                                />
                                <h1 className="text-[24px] font-medium tracking-[-1px] text-left text-[rgb(170,136,103)]">
                                    Diversity of Expertise
                                </h1>
                            </div>
                            <p className='text-[24px] pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>Highlights of cases that we passionately built
                                with forward- thinking clients and friends over
                                the years.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className=' bg-[#664f35] pt-36'>
                <div className=' flex flex-col gap-6'>
                    <h1 className=' text-[112px] tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</h1>
                    <TextRotate></TextRotate>
                </div>
                <AnimatedLogoCloud></AnimatedLogoCloud>
            </section>
        </>
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
