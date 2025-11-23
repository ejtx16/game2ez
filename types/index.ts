// Global TypeScript type definitions
// Add your shared types here

export interface User {
  id: string
  name: string
  email: string
  role?: string
  createdAt?: Date
}

export interface Team {
  id: number
  name: string
  city: string
  abbreviation: string
  conference: string
  division: string
  full_name?: string
}

export interface TeamDetailsResponse {
  data: Team
}

export interface Player {
  id: number
  first_name: string
  last_name: string
  position: string
  height: string
  weight: string
  jersey_number: string
  college: string
  country: string
  draft_year: number
  draft_round: number
  draft_number: number
  team: Team
}

export interface Game {
  id: number
  date: Date | string
  season: number
  status: string
  period: number | null
  time: string | null
  postseason: boolean
  home_team_score: number | null
  visitor_team_score: number | null
  datetime: Date | string | null

  // Quarter scores
  home_q1: number | null
  home_q2: number | null
  home_q3: number | null
  home_q4: number | null
  home_ot1: number | null
  home_ot2: number | null
  home_ot3: number | null

  visitor_q1: number | null
  visitor_q2: number | null
  visitor_q3: number | null
  visitor_q4: number | null
  visitor_ot1: number | null
  visitor_ot2: number | null
  visitor_ot3: number | null

  // Home team data (denormalized)
  home_team_id: number | null
  home_team_conference: string | null
  home_team_division: string | null
  home_team_city: string | null
  home_team_name: string | null
  home_team_full_name: string | null
  home_team_abbreviation: string | null

  // Visitor team data (denormalized)
  visitor_team_id: number | null
  visitor_team_conference: string | null
  visitor_team_division: string | null
  visitor_team_city: string | null
  visitor_team_name: string | null
  visitor_team_full_name: string | null
  visitor_team_abbreviation: string | null
}

export interface Stats {
  id: number
  min: string | null
  fgm: number | null
  fga: number | null
  fg3m: number | null
  fg3a: number | null
  ftm: number | null
  fta: number | null
  oreb: number | null
  dreb: number | null
  reb: number | null
  ast: number | null
  stl: number | null
  blk: number | null
  turnover: number | null
  pf: number | null
  pts: number | null
  fg_pct: number | null
  fg3_pct: number | null
  ft_pct: number | null

  // Nested objects from API
  team: Team
  game: {
    id: number
    date: string
    season: number
    status: string
    period: number
    time: string | null
    postseason: boolean
    home_team_score: number
    visitor_team_score: number
  }
  player: {
    id: number
    first_name: string
    last_name: string
    position: string
    height: string | null
    weight: string | null
    jersey_number: string | null
    college: string | null
    country: string | null
    draft_year: number | null
    draft_round: number | null
    draft_number: number | null
  }
}
