/**
 * BallDontLie API plans. The plan decides which endpoints the key can call:
 * - free: teams, players, games (5 requests per minute)
 * - all-star: adds active players and game player stats
 * - goat: adds season averages and more
 *
 * Set BALLDONTLIE_API_TIER to match your plan. It defaults to 'free', so the
 * app never spends requests on endpoints a free key cannot call.
 */
export type BallDontLieTier = 'free' | 'all-star' | 'goat'

const DEFAULT_API_URL = 'https://api.balldontlie.io/v1'

export const getApiTier = (): BallDontLieTier => {
	const tier = process.env.BALLDONTLIE_API_TIER?.trim().toLowerCase()

	return tier === 'all-star' || tier === 'goat' ? tier : 'free'
}

export const hasPaidTier = (): boolean => getApiTier() !== 'free'

export const PLAN_REQUIRED_MESSAGE =
	'This data needs a paid BallDontLie plan (All-Star or higher).'

export class BallDontLieError extends Error {
	status: number

	constructor(message: string, status: number) {
		super(message)
		this.name = 'BallDontLieError'
		this.status = status
	}
}

/**
 * Calls the BallDontLie API with the configured key. Throws a
 * BallDontLieError with the HTTP status on failure, so callers inside
 * unstable_cache never cache an error result.
 */
export const bdlFetch = async <T>(
	path: string,
	params?: URLSearchParams,
): Promise<T> => {
	const apiKey = process.env.BALLDONTLIE_API_KEY?.trim()

	if (!apiKey) {
		throw new BallDontLieError('BallDontLie API key is not configured', 500)
	}

	const apiUrl = process.env.BALLDONTLIE_API_URL?.trim() || DEFAULT_API_URL
	const query = params?.toString()
	const url = `${apiUrl}${path}${query ? `?${query}` : ''}`

	const response = await fetch(url, {
		headers: { Authorization: apiKey },
		cache: 'no-store',
	})

	if (!response.ok) {
		throw new BallDontLieError(
			`BallDontLie API error: ${response.status} ${response.statusText}`,
			response.status,
		)
	}

	return response.json() as Promise<T>
}
