# BallDontLie API Setup

Game2EZ gets all of its NBA data from the [BallDontLie API](https://www.balldontlie.io/).
The app needs an API key. Without it, the Teams, Favorites and player pages
show no data.

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `BALLDONTLIE_API_KEY` | Yes | none | Your BallDontLie API key. Keep it secret. |
| `BALLDONTLIE_API_TIER` | No | `free` | Your plan: `free`, `all-star` or `goat`. |
| `BALLDONTLIE_API_URL` | No | `https://api.balldontlie.io/v1` | Base URL of the NBA API. |

The server reads these variables in `lib/api/balldontlie.ts` and
`lib/api/teams.ts`. They are server-only: do not prefix them with
`NEXT_PUBLIC_`.

## 1. Get a free API key

1. Open https://app.balldontlie.io/signup and create an account.
2. Choose the **Free** plan.
3. Open your BallDontLie dashboard and copy the API key.

Treat the key like a password. Do not commit it, and do not paste it into
issues or chats.

## 2. Set the variables

### Local development

1. Copy the example file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local`:

   ```bash
   BALLDONTLIE_API_KEY=your_api_key_here
   BALLDONTLIE_API_URL=https://api.balldontlie.io/v1
   BALLDONTLIE_API_TIER=free
   ```

3. Restart the dev server (`npm run dev`). Next.js reads env files only at
   startup.

`.gitignore` excludes `.env*.local`, so the key stays on your machine.

Note: a variable that is already set in the shell takes precedence over
`.env.local`, even when its value is empty. If the app still reports a
missing key, run `echo $BALLDONTLIE_API_KEY` and unset an empty value.

### Kosuke (preview sandbox)

1. Open the **game2ez** project in Kosuke.
2. Open the project **Settings**, then **Environment variables**.
3. Set `BALLDONTLIE_API_KEY` to your key and mark it as **secret**.
4. Optional: add `BALLDONTLIE_API_TIER` with the value `free`.
5. Save, then restart the `web` service (ask Kosuke in a chat, or start a new
   chat session). The running app reads variables only when it starts.

### Vercel (production)

1. In Vercel, open the project, then **Settings > Environment Variables**.
2. Add `BALLDONTLIE_API_KEY` for Production and Preview.
3. Optional: add `BALLDONTLIE_API_TIER`.
4. Redeploy. New variables apply only to new deployments.

## 3. Verify the setup

Start the app and call the API routes:

```bash
curl -i http://localhost:3000/api/teams
curl -i http://localhost:3000/api/teams/14/players
curl -i http://localhost:3000/api/players/237/stats
```

| Route | Expected result on the free plan |
| --- | --- |
| `/api/teams` | `200` with the list of teams |
| `/api/teams/14/players` | `200` with players and `"meta": { "source": "all-players" }` |
| `/api/players/237/stats` | `403` with `"code": "PLAN_REQUIRED"` |

In the browser, open `/teams`. The page must show the team cards.

## 4. Plans and app behavior

| Feature | Endpoint | Free | All-Star | GOAT |
| --- | --- | --- | --- | --- |
| Teams list and team details | `/teams` | Yes | Yes | Yes |
| Team games | `/games` | Yes | Yes | Yes |
| Player profile | `/players/{id}` | Yes | Yes | Yes |
| Team roster | `/players/active` | No | Yes | Yes |
| Player game stats | `/stats` | No | Yes | Yes |
| Requests per minute | | 5 | 60 | 600 |

`BALLDONTLIE_API_TIER` controls which endpoints the app calls:

- **`free`**: The team roster comes from `/players` (free). That endpoint can
  include former players, so the app drops players drafted 25 or more years
  ago and shows a note in the roster. The player page shows a
  "Stats not available on the free plan" notice. The app does not call
  `/stats` or `/players/active`, so it does not waste requests.
- **`all-star` or `goat`**: The roster comes from `/players/active`, and the
  player page shows stats and charts.

Set the tier to match your real plan. A paid tier with a free key makes the
roster and stats requests fail with `401`.

## 5. Caching and rate limits

The free plan allows 5 requests per minute. The app caches responses with
`unstable_cache` to stay under that limit:

| Data | Cache time |
| --- | --- |
| Teams list (also used for team details) | 1 hour |
| Team roster, team games, player profile, player stats | 30 minutes |

Failed requests are not cached. When you fix a missing or wrong key, the next
request uses the new key.

## 6. Upgrade to a paid plan

1. Upgrade in the BallDontLie dashboard. The key stays the same.
2. Set `BALLDONTLIE_API_TIER` to `all-star` or `goat` in every environment.
3. Restart the app or redeploy.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `BallDontLie API key is not configured` | The key is empty or not set | Set `BALLDONTLIE_API_KEY` and restart |
| `Unauthorized` or `401` on `/api/teams` | The key is wrong | Copy the key again from the dashboard |
| `401` on rosters or stats only | The tier is set higher than your plan | Set `BALLDONTLIE_API_TIER=free` |
| `API rate limit exceeded` or `429` | More than 5 requests in one minute | Wait one minute |
| Stats notice on every player | Expected on the free plan | Upgrade, then set the tier |
