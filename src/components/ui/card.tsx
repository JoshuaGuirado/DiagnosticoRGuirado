import React from 'react';
import { cn } from '@/src/lib/utils';

export function Card({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-white rounded-[32px] p-1 shadow-soft border border-white", className)}
      {...props}
    >
      <div className={cn("h-full flex flex-col border border-[#1F4761]/10 rounded-[28px]", className?.includes('p-0') ? 'p-0' : 'p-6 md:p-8')}>
        {children}
      </div>
    </div>
  );
}
