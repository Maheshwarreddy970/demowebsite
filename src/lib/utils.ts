import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function constructMetadata({
  title = "Transform Your Business with AI-Powered Websites at 50% Off!",
  description =
    "I was reviewing your online presence and noticed potential for your website to significantly increase customer conversion. I'm Maheshwar, founder of Super World Technologies, and we specialize in transforming websites into powerful lead-generating machines.We recently helped a client in your industry triple their leads in just one month! Our system works 24/7 to capture leads even while you're away. Services include: * AI Chat Support trained on your business data * Automatic Lead Capture * Dynamic Database Integration * User-Friendly Admin Panel See our demo:https://comfy-cuchufli-7e0880.netlify.app  Check admin dashboard:https://comfy-cuchufli-7e0880.netlify.app/admin Available for a quick 15-min chat this week to discuss your needs? No pressure, just exploring if we're a good fit. Visit: superworldtechnologies.com",
  image = "https://comfy-cuchufli-7e0880.netlify.app/coverphoto.jpg", // Use absolute URL here
  icons = "https://comfy-cuchufli-7e0880.netlify.app/logo.svg", // Use absolute URL here
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const keywords = [
    "Super World Technology",
    "TailwindCSS components",
    "Framer Motion UI library",
    "React UI components",
    "pre-built UI elements",
    "UI component library",
    "developer productivity tools",
    "responsive design components",
    "animated UI components",
    "React animations",
    "open-source UI library",
    "web development tools",
  ].join(", ");

  return {
    title,
    description,
    keywords, // SEO keywords for search engines
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Super World Technology ",
        },
      ],
      siteName: "Super World Technology",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Maheshwarreddy",
    },
    icons: {
      icon: icons,
      apple: icons,
    },
    metadataBase: new URL("https://superworldtechnologies.com/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}