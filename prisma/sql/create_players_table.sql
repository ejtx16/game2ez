-- Create Players Table
-- This script creates a table for storing NBA player information

-- Drop table if exists (optional - comment out if you don't want to drop existing data)
DROP TABLE IF EXISTS players;

-- Create players table
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  position VARCHAR(10),
  height VARCHAR(10),
  weight VARCHAR(10),
  jersey_number VARCHAR(5),
  college VARCHAR(150),
  country VARCHAR(100),
  draft_year INTEGER,
  draft_round INTEGER,
  draft_number INTEGER,
  -- Team information (denormalized)
  team_id INTEGER,
  team_conference VARCHAR(50),
  team_division VARCHAR(50),
  team_city VARCHAR(100),
  team_name VARCHAR(100),
  team_full_name VARCHAR(150),
  team_abbreviation VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_players_first_name ON players(first_name);
CREATE INDEX idx_players_last_name ON players(last_name);
CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_players_team_abbreviation ON players(team_abbreviation);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_players_draft_year ON players(draft_year);
CREATE INDEX idx_players_country ON players(country);

-- Create composite index for full name searches
CREATE INDEX idx_players_full_name ON players(first_name, last_name);

-- Add comments to table
COMMENT ON TABLE players IS 'Stores NBA player information including physical attributes, draft details, and denormalized team data';
COMMENT ON COLUMN players.position IS 'Player position (G=Guard, F=Forward, C=Center, or combinations like G-F)';
COMMENT ON COLUMN players.height IS 'Player height in feet-inches format (e.g., 6-2)';
COMMENT ON COLUMN players.weight IS 'Player weight in pounds';
COMMENT ON COLUMN players.team_id IS 'Team ID from the API (denormalized - no foreign key constraint)';
COMMENT ON COLUMN players.team_abbreviation IS 'Team abbreviation (e.g., GSW, ATL)';

-- Sample insert (Stephen Curry from your example)
INSERT INTO players (
  id, 
  first_name, 
  last_name, 
  position, 
  height, 
  weight, 
  jersey_number, 
  college, 
  country, 
  draft_year, 
  draft_round, 
  draft_number,
  team_id,
  team_conference,
  team_division,
  team_city,
  team_name,
  team_full_name,
  team_abbreviation
) 
VALUES (
  19,
  'Stephen',
  'Curry',
  'G',
  '6-2',
  '185',
  '30',
  'Davidson',
  'USA',
  2009,
  1,
  7,
  10,
  'West',
  'Pacific',
  'Golden State',
  'Warriors',
  'Golden State Warriors',
  'GSW'
);

-- Optional: Reset sequence if you're manually setting IDs
-- SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));

