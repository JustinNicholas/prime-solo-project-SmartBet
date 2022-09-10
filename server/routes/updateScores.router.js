const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

let year =  new Date().getFullYear();
/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Scores/${year}?key=${process.env.SPORTS_API_KEY}`)
    .then( response => {
        res.send(response.data)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.post('/', (req, res) => {
    const scores = req.body.scores;

      let queryText = `INSERT INTO "games" ("score_id", "home_team", "global_home_team_id", "away_team", "global_away_team_id", "home_score", "away_score", "is_over")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

      for( let i=0; i<games.length; i++) {
      // if ( games[i].Week === currentWeek ){
      let queryValues = [ scores[i].ScoreID, scores[i].HomeTeam, scores[i].GlobalHomeTeamID, scores[i].AwayTeam, scores[i].GlobalAwayTeamID, scores[i].HomeScore, games[i].AwayScore ];
      console.log(queryValues);

      pool.query(queryText, queryValues)
        .then( result => {

        }).catch( err => {
          console.log(err);
          res.sendStatus(500)
        })
      }
      // }
      res.sendStatus(201);
});

router.delete('/', (req, res) => {
    const queryText = 'DELETE FROM "scores"'
    pool.query(queryText)
    .then( result => {
      res.sendStatus(204)
    }).catch( err => {
      console.log(err);
      res.sendStatus(500)
    });
});


module.exports = router;