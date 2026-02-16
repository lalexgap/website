// TypeScript type definitions for the website

export interface Project {
  name: string;
  link: string;
  image: string;
  description: string;
}

export interface NavPage {
  name: string;
  url: string;
}

export interface SocialLink {
  href: string;
  title: string;
  icon: "github" | "linkedin" | "email" | "pdf";
}

export interface ResumeData {
  markdown: string;
  error: string | null;
}

export interface CarouselConfig {
  swipeThreshold: number;
  autoPlayInterval?: number;
  enableKeyboardNav: boolean;
}
