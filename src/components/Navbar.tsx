'use client'

import { Icons } from '@/icons'
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
const FooterList = [

  {
    name: 'Home',
    link: '/'
  }, {
    name: 'Projects',
    link: '/project-collection'
  }, {
    name: 'About',
    link: '/about'
  },
  {
    name: 'Journal',
    link: '/journal'
  },
  {
    name: 'Sustainability',
    link: '/sustainability'
  }
]

export default function Navbar() {
  const [isMenuOpen, setisMenuOpen] = React.useState(false);
  return (
    <>
      {!isMenuOpen && <nav className=' fixed flex items-center justify-between w-full z-50 px-4 lg:px-8 py-6 '>
        <Link href='/' className=' flex items-center gap-2 '>
          <img src='/aa8c7f48-de04-4d37-98aa-da071b0809be.svg' className=' size-12' alt='svg icon '></img>
          <div className='text-[1.1875rem] leading-5 tracking-[-1.9px] text-left text-[rgb(170,136,103)]'>
            <span className=' font-semibold'>OAKWOOD</span>
            <br></br>
            <span className='font-thin'>
              ARCHITECTS
            </span>
          </div>
        </Link>
        <div className=' flex  items-center justify-center'>
          <button onClick={() => setisMenuOpen(true)} className='z-10 flex items-center justify-center gap-2 rounded-[22px] py-3 px-6  font-semibold text-white hover:bg-[rgb(112,79,46)] bg-[rgb(170,136,103)] text-[14px] text-center fill-white ]   '>
            <Icons.ButtonIcon className=' size-5' ></Icons.ButtonIcon>
            Menu
          </button>
        </div>
      </nav>}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          initial={{ opacity: 0,y:'-100%' }}
          animate={{opacity:1,y:'0%'}}
          transition={{duration:0.7, ease:'easeInOut',stiffness:100}}
          exit={{ opacity: 0,y:'-100%' }}
          className="z-50 fixed left-0 top-0 w-full h-screen bg-[#3d342b] ">
            <div className='flex items-center justify-end w-full z-50 px-8 py-8' >
              <button
                onClick={() => setisMenuOpen(false)}
                className="z-10  flex items-center justify-center gap-2 rounded-[22px] py-2.5 px-10 font-medium text-white hover:bg-[rgb(112,79,46)] bg-[rgb(170,136,103)] text-[14px] text-center"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="lg:grid lg:grid-cols-3 h-full">
              <div className="border-r border-[rgba(170,136,103,0.3)] p-4 lg:p-10">
                <div className="text-[rgb(170,136,103)] ">
                  <p className=' text-xs'><span className=' text-lg'>© 2024</span><br></br> Aurum Company. All rights reserved.</p>
                </div>
                <div className="relative flex mt-5 flex-col items-center justify-center w-[310px] h-[184px] overflow-hidden rounded-[16px]">
                  {/* Background Image */}
                  <img
                    src="/xY2ltysjjeDPAv2h8IdjICqEio_1.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Centered Button */}
                  <a
                    href='/project-collection/the-meadow-house'
                    className="relative flex items-center justify-center gap-2 bg-[rgb(237,233,207)] rounded-[22px] py-3 px-6 text-[14px] font-medium text-[rgb(102,79,53)] fill-[rgb(102,79,53)] 
               hover:bg-[rgb(170,136,103)] hover:text-white hover:fill-white"
                  >
                    <Icons.ButtonIcon className="size-5" />
                    Get Started
                  </a>
                </div>

              </div>
              <div className=" border-r border-[rgba(170,136,103,0.3)] p-5 lg:p-24">
                {
                  FooterList.map((item, index) => (
                    <a href={item.link} key={index} className='my-3 lg:my-5 group hover:text-[#ede9cf] ease-in-out duration-500 flex gap-2 items-center  text-4xl lg:text-[42px] font-extralight text-[rgb(170,136,103)]'>
                      <ArrowRight className=' hidden group-hover:block    size-11' />
                      <span className='group-hover:text-[#ede9cf] group-hover:translate-x-2 ease-in-out duration-500'>
                        {item.name}
                      </span>
                    </a>
                  ))
                }
              </div>
              <div className=" flex  lg:flex-col  h-full ">
                <div className=' h-1/2 px-10 py-16'>
                  <p className='text-[rgb(170,136,103)] text-sm mb-3'> Social</p>
                  <div className=' flex gap-6 items-center '>
                    <a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.facebook className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.linkedin className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.Instagram className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.twitter className=' size-6' /></a>
                  </div>
                </div>
                <div className='h-1/2 ml-5 pt-6 border-t border-[rgba(170,136,103,0.3)]'>
                  <div className="w-full gap-x-4 text-[rgb(170,136,103)]">
                    <div className=' flex flex-col gap-1'>
                      <p className='text-sm '>CONTACT US</p>
                      <p>76-86 Manners Street</p>
                      <p className=' text-lg'>Wellington 6140, New Zealand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
