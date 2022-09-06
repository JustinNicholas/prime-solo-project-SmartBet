const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:score_id', (req, res) => {

      let queryText = `SELECT * FROM "games"
      WHERE score_id = $1;`;

      let queryValues = [ req.params.score_id ];

      pool.query(queryText, queryValues)
        .then( result => {
            res.send(result.rows);
        }).catch( err => {
          console.log(err);
          res.sendStatus(500);
        })
      
});

module.exports = router;

// Need this later on the post

// router.post('/:score_id', (req, res) => {
//     const bet = req.body.games;

//       let queryText = `INSERT INTO "user_auto_bets" ("user_id", "score_id", "chosen_team", "global_team_id", "chosen_moneyline", "week", "bet_amount")
//       VALUES ($1, $2, $3, $4, $5, $6, $7);`;

//       let queryValues = [ bet.user_id, bet.score_id, bet.chosen_team, bet.global_team_id, bet.chosen_moneyline, bet.week, bet.bet_amount ];

//       pool.query(queryText, queryValues)
//         .then( result => {
//             res.sendStatus(201);
//         }).catch( err => {
//           console.log(err);
//           res.sendStatus(500)
//         })
      
// });