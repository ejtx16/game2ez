import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PlayerLoadingSkeleton() {
	return (
		<div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-white animate-pulse">
			{/* Hero Section with Gradient Background */}
			<div className="relative bg-gradient-to-b from-gray-50 via-gray-50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<div className="container mx-auto px-4 py-6">
					{/* Back Button */}
					<Link
						href="/teams"
						className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-orange-500 transition-colors mb-6"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="font-medium">Back to Teams</span>
					</Link>

					{/* Player Header Skeleton */}
					<div className="flex flex-col lg:flex-row items-start gap-8 pb-8">
						<div className="flex items-start gap-8 flex-1">
							{/* Avatar Skeleton */}
							<div className="relative">
								<div className="w-32 h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
								<div className="absolute -bottom-3 -right-3 bg-gray-300 dark:bg-zinc-700 w-16 h-9 rounded-lg"></div>
							</div>

							{/* Player Info Skeleton */}
							<div className="flex-1 pt-2">
								<div className="mb-3 space-y-3">
									<div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg w-3/4"></div>
									<div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-24"></div>
								</div>

								{/* Team Info Skeleton */}
								<div className="flex items-start gap-3 mt-6">
									<div className="h-px flex-1 bg-gradient-to-r from-gray-300 dark:from-zinc-700 to-transparent my-3"></div>
									<div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg w-48"></div>
									<div className="h-px flex-1 bg-gradient-to-l from-gray-300 dark:from-zinc-700 to-transparent my-3"></div>
								</div>
							</div>
						</div>

						{/* Stats Summary Skeleton */}
						<div className="lg:pt-2">
							<div className="flex flex-col sm:flex-row lg:flex-col gap-4">
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-4 w-full sm:w-32"
									>
										<div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-16 mb-3"></div>
										<div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-12 mb-2"></div>
										<div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-20"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-12">
				{/* Section Header Skeleton */}
				<div className="mb-8">
					<div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-64 mb-2"></div>
					<div className="h-1 w-20 bg-gray-300 dark:bg-zinc-700 rounded-full"></div>
				</div>

				{/* Information Grid Skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
					{/* Physical Stats Card Skeleton */}
					<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg">
						<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
							<div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
							<div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
						</div>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg"
								>
									<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
									<div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-12"></div>
								</div>
							))}
						</div>
					</div>

					{/* Background Card Skeleton */}
					<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg">
						<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
							<div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
							<div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
						</div>
						<div className="space-y-4">
							{[1, 2].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg"
								>
									<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
									<div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-24"></div>
								</div>
							))}
						</div>
					</div>

					{/* Draft Info Card Skeleton */}
					<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg">
						<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
							<div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
							<div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-24"></div>
						</div>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg"
								>
									<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-20"></div>
									<div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-12"></div>
								</div>
							))}
						</div>
					</div>

					{/* Recent Games Card Skeleton */}
					<div className="md:col-span-2 lg:col-span-3 xl:col-span-1">
						<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg h-full">
							<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
								<div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
								<div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-32"></div>
							</div>
							<div className="space-y-3">
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className="bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg p-3"
									>
										<div className="flex items-center justify-between mb-2">
											<div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
											<div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-8"></div>
										</div>
										<div className="flex items-center justify-between">
											<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-20"></div>
											<div className="flex gap-2">
												<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-8"></div>
												<div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-8"></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Player Statistics Section Skeleton */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
						<div>
							<div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-48 mb-2"></div>
							<div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-40"></div>
						</div>
					</div>
					<div className="h-1 w-20 bg-gray-300 dark:bg-zinc-700 rounded-full mb-6"></div>

					{/* Charts Grid Skeleton */}
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg"
							>
								<div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-48 mb-6"></div>
								<div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
									<div className="text-gray-400 dark:text-zinc-600 text-sm">
										Loading chart...
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Footer Section Skeleton */}
				<div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
					<div className="flex items-center justify-center gap-2">
						<div className="h-px w-12 bg-gray-300 dark:bg-zinc-800"></div>
						<div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-24"></div>
						<div className="h-px w-12 bg-gray-300 dark:bg-zinc-800"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
