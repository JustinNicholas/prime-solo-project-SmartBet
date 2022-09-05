const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2022?key=${process.env.SPORTS_API_KEY}`)
    .then( response => {
        // console.log(response.data);
        //need to call the post with this response...
        // axios.post('/api/games', response.data);
        res.send(response.data)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.post('/', (req, res) => {
    const games = req.body;

      let queryText = `INSERT INTO "games" ("score_id", "time", "home_team", "away_team", "home_moneyline", "away_moneyline", "channel", "week")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

      for( let i=0; i<games.length; i++) {
      let queryValues = [ games[i].ScoreID, games[i].DateTime, games[i].HomeTeam, games[i].AwayTeam, games[i].HomeTeamMoneyLine, games[i].AwayTeamMoneyLine, games[i].Channel, games[i].Week ];
      

      pool.query(queryText, queryValues)
        .then( result => {

        }).catch( err => {
          console.log(err);
          res.sendStatus(500)
        })
      }
      res.sendStatus(201);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=
// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=

// ppregame odds for the week: https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2022/1?key