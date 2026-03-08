// shared/ui/filters/TimeRangeSelect.tsx
import { Calendar, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { styles } from "./TimeRangeSelect.styles";

export type TimeRange = '3' | '6' | '12';

interface TimeRangeSelectProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  label?: string;
}

const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '3', label: 'Last 3 months' },
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
];

export function TimeRangeSelect({ value, onChange, label }: TimeRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find current option label
  const currentOption = RANGE_OPTIONS.find(opt => opt.value === value);
  const displayLabel = currentOption?.label || label || 'Select range';

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  return (
    <div className={styles.container()} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger()}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Calendar className={styles.calendarIcon()} />
        <span className={styles.triggerText()}>{displayLabel}</span>
        <ChevronDown 
          className={styles.chevronIcon()} 
          style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown()} role="listbox">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                ${styles.item()}
                ${value === option.value ? styles.itemActive() : styles.itemInactive()}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}