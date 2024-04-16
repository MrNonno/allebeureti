const express = require('express');
const cors = require('cors');
const { connectToDatabase, getDatabase } = require('./database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToDatabase();

//MARK: Games here
// Endpoint to retrieve all games data
app.get('/api/games', async (req, res) => {
    try {
        const db = getDatabase();
        const collection = db.collection('games');
        const games = await collection.find({}).toArray();
        res.json(games);
    } catch (err) {
        console.error('Error fetching games:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to retrieve data for a specific game
app.get('/api/games/:gameId', async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId);

        const db = getDatabase();
        const gamesCollection = db.collection('games');

        // Find the game by gameId
        const game = await gamesCollection.findOne({ id: gameId });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(game);
    } catch (err) {
        console.error('Error fetching data for game:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to retrieve all players in a specific game
app.get('/api/games/:gameId/players', async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId);

        const db = getDatabase();
        const gamesCollection = db.collection('games');
        const playersCollection = db.collection('players');

        // Find the game by gameId
        const game = await gamesCollection.findOne({ id: gameId });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        // Find players from the home team and visitor team of the game
        const homeTeamPlayers = await playersCollection.find({ "team.full_name": game.home_team.full_name }).toArray();
        const visitorTeamPlayers = await playersCollection.find({ "team.full_name": game.visitor_team.full_name }).toArray();

        // Combine home team and visitor team players
        const allPlayersInGame = [...homeTeamPlayers, ...visitorTeamPlayers];

        res.json(allPlayersInGame);
    } catch (err) {
        console.error('Error fetching players for game:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to retrieve all games with only team names
app.get('/api/games/team-names', async (req, res) => {
    try {
        const db = getDatabase();
        const games = await db.collection('games').aggregate([
            {
                $project: {
                    _id: 0,
                    home_team_name: "$home_team.full_name",
                    visitor_team_name: "$visitor_team.full_name"
                }
            }
        ]).toArray();
        res.json(games);
    } catch (err) {
        console.error('Error fetching games:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//MARK: Stats here
// Endpoint to retrieve all stats
app.get('/api/stats', async (req, res) => {
    try {
        const db = getDatabase();
        const collection = db.collection('stats');
        const stats = await collection.find({}).toArray();
        res.json(stats);
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//MARK: Teams here
// Endpoint to retrieve all teams
app.get('/api/teams', async (req, res) => {
    try {
        const db = getDatabase();
        const collection = db.collection('teams');
        const teams = await collection.find({}).toArray();
        res.json(teams);
    } catch (err) {
        console.error('Error fetching teams:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//MARK: Team Stats
app.get('/api/teams/:teamId/statistics', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        console.log('Received request for team statistics. Team ID:', teamId);

        const db = getDatabase();
        console.log('Connected to the database.');

        const gamesCollection = db.collection('games');
        const statsCollection = db.collection('stats');

        // Retrieve team information from teams collection
        const team = await db.collection('teams').findOne({ id: teamId });
        console.log('Retrieved team information:', team);

        if (!team) {
            console.log('Team not found.');
            return res.status(404).json({ error: 'Team not found' });
        }

        // Find all games where the team is either the home team or the visitor team
        const teamGames = await gamesCollection.find({
            $or: [
                { "home_team.id": teamId },
                { "visitor_team.id": teamId }
            ]
        }).toArray();

        console.log('Retrieved team games:', teamGames);

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        console.log('Retrieved team stats:', teamStats);

        // Calculate total games played and total wins
        let totalGamesPlayed = 0;
        let totalWins = 0;
        teamGames.forEach(game => {
            if (game.home_team.id === teamId && game.home_team_score > game.visitor_team_score) {
                totalWins++;
                totalGamesPlayed++;
            } else if (game.visitor_team.id === teamId && game.visitor_team_score > game.home_team_score) {
                totalWins++;
                totalGamesPlayed++;
            } else {
                totalGamesPlayed++;
            }
        });

        console.log('Total games played:', totalGamesPlayed);
        console.log('Total wins:', totalWins);

        // Calculate average win rate
        const averageWinRate = totalGamesPlayed > 0 ? (totalWins / totalGamesPlayed) * 100 : 0;
        console.log('Average win rate:', averageWinRate);

        // Calculate total field goals made and attempted
        let totalFGMade = 0;
        let totalFGAttempted = 0;
        teamStats.forEach(stat => {
            totalFGMade += stat.fgm;
            totalFGAttempted += stat.fga;
        });

        // Calculate field goal percentage
        const fieldGoalPercentage = totalFGAttempted > 0 ? (totalFGMade / totalFGAttempted) * 100 : 0;
        console.log('Field goal percentage:', fieldGoalPercentage);

        res.json({
            team: team.full_name,
            winRate: (totalGamesPlayed > 0 ? ((totalWins / totalGamesPlayed) * 100).toFixed(2) + '%' : '0%'),
            averageWinRate: averageWinRate.toFixed(2) + '%',
            totalGamesPlayed: totalGamesPlayed,
            fieldGoalPercentage: fieldGoalPercentage.toFixed(2) + '%'
            // Add more statistics as needed
        });
    } catch (err) {
        console.error('Error fetching statistics for team:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//MARK: Players here
// Endpoint to retrieve all players
app.get('/api/players', async (req, res) => {
    try {
        const db = getDatabase();
        const collection = db.collection('players');
        const players = await collection.find({}).toArray();
        res.json(players);
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Power up!
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

/* // Endpoint to calculate field goal percentage (FG%) of the team
app.get('/api/teams/:teamId/field-goal-percentage', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total field goals made and attempted
        let totalFGMade = 0;
        let totalFGAttempted = 0;
        teamStats.forEach(stat => {
            totalFGMade += stat.fgm;
            totalFGAttempted += stat.fga;
        });

        // Calculate field goal percentage
        const fieldGoalPercentage = totalFGAttempted > 0 ? (totalFGMade / totalFGAttempted) * 100 : 0;

        res.json({ fieldGoalPercentage: fieldGoalPercentage.toFixed(2) + '%' });
    } catch (err) {
        console.error('Error calculating field goal percentage:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate three-point field goal percentage (3P%) of the team
app.get('/api/teams/:teamId/three-point-percentage', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total three-point field goals made and attempted
        let totalThreePMade = 0;
        let totalThreePAttempted = 0;
        teamStats.forEach(stat => {
            totalThreePMade += stat.fg3m;
            totalThreePAttempted += stat.fg3a;
        });

        // Calculate three-point field goal percentage
        const threePointPercentage = totalThreePAttempted > 0 ? (totalThreePMade / totalThreePAttempted) * 100 : 0;

        res.json({ threePointPercentage: threePointPercentage.toFixed(2) + '%' });
    } catch (err) {
        console.error('Error calculating three-point percentage:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate free throw percentage (FT%) of the team
app.get('/api/teams/:teamId/free-throw-percentage', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total free throws made and attempted
        let totalFTMade = 0;
        let totalFTAttempted = 0;
        teamStats.forEach(stat => {
            totalFTMade += stat.ftm;
            totalFTAttempted += stat.fta;
        });

        // Calculate free throw percentage
        const freeThrowPercentage = totalFTAttempted > 0 ? (totalFTMade / totalFTAttempted) * 100 : 0;

        res.json({ freeThrowPercentage: freeThrowPercentage.toFixed(2) + '%' });
    } catch (err) {
        console.error('Error calculating free throw percentage:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average rebounds per game of the team
app.get('/api/teams/:teamId/average-rebounds', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total rebounds
        let totalRebounds = 0;
        teamStats.forEach(stat => {
            totalRebounds += stat.reb;
        });

        // Calculate average rebounds per game
        const averageRebounds = totalRebounds / teamStats.length;

        res.json({ averageRebounds: averageRebounds.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average rebounds:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average assists per game of the team
app.get('/api/teams/:teamId/average-assists', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total assists
        let totalAssists = 0;
        teamStats.forEach(stat => {
            totalAssists += stat.ast;
        });

        // Calculate average assists per game
        const averageAssists = totalAssists / teamStats.length;

        res.json({ averageAssists: averageAssists.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average assists:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average steals per game of the team
app.get('/api/teams/:teamId/average-steals', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total steals
        let totalSteals = 0;
        teamStats.forEach(stat => {
            totalSteals += stat.stl;
        });

        // Calculate average steals per game
        const averageSteals = totalSteals / teamStats.length;

        res.json({ averageSteals: averageSteals.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average steals:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average blocks per game of the team
app.get('/api/teams/:teamId/average-blocks', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total blocks
        let totalBlocks = 0;
        teamStats.forEach(stat => {
            totalBlocks += stat.blk;
        });

        // Calculate average blocks per game
        const averageBlocks = totalBlocks / teamStats.length;

        res.json({ averageBlocks: averageBlocks.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average blocks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average turnovers per game of the team
app.get('/api/teams/:teamId/average-turnovers', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total turnovers
        let totalTurnovers = 0;
        teamStats.forEach(stat => {
            totalTurnovers += stat.turnover;
        });

        // Calculate average turnovers per game
        const averageTurnovers = totalTurnovers / teamStats.length;

        res.json({ averageTurnovers: averageTurnovers.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average turnovers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to calculate average personal fouls per game of the team
app.get('/api/teams/:teamId/average-personal-fouls', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const db = getDatabase();
        const statsCollection = db.collection('stats');

        // Find all stats for the team
        const teamStats = await statsCollection.find({ "team.id": teamId }).toArray();

        // Calculate total personal fouls
        let totalPersonalFouls = 0;
        teamStats.forEach(stat => {
            totalPersonalFouls += stat.pf;
        });

        // Calculate average personal fouls per game
        const averagePersonalFouls = totalPersonalFouls / teamStats.length;

        res.json({ averagePersonalFouls: averagePersonalFouls.toFixed(2) });
    } catch (err) {
        console.error('Error calculating average personal fouls:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});*/