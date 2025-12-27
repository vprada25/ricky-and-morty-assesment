import { FC } from "react";
import { useParams } from "react-router-dom";
import { CharacterSidebar } from "@presentation/components/organisms/CharacterSidebar";
import { CharacterDetailPanel } from "@presentation/components/organisms/CharacterDetailPanel";

export const HomePage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen">
          {/* Show sidebar on desktop always, on mobile only when no character is selected */}
          <div
            className={`${
              id ? "hidden lg:block" : "block"
            } lg:col-span-5 xl:col-span-4`}
          >
            <CharacterSidebar title="Rick and Morty list" />
          </div>

          {/* Show detail panel: always on desktop, only when ID exists on mobile */}
          <div
            className={`${
              id ? "block" : "hidden lg:block"
            } lg:col-span-7 xl:col-span-8 bg-white px-4 lg:px-32 py-8 overflow-y-auto`}
          >
            <CharacterDetailPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
