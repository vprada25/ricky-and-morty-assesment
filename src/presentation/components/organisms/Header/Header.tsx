import { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-text-primary">
              Rick and Morty list
            </h1>
          </Link>

          <div className="flex gap-4">
            <Link
              to="/"
              className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm"
            >
              Characters
            </Link>
            <Link
              to="/favorites"
              className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm"
            >
              Favorites
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
