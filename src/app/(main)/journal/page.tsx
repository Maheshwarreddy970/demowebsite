'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Icons } from '@/icons';
import React, { useRef } from 'react'
import { TextAnimate } from '@/components/ui/text-animate';


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
            <div className=' w-full bg-[rgb(102,79,53)]  lg:grid lg:grid-cols-2 overflow-hidden  h-[150vh] lg:h-screen '>
                <div className=' flex flex-col gap-28 lg:pl-20 justify-center'>
                    <TextAnimate animation="slideLeft" className='text-[64px] tracking-[-1.5px] font-semibold  leading-[1.1em] px-5 py-28 lg:px-0 lg:py-0 text-center lg:text-left text-[#ede9cf] max-w-xl'>
                        Interior Design Journal: Crafting Meaningful Spaces
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
                        <source src={'/DY5dR7Wi0DX9fN3jKADiooH30 (3).mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className=' bg-[#AA8867]  flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem]'>
                <TextAnimate animation="slideLeft" by="character" className='text-[112px] ml-0 lg:ml-20  tracking-[-6.8px] leading-[1em] text-[#4a3e32] font-bold '>Journals</TextAnimate>
                <div className='grid lg:grid-cols-3 lg:px-10 gap-6 mt-10'>
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
            <div ref={ref} className='h-[400vh] relative'>
                <div className='h-screen sticky bg-[#AA8867] overflow-hidden top-0 flex items-center justify-center'>
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
                        <h1 className=' text-[66px] font-bold tracking-[-0.01em] leading-[1em] text-center text-white'>Designing Excellence
                            Worldwide</h1>
                        <p className='tracking-[-0.02em] font-semibold text-center text-wrap  mt-5 text-white '>A global leader in high-end architecture, known for our commitment to excellence, sustainability, and transformative designs that inspire and endure.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
