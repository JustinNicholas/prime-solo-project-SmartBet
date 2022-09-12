
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "games" (
	"id" SERIAL PRIMARY KEY,
	"score_id" INT,
	"time" VARCHAR(40),
	"home_team" VARCHAR(20) NOT NULL,
	"global_home_team_id" INT NOT NULL,
	"away_team" VARCHAR(20) NOT NULL,
	"global_away_team_id" INT NOT NULL,
	"home_moneyline" INT,
	"away_moneyline" INT,
	"channel" VARCHAR(20),
	"week" INT
);

CREATE TABLE "week" (
	"id" SERIAL PRIMARY KEY,
	"week" INT
);

CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY,
	"team_abv_name" VARCHAR(10),
	"team_full_name" VARCHAR(40),
	"team_abv_city" VARCHAR(10) NOT NULL, 
	"team_full_city" VARCHAR(20),
	-- "team_logo" VARCHAR(200)
);

CREATE TABLE "user_bets" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"score_id" INT NOT NULL,
	"chosen_team" VARCHAR(20) NOT NULL,
	"chosen_team_id" INT NOT NULL,
	"chosen_moneyline" INT NOT NULL,
	"un_chosen_team" VARCHAR(20) NOT NULL,
	"un_chosen_team_id" INT NOT NULL,
	"un_chosen_moneyline" INT NOT NULL,
	"week" INT,
	"time" VARCHAR(50),
	"bet_amount" INT NOT NULL,
	"is_completed" BOOLEAN DEFAULT false,
	"profit" REAL DEFAULT 0
);

CREATE TABLE "scores" (
	"id" SERIAL PRIMARY KEY,
	"score_id" INT,
	"home_team" VARCHAR(20) NOT NULL,
	"global_home_team_id" INT NOT NULL,
	"away_team" VARCHAR(20) NOT NULL,
	"global_away_team_id" INT NOT NULL,
	"home_score" INT,
	"away_score" INT,
	"is_over" BOOLEAN
);

INSERT INTO "teams" ("id", "team_abv_name", "team_full_name", "team_abv_city", "team_full_city")
VALUES ('1', 'Cardinals', 'Arizona Cardinals', 'ARI', 'Arizona'),
('2', 'Falcons', 'Atlanta Falcons', 'ATL', 'Atlanta'),
('3', 'Ravens', 'Baltimore Ravens', 'BAL', 'Baltimore'),
('4', 'Bills', 'Buffalo Bills', 'BUF', 'Buffalo'),
('5', 'Panthers', 'Carolina Panthers', 'CAR', 'Carolina'),
('6', 'Bears', 'Chicago Bears', 'CHI', 'Chicago'),
('7', 'Bengals', 'Cincinnati Bengals', 'CIN', 'Cincinnati'),
('8', 'Browns', 'Cleveland Browns', 'CLE', 'Cleveland'),
('9', 'Cowboys', 'Dallas Cowboys', 'DAL', 'Dallas'),
('10', 'Broncos', 'Denver Broncos', 'DEN', 'Denver'),
('11', 'Lions', 'Detroit Lions', 'DET', 'Detroit'),
('12', 'Packers', 'Green Bay Packers', 'GB', 'Green Bay'),
('13', 'Texans', 'Houston Texans', 'HOU', 'Houston'),
('14', 'Colts', 'Inianapolis Colts', 'IND', 'Indianapolis'),
('15', 'Jaguars', 'Jacksonville Jaguars', 'JAX', 'Jacksonville'),
('16', 'Chiefs', 'Kansas City Chiefs', 'KC', 'Kansas City'),
('19', 'Dolphins', 'Miami Dolphins', 'MIA', 'Miami'),
('20', 'Vikings', 'Minnesota Vikings', 'MIN', 'Minnesota'),
('21', 'Patriots', 'New England Patriots', 'NE', 'New England'),
('22', 'Saints', 'New Orleans Saints', 'NO', 'New Orleans')
('23', 'Giants', 'New York Giants', 'NYG', 'New York'),
('24', 'Jets', 'New York Jets', 'NYJ', 'New York'),
('25', 'Raiders', 'Las Vegas Raiders', 'LV', 'Las Vegas'),
('26', 'Eagles', 'Philadelphia Eagles', 'PHI', 'Philadelphia'),
('28', 'Steelers', 'Pittsburgh Steelers', 'PIT', 'Pittsburgh'),
('29', 'Chargers', 'Los Angeles Chargers', 'LAC', 'Los Angeles'),
('30', 'Seahawks', 'Seattle Seahawks', 'SEA', 'Seattle'),
('31', '49ers', 'San Francisco 49ers', 'SF', 'San Francisco'),
('32', 'Rams', 'Los Angeles Rams', 'LAR', 'Los Angeles'),
('33', 'Buccaneers', 'Tampa Bay Buccaneers', 'TB', 'Tampa Bay'),
('34', 'Titans', 'Tennessee Titans', 'TEN', 'Tennessee'),
('35', 'Commanders', 'Washington Commanders', 'WAS', 'Washington');