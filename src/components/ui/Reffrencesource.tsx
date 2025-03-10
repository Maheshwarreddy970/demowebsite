import { Facebook, GoogleIcon,Linkedin, TwitterIcon } from '@/icons/socialicons';
import React, { JSX } from 'react';

const logos: Record<string, JSX.Element> = {
  Twitter: <TwitterIcon size={24} />,
  Facebook: <Facebook className='h-7 w-7 mr-2'  />,
  Linkedin: <Linkedin size={24} />,
  Instagram: <img src='/Instagram_logo_2016.svg.png' className='h-7 w-7 mr-2'  />,
  direct:<GoogleIcon></GoogleIcon>
};

export default function ReferenceSource({ name }: { name: string }) {
  return <div className=' flex justify-center items-center'>{logos[name] || null}</div>; // Render the logo if found, else null
}
