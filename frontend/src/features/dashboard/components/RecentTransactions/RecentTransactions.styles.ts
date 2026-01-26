import { cva } from "class-variance-authority";

export const tableGrid = "grid grid-cols-[2.4fr_1.4fr_1.8fr_1.6fr_1.8fr]";

export const table = cva([
  "w-full",
  "rounded-2xl",
  "bg-white",
  "overflow-hidden",
]);

export const headerRow = cva([
  tableGrid,
  "px-5",    
  "py-4",
  "bg-gray-50",
  "text-[14px]",
  "font-medium",
  "text-gray-500",
  "border-b",
  "border-slate-100",
]);

export const body = cva([
  "flex",
  "flex-col",
]);


export const headerCellLeft = "text-left";
export const headerCellCenter = "text-center";
