-- Create Stats Table
-- This script creates a table for storing NBA player game statistics

-- Drop table if exists (optional - comment out if you don't want to drop existing data)
DROP TABLE IF EXISTS stats;

-- Create stats table
CREATE TABLE stats (
  id BIGINT PRIMARY KEY,
  min VARCHAR(10),
  fgm INTEGER,
  fga INTEGER,
  fg_pct DECIMAL(5, 3),
  fg3m INTEGER,
  fg3a INTEGER,
  fg3_pct DECIMAL(5, 3),
  ftm INTEGER,
  fta INTEGER,
  ft_pct DECIMAL(5, 3),
  oreb INTEGER,
  dreb INTEGER,
  reb INTEGER,
  ast INTEGER,
  stl INTEGER,
  blk INTEGER,
  turnover INTEGER,
  pf INTEGER,
  pts INTEGER,
  -- Player information (denormalized)
  player_id INTEGER,
  player_first_name VARCHAR(100),
  player_last_name VARCHAR(100),
  player_position VARCHAR(10),
  player_height VARCHAR(10),
  player_weight VARCHAR(10),
  player_jersey_number VARCHAR(5),
  player_college VARCHAR(150),
  player_country VARCHAR(100),
  player_draft_year INTEGER,
  player_draft_round INTEGER,
  player_draft_number INTEGER,
  player_team_id INTEGER,
  -- Team information (denormalized)
  team_id INTEGER,
  team_conference VARCHAR(50),
  team_division VARCHAR(50),
  team_city VARCHAR(100),
  team_name VARCHAR(100),
  team_full_name VARCHAR(150),
  team_abbreviation VARCHAR(10),
  -- Game information (denormalized)
  game_id BIGINT,
  game_date DATE,
  game_season INTEGER,
  game_status VARCHAR(50),
  game_period INTEGER,
  game_time VARCHAR(20),
  game_postseason BOOLEAN,
  game_home_team_score INTEGER,
  game_visitor_team_score INTEGER,
  game_home_team_id INTEGER,
  game_visitor_team_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_stats_player_id ON stats(player_id);
CREATE INDEX idx_stats_team_id ON stats(team_id);
CREATE INDEX idx_stats_game_id ON stats(game_id);
CREATE INDEX idx_stats_game_date ON stats(game_date);
CREATE INDEX idx_stats_game_season ON stats(game_season);
CREATE INDEX idx_stats_pts ON stats(pts);
CREATE INDEX idx_stats_reb ON stats(reb);
CREATE INDEX idx_stats_ast ON stats(ast);
CREATE INDEX idx_stats_player_name ON stats(player_first_name, player_last_name);
CREATE INDEX idx_stats_team_abbreviation ON stats(team_abbreviation);

-- Create composite indexes for common queries
CREATE INDEX idx_stats_player_game ON stats(player_id, game_id);
CREATE INDEX idx_stats_team_game ON stats(team_id, game_id);
CREATE INDEX idx_stats_season_player ON stats(game_season, player_id);
CREATE INDEX idx_stats_game_postseason ON stats(game_id, game_postseason);

-- Add comments to table
COMMENT ON TABLE stats IS 'Stores NBA player game statistics with denormalized player, team, and game data';
COMMENT ON COLUMN stats.min IS 'Minutes played (as string, e.g., "38" or "38:45")';
COMMENT ON COLUMN stats.fgm IS 'Field goals made';
COMMENT ON COLUMN stats.fga IS 'Field goals attempted';
COMMENT ON COLUMN stats.fg_pct IS 'Field goal percentage';
COMMENT ON COLUMN stats.fg3m IS 'Three-point field goals made';
COMMENT ON COLUMN stats.fg3a IS 'Three-point field goals attempted';
COMMENT ON COLUMN stats.fg3_pct IS 'Three-point field goal percentage';
COMMENT ON COLUMN stats.ftm IS 'Free throws made';
COMMENT ON COLUMN stats.fta IS 'Free throws attempted';
COMMENT ON COLUMN stats.ft_pct IS 'Free throw percentage';
COMMENT ON COLUMN stats.oreb IS 'Offensive rebounds';
COMMENT ON COLUMN stats.dreb IS 'Defensive rebounds';
COMMENT ON COLUMN stats.reb IS 'Total rebounds';
COMMENT ON COLUMN stats.ast IS 'Assists';
COMMENT ON COLUMN stats.stl IS 'Steals';
COMMENT ON COLUMN stats.blk IS 'Blocks';
COMMENT ON COLUMN stats.turnover IS 'Turnovers';
COMMENT ON COLUMN stats.pf IS 'Personal fouls';
COMMENT ON COLUMN stats.pts IS 'Points scored';

-- Sample insert (Giannis Antetokounmpo from your example)
INSERT INTO stats (
  id,
  min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct,
  ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk,
  turnover, pf, pts,
  player_id, player_first_name, player_last_name,
  player_position, player_height, player_weight,
  player_jersey_number, player_college, player_country,
  player_draft_year, player_draft_round, player_draft_number,
  player_team_id,
  team_id, team_conference, team_division,
  team_city, team_name, team_full_name, team_abbreviation,
  game_id, game_date, game_season, game_status,
  game_period, game_time, game_postseason,
  game_home_team_score, game_visitor_team_score,
  game_home_team_id, game_visitor_team_id
) 
VALUES (
  14325883,
  '38', 10, 16, 0.625, 0, 1, 0.0,
  11, 22, 0.5, 3, 7, 10, 9, 2, 1,
  5, 1, 31,
  15, 'Giannis', 'Antetokounmpo',
  'F', '6-11', '243',
  '34', 'Filathlitikos', 'Greece',
  2013, 1, 15,
  17,
  17, 'East', 'Central',
  'Milwaukee', 'Bucks', 'Milwaukee Bucks', 'MIL',
  1038184, '2024-01-20', 2023, 'Final',
  4, 'Final', false,
  135, 141,
  9, 17
);

-- Optional: Reset sequence if you're manually setting IDs
-- SELECT setval('stats_id_seq', (SELECT MAX(id) FROM stats));

