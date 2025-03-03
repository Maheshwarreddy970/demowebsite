import React from 'react'
  ;
import { TextAnimate } from '../ui/text-animate';
import data from '@/lib/data.json'

export default function WorkSections() {

  return (
    <>
      <section className='flex flex-col bg-white overflow-hidden gap-[100px] w-full h-min  md:py-[3.7rem] md:pr-[5rem] md:pl-[10rem] mx-auto relative'>
        <TextAnimate
          animation="slideLeft"
          className='text-7xl pl-5 md:pl-0  md:text-[112px] mt-28 tracking-[-4px] text-left font-semibold leading-[1em] text-[rgb(170,136,103)]'
        >
          {data.workCollection.title}
        </TextAnimate>

        <div className="md:grid md:grid-cols-7 p-4 md:p-0">
          <a href={data.workCollection.projects[0].link} className="md:col-span-4 mt-14 group">
            <img width={50} height={50}
              src={data.workCollection.projects[0].titleimg[0]}
              className='h-[45rem] group-hover:block hidden object-cover w-full md:pr-20'
              alt='project'
            />
            <img width={50} height={50}
              src={data.workCollection.projects[0].titleimg[1]}
              className='h-[45rem] group-hover:hidden object-cover w-full md:pr-20'
              alt='project'
            />
            <TextAnimate
              animation="slideLeft"
              by="character"
              className='text-xl font-medium mt-2 group-hover:font-semibold'
            >
              {data.workCollection.projects[0].title}
            </TextAnimate>
          </a>

          <div className="col-span-3 group md:p-4">
            <div className='flex flex-col gap-6'>
              <div className="flex mt-20 items-center gap-6 justify-start">
                <img width={50} height={50}
                  src={data.workCollection.featured_projects.icon}
                  alt="icon"
                  className="size-7"
                />
                <TextAnimate
                  animation="slideLeft"
                  by="character"
                  className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(102,79,53)]"
                >
                  {data.workCollection.featured_projects.title}
                </TextAnimate>
              </div>
              <TextAnimate
                animation="fadeIn"
                by="line"
                as="p"
                className='text-[24px] mb-5 font-medium pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'
              >
                {data.workCollection.featured_projects.description}
              </TextAnimate>
            </div>
            <a href={data.workCollection.projects[1].link} className='mt-80 group'>
              <img width={50} height={50}
                src={data.workCollection.projects[1].titleimg[0]}
                className='hidden h-[36rem] transition-all duration-150 ease-in-out group-hover:block w-full object-cover'
                alt='project'
              />
              <img width={50} height={50}
                src={data.workCollection.projects[1].titleimg[1]}
                className='w-full group-hover:hidden h-[36rem] object-cover'
                alt='project'
              />
            </a>
            <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
              {data.workCollection.projects[1].title}
            </h1>
          </div>
        </div>

        <div className="md:grid md:grid-cols-7 p-4 md:p-0">
          <a href={data.workCollection.projects[2].link} className="md:col-span-3 pr-7 group mt-[34rem]">
            <img width={50} height={50}
              src={data.workCollection.projects[2].titleimg[0]}
              className='transition-all duration-150 ease-in-out group-hover:hidden w-full h-[36rem] object-cover'
              alt='project'
            />
            <img width={50} height={50}
              src={data.workCollection.projects[2].titleimg[1]}
              className='hidden transition-all duration-150 ease-in-out group-hover:block w-full h-[36rem] object-cover'
              alt='project'
            />
            <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
              {data.workCollection.projects[2].title}
            </h1>
          </a>

          <a href={data.workCollection.projects[3].link} className="md:col-span-4 mt-20 group ml-24 overflow-hidden">
            <img width={50} height={50}
              src={data.workCollection.projects[3].titleimg[0]}
              className='h-[45rem] w-full transition-all duration-150 ease-in-out group-hover:hidden object-cover'
              alt='project'
            />
            <img width={50} height={50}
              src={data.workCollection.projects[3].titleimg[1]}
              className='h-[45rem] hidden transition-all duration-150 ease-in-out group-hover:block w-full object-cover'
              alt='project'
            />
            <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
              {data.workCollection.projects[3].title}
            </h1>
          </a>
        </div>
      </section>

      <div className='w-full overflow-hidden bg-[#aa8867] md:grid md:grid-cols-2 h-screen'>
        <div className='flex flex-col gap-10 md:gap-28 md:pl-20 py-10 md:py-0 px-4 md:px-0 justify-center'>
          <div className='flex items-center gap-2'>
            <img width={50} height={50}
              src={data.workCollection.work_collection_footer.company.logo}
              className='size-24 '
              alt='logo'
            />
            <div className='text-[1.75rem] text-[rgb(62,54,46)] tracking-tightest leading-none'>
              <span className='font-semibold'>{data.workCollection.work_collection_footer.company.name.split(' ')[0]}</span>
              <br />
              <span className='font-thin'>{data.workCollection.work_collection_footer.company.name.split(' ')[1]}</span>
            </div>
          </div>
          <TextAnimate
            animation="slideUp"
            by="word"
            className=' text-6xl md:text-[66px] font-semibold leading-[1.2em] tracking-[-4px] text-left text-[rgb(62,54,46)] max-w-2xl'
          >
            {data.workCollection.work_collection_footer.company.tagline}
          </TextAnimate>
        </div>
        <div className='h-full w-full relative'>
          <img width={50} height={50}
            className='absolute left-0 top-0 w-full h-1/2 md:h-full object-cover'
            src={data.workCollection.work_collection_footer.image}
            alt='footer background'
          />
        </div>
      </div>
    </>
  );
}