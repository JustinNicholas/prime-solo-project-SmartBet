const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */

//  rejectUnauthenticated,

router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
    const queryText = `
    SELECT * FROM "user_bets"
    WHERE user_id = $1;`;

    pool.query(queryText, [req.user.id])
    .then( result => {
        res.send(result.rows)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    DELETE FROM "user_bets"
    WHERE id = $1;`;
    const queryValues = [req.params.id];

    pool.query(queryText, queryValues)
        .then( result => {
            res.sendStatus(204);
        }).catch( err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {

    let queryText = `SELECT * FROM "user_bets"
    WHERE id = $1;`;
  
    let queryValues = [ req.params.id ];
    console.log(queryValues);
  
    pool.query(queryText, queryValues)
      .then( result => {
          res.send(result.rows);
      }).catch( err => {
        console.log(err);
        res.sendStatus(500);
      })
    
  });

// router.post('/', (req, res) => {
//     const games = req.body.games;

//       let queryText = `INSERT INTO "games" ("score_id", "time", "home_team", "global_home_team_id", "away_team", "global_away_team_id", "home_moneyline", "away_moneyline", "channel", "week")
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

//       for( let i=0; i<games.length; i++) {
//       // if ( games[i].Week === currentWeek ){
//       let queryValues = [ games[i].ScoreID, games[i].DateTime, games[i].HomeTeam, games[i].GlobalHomeTeamID, games[i].AwayTeam, games[i].GlobalAwayTeamID, games[i].HomeTeamMoneyLine, games[i].AwayTeamMoneyLine, games[i].Channel, games[i].Week ];
//       console.log(queryValues);

//       pool.query(queryText, queryValues)
//         .then( result => {

//         }).catch( err => {
//           console.log(err);
//           res.sendStatus(500)
//         })
//       }
//       // }
//       res.sendStatus(201);
// });

// router.delete('/', (req, res) => {
//     const queryText = 'DELETE FROM "games"'
//     pool.query(queryText)
//     .then( result => {
//       res.sendStatus(204)
//     }).catch( err => {
//       console.log(err);
//       res.sendStatus(500)
//     });
// });

module.exports = router;