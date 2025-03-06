'use client'

import React, { useRef } from 'react'

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { TextAnimate } from '@/components/ui/text-animate';

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
const awards = [
    {
        id: "01",
        title: "2023 AIA Architecture Award",
        description: "Recognized for innovative design of the Eco-Friendly Urban Housing Project.",
    },
    {
        id: "02",
        title: "RIBA Stirling Prize",
        description: "Given by the Royal Institute of British Architects for the best new building in the UK.",
    },
    {
        id: "03",
        title: "Elle Decor International Design Awards",
        description: "Celebrates exceptional interior design across various categories.",
    }
];


const approaches = [
    {
        id: 1,
        title: "The Human-Centric Approach",
        description:
            "Our team is passionate about creating spaces that enrich lives. With a deep understanding of human needs and desires, we design environments that inspire and connect.",
    },
    {
        id: 2,
        title: "The Design Philosophy Approach",
        description:
            "We believe architecture is a powerful tool for positive change. Our designs are rooted in sustainability, functionality, and aesthetic excellence.",
    },
    {
        id: 3,
        title: "The Impact-Driven Approach",
        description:
            "Our designs go beyond aesthetics. We strive to create spaces that enhance people&apos;s lives and contribute to a sustainable future.",
    },
];

// Component name must start with uppercase letter
export default function Page() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });

    const scalecenter = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const opacitycenter = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section>
            <div className=' w-full bg-[rgb(102,79,53)]  grid lg:grid-cols-2 h-screen '>
                <div className=' flex flex-col gap-28 lg:pl-20 justify-center'>

                    <TextAnimate animation="slideLeft" className='text-[64px] tracking-[-1.5px] font-semibold mx-auto  leading-[1.1em] text-center lg:text-left text-[#ede9cf] max-w-xl'>
                        About Oakwood Architects: Crafting Spaces with Purpose
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
            <section className='flex flex-col  bg-white overflow-hidden  gap-6   w-full h-min py-[9rem] lg:pr-[5rem] lg:pl-[10rem]  mx-auto relative'>
                <TextAnimate animation="slideLeft" className=" px-4 lg:px-0 font-semibold max-w-xl text-6xl lg:text-[112px]  tracking-wide lg:tracking-[-6.8px] leading-[1em] text-left text-[rgb(170,136,103)]"
                >
                    Our talented
                    team
                </TextAnimate>
                <TextAnimate animation="slideLeft" className=' px-4 lg:px-0 text-[24px] font-medium max-w-2xl pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>
                    A world-class team of architects, designers, and visionaries dedicated to creating timeless, innovative spaces around the globe.
                </TextAnimate>
                <div className="lg:grid lg:grid-cols-7">
                    <div className="col-span-4 mt-14 group">
                        <img width={50} height={50} alt='sofa' src='/TENqsYWRqz8AtyaU1tq6ttYQLqs.avif' className=' object-cover w-full lg:pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className="lg:col-span-3 group p-4">
                        <div className=' flex flex-col gap-6 mt-10'>
                            <div className="flex items-center gap-5 justify-start">
                                <img width={50} height={50}
                                    src="/4b82a821-5705-4ea8-be11-a60951a0bebe.svg"
                                    alt="icon"
                                    className="size-7"
                                />
                                <TextAnimate animation="slideLeft" by="character" className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(170,136,103)]">
                                    Our Belief
                                </TextAnimate>
                            </div>
                            <TextAnimate animation="slideLeft" className='text-[20px] pr-7 font-semibold tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>
                                we believe that architecture is more than just structures; it&apos;s about crafting experiences and shaping environments.
                            </TextAnimate>
                        </div>
                        <div className=' mt-60'>
                            <img width={50} height={50} src='/q01CbGPUmMmrTo4Ik80tuXaiIgE.avif' className='w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>

                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-7">
                    <div className="col-span-3 group p-4">
                        <div className='mt-20 lg:mt-[40rem]'>
                            <img width={50} height={50} src='/T9DhxklqlCELPRaNFy0te6cDMec.avif' className='lg:pr-20 w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>
                    </div>
                    <div className="lg:col-span-4 mt-36 group lg:flex  lg:flex-col p-4  lg:items-end">
                        <img width={50} height={50} alt='sofa' src='/H8faO2ICSTlF8flEidDi0Qy7fmw.avif' className=' object-cover w-full  lg:w-[80%]  '></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-7 mt-24">
                    <div className="col-span-4 mt-14 group">
                        <img width={50} height={50} alt='sofa' src='/iThY0qNZ007ssbLlaoHSFgFwPYY.avif' className=' object-cover w-full lg:pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className="col-span-3 group p-4">
                        <div className=' flex flex-col gap-6 mt-10'>
                            <div className="flex items-center gap-5 justify-start">
                                <img width={50} height={50}
                                    src="/4b82a821-5705-4ea8-be11-a60951a0bebe.svg"
                                    alt="icon"
                                    className="size-7"
                                />
                                <TextAnimate animation="slideLeft" by="character" className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(170,136,103)]">
                                    Focus on sustainability
                                </TextAnimate>
                            </div>
                            <TextAnimate animation="slideLeft" className='text-[20px] lg:pr-7 font-semibold tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>
                                With a focus on sustainability, functionality, and aesthetic appeal, we strive to exceed expectations in every aspect of our work.
                            </TextAnimate>
                        </div>
                        <div className=' mt-20 lg:mt-96'>
                            <img width={50} height={50} src='/T9DhxklqlCELPRaNFy0te6cDMec.avif' className='w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>

                    </div>
                </div>
            </section>
            <div className=" px-5 lg:px-[60px] py-36 bg-[#ede9cf]">
                <div className='  lg:px-20'>
                    <TextAnimate animation="slideLeft" className=' font-semibold text-7xl lg:text-[112px] tracking-[-2.6px] leading-[1em] text-left text-[#aa8867]'>Our Approach</TextAnimate>
                    <TextAnimate animation="slideLeft" className=' mt-8 lg:mt-3 font-semibold text-left text-[#aa8867] lg:pl-5 text-3xl max-w-4xl'>At Oakwood Architects, we believe that design should be both functional and inspiring. </TextAnimate>
                </div>
                <div className=' lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20'>
                    {
                        approaches.map((approach, index) => (
                            <motion.div
                                viewport={{ once: true }} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} className='bg-[#664f35] py-8 px-12  w-full' key={approach.id}>
                                <h1 className='text-[11rem] font-bold text-[#ede9cf]'>{approach.id}</h1>
                                <h1 className='text-[24px] text-[#ede9cf]'>{approach.title}</h1>
                                <p className='text-[rgb(204,161,118)] mt-2 '>{approach.description}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
            <div className="bg-[#3e362e] py-[160px] px-4 lg:px-[40px]">
                <TextAnimate animation="slideLeft" className=' mx-auto max-w-xl ml-0 lg:ml-20  font-bold   text-[4rem] lg:text-8xl text-left text-[rgb(170,136,103)]'>Awards and
                    Recognition</TextAnimate>
                <AnimatedLogoCloud></AnimatedLogoCloud>
                <div className="mt-24">
                    {awards.map((award, index) => (
                        <motion.div
                            viewport={{ once: true }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeInOut', type: 'spring', stiffness: 200 }} key={award.id} className="lg:grid lg:grid-cols-4 gap-6 py-6 lg:mx-10  mx-4 font-semibold border-t border-[rgb(170,136,103)]">
                            <div className="col-span-1 text-[60px] tracking-[-2.2px] text-left lg:text-center text-[rgb(170,136,103)]">
                                {award.id}
                            </div>
                            <div className="col-span-1 text-[50px] tracking-[-2.2px] text-left text-[rgb(170,136,103)]">
                                {award.title}
                            </div>
                            <div className="col-span-2 text-[18px] tracking-[0.2px] text-left text-[rgb(170,136,103)]">
                                {award.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div ref={ref} className='h-[400vh] relative'>
                <div className='h-screen sticky overflow-hidden top-0 flex items-center justify-center'>
                    {images.map((pos, index) => {
                        return (
                            <MovingImage key={index} src={pos.src} xRange={pos.x} yRange={pos.y} scaleRange={pos.scale} scrollYProgress={scrollYProgress} />
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

const logos = [
    {
        name: 'Vercel',
        url: '427fa326-b014-4938-9c77-4916aec8dade.svg',
    },
    {
        name: 'Nextjs',
        url: 'cfbf7305-dab6-43f6-b82f-04638740642b.svg',
    },
    {
        name: 'Prime',
        url: 'e65bbfbb-df3d-4500-a847-7e6589a356e3.svg',
    }

]

const AnimatedLogoCloud = () => {
    return (
        <div className="w-full py-12">
            <div className="mx-auto w-full px-4 md:px-8">
                <div
                    className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                    style={{
                        maskImage:
                            'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                    }}
                >
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={i} // Ensure each outer div has a unique key
                            className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                        >
                            {logos.map((logo) => (
                                <div key={logo.name} className='bg-[rgb(170,136,103)] p-12 flex items-center h-[213px] justify-center relative w-[213px] '>
                                    <img width={50} height={50}
                                        src={logo.url}
                                        className="brightness-0  w-full dark:invert"
                                        alt={`${logo.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


function MovingImage({ src, xRange, yRange, scaleRange, scrollYProgress }: { src: string; xRange: string[]; yRange: string[]; scaleRange: number; scrollYProgress: MotionValue<number>; }) {
    const x = useTransform(scrollYProgress, [0, 1], xRange);
    const y = useTransform(scrollYProgress, [0, 1], yRange);
    const scale = useTransform(scrollYProgress, [0, 1], [1, scaleRange]);

    return (
        <motion.div style={{ scale, x, y }} className="absolute z-40 h-[27rem] w-[27rem] overflow-hidden">
            <img width={50} height={50} className="object-cover h-full w-full" src={src} alt="image" />
        </motion.div>
    );
}