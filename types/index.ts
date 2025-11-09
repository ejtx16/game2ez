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
  id: string
  firstName: string
  lastName: string
  position?: string
  teamId?: string
}
