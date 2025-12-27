import { FC } from "react";

import { CharacterList } from "@/presentation/components/organisms/CharacterList";
import { useCharacterSelection } from "@/presentation/hooks/useCharacterSelection";
import { SearchBar, FilterSummary } from "@/presentation/components/molecules";
import { useCharacterFilters } from "@/presentation/hooks/useCharacterFilters";
import { ErrorMessage } from "@/presentation/components/atoms/ErrorMessage";
import { useCharacterData } from "@/presentation/hooks/useCharacterData";
import { Pagination } from "@/presentation/components/molecules";
import { Loader } from "@/presentation/components/atoms";

interface CharacterSidebarProps {
  title: string;
}

export const CharacterSidebar: FC<CharacterSidebarProps> = ({ title }) => {
  const {
    currentFavorites,
    nonFavoriteCharacters,
    info,
    loading,
    error,
    isInitialLoad,
    currentPage,
    handlePageChange,
    toggleFavorite,
    clearError,
  } = useCharacterData();

  const {
    searchTerm,
    currentFilters,
    isFilterModalOpen,
    handleSearchChange,
    handleFilterChange,
    toggleFilterModal,
  } = useCharacterFilters();

  const { selectedId, handleCharacterSelect } = useCharacterSelection();

  const totalResults = currentFavorites.length + nonFavoriteCharacters.length;

  const cleanFilters = Object.entries(currentFilters).reduce(
    (acc, [key, value]) => {
      if (
        key !== "page" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>
  );

  const activeFiltersCount = Object.keys(cleanFilters).length;

  return (
    <div className="lg:col-span-3 xl:col-span-3 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 pt-6 pb-4">
        <h2 className="font-bold text-text-primary mb-5 text-2xl">{title}</h2>

        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onToggleFilter={toggleFilterModal}
          isFilterOpen={isFilterModalOpen}
          onFilterChange={handleFilterChange}
          currentFilters={currentFilters}
        />

        <FilterSummary
          resultCount={totalResults}
          filterCount={activeFiltersCount}
        />
      </div>

      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      <div className="flex-1 overflow-y-auto">
        {loading && isInitialLoad ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <>
            {loading && !isInitialLoad && (
              <div className="px-4 py-2 bg-primary-50">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-primary-600">Loading...</span>
                </div>
              </div>
            )}
            <div
              className={
                loading && !isInitialLoad
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <CharacterList
                title="Starred Characters"
                characters={currentFavorites}
                selectedId={selectedId}
                isFavorite={true}
                onCharacterClick={handleCharacterSelect}
                onFavoriteClick={toggleFavorite}
              />

              <CharacterList
                title="Characters"
                characters={nonFavoriteCharacters}
                selectedId={selectedId}
                isFavorite={false}
                onCharacterClick={handleCharacterSelect}
                onFavoriteClick={toggleFavorite}
              />
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <Pagination
          info={info}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
