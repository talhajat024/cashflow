import { cva } from "class-variance-authority";

export const chartWrapper=cva([
    "relative",
    "w-[180px]",
    "h-[180px]",
]);

// svg
export const chartSvg=cva([
    "w-full",
    "h-full",
    "-rotate-90",
])

// Center text
export const centerContent=cva([
    "absolute",
    "inset-0",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
]);

export const centerValue =cva([
    "text-[18px]",
    "font-semibold",
    "text-gray-900",
])

export const centerLabel=cva([
    "text-[12px]",
    "text-gray-400",
])