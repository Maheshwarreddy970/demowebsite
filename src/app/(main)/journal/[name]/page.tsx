"use client";

import React from "react";
import data from "@/lib/data.json";
import { useParams } from "next/navigation";
import { Icons } from "@/icons";
import { TextAnimate } from "@/components/ui/text-animate";
import {motion} from 'framer-motion'

export default function ProjectPage() {
    const params = useParams();
    const name = params?.name as string;

    const project = data.journal.find((p) => p.name === name);

    if (!project) {
        return <div className="text-center p-10">Project not found</div>;
    }
    const articles = [
        {
            src: '/istockphoto-1405772777-612x612.jpg',
            title: 'The concept of biophilia—human beings\' inherent connection to nature.',
            href: '/journal/the-meadow-house'
        },
        {
            src: '/xY2ltysjjeDPAv2h8IdjICqEio_1.png',
            title: 'Smart Homes and Buildings: Integrating Technology and Design',
            href: '/journal/the-meadow-house'
        },
        {
            src: '/TTdNsUIJ7hNa3fW196hmNHfRznM.png',
            title: 'Wellness-Centric Design: Creating Healthy Interiors',
            href: '/journal/the-meadow-house'
        },
        {
            src: '/EiUmdEKgrLMDVFEeDQe8g5U30qw.avif',
            title: 'Cultural Heritage and Interior Design: Preserving History',
            href: '/journal/the-meadow-house'
        },
        {
            src: '/TGWC6CjvhGXPWkoNVDyxCmm3Ws.avif',
            title: 'The Future of Workspaces: Trends and Innovations',
            href: '/journal/the-meadow-house'
        },
        {
            src: '/LplpVPUpxDHnVTfRW8XsfQNw.avif',
            title: 'Sustainable Spaces: Eco-Friendly Design Solutions',
            href: '/journal/the-meadow-house'
        },
    ];
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <>

            <section className="p-6 max-w-4xl mx-auto pt-56">
                <h1 className="text-[#333333] font-bold text-5xl text-center mb-10">{project.title}</h1>
                <img src={project.img} alt={project.title} className="w-full h-auto rounded-md mb-9" />
                {project.smartHomesAndBuildings.map((topic, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-[#333333] font-extrabold text-2xl my-6">{topic.title}</h2>
                        <ul className="space-y-4">
                            {topic.sections.map((section, secIndex) => (
                                <li key={secIndex} className="text-[#333333] font-bold text-[18px]">
                                    {section.name} :
                                    <span className="text-[#333333] font-normal  ml-2">{section.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <div className='  flex flex-col gap-3 py-[9.75rem] px-[2.5rem]'>
                <TextAnimate animation="slideLeft" by="character" className='text-[112px] ml-20  tracking-[-6.8px] leading-[1em] text-[#4a3e32] font-bold '>Explore More</TextAnimate>
                <div className='grid lg:grid-cols-3 px-10 gap-6 mt-10'>
                    {articles.map((article, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} key={index} className='bg-white p-4'>
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
                            <a href={article.href} className='text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center'>
                                <Icons.ButtonIcon className='size-[1.12rem]' />Read
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
