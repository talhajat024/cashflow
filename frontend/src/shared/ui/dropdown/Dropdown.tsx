import { useState, useRef, useEffect } from "react";
import { dropdownWrapper, dropdownPanel } from "./Dropdown.styles";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  onOpen?: () => void;
}

export default function Dropdown({ trigger, children, align = "right", onOpen }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && onOpen) onOpen();
  }, [open, onOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={dropdownWrapper()} ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && <div className={dropdownPanel({ align })}>{children}</div>}
    </div>
  );
}