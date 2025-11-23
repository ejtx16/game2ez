import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id: playerId } = await params

	if (!playerId) {
		return NextResponse.json(
			{ error: 'Player ID is required' },
			{ status: 400 }
		)
	}

	try {
		const apiKey = process.env.BALLDONTLIE_API_KEY

		if (!apiKey) {
			console.error('BALLDONTLIE_API_KEY is not set')
			return NextResponse.json(
				{ error: 'API configuration error' },
				{ status: 500 }
			)
		}

		const response = await fetch(
			`https://api.balldontlie.io/v1/players/${playerId}`,
			{
				headers: {
					Authorization: apiKey,
				},
			}
		)

		if (!response.ok) {
			console.error(
				`Failed to fetch player ${playerId}:`,
				response.status,
				response.statusText
			)
			return NextResponse.json(
				{ error: 'Failed to fetch player data' },
				{ status: response.status }
			)
		}

		const data = await response.json()

		return NextResponse.json(data)
	} catch (error) {
		console.error('Error fetching player:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
