"use client"

import React, { FC, ReactNode, useState } from "react"
import { PlusIcon, XIcon } from "lucide-react"
import {motion} from 'framer-motion'

import { cn } from "@/lib/utils"


interface FamilyButtonProps {
  children: React.ReactNode
}

const FamilyButton: React.FC<FamilyButtonProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      className={cn(
        "rounded-[24px] z-[9999] shadow-xl overflow-hidden bg-white"
      )}
    >
      <div className="rounded-[23px] border   overflow-hidden border-[#3e362e]/60 ">
        <div className="rounded-[22px] border overflow-hidden dark:border-stone-800 border-white/50 ">
          <div className="rounded-[21px] border overflow-hidden   border-neutral-950/20   flex items-center justify-center ">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  className=" w-full h-full relative"
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// A container that h- wraps content and handles animations
interface FamilyButtonContainerProps {
  isExpanded: boolean
  toggleExpand: () => void
  children: ReactNode
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 868);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, []);
  return (
    <motion.div
      className={cn(
        "relative  z-[9999]  shadow-lg flex flex-col w-full h-full space-y-1  items-center  text-white  cursor-pointer ",
        !isExpanded
          ? "bg-[rgb(170,136,103)] dark:from-stone-700 dark:to-neutral-800/80"
          : ""
      )}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: isMobile ? '95vw' : 400,
              height: "90vh",

              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "3.5rem",
              height: "3.5rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute  "
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{
          left: isExpanded ? "" : "50%",
          bottom: 6,
        }}
        
      >
        {isExpanded ? (
          <motion.div
            className="p-[10px] group bg-[rgb(170,136,103)] dark:bg-black/50 border border-cyan-100/30 hover:border-neutral-200 text-orange-50 rounded-full shadow-2xl transition-colors duration-300 "
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon
              className={cn(
                "h-5 w-5 text-white dark:text-neutral-400/80  transition-colors duration-200 "
              )}
            />
          </motion.div>
        ) : (
          <motion.div
            className={cn(
              "p-[3px] group shadow-2xl transition-colors duration-200"
            )}
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="  size-9  fill-white" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
            <path className="" d="M 12 2 A 9 9 0 0 0 3 11 A 9 9 0 0 0 12 20 L 12 23 C 12 23 19.39165 19.370314 20.761719 13.015625 A 9 9 0 0 0 20.839844 12.65625 C 20.880821 12.423525 20.923277 12.190914 20.947266 11.951172 A 9 9 0 0 0 20.957031 11.863281 C 20.982749 11.579721 21 11.293169 21 11 A 9 9 0 0 0 12 2 z"></path>
          </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export { FamilyButton }
