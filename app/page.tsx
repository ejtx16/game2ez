'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Hero Banner with Diagonal Split */}
      <div className="relative bg-gray-100 dark:bg-zinc-900">
        {/* Mobile: Stacked Layout / Desktop: Diagonal Split */}
        <div className="md:relative md:h-[600px] md:overflow-hidden">
          {/* Diagonal Section */}
          <div
            className="md:absolute md:inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 [clip-path:none] md:[clip-path:polygon(0_0,68%_0,48%_100%,0_100%)]"
          >
            <div
              className="relative md:h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-0 max-w-2xl text-zinc-900 dark:text-zinc-50"
            >
            {/* Season Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 w-fit text-zinc-600 dark:text-zinc-400"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              2024-25 NBA SEASON
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-3 sm:mb-4 tracking-tight">
              TRACK THE
              <br />
              <span className="text-orange-500">GAME</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-md md:max-w-lg text-zinc-600 dark:text-zinc-400">
              Real-time stats, player analytics, and team performance metrics at your fingertips
            </p>

            {/* Stats Preview */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">30</span>
                <span className="text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-500">Teams</span>
              </div>
              <div className="w-px bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">450+</span>
                <span className="text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-500">Players</span>
              </div>
              <div className="w-px bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-orange-500">LIVE</span>
                <span className="text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-500">Updates</span>
              </div>
            </div>

            <a
              href="/teams"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-md transition-all w-fit font-semibold text-sm sm:text-base bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500"
            >
              <span>Explore Stats</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

          {/* Stats Cards Section */}
          <div className="relative md:absolute md:right-0 md:top-0 md:h-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-lg">
            {/* Top Scorer Card */}
            <div
              className="backdrop-blur-sm rounded-lg p-4 sm:p-6 transition-colors bg-white/80 border border-gray-200 hover:bg-white dark:bg-zinc-800/80 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <div className="text-xs uppercase tracking-wider mb-2 text-zinc-600 dark:text-zinc-500">
                Top Scorer
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-1 text-zinc-900 dark:text-zinc-50">35.2</div>
              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">PPG Average</div>
            </div>

            {/* Rebounds Card */}
            <div
              className="backdrop-blur-sm rounded-lg p-4 sm:p-6 transition-colors bg-white/80 border border-gray-200 hover:bg-white dark:bg-zinc-800/80 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <div className="text-xs uppercase tracking-wider mb-2 text-zinc-600 dark:text-zinc-500">
                Rebounds
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-1 text-zinc-900 dark:text-zinc-50">12.8</div>
              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">RPG Leader</div>
            </div>

            {/* Assists Card */}
            <div
              className="backdrop-blur-sm rounded-lg p-4 sm:p-6 transition-colors bg-white/80 border border-gray-200 hover:bg-white dark:bg-zinc-800/80 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <div className="text-xs uppercase tracking-wider mb-2 text-zinc-600 dark:text-zinc-500">Assists</div>
              <div className="text-xl sm:text-2xl font-bold mb-1 text-zinc-900 dark:text-zinc-50">10.9</div>
              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">APG Leader</div>
            </div>

            {/* Win Rate Card */}
            <div
              className="rounded-lg p-4 sm:p-6 transition-all bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600"
            >
              <div className="text-xs uppercase tracking-wider mb-2 text-orange-100 dark:text-orange-200">
                Win Rate
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">75%</div>
              <div className="text-xs sm:text-sm text-orange-50 dark:text-orange-100">Top Team</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto">
          <a
            href="/favorites"
            className="group px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg transition-all shadow-lg font-semibold flex items-center justify-center gap-2 text-sm sm:text-base bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 hover:shadow-orange-400/50 dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-500 dark:hover:to-orange-400 dark:hover:shadow-orange-500/50"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            View Favorites
          </a>
          <a
            href="/teams"
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all border font-semibold flex items-center justify-center gap-2 text-sm sm:text-base bg-white text-zinc-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            View Teams
          </a>
          <a
            href="/profile"
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all border font-semibold flex items-center justify-center gap-2 text-sm sm:text-base bg-white text-zinc-900 hover:bg-gray-50 border-gray-300 hover:border-gray-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
