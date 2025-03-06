// lib/recoil.ts

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

// @/lib/type.ts
export interface Project {
  name: string;
  title: string;
  titleimg:  string[]; // Tuple for exactly 2 images
  lines: string[];
  images: string[];
}

export interface WorkCollection {
  projects: Project[];
}

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}