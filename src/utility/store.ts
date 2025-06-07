import { create } from "zustand";
import type { StateType } from "./type";
import type { Game } from "../Pages/Home";

export const useStore = create<StateType>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  setData: (data: Game[]|null) => set(() => ({ data })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
  setError: (error: string | null) => set(() => ({ error })),
  setPlatforms: (data: Game[]|null): string[] => {
    if (!Array.isArray(data)) return [];
    const all = data
      .map((g: Game) => g.platform.split(","))
      .flat()
      .map((p: string) => p.trim());
    const uniquePlatforms = Array.from(new Set(all));
    set(() => ({ platforms: uniquePlatforms }));
    return uniquePlatforms;
  },
  platforms: [],
  search: "",
  setSearch: (search: string) => set(() => ({ search })),
  platform: "",
  setPlatform: (platform: string) => set(() => ({ platform: platform })),
  filterGames: [],
  filteredGames: (data: Game[]|null, search: string, platform: string) => {
    if (!Array.isArray(data)) return [];
    const filterGame = data.filter((game: Game) => {
      const matchesName = game.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPlatform = platform
        ? game.platform.toLowerCase().includes(platform.toLowerCase())
        : true;
      return matchesName && matchesPlatform;
    });
    set({ filterGames: filterGame });
  },
  favorites: [],
  showFavorites: false,
  setShowFavorites: (val: boolean) => set(() => ({ showFavorites: val })),
  toggleFavorite: (game: Game) => {
    const { favorites } = get();
    const exists = favorites.some((g: Game) => g.id === game.id);
    let updated;
    if (exists) {
      updated = favorites.filter((g: Game) => g.id !== game.id);
    } else {
      updated = [...favorites, game];
    }
    set(() => ({ favorites: updated }));
    localStorage.setItem("favorites", JSON.stringify(updated));
  },
  loadFavorites: () => {
    const favs = localStorage.getItem("favorites");
    if (favs) set(() => ({ favorites: JSON.parse(favs) }));
  },
}));
