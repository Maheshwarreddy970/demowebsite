"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";
import { Icons } from "@/icons";
import { Project } from "@/lib/type";

interface ProjectCollectionProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const ProjectCollection: React.FC<ProjectCollectionProps> = ({ projects, onProjectSelect }) => {
  const imageVariants = {
    hover: { borderRadius: 999, transition: { duration: 1, ease: "easeInOut" } },
    exit: { borderRadius: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  return (
    <div className="bg-[#664f35] flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem]">
      <TextAnimate
        animation="slideLeft"
        className="text-[84px] lg:text-[112px] font-semibold tracking-[-6.8px] leading-[1em] text-[rgb(170,136,103)] text-center"
      >
        Project Collection
      </TextAnimate>
      <div className="grid lg:grid-cols-3 lg:px-10 gap-8 mt-28">
        {projects.map((project, index) => (
          <motion.button
            onClick={() => onProjectSelect(project)}
            viewport={{ once: true }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.2,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
            }}
            key={index}
            className="bg-[rgb(170,136,103)] p-4"
          >
            <div className="w-full h-[24.25rem]">
              <motion.img
                variants={imageVariants}
                initial="exit"
                whileHover="hover"
                animate="exit"
                src={project.titleimg[0]}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-[22px] mt-5 leading-7 text-left">{project.title}</h1>
            <Link href="/" className="text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center">
              <Icons.ButtonIcon className="size-[1.12rem]" /> Read
            </Link>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProjectCollection;
