import React, { useState, useEffect, useRef, FocusEvent } from "react";
import { ChevronUp } from "../Icons/ChevronUp";
import styles from "./CustomSelect.module.css";
import type { Props } from "./types";

const CustomSelect: React.FC<Props> = ({
  options,
  defaultSelected,
  placeholder = "Select Occupation",
  label = "",
  id = "custom-select-id",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(
    defaultSelected || null
  );
  const [listPosition, setListPosition] = useState<string>("bottom");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    window.addEventListener("resize", setDropdownPosition);
    return () => {
      window.removeEventListener("resize", setDropdownPosition);
    };
  }, []);

  const toggleDropdown = () => {
    if (!isOpen) {
      setDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    // Logic to handle the blur event
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  const setDropdownPosition = () => {
    if (selectedRef.current && dropdownRef.current) {
      const selectRect = selectedRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;
      // 150 -> maximum height of drop dwon
      if (spaceBelow >= dropdownHeight && spaceBelow > 150) {
        setListPosition("bottom");
      } else if (spaceAbove >= dropdownHeight && spaceAbove > 150) {
        setListPosition("top");
      } else {
        setListPosition("middle");
      }
    }
  };

  const handleSelection = (option: string, index: number) => {
    setSelected(option);
    setIsOpen(false);
    setHighlightedIndex(index);
    // Returning focus to the drop down element
    dropdownRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Enter":
      case " ":
        if (isOpen) {
          handleSelection(options[highlightedIndex], highlightedIndex);
        } else {
          toggleDropdown();
        }
        break;
      case "ArrowUp":
        if (isOpen && highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        }
        break;
      case "ArrowDown":
        if (isOpen && highlightedIndex < options.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={styles.customSelectContainer}
      onBlur={handleBlur} // Add onBlur handler to the container
      tabIndex={-1} // Ensure the div can receive focus events
    >
      {label && (
        <label htmlFor={id} className={styles.customSelectLabel}>
          {label}
        </label>
      )}

      <div
        className={styles.customSelect}
        onKeyDown={handleKeyDown}
        ref={dropdownRef}
        tabIndex={0}
        id={id}
      >
        <div
          className={styles.selectedValue}
          onClick={toggleDropdown}
          ref={selectedRef}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          role="button"
          aria-label="Custom Select"
        >
          {selected ? (
            selected
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <ChevronUp
            className={`${styles.icon} ${isOpen ? styles.iconDown : ""}`}
          />
        </div>
        {isOpen && (
          <div
            className={`${styles.optionsList} ${styles[listPosition]}`}
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                key={option}
                className={`${styles.optionItem} ${
                  index === highlightedIndex
                    ? styles.optionHighlight
                    : selected === option
                    ? styles.highlighted
                    : ""
                }`}
                onClick={() => handleSelection(option, index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={selected === option}
                tabIndex={-1}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
