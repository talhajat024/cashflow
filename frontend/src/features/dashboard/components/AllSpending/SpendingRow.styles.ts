import { cva } from "class-variance-authority";

export const row = cva([
  "flex",
  "items-center",
  "justify-between",              
]);

export const left = cva([
  "flex",
  "items-center",
  "gap-2",                
]);

export const dot = cva([
  "w-2",
  "h-2",                  
  "rounded-full",
]);

export const label = cva([
  "text-[12px]",          
  "leading-none",        
  "text-gray-500",
]);

export const value = cva([
  "text-[12px]",         
  "leading-none",
  "font-medium",         
  "text-gray-900",
]);
