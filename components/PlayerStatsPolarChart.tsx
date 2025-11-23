"use client";

import { useMemo } from "react";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import type { Stats } from "@/types";

ChartJS.register(RadialLinearScale, ArcElement, Title, Tooltip, Legend);

interface PlayerStatsPolarChartProps {
  stats: Stats[];
}

export default function PlayerStatsPolarChart({ stats }: PlayerStatsPolarChartProps) {
  const chartData = useMemo(() => {
    if (!stats || stats.length === 0) {
      return null;
    }

    const totalStats = stats.reduce(
      (acc, stat) => ({
        pts: acc.pts + (stat.pts || 0),
        reb: acc.reb + (stat.reb || 0),
        ast: acc.ast + (stat.ast || 0),
        stl: acc.stl + (stat.stl || 0),
        blk: acc.blk + (stat.blk || 0),
      }),
      { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 }
    );

    const gamesCount = stats.length;
    const avgStats = {
      pts: totalStats.pts / gamesCount,
      reb: totalStats.reb / gamesCount,
      ast: totalStats.ast / gamesCount,
      stl: totalStats.stl / gamesCount,
      blk: totalStats.blk / gamesCount,
    };

    return {
      labels: ["Points", "Rebounds", "Assists", "Steals", "Blocks"],
      datasets: [
        {
          label: "Average Per Game",
          data: [avgStats.pts, avgStats.reb, avgStats.ast, avgStats.stl, avgStats.blk],
          backgroundColor: [
            "rgba(255, 193, 60, 0.7)",
            "rgba(255, 154, 19, 0.7)",
            "rgba(217, 95, 14, 0.7)",
            "rgba(255, 77, 0, 0.7)",
            "rgba(255, 0, 0, 0.7)",
          ],
          borderColor: [
            "rgba(255, 193, 60, 1)",
            "rgba(255, 154, 19, 1)",
            "rgba(217, 95, 14, 1)",
            "rgba(255, 77, 0, 1)",
            "rgba(255, 0, 0, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [stats]);

  const options: ChartOptions<"polarArea"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          pointLabels: {
            color: "rgb(161, 161, 170)",
            font: {
              size: 13,
              weight: 500,
            },
          },
          grid: {
            color: "rgba(161, 161, 170, 0.2)",
          },
          ticks: {
            color: "rgb(161, 161, 170)",
            font: {
              size: 11,
            },
            backdropColor: "transparent",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "rgb(161, 161, 170)",
            padding: 15,
            font: {
              size: 12,
              weight: 500,
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        title: {
          display: true,
          text: "Player Performance Overview",
          color: "rgb(113, 113, 122)",
          font: {
            size: 16,
            weight: "bold" as const,
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(24, 24, 27, 0.95)",
          titleColor: "rgb(255, 255, 255)",
          bodyColor: "rgb(228, 228, 231)",
          borderColor: "rgba(63, 63, 70, 0.5)",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed.r || 0;
              return ` ${label}: ${value.toFixed(1)}`;
            },
          },
        },
      },
    }),
    []
  );

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50/50 dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-zinc-800">
        <p className="text-gray-500 dark:text-zinc-500">No stats data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg">
      <div className="h-96">
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
}
