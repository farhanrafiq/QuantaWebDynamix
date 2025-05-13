import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animate on scroll helper
export const scrollReveal = (target: HTMLElement, delay: number = 0) => {
  const scrollY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + scrollY;
  const windowHeight = window.innerHeight;
  const revealPoint = 100;
  
  if (targetY < scrollY + windowHeight - revealPoint) {
    setTimeout(() => {
      target.classList.add('active');
    }, delay);
  }
};

// Format date for blog posts
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Scroll to element by ID
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
