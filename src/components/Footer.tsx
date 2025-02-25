import { Icons } from '@/icons'
import { link } from 'fs'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import React from 'react'

const FooterList = [

  {
    name: 'Home',
    link: '/'
  }, {
    name: 'Projects',
    link: '/projects'
  }, {
    name: 'About',
    link: '/about'
  },
  {
    name: 'Journal',
    link:'/journal'
  }, 
  {
    name: 'Sustainability',
    link: '/sustainability'
  }
]
export default function Footer() {
  return (
    <footer className=' px-8 pt-10 bg-[rgb(62,54,46)] w-full '>
      <div className=' grid grid-cols-2 gap-3 '>
        <div className='border border-[rgb(170,136,103)] flex flex-col px-20 py-5'>
          {
            FooterList.map((item, index) => (
              <a href={item.link} key={index} className=' group hover:text-[#ede9cf] ease-in-out duration-500 flex gap-2 items-center  text-[42px] font-extralight text-[rgb(170,136,103)]'>
                <ArrowRight className=' hidden group-hover:block    size-11' />
                <span className='group-hover:text-[#ede9cf] group-hover:translate-x-2 ease-in-out duration-500'>
                  {item.name}
                </span>
              </a>
            ))
          }
        </div>
        <div className='border  border-[rgb(170,136,103)] flex flex-col gap-10 px-6 py-8'>
          <div className=' flex gap-6 items-center '>
            <a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.facebook className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.linkedin className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.Instagram className=' size-6' /></a><a className=' bg-[rgb(102,79,53)] p-2 rounded-full flex justify-center items-center  text-white  hover:text-[rgb(102,79,53)] hover:bg-white transition-all ease-in-out duration-200 hover:scale-105'><Icons.twitter className=' size-6' /></a>
          </div>
          <div className="grid grid-cols-2 w-full gap-x-4 text-[rgb(170,136,103)]">
            <div className=' flex flex-col gap-1'>
              <p className='text-sm '>CONTACT US</p>
              <p>76-86 Manners Street</p>
              <p className=' text-lg'>Wellington 6140, New Zealand</p>
            </div>
            <div className="text-[rgb(170,136,103)] ">
              <p className=' text-xs'><span className=' text-lg'>© 2024</span><br></br> Aurum Company. All rights reserved.</p>
            </div>
          </div>
          <div className='text-[rgb(170,136,103)]'>
            <p className=' text-lg'>
              Design and developed by
            </p>
            <p className='mt-2 flex gap-1 text-3xl items-center '>
              SWT <ArrowUpRight className=' size-10' />
            </p>
          </div>
        </div>
      </div>
      <h1 className='text-[149px] tracking-[-2.7px] font-semibold leading-[1em] text-center text-[rgb(170,136,103)] mt-16'>Oakwood Architects</h1>
    </footer>
  )
}
