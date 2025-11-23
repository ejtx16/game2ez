import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import type { Game } from "@/types";
import BackButton from "@/components/BackButton";

interface GamePageProps {
  params: Promise<{ id: string }>;
}

const getCachedGame = (gameId: number) =>
  unstable_cache(
    async () => {
      const apiKey = process.env.BALLDONTLIE_API_KEY;
      const apiUrl = process.env.BALLDONTLIE_API_URL || 'https://api.balldontlie.io/v1';

      if (!apiKey) {
        throw new Error("BallDontLie API key is not configured");
      }

      const response = await fetch(`${apiUrl}/games/${gameId}`, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`BallDontLie API error: ${response.status} ${response.statusText}`);
      }

      const response_data = await response.json();
      const data = response_data.data;

      console.log("BallDontLie API Response:", JSON.stringify(data, null, 2));

      const game: Game = {
        id: data.id,
        date: data.date,
        season: data.season,
        status: data.status,
        period: data.period,
        time: data.time,
        postseason: data.postseason,
        home_team_score: data.home_team_score,
        visitor_team_score: data.visitor_team_score,
        datetime: data.datetime,

        home_q1: data.home_q1,
        home_q2: data.home_q2,
        home_q3: data.home_q3,
        home_q4: data.home_q4,
        home_ot1: data.home_ot1,
        home_ot2: data.home_ot2,
        home_ot3: data.home_ot3,

        visitor_q1: data.visitor_q1,
        visitor_q2: data.visitor_q2,
        visitor_q3: data.visitor_q3,
        visitor_q4: data.visitor_q4,
        visitor_ot1: data.visitor_ot1,
        visitor_ot2: data.visitor_ot2,
        visitor_ot3: data.visitor_ot3,

        home_team_id: data.home_team?.id,
        home_team_conference: data.home_team?.conference,
        home_team_division: data.home_team?.division,
        home_team_city: data.home_team?.city,
        home_team_name: data.home_team?.name,
        home_team_full_name: data.home_team?.full_name,
        home_team_abbreviation: data.home_team?.abbreviation,

        visitor_team_id: data.visitor_team?.id,
        visitor_team_conference: data.visitor_team?.conference,
        visitor_team_division: data.visitor_team?.division,
        visitor_team_city: data.visitor_team?.city,
        visitor_team_name: data.visitor_team?.name,
        visitor_team_full_name: data.visitor_team?.full_name,
        visitor_team_abbreviation: data.visitor_team?.abbreviation,
      };

      return game;
    },
    ["nba-game-details", gameId.toString()],
    {
      revalidate: 600,
      tags: ["game-details", `game-${gameId}`],
    }
  )();

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const gameId = parseInt(id);

  if (isNaN(gameId)) {
    notFound();
  }

  const game = await getCachedGame(gameId);

  if (!game) {
    notFound();
  }

  const gameDate = new Date(game.date);
  const formattedDate = gameDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const quarters = [
    { label: "Q1", home: game.home_q1, visitor: game.visitor_q1 },
    { label: "Q2", home: game.home_q2, visitor: game.visitor_q2 },
    { label: "Q3", home: game.home_q3, visitor: game.visitor_q3 },
    { label: "Q4", home: game.home_q4, visitor: game.visitor_q4 },
  ];

  if (game.home_ot1 !== null || game.visitor_ot1 !== null) {
    quarters.push({ label: "OT1", home: game.home_ot1, visitor: game.visitor_ot1 });
  }
  if (game.home_ot2 !== null || game.visitor_ot2 !== null) {
    quarters.push({ label: "OT2", home: game.home_ot2, visitor: game.visitor_ot2 });
  }
  if (game.home_ot3 !== null || game.visitor_ot3 !== null) {
    quarters.push({ label: "OT3", home: game.home_ot3, visitor: game.visitor_ot3 });
  }

  const isVisitorWin = game.visitor_team_score && game.home_team_score && game.visitor_team_score > game.home_team_score;
  const isHomeWin = game.home_team_score && game.visitor_team_score && game.home_team_score > game.visitor_team_score;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <BackButton />

        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Game Details</h1>
            {game.postseason && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-500/15 px-3 py-1 rounded border border-yellow-500/20 w-fit">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                PLAYOFFS
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base text-zinc-600 dark:text-zinc-300">{formattedDate}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-500 dark:text-zinc-500">Season {game.season}</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span
                className={`font-semibold ${
                  game.status === "Final" ? "text-orange-600 dark:text-orange-500" : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {game.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-6 mb-6 shadow-lg">
          <div className="space-y-4">
            <div
              className={`flex items-center justify-between p-4 md:p-5 rounded-lg transition-all ${
                isVisitorWin
                  ? "bg-green-500/10 border-2 border-green-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Visitor</span>
                  {isVisitorWin && (
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/20 px-1.5 py-0.5 rounded">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      WIN
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-0.5">
                  {game.visitor_team_full_name || game.visitor_team_name}
                </h2>
                <p className="text-sm md:text-base font-semibold text-orange-600 dark:text-orange-500">{game.visitor_team_abbreviation}</p>
              </div>
              <div
                className={`text-4xl md:text-5xl font-black tabular-nums ${
                  isVisitorWin ? "text-green-600 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {game.visitor_team_score ?? "-"}
              </div>
            </div>

            <div className="flex items-center justify-center py-1">
              <span className="text-zinc-400 dark:text-zinc-600 font-bold text-sm">VS</span>
            </div>

            <div
              className={`flex items-center justify-between p-4 md:p-5 rounded-lg transition-all ${
                isHomeWin
                  ? "bg-green-500/10 border-2 border-green-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Home</span>
                  {isHomeWin && (
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/20 px-1.5 py-0.5 rounded">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      WIN
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-0.5">
                  {game.home_team_full_name || game.home_team_name}
                </h2>
                <p className="text-sm md:text-base font-semibold text-orange-600 dark:text-orange-500">{game.home_team_abbreviation}</p>
              </div>
              <div
                className={`text-4xl md:text-5xl font-black tabular-nums ${
                  isHomeWin ? "text-green-600 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {game.home_team_score ?? "-"}
              </div>
            </div>
          </div>
        </div>

        {quarters.some((q) => q.home !== null || q.visitor !== null) && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-5 mb-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h2 className="text-lg md:text-xl font-bold">Quarter Breakdown</h2>
            </div>
            <div className="overflow-x-auto -mx-2 md:mx-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-300 dark:border-zinc-700">
                    <th className="text-left py-2 px-2 md:px-3 text-zinc-500 dark:text-zinc-400 font-semibold uppercase text-xs tracking-wider">
                      Team
                    </th>
                    {quarters.map((q) => (
                      <th
                        key={q.label}
                        className="text-center py-2 px-1.5 md:px-2 text-zinc-500 dark:text-zinc-400 font-semibold uppercase text-xs tracking-wider"
                      >
                        {q.label}
                      </th>
                    ))}
                    <th className="text-center py-2 px-2 md:px-3 text-orange-600 dark:text-orange-500 font-bold uppercase text-xs tracking-wider">
                      Final
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b border-zinc-200 dark:border-zinc-800 transition-colors ${isVisitorWin ? "bg-green-500/5" : ""}`}>
                    <td className="py-3 px-2 md:px-3 font-bold text-zinc-900 dark:text-white text-sm">{game.visitor_team_abbreviation}</td>
                    {quarters.map((q) => (
                      <td
                        key={q.label}
                        className="text-center py-3 px-1.5 md:px-2 text-zinc-700 dark:text-zinc-300 font-medium tabular-nums"
                      >
                        {q.visitor ?? "-"}
                      </td>
                    ))}
                    <td
                      className={`text-center py-3 px-2 md:px-3 font-black text-base md:text-lg tabular-nums ${
                        isVisitorWin ? "text-green-600 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {game.visitor_team_score ?? "-"}
                    </td>
                  </tr>
                  <tr className={`transition-colors ${isHomeWin ? "bg-green-500/5" : ""}`}>
                    <td className="py-3 px-2 md:px-3 font-bold text-zinc-900 dark:text-white text-sm">{game.home_team_abbreviation}</td>
                    {quarters.map((q) => (
                      <td
                        key={q.label}
                        className="text-center py-3 px-1.5 md:px-2 text-zinc-700 dark:text-zinc-300 font-medium tabular-nums"
                      >
                        {q.home ?? "-"}
                      </td>
                    ))}
                    <td
                      className={`text-center py-3 px-2 md:px-3 font-black text-base md:text-lg tabular-nums ${
                        isHomeWin ? "text-green-600 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {game.home_team_score ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg md:text-xl font-bold">Game Information</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Status</div>
              <div
                className={`text-base font-bold ${
                  game.status === "Final" ? "text-orange-600 dark:text-orange-500" : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {game.status}
              </div>
            </div>
            {game.period !== null && (
              <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Period</div>
                <div className="text-base font-bold text-zinc-900 dark:text-white">{game.period}</div>
              </div>
            )}
            {game.time && (
              <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Time</div>
                <div className="text-base font-bold text-zinc-900 dark:text-white">{game.time}</div>
              </div>
            )}
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Season</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white">{game.season}</div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50">
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Game Type</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white">{game.postseason ? "Postseason" : "Regular Season"}</div>
            </div>
            {game.datetime && (
              <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-300 dark:border-zinc-700/50 col-span-2 sm:col-span-1">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Date & Time</div>
                <div className="text-base font-bold text-zinc-900 dark:text-white">{new Date(game.datetime).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
