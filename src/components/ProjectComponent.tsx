import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { motion } from "framer-motion";
import { TextRotate } from "./TextRotate";
import AnimatedLogoCloud from "./AnimatedLogoCloud";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project, WorkCollection } from "@/lib/type";
import ProjectCollection from "./ProjectCollection";
import { TextAnimate } from "./ui/text-animate";

export default function ProjectPage({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const [workData, setWorkData] = useState<WorkCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectproject, setproject] = useState<Project>(project);

  // Create a ref for the section to scroll to
  const projectSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, "website", "workSection");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorkData(docSnap.data() as WorkCollection);
        } else {
          const defaultData = (await import("@/lib/data.json")).default;
          setWorkData(defaultData.workCollection as WorkCollection);
        }
      } catch (error) {
        console.error("Error fetching work section data:", error);
        const defaultData = (await import("@/lib/data.json")).default;
        setWorkData(defaultData.workCollection as WorkCollection);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle project selection and scroll to the section
  const onProjectSelect = (selectedProject: Project) => {
    setproject(selectedProject);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top initially

    // Scroll to project section after delay
    setTimeout(() => {
      projectSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const { title, titleimg, lines, images } = selectproject;
  const renderAlternating = images.length === lines.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectproject]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!workData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No project data available.</p>
      </div>
    );
  }

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
          className="h-8 w-8"
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

      {/* Project Content */}
      <section className="w-full min-h-screen flex flex-col">
        <div className="w-full bg-[#664f35] grid grid-cols-2 h-screen">
          <div className="flex flex-col gap-28 pl-20 justify-center">
            <h1 className="text-[90px] font-semibold leading-[1.2em] tracking-[-4px] text-left text-[#aa8867] max-w-xl">
              {title}
            </h1>
          </div>
          <div className="h-full w-full relative">
            <img
              width={50}
              height={50}
              alt="logo"
              className="absolute left-0 top-0 w-full h-full object-cover"
              src={titleimg[0]}
            />
          </div>
        </div>

        {/* Scroll Target Section */}
        <div ref={projectSectionRef} className="max-w-5xl mx-auto mt-20 flex-col flex gap-20 py-10">
          {renderAlternating ? (
            lines.map((line, index) => (
              <div key={index} className="mb-6">
                <img
                  width={50}
                  height={50}
                  src={images[index]}
                  className="w-full rounded-lg mb-4"
                  alt={`Project Image ${index + 1}`}
                />
                <p className="text-lg text-[#333333] font-semibold mt-2">{line}</p>
              </div>
            ))
          ) : images.length > lines.length ? (
            images.map((img, index) => (
              <div key={index} className="mb-6">
                <img
                  width={50}
                  height={50}
                  src={img}
                  className="w-full rounded-lg mb-4"
                  alt={`Project Image ${index + 1}`}
                />
                {lines[index] && (
                  <p className="text-lg mt-2 text-[#333333] font-semibold">
                    {lines[index]}
                  </p>
                )}
              </div>
            ))
          ) : (
            <>
              {lines.map((line, index) => (
                <p
                  key={index}
                  className="text-lg text-[#333333] font-semibold mb-4"
                >
                  {line}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {images.map((img, index) => (
                  <img
                    width={40}
                    height={40}
                    key={index}
                    src={img}
                    className="w-full rounded-lg"
                    alt={`Project Image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Projects Section */}
        <ProjectCollection projects={workData?.projects ?? []} onProjectSelect={onProjectSelect} />

        <section className="bg-[#664f35] pb-20">
          <div className="flex flex-col gap-6">
            <TextAnimate animation="slideLeft" className=' text-6xl md:text-[112px] font-semibold tracking-[-1.4px] leading-[1em] text-center text-white'>Crafting Spaces for</TextAnimate>

            <TextRotate />
          </div>
          <AnimatedLogoCloud />
        </section>
      </section>
    </motion.div>
  );
}
