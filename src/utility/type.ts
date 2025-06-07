import type { Game } from "../Pages/Home";

export interface StateType {
  data: Game[] | null;
  loading: boolean;
  error: string | null;
  setData: (data: Game[]|null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  platforms: string[];
  setPlatforms: (data: Game[]|null) => string[];
  search: string;
  setSearch: (search: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
  filteredGames: (data: Game[]|null, search: string, platform: string) => void;
  filterGames: Game[];
  favorites: Game[];
  showFavorites: boolean;
  setShowFavorites: (val: boolean) => void;
  toggleFavorite: (game: Game) => void;
  loadFavorites: () => void;
}
