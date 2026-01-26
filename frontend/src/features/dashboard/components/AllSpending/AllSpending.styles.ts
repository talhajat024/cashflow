import { cva } from "class-variance-authority";

export const wrapper = cva([
  "flex",
  "flex-col",
  "h-full", 
]);

export const header = cva([
  "flex",
  "items-center",
  "justify-between",
]);

export const title = cva([
   "text-[14px]",
  "font-semibold",
]);

export const menuButton = cva([
  "text-gray-400",
  "hover:text-gray-600",
  "transition",
]);

export const summaryRow = cva([
  "grid",
  "grid-cols-3",
  "gap-4",
  "mb-4",
]);

export const summaryItem = cva([
  "flex",
  "flex-col",
  "gap-1",
]);

export const summaryLabel = cva([
  "text-[12px]",
  "leading-none",
  "text-gray-400",
]);

export const summaryValue = cva([
  "text-[14px]",
  "font-semibold",
  "leading-tight",
]);

export const content = cva([
  "flex",
  "flex-col",
  "items-center",
  "gap-4",
  "flex-1",               
]);

export const chartArea = cva([
  "h-[140px]",       
  "flex",
  "items-center",
  "justify-center",
  "shrink-0",  
]);

export const legendArea = cva([
  "w-full",
  "flex",
  "flex-col",
  "gap-3",
  "flex-1",           
  "overflow-hidden",  
]);
