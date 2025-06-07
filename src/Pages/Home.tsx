import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../utility/store";

export interface Game {
  id: number;
  thumbnail: string;
  title: string;
  platform: string;
  genre: string;
  developer?: string;
  publisher?: string;
  release_date?: string;
  short_description?: string;
  game_url: string;
  freetogame_profile_url?: string;
}

const Home = () => {
  const {
    data,
    loading,
    filterGames,
    error,
    favorites,
    toggleFavorite,
    showFavorites,
    setShowFavorites,
    loadFavorites,
  } = useStore();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const totalPages = Math.ceil(filterGames.length / pageSize);
  const paginatedGames = filterGames.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const gamesToShow = showFavorites ? favorites : paginatedGames;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-2">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[300px] mt-8">
          <svg
            className="animate-spin h-12 w-12 text-gray-400 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="text-gray-500 text-lg font-medium">
            Loading games...
          </span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center min-h-[200px] mt-8">
          <svg
            className="h-12 w-12 text-red-400 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-500 text-center text-lg font-semibold">
            Oops! {error}
          </p>
          <p className="text-gray-500 text-center mt-1">
            Something went wrong while loading the games. Please try again
            later.
          </p>
        </div>
      )}
      {/* show favorite button */}
      <div className="flex items-center justify-end max-w-6xl mx-auto mt-2 mb-2">
        {!loading && <button
          className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-semibold transition bg-white shadow-sm border border-gray-200 hover:bg-gray-100 ${
            showFavorites ? "text-pink-600" : "text-gray-700"
          }`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? (
            <svg
              className="w-5 h-5 text-pink-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          )}
          {showFavorites ? "View All Games" : "View Favorites"}
        </button>}
      </div>
      {/* game grid display and favorite */}
      {Array.isArray(data) && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
            {gamesToShow.map((game: Game) => {
              const isFavorite = favorites.some(
                (fav: Game) => fav.id === game.id
              );
              return (
                <motion.div
                  className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden min-h-[340px] cursor-pointer hover:shadow-xl transition-shadow duration-200 relative"
                  key={game.id}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setSelectedGame(game)}
                >
                    {/* favorite button */}
                  <button
                    className="absolute top-3 right-3 z-10 cursor-pointer bg-white/80 rounded-full p-2 shadow hover:bg-pink-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game);
                    }}
                    aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                  >
                    {isFavorite ? (
                      <svg
                        className="w-6 h-6 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                    )}
                  </button>
                  {/* game image */}
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-44 object-cover bg-gray-200"
                  />
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <h3 className="text-base font-bold text-gray-800 mb-2 truncate">
                      {game.title}
                    </h3>
                    <div className="flex gap-2 text-xs mt-auto">
                      <span className="bg-gray-100 rounded px-2 py-1 font-medium text-gray-700">
                        {game.platform}
                      </span>
                      <span className="bg-gray-200 rounded px-2 py-1 font-medium text-gray-700">
                        {game.genre}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* show pagination when not viewing favorite */}
          {!showFavorites && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="px-3 py-1 cursor-pointer rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="mx-2 text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1 cursor-pointer rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-0 relative flex flex-col items-center overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-700 text-3xl font-bold z-10"
                onClick={() => setSelectedGame(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="w-full h-56 bg-gradient-to-tr from-gray-200 to-gray-100 flex items-center justify-center">
                <img
                  src={selectedGame.thumbnail}
                  alt={selectedGame.title}
                  className="h-48 w-48 object-cover rounded-2xl shadow-lg border-4 border-white -mt-8"
                />
              </div>
              <div className="w-full flex flex-col items-center px-6 py-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
                  {selectedGame.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <span className="bg-gray-100 rounded px-3 py-1 font-medium text-gray-700 text-xs">
                    {selectedGame.platform}
                  </span>
                  <span className="bg-gray-200 rounded px-3 py-1 font-medium text-gray-700 text-xs">
                    {selectedGame.genre}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-2 mb-4">
                  {selectedGame.developer && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-semibold text-sm">
                        Developer:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {selectedGame.developer}
                      </span>
                    </div>
                  )}
                  {selectedGame.publisher && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-semibold text-sm">
                        Publisher:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {selectedGame.publisher}
                      </span>
                    </div>
                  )}
                  {selectedGame.release_date && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-semibold text-sm">
                        Release Date:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {selectedGame.release_date}
                      </span>
                    </div>
                  )}
                  {selectedGame.short_description && (
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-gray-500 font-semibold text-sm">
                        Description:
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {selectedGame.short_description}
                      </span>
                    </div>
                  )}
                </div>
                <a
                  href={selectedGame?.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block w-full text-center bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold py-3 rounded-xl hover:from-gray-700 hover:to-gray-900 transition text-lg shadow-md"
                >
                  Play Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
