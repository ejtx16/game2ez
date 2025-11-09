-- Create Games Table
-- This script creates a table for storing NBA game information

-- Drop table if exists (optional - comment out if you don't want to drop existing data)
DROP TABLE IF EXISTS games;

-- Create games table
CREATE TABLE games (
  id BIGINT PRIMARY KEY,
  date DATE NOT NULL,
  season INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  period INTEGER,
  time VARCHAR(20),
  postseason BOOLEAN DEFAULT false,
  home_team_score INTEGER,
  visitor_team_score INTEGER,
  datetime TIMESTAMP,
  -- Home team quarter scores
  home_q1 INTEGER,
  home_q2 INTEGER,
  home_q3 INTEGER,
  home_q4 INTEGER,
  home_ot1 INTEGER,
  home_ot2 INTEGER,
  home_ot3 INTEGER,
  home_timeouts_remaining INTEGER,
  home_in_bonus BOOLEAN,
  -- Visitor team quarter scores
  visitor_q1 INTEGER,
  visitor_q2 INTEGER,
  visitor_q3 INTEGER,
  visitor_q4 INTEGER,
  visitor_ot1 INTEGER,
  visitor_ot2 INTEGER,
  visitor_ot3 INTEGER,
  visitor_timeouts_remaining INTEGER,
  visitor_in_bonus BOOLEAN,
  -- Home team information (denormalized)
  home_team_id INTEGER,
  home_team_conference VARCHAR(50),
  home_team_division VARCHAR(50),
  home_team_city VARCHAR(100),
  home_team_name VARCHAR(100),
  home_team_full_name VARCHAR(150),
  home_team_abbreviation VARCHAR(10),
  -- Visitor team information (denormalized)
  visitor_team_id INTEGER,
  visitor_team_conference VARCHAR(50),
  visitor_team_division VARCHAR(50),
  visitor_team_city VARCHAR(100),
  visitor_team_name VARCHAR(100),
  visitor_team_full_name VARCHAR(150),
  visitor_team_abbreviation VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_games_date ON games(date);
CREATE INDEX idx_games_season ON games(season);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_postseason ON games(postseason);
CREATE INDEX idx_games_home_team_id ON games(home_team_id);
CREATE INDEX idx_games_visitor_team_id ON games(visitor_team_id);
CREATE INDEX idx_games_home_team_abbreviation ON games(home_team_abbreviation);
CREATE INDEX idx_games_visitor_team_abbreviation ON games(visitor_team_abbreviation);
CREATE INDEX idx_games_datetime ON games(datetime);

-- Create composite indexes for common queries
CREATE INDEX idx_games_season_date ON games(season, date);
CREATE INDEX idx_games_season_postseason ON games(season, postseason);

-- Add comments to table
COMMENT ON TABLE games IS 'Stores NBA game information including scores, team data, and game status';
COMMENT ON COLUMN games.status IS 'Game status (e.g., Final, In Progress, Scheduled)';
COMMENT ON COLUMN games.period IS 'Current period/quarter of the game';
COMMENT ON COLUMN games.time IS 'Time remaining or Final';
COMMENT ON COLUMN games.postseason IS 'Whether the game is a playoff/postseason game';
COMMENT ON COLUMN games.datetime IS 'Game date and time in UTC';
COMMENT ON COLUMN games.home_in_bonus IS 'Whether home team is in bonus (free throw situation)';
COMMENT ON COLUMN games.visitor_in_bonus IS 'Whether visitor team is in bonus (free throw situation)';

-- Sample insert (Cleveland Cavaliers vs Charlotte Hornets from your example)
INSERT INTO games (
  id,
  date,
  season,
  status,
  period,
  time,
  postseason,
  home_team_score,
  visitor_team_score,
  datetime,
  home_q1, home_q2, home_q3, home_q4,
  home_ot1, home_ot2, home_ot3,
  home_timeouts_remaining,
  home_in_bonus,
  visitor_q1, visitor_q2, visitor_q3, visitor_q4,
  visitor_ot1, visitor_ot2, visitor_ot3,
  visitor_timeouts_remaining,
  visitor_in_bonus,
  home_team_id,
  home_team_conference,
  home_team_division,
  home_team_city,
  home_team_name,
  home_team_full_name,
  home_team_abbreviation,
  visitor_team_id,
  visitor_team_conference,
  visitor_team_division,
  visitor_team_city,
  visitor_team_name,
  visitor_team_full_name,
  visitor_team_abbreviation
) 
VALUES (
  15907925,
  '2025-01-05',
  2024,
  'Final',
  4,
  'Final',
  false,
  115,
  105,
  '2025-01-05 23:00:00',
  29, 34, 28, 24,
  NULL, NULL, NULL,
  2,
  true,
  23, 25, 30, 27,
  NULL, NULL, NULL,
  2,
  false,
  6,
  'East',
  'Central',
  'Cleveland',
  'Cavaliers',
  'Cleveland Cavaliers',
  'CLE',
  4,
  'East',
  'Southeast',
  'Charlotte',
  'Hornets',
  'Charlotte Hornets',
  'CHA'
);

