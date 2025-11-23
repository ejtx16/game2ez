"use client";

import Link from "next/link";

export default function MyBagPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 backdrop-blur-sm rounded-full border border-orange-300 dark:border-orange-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
              COMING SOON
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter">
              <span className="block text-zinc-900 dark:text-zinc-50">MY BAG</span>
              <span className="block text-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                IS ON THE WAY
              </span>
            </h1>

            {/* Money Bag Icon */}
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 dark:bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative animate-bounce">
                  <svg
                    className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 12C28 12 26 14 24 16C22 18 20 20 16 20C14 20 12 18 12 16C12 12 16 8 20 8C22 8 24 9 26 10C28 11 30 12 32 12Z"
                      className="fill-orange-500 dark:fill-orange-600"
                    />
                    <path
                      d="M32 12C36 12 38 14 40 16C42 18 44 20 48 20C50 20 52 18 52 16C52 12 48 8 44 8C42 8 40 9 38 10C36 11 34 12 32 12Z"
                      className="fill-orange-500 dark:fill-orange-600"
                    />
                    <ellipse cx="32" cy="40" rx="20" ry="24" className="fill-orange-500 dark:fill-orange-600" />
                    <path
                      d="M32 20C20 20 12 28 12 40C12 52 20 60 32 60C44 60 52 52 52 40C52 28 44 20 32 20Z"
                      className="fill-orange-500 dark:fill-orange-600"
                    />
                    <text x="32" y="46" fontSize="24" fontWeight="bold" textAnchor="middle" className="fill-white">
                      $
                    </text>
                    <ellipse cx="24" cy="32" rx="6" ry="8" fill="white" opacity="0.3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Save your favorite player points
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 dark:text-orange-400 leading-relaxed">
                just like your piggy bank
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Track and accumulate your favorite players&apos; performance points over time. Watch your collection grow with every game!
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 max-w-3xl mx-auto">
              <div className="backdrop-blur-md rounded-2xl p-6 sm:p-8 bg-white/90 border border-gray-200/50 dark:bg-zinc-800/90 dark:border-zinc-700/50">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" className="fill-orange-500 dark:fill-orange-600" />
                    <rect x="3" y="14" width="7" height="7" rx="1" className="fill-orange-500 dark:fill-orange-600" />
                    <rect x="14" y="3" width="7" height="7" rx="1" className="fill-orange-500 dark:fill-orange-600" />
                    <rect x="14" y="14" width="7" height="7" rx="1" className="fill-orange-500 dark:fill-orange-600" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-50">Track Points</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Accumulate player stats</p>
              </div>

              <div className="backdrop-blur-md rounded-2xl p-6 sm:p-8 bg-white/90 border border-gray-200/50 dark:bg-zinc-800/90 dark:border-zinc-700/50">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" className="stroke-orange-500 dark:stroke-orange-600" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" className="stroke-orange-500 dark:stroke-orange-600" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" className="fill-orange-500 dark:fill-orange-600" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-50">Set Goals</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Create milestones</p>
              </div>

              <div className="backdrop-blur-md rounded-2xl p-6 sm:p-8 bg-white/90 border border-gray-200/50 dark:bg-zinc-800/90 dark:border-zinc-700/50">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      className="fill-orange-500 dark:fill-orange-600"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-50">Earn Rewards</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Unlock achievements</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 w-fit font-bold text-base sm:text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
