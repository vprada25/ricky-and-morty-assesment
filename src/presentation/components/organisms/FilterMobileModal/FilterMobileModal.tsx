import { FC } from "react";

interface FilterMobileModalProps {
  onClose: () => void;
  onApply: () => void;
  children: React.ReactNode;
}

export const FilterMobileModal: FC<FilterMobileModalProps> = ({
  onClose,
  onApply,
  children,
}) => {
  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fadeIn"
        onClick={onClose}
      />

      <div
        className="fixed inset-x-0 bottom-0 top-16 bg-white z-50 flex flex-col rounded-t-3xl shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-9 py-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Back"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h2 className="text-center font-semibold text-gray-900 flex-1">
            Filters
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">{children}</div>

        <div className="p-4">
          <button
            onClick={onApply}
            className="w-full py-3 rounded-lg text-sm font-medium transition-colors bg-primary-600 text-white hover:bg-primary-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
