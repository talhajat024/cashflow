import { cva } from "class-variance-authority";

/* ================= ROW ================= */
export const row = cva([
  "grid",
  "grid-cols-[2.4fr_1.4fr_1.8fr_1.6fr_1.8fr]", 
  "px-5",
  "py-4",                    
  "items-center",
  "text-[14px]",
  "text-gray-700",
  "border-b",
  "border-slate-100",
  "last:border-b-0",
]);


export const cell = cva([
  "flex",
  "items-center",
  "h-full",
  "border-r",
  "border-slate-100/60",       
  "last:border-r-0",
]);

export const cellLeft = cva([
  cell(),
  "justify-start",
  "text-left",
]);

export const cellCenter = cva([
  cell(),
  "justify-center",
  "text-center",
]);


export const company = cva([
  "flex",
  "items-center",
  "gap-3",
]);

export const iconWrapper = cva([
  "w-9",
  "h-9",
  "rounded-full",
  "bg-gray-50",                
  "flex",
  "items-center",
  "justify-center",
  "shrink-0",
]);

export const companyName = cva([
  "text-[14px]",               
  "font-medium",               
  "text-gray-900",
  "leading-tight",
]);

export const companySub = cva([
  "text-[12px]",
  "text-gray-500",
  "leading-tight",
]);


export const amount = cva([
  "text-[14px]",
  "font-medium",
  "text-gray-900",
]);

export const badgeBase = cva([
  "px-3",
  "py-1",
  "rounded-full",
  "text-[12px]",
  "font-medium",
  "leading-none",
]);

export const badgeCompleted = cva([
  badgeBase(),
  "bg-green-50",               
  "text-green-600",
]);

export const badgeIncomplete = cva([
  badgeBase(),
  "bg-orange-50",              
  "text-orange-600",
]);
