'use client'

import { Icons } from '@/icons';
import React from 'react'
import { TextAnimate } from '../ui/text-animate';
import { TextRotate } from '../TextRotate';
import { AnimatedImagesCloud } from '../AnimatedImagesCloud';

export default function Team() {
    return (
        <>
            <section className=' flex flex-col  bg-white overflow-hidden  gap-6   w-full h-min py-[9rem] lg:pr-[5rem] lg:pl-[10rem]  mx-auto relative'>
                <TextAnimate animation="slideLeft"  className="px-4 lg:px-0 font-semibold max-w-xl text-6xl md:text-[112px] md:tracking-[-6.8px] md:leading-[1em] text-left text-[rgb(170,136,103)]"
                >
                    Our talented
                    team
                </TextAnimate>
                <TextAnimate animation="slideLeft" className='px-4 lg:px-0 text-[24px] font-medium max-w-2xl pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>
                    A world-class team of architects, designers, and visionaries dedicated to creating timeless, innovative spaces around the globe.
                </TextAnimate>
                <div className="lg:grid px-4 lg:px-0 lg:grid-cols-7">
                    <div className="col-span-4 mt-14 group">
                        <img width={50} height={50} alt='sofa' src='/TENqsYWRqz8AtyaU1tq6ttYQLqs.avif' className=' object-cover w-full lg:pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className=" w-full lg:col-span-3 group p-4">
                        <div className=' mt-10'>
                            <img width={50} height={50} src='/T9DhxklqlCELPRaNFy0te6cDMec.avif' className='w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>
                        <div className=' flex flex-col gap-6 mt-32'>
                            <div className="flex items-center gap-5 justify-start">
                                <img width={50} height={50}
                                    src="/4b82a821-5705-4ea8-be11-a60951a0bebe.svg"
                                    alt="icon"
                                    className="size-7"
                                />
                                <TextAnimate animation="slideLeft" by="character" className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(170,136,103)]">
                                    Diversity of Expertise
                                </TextAnimate>
                            </div>
                            <TextAnimate animation="slideLeft" by="word" className='text-[24px] pr-7 font-semibold tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>Highlights of cases that we passionately built
                                with forward- thinking clients and friends over
                                the years.
                            </TextAnimate>
                            <div className=' mt-5 flex  items-center justify-start'>
                                <a href='/about' className='z-10 flex items-center justify-center gap-2 rounded-[22px] py-3 px-6  font-semibold text-white hover:bg-[rgb(112,79,46)] bg-[rgb(170,136,103)] text-[14px] text-center fill-white ]   '>
                                    <Icons.ButtonIcon className=' size-5' ></Icons.ButtonIcon>
                                    Meet Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=' bg-[#664f35] pt-36 overflow-hidden'>
                <div className=' flex flex-col gap-6 '>
                    <TextAnimate animation="slideLeft" className=' text-6xl md:text-[112px] font-semibold tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</TextAnimate>
                    <TextRotate></TextRotate>
                </div>
                <AnimatedImagesCloud></AnimatedImagesCloud>
            </section>
        </>
    )
}
