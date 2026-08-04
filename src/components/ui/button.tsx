import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#1A2840] text-white hover:bg-[#1F4761]",
    secondary: "bg-[#F3C611] text-[#1A2840] hover:bg-yellow-500 font-semibold",
    outline: "border-2 border-[#1A2840] text-[#1A2840] hover:bg-gray-50",
    ghost: "bg-transparent text-[#1A2840] hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
