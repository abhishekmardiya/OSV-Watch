"use client";

import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import type { ComboboxOption, ComboboxProps } from "@/types";

const Combobox = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  required,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    const matchingOption = options.find(
      (opt) => opt.label.toLowerCase() === newValue.toLowerCase()
    );
    if (matchingOption) {
      onChange(matchingOption.value);
    }
  };

  const handleOptionSelect = (option: ComboboxOption) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length === 1) {
        handleOptionSelect(filteredOptions[0]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      return;
    }
  };

  useEffect(() => {
    if (selectedOption) {
      setInputValue(selectedOption.label);
    }
  }, [selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (selectedOption) {
          setInputValue(selectedOption.label);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedOption]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      highlightedElement?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label="Toggle dropdown"
        >
          <HiChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && !!filteredOptions?.length && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 max-h-60 md:max-h-40 overflow-auto bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg"
        >
          {filteredOptions.map((option, index) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleOptionSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOptionSelect(option);
                  }
                }}
                data-selected={option.value === value}
                className={`w-full text-left px-4 py-2 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                } ${
                  option.value === value
                    ? "bg-purple-50 dark:bg-purple-900/20 font-semibold"
                    : ""
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isOpen && !filteredOptions?.length && (
        <ul className="absolute z-9999 w-full mt-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg">
          <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
            No options found
          </li>
        </ul>
      )}
    </div>
  );
};

export default Combobox;
