"use client";

import React from "react";
import data from "@/lib/data.json";
import { Icons } from "@/icons";
import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "framer-motion";

// Define the Journal type separately for reusability
type Journal = {
    name: string;
    title: string;
    titleimg: string;
    href: string;
    smartHomesAndBuildings: {
        title: string;
        sections: { name: string; description: string }[];
    }[];
    img?: string;
};

export default function JournalComponent({
    journal,
    onBack,
    setSelectedJournal, // Add this prop with proper typing
}: {
    journal: Journal;
    onBack: () => void;
    setSelectedJournal: (journal: Journal | null) => void; // Use Journal type instead of any
}) {
    if (!journal) {
        return <div className="text-center p-10">Journal not found</div>;
    }

    const imageVariants = {
        hover: { borderRadius: 999, transition: { duration: 1, ease: "easeInOut" } },
        exit: { borderRadius: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 w-full h-full bg-white overflow-y-auto"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="fixed border shadow-xl border-black top-4 left-4 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Journal Content */}
            <section className="w-full min-h-screen flex flex-col">
                <div className="p-6 max-w-4xl mx-auto pt-20">
                    <h1 className="text-[#333333] font-bold text-5xl text-center mb-10">
                        {journal.title}
                    </h1>
                    <img width={40} height={40}

                        src={journal.titleimg}
                        alt={journal.title}
                        className="w-full h-auto rounded-md mb-9"
                    />
                    {journal.smartHomesAndBuildings.map((topic, index) => (
                        <div key={index} className="mb-8">
                            <h2 className="text-[#333333] font-extrabold text-2xl my-6">
                                {topic.title}
                            </h2>
                            <ul className="space-y-4">
                                {topic.sections.map((section, secIndex) => (
                                    <li
                                        key={secIndex}
                                        className="text-[#333333] font-bold text-[18px]"
                                    >
                                        {section.name} :
                                        <span className="text-[#333333] font-normal ml-2">
                                            {section.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Explore More Section */}
                <div className="flex flex-col gap-3 py-[9.75rem] px-[1rem] lg:px-[2.5rem] bg-[#f5f5f5]">
                    <TextAnimate
                        animation="slideLeft"
                        by="character"
                        className="text-[112px] ml-0 lg:ml-20 tracking-[-6.8px] leading-[1em] text-[#4a3e32] font-bold"
                    >
                        Explore More
                    </TextAnimate>
                    <div className="grid lg:grid-cols-3 lg:px-10 gap-6 mt-10">
                        {data.ExploreJournal.journal.map((article, index) => (
                            <motion.div
                                viewport={{ once: true }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.2,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 200,
                                }}
                                key={index}
                                className="bg-white p-4"
                            >
                                <div className="w-full h-[24.25rem]">
                                    <motion.img
                                        variants={imageVariants}
                                        initial="exit"
                                        whileHover="hover"
                                        animate="exit"
                                        src={article.titleimg}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h1 className="text-[22px] mt-5 leading-7 text-left">
                                    {article.title}
                                </h1>
                                <a
                                    href={article.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedJournal(article); // Directly set the new journal
                                    }}
                                    className="text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center cursor-pointer"
                                >
                                    <Icons.ButtonIcon className="size-[1.12rem]" />
                                    Read
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}