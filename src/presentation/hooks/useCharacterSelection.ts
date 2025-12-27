import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCharacterStore,
  useUIStore,
  useFavoritesStore,
} from "@/presentation/store";
import { Character } from "@/domain/entities/Character";

export const useCharacterSelection = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const {
    characters,
    currentCharacter,
    fetchCharacterById,
    clearCurrentCharacter,
  } = useCharacterStore();
  const { error } = useUIStore();
  const { favorites } = useFavoritesStore();

  const initialMountRef = useRef(true);
  const initialIdRef = useRef(id);
  const previousIsMobileRef = useRef(window.innerWidth < 1024);

  const selectedId = id;

  // Detect screen size changes and navigate to /character when going from desktop to mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const wasDesktop = !previousIsMobileRef.current;

      if (isMobile && wasDesktop && id) {
        navigate("/character", { replace: true });
      }

      previousIsMobileRef.current = isMobile;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id, navigate]);

  // Fetch character if ID exists
  useEffect(() => {
    if (id) {
      fetchCharacterById(id).catch(() => {
        navigate("/not-found", { replace: true });
      });
    } else {
      clearCurrentCharacter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (
      initialMountRef.current &&
      !initialIdRef.current &&
      characters.length > 0
    ) {
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        navigate(`/character/${characters[0].id}`, { replace: true });
      }
      initialMountRef.current = false;
    }
  }, [characters.length, navigate]);

  useEffect(() => {
    if (error && id) {
      navigate("/not-found", { replace: true });
    }
  }, [error, id, navigate]);

  const handleCharacterSelect = (character: Character) => {
    navigate(`/character/${character.id}`);
  };

  const isFavorite = currentCharacter
    ? favorites.some((fav) => fav.id === currentCharacter.id)
    : false;

  return {
    selectedId,
    currentCharacter,
    handleCharacterSelect,
    isFavorite,
  };
};
