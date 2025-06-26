import { useState, useEffect, useRef } from "react";

const ComboBox = ({
  field,
  form,
  options = [],
  placeholder = "اختر خيارًا",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    const selected = options.find((opt) => opt.value === field.value);
    setSearch(selected ? selected.label : "");
  }, [field.value, options]);

  const handleSelect = (option) => {
    setSearch(option.label);
    form.setFieldValue(field.name, option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      highlightedIndex < filteredOptions.length &&
      optionRefs.current[highlightedIndex]
    ) {
      optionRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex, filteredOptions]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-full sm:w-80 md:w-96 lg:w-128">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onKeyDown={handleKeyDown}
        dir="rtl"
        className="bg-slate-100 text-gray-950 mt-1 block py-2 px-3 w-full rounded-md border-b-4 border-gray-200 focus:outline-none focus:border-sky-700 text-right"
      />

      {isOpen && (
        <ul
          ref={listRef}
          dir="rtl"
          className="absolute left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border dark:bg-darkContent rounded-lg shadow-lg z-10 text-right"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                ref={(el) => (optionRefs.current[index] = el)}
                className={`p-2 cursor-pointer ${
                  highlightedIndex === index
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-100 dark:hover:bg-background"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">لا يوجد نتائج</li>
          )}
        </ul>
      )}

      {form.touched[field.name] && form.errors[field.name] && (
        <div className="text-red-500 text-sm mt-1">
          {form.errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
