import { FC } from "react";
import { CharacterListItem } from "@/presentation/components/molecules";
import { CharacterListProps } from "./CharacterList.types";

export const CharacterList: FC<CharacterListProps> = ({
  title,
  characters,
  selectedId,
  isFavorite,
  onCharacterClick,
  onFavoriteClick,
}) => {
  return (
    <>
      <div className="px-4 pt-3 pb-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title} ({characters.length})
        </p>
      </div>
      <div>
        {characters.map((character, index) => (
          <div
            key={character.id}
            className={
              index < characters.length - 1 ? "border-b border-gray-100" : ""
            }
          >
            <CharacterListItem
              character={character}
              isFavorite={isFavorite}
              isSelected={selectedId === character.id}
              onFavoriteClick={onFavoriteClick}
              onClick={() => onCharacterClick(character)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
