import { Facebook, GoogleIcon, Instagram, Linkedin, TwitterIcon } from '@/icons/socialicons';
import React, { JSX } from 'react';

const logos: Record<string, JSX.Element> = {
  twitter: <TwitterIcon size={24} />,
  facebook: <Facebook size={24} />,
  linkedin: <Linkedin size={24} />,
  instagram: <Instagram size={24} />,
  direct:<GoogleIcon></GoogleIcon>
};

export default function ReferenceSource({ name }: { name: string }) {
  return <div className=' flex justify-center items-center'>{logos[name] || null}</div>; // Render the logo if found, else null
}
