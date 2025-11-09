-- Create Teams Table
-- This script creates a table for storing NBA team information

-- Drop table if exists (optional - comment out if you don't want to drop existing data)
DROP TABLE IF EXISTS teams;

-- Create teams table
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  conference VARCHAR(50) NOT NULL,
  division VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  abbreviation VARCHAR(10) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_teams_conference ON teams(conference);
CREATE INDEX idx_teams_division ON teams(division);
CREATE INDEX idx_teams_abbreviation ON teams(abbreviation);

-- Add comment to table
COMMENT ON TABLE teams IS 'Stores NBA team information including conference, division, and location details';

-- Sample insert (Atlanta Hawks from your example)
INSERT INTO teams (id, conference, division, city, name, full_name, abbreviation) 
VALUES (1, 'East', 'Southeast', 'Atlanta', 'Hawks', 'Atlanta Hawks', 'ATL');

-- Optional: Reset sequence if you're manually setting IDs
-- SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));

