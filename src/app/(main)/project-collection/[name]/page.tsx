"use client";

import { Icons } from '@/icons';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import data from "@/lib/data.json";
import { useParams } from "next/navigation";

export default function ProjectPage() {
    const articles = [
        {
            src: '/crJj3iMRi3dvubY72RgxD8cqk.webp',
            title: 'Wellness-Centric Design: Creating Healthy Interiors',
        },
        {
            src: '/Xxzi8lPZjp9LJOmoIlJFSej1TEY.avif',
            title: 'Wellness-Centric Design: Creating Healthy Interiors',
        },
        {
            src: '/interior-design-3564955_1280.jpg',
            title: 'Wellness-Centric Design: Creating Healthy Interiors',
        },
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
        },
    ];

    const params = useParams();
    const name = params?.name as string;

    const project = data.projects.find((p) => p.name === name);

    if (!project) {
        return <div className="text-center p-10">Project not found</div>;
    }

    const { title, titleimg, lines, images } = project;
    const renderAlternating = images.length === lines.length;
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <>
            <section>
                <div className="w-full bg-[#664f35] grid grid-cols-2 h-screen">
                    <div className="flex flex-col gap-28 pl-20 justify-center">
                        <h1 className="text-[90px] font-semibold leading-[1.2em] tracking-[-4px] text-left text-[#aa8867] max-w-xl">
                            {title}
                        </h1>
                    </div>
                    <div className="h-full w-full relative">
                        <img className="absolute left-0 top-0 w-full h-full object-cover" src={titleimg} />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-20 flex-col flex gap-20 py-10">
                    {renderAlternating ? (
                        lines.map((line, index) => (
                            <div key={index} className="mb-6">
                                <img src={images[index]} className="w-full rounded-lg mb-4" alt={`Project Image ${index + 1}`} />
                                <p className="text-lg text-[#333333] font-semibold mt-2">{line}</p>
                            </div>
                        ))
                    ) : images.length > lines.length ? (
                        images.map((img, index) => (
                            <div key={index} className="mb-6">
                                <img src={img} className="w-full rounded-lg mb-4" alt={`Project Image ${index + 1}`} />
                                {lines[index] && <p className="text-lg mt-2 text-[#333333] font-semibold">{lines[index]}</p>}
                            </div>
                        ))
                    ) : (
                        <>
                            {lines.map((line, index) => (
                                <p key={index} className="text-lg text-[#333333] font-semibold mb-4">{line}</p>
                            ))}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {images.map((img, index) => (
                                    <img key={index} src={img} className="w-full rounded-lg" alt={`Project Image ${index + 1}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section>
                <div className='bg-[#664f35] flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem]'>
                    <h1 className='text-[112px] font-semibold tracking-[-6.8px] leading-[1em] text-[rgb(170,136,103)] text-center'>Project Collection</h1>
                    <div className='grid lg:grid-cols-3 px-10 gap-8 mt-28'>
                        {articles.map((article, index) => (
                            <div key={index} className='bg-[rgb(170,136,103)] p-4'>
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

                </div>
                <section className=' bg-[#664f35]  pb-20'>
                    <div className=' flex flex-col gap-6 '>
                        <h1 className=' text-[112px] font-semibold tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</h1>
                        <TextRotate></TextRotate>
                    </div>
                    <AnimatedLogoCloud></AnimatedLogoCloud>
                </section>
            </section>
        </>
    );
}


const text = ['Hospitality', 'Showroom', 'Offices']

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
