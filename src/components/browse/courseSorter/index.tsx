import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import "./index.css";

type SortOption = {
  label: string;
  value: string;
};

interface CourseSorterProps {
  value: string;
  onChange: (value: string) => void;
}

const options: SortOption[] = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Title: A-Z", value: "title" },
];

export default function CourseSorter({ value, onChange }: CourseSorterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sorter" ref={ref}>
      <button
        className="sorter-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sorter-label">Sort By:</span>
        <span className="sorter-value">{selected?.label}</span>
        <span className={`sorter-arrow ${open ? "open" : ""}`}>
          <IoIosArrowDown />
        </span>
      </button>

      {open && (
        <div className="sorter-dropdown">
          {options.map((option) => (
            <button
              key={option.value}
              className={`sorter-item ${
                option.value === value ? "active" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
