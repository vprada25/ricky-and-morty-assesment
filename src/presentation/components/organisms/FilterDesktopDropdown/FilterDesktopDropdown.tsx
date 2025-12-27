import { FC, RefObject } from "react";

interface FilterDesktopDropdownProps {
  dropdownRef: RefObject<HTMLDivElement>;
  onApply: () => void;
  children: React.ReactNode;
}

export const FilterDesktopDropdown: FC<FilterDesktopDropdownProps> = ({
  dropdownRef,
  onApply,
  children,
}) => {
  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      className="hidden lg:block absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-6"
    >
      {children}

      {/* Filter Button */}
      <button
        onClick={onApply}
        className="w-full px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded hover:bg-primary-700 transition-colors mt-3"
      >
        Filter
      </button>
    </div>
  );
};
