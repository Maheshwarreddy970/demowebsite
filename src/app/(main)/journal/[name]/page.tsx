"use client";

import React from "react";
import data from "@/lib/data.json";
import { useParams } from "next/navigation";
import { Icons } from "@/icons";
import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from 'framer-motion'

export default function ProjectPage() {
    const params = useParams();
    const name = params?.name as string;

    const project = data.ExploreJournal.journal.find((p) => p.name === name);

    if (!project) {
        return <div className="text-center p-10">Project not found</div>;
    }
 
    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    return (
        <>

            <section className="p-6 max-w-4xl mx-auto pt-56">
                <h1 className="text-[#333333] font-bold text-5xl text-center mb-10">{project.title}</h1>
                <img width={50} height={50} src={project.titleimg} alt={project.title} className="w-full h-auto rounded-md mb-9" />
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
            <div className='  flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem]'>
                <TextAnimate animation="slideLeft" by="character" className='text-[112px] ml-0 lg:ml-20  tracking-[-6.8px] leading-[1em] text-[#4a3e32] font-bold '>Explore More</TextAnimate>
                <div className='grid lg:grid-cols-3 lg:px-10 gap-6 mt-10'>
                    {data.ExploreJournal.journal.map((article, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} key={index} className='bg-white p-4'>
                            <div className='w-full h-[24.25rem]'>
                                <motion.img
                                    variants={imageVariants}
                                    initial='exit'
                                    whileHover='hover'
                                    animate='exit'
                                    src={article.titleimg}
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
