import { cva } from "class-variance-authority";

/* Overlay */

export const overlay = cva([
  "fixed",
  "inset-0",
  "z-50",
  "bg-black/40",
  "flex",
  "items-start",
  "justify-center",
  "pt-24",
]);

/* Modal container (Card wrapper) */

export const modal = cva([
  "w-full",
  "max-w-xl",
]);

/* Header */

export const header = cva([
  "flex",
  "items-center",
  "gap-2",
]);

export const input = cva([
  "w-full",
  "text-sm",
  "outline-none",
  "bg-transparent",
  "placeholder-gray-400",
]);

/* Results */

export const results = cva([
  "flex",
  "flex-col",
  "max-h-[320px]",
  "overflow-y-auto",
]);

export const emptyState = cva([
  "px-4",
  "py-3",
  "text-sm",
  "text-gray-500",
]);

export const resultItem = cva([
  "w-full",
  "text-left",
  "px-4",
  "py-2",
  "text-sm",
  "hover:bg-gray-100",
  "transition",
]);