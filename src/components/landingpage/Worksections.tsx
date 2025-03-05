'use client'

import React, { useState } from 'react';
import { TextAnimate } from '../ui/text-animate';
import data from '@/lib/data.json';
import ProjectPage from '../ProjectComponent';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Project } from '@/lib/type';

export default function WorkSections() {

  // Allow selectedProject to be either null or a Project
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // If a project is selected, render the ProjectPage
  if (selectedProject !== null) {
    return <ProjectPage key="project-page" project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }
  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {selectedProject !== null ? (
          <motion.div
            key="project-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectPage project={selectedProject} onBack={() => setSelectedProject(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="work-sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className='flex flex-col  bg-white overflow-hidden gap-[100px] w-full h-min  md:py-[3.7rem] md:pr-[5rem] md:pl-[10rem] mx-auto relative'>
              <TextAnimate
                animation="slideLeft"
                className='text-7xl pl-5 md:pl-0 md:text-[112px] mt-28 tracking-[-4px] text-left font-semibold leading-[1em] text-[rgb(170,136,103)]'
              >
                {data.workCollection.title}
              </TextAnimate>

              <div className="md:grid md:grid-cols-7 p-4 md:p-0">
                <div className="md:col-span-4 mt-14 group cursor-pointer"   onClick={() => {
    setSelectedProject(data.workCollection.projects[0])
  }}>
                  <img width={40} height={40}
                    src={data.workCollection.projects[0].titleimg[0]}
                    className='h-[45rem] group-hover:block hidden object-cover w-full md:pr-20'
                    alt='project'
                  />
                  <img width={40} height={40}
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
                </div>

                <div className="col-span-3 group md:p-4">
                  <div className='flex flex-col gap-6'>
                    <div className="flex mt-20 items-center gap-6 justify-start">
                      <img width={40} height={40}
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
                  <div className='mt-80 group cursor-pointer' onClick={() => setSelectedProject(data.workCollection.projects[1])}>
                    <img width={40} height={40}
                      src={data.workCollection.projects[1].titleimg[0]}
                      className='hidden h-[36rem] transition-all duration-150 ease-in-out group-hover:block w-full object-cover'
                      alt='project'
                    />
                    <img width={40} height={40}
                      src={data.workCollection.projects[1].titleimg[1]}
                      className='w-full group-hover:hidden h-[36rem] object-cover'
                      alt='project'
                    />
                  </div>
                  <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
                    {data.workCollection.projects[1].title}
                  </h1>
                </div>
              </div>

              <div className="md:grid md:grid-cols-7 p-4 md:p-0">
                <div className="md:col-span-3 pr-7 group mt-[34rem] cursor-pointer" onClick={() => setSelectedProject(data.workCollection.projects[2])}>
                  <img width={40} height={40}
                    src={data.workCollection.projects[2].titleimg[0]}
                    className='transition-all duration-150 ease-in-out group-hover:hidden w-full h-[36rem] object-cover'
                    alt='project'
                  />
                  <img width={40} height={40}
                    src={data.workCollection.projects[2].titleimg[1]}
                    className='hidden transition-all duration-150 ease-in-out group-hover:block w-full h-[36rem] object-cover'
                    alt='project'
                  />
                  <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
                    {data.workCollection.projects[2].title}
                  </h1>
                </div>

                <div className="md:col-span-4 mt-20 group ml-24 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(data.workCollection.projects[3])}>
                  <img width={40} height={40}
                    src={data.workCollection.projects[3].titleimg[0]}
                    className='h-[45rem] w-full transition-all duration-150 ease-in-out group-hover:hidden object-cover'
                    alt='project'
                  />
                  <img width={40} height={40}
                    src={data.workCollection.projects[3].titleimg[1]}
                    className='h-[45rem] hidden transition-all duration-150 ease-in-out group-hover:block w-full object-cover'
                    alt='project'
                  />
                  <h1 className='text-xl font-medium mt-2 group-hover:font-semibold'>
                    {data.workCollection.projects[3].title}
                  </h1>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}