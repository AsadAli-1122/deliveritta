import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "English", value: "en", flag: "fi fi-us" },
  { label: "Español", value: "es", flag: "fi fi-es" },
  { label: "اردو", value: "ur", flag: "fi fi-pk" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-600"
        onClick={toggleDropdown}
      >
        {languages.find((lang) => lang.value === i18n.language)?.label}
      </button>
      {isOpen && (
        <ul className="absolute mt-2 space-y-1 right-0 bg-white dark:bg-gray-900 dark:border dark:border-gray-600 w-36 rounded-lg shadow-lg">
          {languages.map((lang) => (
            <li key={lang.value}>
              <button
                onClick={() => handleLanguageChange(lang.value)}
                className={`flex items-center justify-between w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  lang.value === i18n.language ? "bg-gray-300 dark:bg-gray-700" : ""
                } ${lang === languages[0] ? "rounded-t-lg" : ""} ${
                  lang === languages[languages.length - 1] ? "rounded-b-lg" : ""
                }`}
              >
                <span className={`${lang.flag}`}></span> <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
