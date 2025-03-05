"use client";

import { Icons } from '@/icons';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TextRotate } from './TextRotate';
import AnimatedLogoCloud from './AnimatedLogoCloud';
import  data from '@/lib/data.json';
import { TextAnimate } from './ui/text-animate';

export default function ProjectPage({
    project,
    onBack,
}: {
    project: {
        name: string;
        title: string;
        titleimg: string[];
        lines: string[];
        images: string[];
    };
    onBack: () => void;
}) {
   

    const { title, titleimg, lines, images } = project;
    const renderAlternating = images.length === lines.length;

    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 w-full h-full bg-white overflow-y-auto"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className=" fixed border shadow-xl border-black top-4 left-4 z-10 p-2  bg-gray-200 rounded-full hover:bg-gray-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Project Content */}
            <section className="w-full min-h-screen flex flex-col">
                <div className="w-full bg-[#664f35] grid grid-cols-2 h-screen">
                    <div className="flex flex-col gap-28 pl-20 justify-center">
                        <h1 className="text-[90px] font-semibold leading-[1.2em] tracking-[-4px] text-left text-[#aa8867] max-w-xl">
                            {title}
                        </h1>
                    </div>
                    <div className="h-full w-full relative">
                        <img width={50}
                            height={50}
                            alt="logo"
                            className="absolute left-0 top-0 w-full h-full object-cover"
                            src={titleimg[0]}
                        />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-20 flex-col flex gap-20 py-10">
                    {renderAlternating ? (
                        lines.map((line, index) => (
                            <div key={index} className="mb-6">
                                <img width={50}
                                    height={50}
                                    src={images[index]}
                                    className="w-full rounded-lg mb-4"
                                    alt={`Project Image ${index + 1}`}
                                />
                                <p className="text-lg text-[#333333] font-semibold mt-2">{line}</p>
                            </div>
                        ))
                    ) : images.length > lines.length ? (
                        images.map((img, index) => (
                            <div key={index} className="mb-6">
                                <img width={50}
                                    height={50}
                                    src={img}
                                    className="w-full rounded-lg mb-4"
                                    alt={`Project Image ${index + 1}`}
                                />
                                {lines[index] && (
                                    <p className="text-lg mt-2 text-[#333333] font-semibold">
                                        {lines[index]}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <>
                            {lines.map((line, index) => (
                                <p
                                    key={index}
                                    className="text-lg text-[#333333] font-semibold mb-4"
                                >
                                    {line}
                                </p>
                            ))}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {images.map((img, index) => (
                                    <img width={40} height={40}

                                        key={index}
                                        src={img}
                                        className="w-full rounded-lg"
                                        alt={`Project Image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
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
                <section className="bg-[#664f35] pb-20">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-[112px] font-semibold tracking-[-1.4px] leading-[1em] text-center text-white">
                            Crafting Spaces for
                        </h1>
                        <TextRotate />
                    </div>
                    <AnimatedLogoCloud />
                </section>
            </section>
        </motion.div>
    );
}


