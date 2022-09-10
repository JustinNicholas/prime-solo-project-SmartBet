const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gamesRouter = require('./routes/updateGames.router.js');
const weekRouter = require('./routes/week.router.js');
const getGamesRouter = require('./routes/getGames.router');
const getWeekRouter = require('./routes/getWeek.router');
const betOnThisRouter  = require('./routes/betOnThis.router');
const getBetsRouter = require('./routes/getBets.router');
const teamsRouter = require('./routes/teams.router');
const scheduledUpdate = require('./routes/scheduledUpdate.router');
const updateScores = require('./routes/updateScores.router');

// Body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/games', gamesRouter);
app.use('/api/week', weekRouter);
app.use('/database/games', getGamesRouter);
app.use('/database/week', getWeekRouter);
app.use('/database/thisGame', betOnThisRouter);
app.use('/database/bets', getBetsRouter);
app.use('/database/teams', teamsRouter);
app.use('/database/scores', updateScores);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

