// lib/recoil.ts
import { atom } from "recoil";

export interface Project {
  name: string;
  title: string;
  titleimg: string[];
  lines: string[];
  images: string[];
}

export interface WorkCollection {
  title: string;
  projects: Project[];
  featured_projects: {
    title: string;
    description: string;
    icon: string;
  };
}

export const workDataState = atom<WorkCollection | null>({
  key: "workDataState",
  default: null,
});

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: true,
});