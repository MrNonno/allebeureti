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
// Endpoint to retrieve statistics for a specific team
app.get('/api/teams/:teamId/statistics', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId);

        const db = getDatabase();
        const gamesCollection = db.collection('games');

        // Retrieve team information from teams collection
        const team = await db.collection('teams').findOne({ id: teamId });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Find all games where the team is either the home team or the visitor team
        const teamGames = await gamesCollection.find({
            $or: [
                { "home_team.full_name": team.full_name },
                { "visitor_team.full_name": team.full_name }
            ]
        }).toArray();

        // Calculate win rate for the team
        const totalGamesPlayed = teamGames.length;
        const totalWins = teamGames.filter(game => {
            if (game.home_team.full_name === team.full_name && game.home_team_score > game.visitor_team_score) {
                return true;
            }
            if (game.visitor_team.full_name === team.full_name && game.visitor_team_score > game.home_team_score) {
                return true;
            }
            return false;
        }).length;

        const winRate = totalGamesPlayed > 0 ? (totalWins / totalGamesPlayed) * 100 : 0;

        res.json({
            team: team.full_name,
            winRate: winRate.toFixed(2) + '%',
            totalGamesPlayed: totalGamesPlayed
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

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});