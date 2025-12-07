import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mocking the toast hook for the user code
import toast from 'react-hot-toast';
export const useToast = () => {
  return {
    toast: ({ title, description }: { title: string; description: string }) => {
      toast.success(`${title} - ${description}`, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };
};