import { FC } from "react";
import { SearchInputProps } from "./SearchInput.types";

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search or filter results",
}) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 pl-9 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent h-12"
      />
      <svg
        className="absolute left-3 top-4 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </>
  );
};
