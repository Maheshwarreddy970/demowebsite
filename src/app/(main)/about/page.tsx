'use client'

import { Icons } from '@/icons'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
    { src: '/RuMqGgeq1yJlrDGasQTyq8Ii9I.avif', x: ['0%', '-70%'], y: ['0%', '-80%'], scale: 0.4 },
    { src: '/crJj3iMRi3dvubY72RgxD8cqk.webp', x: ['0%', '-130%'], y: ['0%', '-50%'], scale: 0.5 },
    { src: '/a05ujhizOPDPooqqTlXCk6gkRI.webp', x: ['0%', '-100%'], y: ['0%', '20%'], scale: 0.6 },
    { src: '/Vxz3I7vSm7BfUriKNWDn6GkGDU.avif', x: ['0%', '-50%'], y: ['0%', '70%'], scale: 0.3 },
    { src: '/j0euBdQBaziuZU28aRIRCvaX28.webp', x: ['0%', '70%'], y: ['0%', '-90%'], scale: 0.3 },
    { src: '/6mVf040uObmMYQk0MdjLSZvyx6U.avif', x: ['0%', '130%'], y: ['0%', '-30%'], scale: 0.7 },
    { src: '/OrrgufLqjfZi9vZsEUQQEHmWXLA.avif', x: ['0%', '40%'], y: ['0%', '70%'], scale: 0.4 },
    { src: '/DErGBXCKfVwGZjfxm4iDjYawu9s.avif', x: ['0%', '100%'], y: ['0%', '40%'], scale: 0.5 },
  ];

export default function page() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const imageVariants = {
      hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
      exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };
    const scalecenter = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const opacitycenter = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
    return (
        <section>
            <div className=' w-full bg-[rgb(102,79,53)]  grid grid-cols-2 h-screen '>
                <div className=' flex flex-col gap-28 pl-20 justify-center'>

                    <h1 className='text-[64px] tracking-[-1.5px] font-semibold  leading-[1.1em] text-left text-[#ede9cf] max-w-xl'>
                        About Oakwood Architects: Crafting Spaces with Purpose
                    </h1>
                </div>
                <div className='h-full w-full relative'>
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={'/DY5dR7Wi0DX9fN3jKADiooH30 (3).mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <section className='flex flex-col  bg-white overflow-hidden  gap-6   w-full h-min py-[9rem] pr-[5rem] pl-[10rem]  mx-auto relative'>
                <div className=" font-semibold max-w-xl text-[112px] tracking-[-6.8px] leading-[1em] text-left text-[rgb(170,136,103)]"
                >
                    Our talented
                    team
                </div>
                <p className='text-[24px] font-medium max-w-2xl pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>
                    A world-class team of architects, designers, and visionaries dedicated to creating timeless, innovative spaces around the globe.
                </p>
                <div className="grid grid-cols-7">
                    <div className="col-span-4 mt-14 group">
                        <img src='/TENqsYWRqz8AtyaU1tq6ttYQLqs.avif' className=' object-cover w-full pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className="col-span-3 group p-4">
                        <div className=' mt-10'>
                            <img src='/T9DhxklqlCELPRaNFy0te6cDMec.avif' className='w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>
                        <div className=' flex flex-col gap-6 mt-32'>
                            <div className="flex items-center gap-5 justify-start">
                                <img
                                    src="/4b82a821-5705-4ea8-be11-a60951a0bebe.svg"
                                    alt="icon"
                                    className="size-7"
                                />
                                <h1 className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(170,136,103)]">
                                    Diversity of Expertise
                                </h1>
                            </div>
                            <p className='text-[24px] pr-7 font-semibold tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>Highlights of cases that we passionately built
                                with forward- thinking clients and friends over
                                the years.
                            </p>
                            <div className=' mt-5 flex  items-center justify-start'>
                                <a className='z-10 flex items-center justify-center gap-2 rounded-[22px] py-3 px-6  font-semibold text-white hover:bg-[rgb(112,79,46)] bg-[rgb(170,136,103)] text-[14px] text-center fill-white ]   '>
                                    <Icons.ButtonIcon className=' size-5' ></Icons.ButtonIcon>
                                    Meet Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                <div ref={ref} className='h-[400vh] relative'>
                    <div className='h-screen sticky overflow-hidden top-0 flex items-center justify-center'>
                        {images.map((pos, index) => {
                            const x = useTransform(scrollYProgress, [0, 1], pos.x);
                            const y = useTransform(scrollYProgress, [0, 1], pos.y);
                            const scale = useTransform(scrollYProgress, [0, 1], [1, pos.scale]);
                            return (
                                <motion.div key={index} style={{ scale, x, y }} className=' z-40 absolute h-[27rem] w-[27rem] overflow-hidden'>
                                    <img className='object-cover h-full w-full' src={pos.src} alt='image' />
                                </motion.div>
                            );
                        })}
                        <motion.div
                            style={{ scale: scalecenter, opacity: opacitycenter }}
                            transition={{ duration: 0.5, ease: 'easeInOut', stiffness: 200, type: 'spring' }}
                            className='w-[27rem]' >
                            <h1 className=' text-[66px] font-bold tracking-[-0.01em] leading-[1em] text-center text-[rgb(102,79,53)]'>Designing Excellence
                                Worldwide</h1>
                            <p className='tracking-[-0.02em] font-semibold text-center text-wrap  mt-5 text-[rgb(170,136,103)] '>A global leader in high-end architecture, known for our commitment to excellence, sustainability, and transformative designs that inspire and endure.</p>
                        </motion.div>
                    </div>
                </div>
        </section>
    )
}
