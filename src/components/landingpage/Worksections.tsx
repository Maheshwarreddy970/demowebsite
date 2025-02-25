import React from 'react'

export default function Worksections() {
    return (
        <>
            <section className='flex flex-col  bg-white overflow-hidden gap-[100px]   w-full h-min py-[3.7rem] pr-[5rem] pl-[10rem]  mx-auto relative'>
                <h1 className='text-[112px] mt-28 tracking-[-4px] text-left font-semibold leading-[1em] text-[rgb(170,136,103)]'> Work Collection
                </h1>
                <div className="grid grid-cols-7">
                    <div className="col-span-4 mt-14 group ">
                    <img src='/Y1SlBye7bzROKCM4Z8mb5VbHg.avif' className=' h-[45rem]  group-hover:block hidden object-cover w-full pr-20 ' alt='sofa'></img>
                        <img src='/CtqdgxpGYO4WFK0ftEeQyDERY0w.avif' className=' h-[45rem]  group-hover:hidden object-cover w-full pr-20'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>The Meadow House</h1>
                    </div>
                    <div className="col-span-3 group p-4">
                        <div className=' flex flex-col gap-6'>
                            <div className="flex mt-20 items-center gap-6 justify-start">
                                <img
                                    src="/41328140-da2b-4d17-9f32-4ee3288447e1.svg"
                                    alt="icon"
                                    className="size-7"
                                />

                                <h1 className="text-[24px] font-semibold tracking-[-1px] text-left text-[rgb(102,79,53)]">
                                    Featured Projects
                                </h1>
                            </div>
                            <p className='text-[24px] font-medium pr-7 tracking-[-0.6px] text-left text-[rgb(170,136,103)]'>Highlights of cases that we passionately built
                                with forward- thinking clients and friends over
                                the years.
                            </p>
                        </div>
                        <div className=' mt-80 group'>
                                <img src='/MrwrMt2iox7UPFuxfxwQoOg4s.avif' className='hidden h-[36rem] transition-all duration-150 ease-in-out group-hover:block w-full  object-cover ' alt='sofa'></img>
                            <img src='/TTdNsUIJ7hNa3fW196hmNHfRznM.png' className='w-full group-hover:hidden h-[36rem]  object-cover ' alt='sofa'></img>
                        </div>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>One Great Jones Alley</h1>
                    </div>


                </div>
                <div className="grid grid-cols-7">
                    <div className="col-span-3 pr-7 group mt-[34rem]">
                        <img src='/xY2ltysjjeDPAv2h8IdjICqEio_1.png' className=' transition-all duration-150 ease-in-out group-hover:hidden w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        <img src='/apr1iyeVu0giJ4G3Ouvu0nDGOmE.avif' className=' hidden transition-all duration-150 ease-in-out group-hover:block w-full h-[36rem]  object-cover ' alt='sofa'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>Scorpia</h1>

                    </div>
                    <div className="col-span-4  mt-20 group ml-24   overflow-hidden">
                        <img src='/fpSz08cqO9CONW7pXT8QyafavKA_1.png' className=' h-[45rem]  w-full transition-all duration-150 ease-in-out group-hover:hidden object-cover '></img>
                        <img src='/MOLE-ARCHITECTS-HOUSEBOAT-AT-WEB-phRoryGardiner001.jpg' className=' h-[45rem]  hidden transition-all duration-150 ease-in-out group-hover:block w-full  object-cover ' alt='sofa'></img>
                        <h1 className='  text-xl font-medium mt-2 group-hover:font-semibold'>Dovecote</h1>
                    </div>
                </div>
            </section>
            <div className=' w-full bg-[#aa8867] grid grid-cols-2 h-screen '>
                <div className=' flex flex-col gap-28 pl-20 justify-center'>
                    <div className=' flex items-center gap-2 '>
                        <img src='/b79bf2b3-bd8b-410f-8022-7be6172fe960.svg' className=' size-24' alt='svg icon '></img>
                        <div className='text-[1.75rem] text-[rgb(62,54,46)] tracking-tightest leading-none'>
                            <span className=' font-semibold'>OAKWOOD</span>
                            <br></br>
                            <span className='font-thin'>
                                ARCHITECTS
                            </span>
                        </div>
                    </div>
                    <h1 className=' text-[66px] font-semibold leading-[1.2em] tracking-[-4px] text-left text-[rgb(62,54,46)] max-w-2xl'>Where housing innovation is shaped.</h1>
                </div>
                <div className='h-full w-full relative'>
                    <img className='  absolute left-0 top-0 w-full h-full object-cover   ' src='bWFZ6VKV9dQV7yjOspAjXxx0D4.avif'></img>
                </div>
            </div>

        </>

    )
}
