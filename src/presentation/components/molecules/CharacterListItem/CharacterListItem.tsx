import { FC } from "react";
import { Character } from "@domain/entities/Character";

interface CharacterListItemProps {
  character: Character;
  isFavorite: boolean;
  isSelected?: boolean;
  onFavoriteClick: (character: Character) => void;
  onClick: () => void;
}

export const CharacterListItem: FC<CharacterListItemProps> = ({
  character,
  isFavorite,
  isSelected,
  onFavoriteClick,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 mx-2 cursor-pointer transition-all rounded-lg ${
        isSelected ? "bg-purple-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {character.status === "Alive" && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-600 rounded-full border-2 border-white"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-text-primary truncate">
          {character.name}
        </h3>
        <p className="text-xs text-text-secondary truncate">
          {character.species}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick(character);
        }}
        className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <svg
            className="w-4 h-4 text-secondary-600 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-400 hover:text-secondary-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
