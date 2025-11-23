"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Banner with Diagonal Split */}
      <div className="relative bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        {/* Mobile: Stacked Layout / Desktop: Diagonal Split */}
        <div className="md:relative md:h-[650px] md:overflow-hidden">
          {/* Diagonal Section */}
          <div className="md:absolute md:inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 [clip-path:none] md:[clip-path:polygon(0_0,65%_0,45%_100%,0_100%)]">
            <div className="relative md:h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-0 max-w-2xl text-zinc-900 dark:text-zinc-50">
              {/* Season Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold mb-6 sm:mb-8 w-fit text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-full border border-zinc-200 dark:border-zinc-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
                2024-25 NBA SEASON
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-5 sm:mb-6 tracking-tighter">
                <span className="block">TRACK YOUR</span>
                <span className="block text-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  FAVORITE PLAYER
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-md md:max-w-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Real-time stats, player analytics, and team performance metrics at your fingertips
              </p>

              {/* Stats Preview */}
              <div className="flex flex-wrap gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50">30</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500">Teams</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50">450+</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500">Players</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-500">LIVE</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500">Updates</span>
                </div>
              </div>

              <a
                href="/teams"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 w-fit font-bold text-base sm:text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
              >
                <span>Explore Stats</span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Cards Section */}
          <div className="relative md:absolute md:right-0 md:top-0 md:h-full md:w-1/2 flex items-center justify-center px-6 sm:px-8 md:px-12 py-12 md:py-0">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full max-w-xl">
              {/* Top Scorer Card */}
              <div className="group backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 bg-white/90 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 dark:bg-zinc-800/90 dark:border-zinc-700/50 dark:hover:bg-zinc-800 dark:hover:shadow-xl dark:hover:shadow-zinc-900/50">
                <div className="text-xs sm:text-sm uppercase tracking-widest mb-3 font-bold text-zinc-500 dark:text-zinc-500">
                  Top Scorer
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors">
                  35.2
                </div>
                <div className="text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-400">PPG Average</div>
              </div>

              {/* Rebounds Card */}
              <div className="group backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 bg-white/90 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 dark:bg-zinc-800/90 dark:border-zinc-700/50 dark:hover:bg-zinc-800 dark:hover:shadow-xl dark:hover:shadow-zinc-900/50">
                <div className="text-xs sm:text-sm uppercase tracking-widest mb-3 font-bold text-zinc-500 dark:text-zinc-500">Rebounds</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors">
                  12.8
                </div>
                <div className="text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-400">RPG Leader</div>
              </div>

              {/* Assists Card */}
              <div className="group backdrop-blur-md rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 bg-white/90 border border-gray-200/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 dark:bg-zinc-800/90 dark:border-zinc-700/50 dark:hover:bg-zinc-800 dark:hover:shadow-xl dark:hover:shadow-zinc-900/50">
                <div className="text-xs sm:text-sm uppercase tracking-widest mb-3 font-bold text-zinc-500 dark:text-zinc-500">Assists</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-zinc-900 dark:text-zinc-50 group-hover:text-orange-500 transition-colors">
                  10.9
                </div>
                <div className="text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-400">APG Leader</div>
              </div>

              {/* Win Rate Card */}
              <div className="group rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 dark:hover:from-orange-500 dark:hover:via-orange-600 dark:hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1">
                <div className="text-xs sm:text-sm uppercase tracking-widest mb-3 font-bold text-orange-100 dark:text-orange-200">
                  Win Rate
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">75%</div>
                <div className="text-sm sm:text-base font-semibold text-orange-50 dark:text-orange-100">Top Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto">
          <a
            href="/favorites"
            className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 text-white rounded-lg transition-all duration-300 shadow-lg font-semibold flex items-center justify-center gap-2.5 text-sm sm:text-base bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 hover:shadow-xl hover:shadow-orange-400/30 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 dark:hover:from-orange-500 dark:hover:via-orange-600 dark:hover:to-orange-700 dark:hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="relative z-10">View Favorites</span>
          </a>
          <a
            href="/mybag"
            className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all duration-300 border-2 font-semibold flex items-center justify-center gap-2.5 text-sm sm:text-base bg-white text-zinc-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>My Bag</span>
          </a>
          <a
            href="/teams"
            className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all duration-300 border-2 font-semibold flex items-center justify-center gap-2.5 text-sm sm:text-base bg-white text-zinc-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>View Teams</span>
          </a>
          <a
            href="/profile"
            className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all duration-300 border-2 font-semibold flex items-center justify-center gap-2.5 text-sm sm:text-base bg-white text-zinc-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>View Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}
