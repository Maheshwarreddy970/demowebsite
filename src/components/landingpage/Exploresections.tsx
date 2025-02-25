'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icons } from '@/icons';

const images = [
  { x: ['0%', '30%'], y: ['0%', '50%'] },
  { x: ['0%', '-30%'], y: ['0%', '-50%'] },
  { x: ['0%', '10%'], y: ['0%', '20%'] },
  { x: ['0%', '70%'], y: ['0%', '90%'] }
];

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

export default function ExploreSections() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const imageVariants = {
    hover: { borderRadius: 999, transition: { duration: 1, ease: 'easeInOut' } },
    exit: { borderRadius: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <section>
      <div ref={ref} className='h-[300vh] relative'>
        <div className='h-screen sticky overflow-hidden top-0 flex items-center justify-center'>
          {images.map((pos, index) => {
            const x = useTransform(scrollYProgress, [0, 1], pos.x);
            const y = useTransform(scrollYProgress, [0, 1], pos.y);
            return (
              <motion.div key={index} style={{ scale, x, y }} className='absolute h-[27rem] w-[27rem] overflow-hidden'>
                <img className='object-cover h-full w-full' src='/TTdNsUIJ7hNa3fW196hmNHfRznM.png' alt='image' />
              </motion.div>
            );
          })}
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
    </section>
  );
}
