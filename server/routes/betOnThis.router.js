const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:score_id',rejectUnauthenticated, (req, res) => {

      let queryText = `
      SELECT "games".*, "scores".score_id, "scores".away_score, "scores".home_score, "scores".is_over, t1.team_full_name AS away_full_name, t2.team_full_name AS home_full_name  FROM games
      JOIN "scores"
      ON "scores".score_id = "games".score_id
      JOIN teams t1
      ON t1.id = "games".global_away_team_id
      JOIN teams t2
      ON t2.id = "games".global_home_team_id
      WHERE "games".score_id = $1;`;

      let queryValues = [ req.params.score_id ];

      pool.query(queryText, queryValues)
        .then( result => {
            res.send(result.rows);
        }).catch( err => {
          console.log(err);
          res.sendStatus(500);
        })
      
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const bet = req.body;
    const queryText = `
    INSERT INTO "user_bets" ("user_id", "score_id", "chosen_team", "chosen_team_id", "chosen_moneyline", "un_chosen_team", "un_chosen_team_id", "un_chosen_moneyline", "week", "time", "bet_amount", "profit", "is_completed")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;

    let profit = 0;
    let is_completed = false;

    function profitCalc() {
          console.log('our negative bet amount is', -bet.bet_amount);
          if (bet.winLoss === false) {
              console.log('we lost the bet', -bet.bet_amount);
              profit = -bet.bet_amount;
              is_completed = true;
          } else if (bet.winLoss === true) {
              if (bet.chosen_moneyline > 99) {
                  let profitAnswer = ((Number(bet.chosen_moneyline) / 100) * Number(bet.bet_amount));
                  console.log('making profit equal to',profitAnswer);
                  let rounded = Number(profitAnswer.toFixed(2))
                  profit = rounded;
                  is_completed = true;
              } else if (bet.chosen_moneyline < -99) {
                  let profitAnswer = (Number(bet.bet_amount) / (Number(bet.chosen_moneyline) / -100));
                  console.log('making profit equal to',profitAnswer);
                  let rounded = Number(profitAnswer.toFixed(2))
                  profit = rounded,
                  is_completed = true;
              }
          }
  }

    profitCalc();

    const queryValues = [
      bet.user_id,
      bet.score_id,
      bet.chosen_team,
      bet.chosen_team_id,
      bet.chosen_moneyline,
      bet.un_chosen_team,
      bet.un_chosen_team_id,
      bet.un_chosen_moneyline,
      bet.week,
      bet.time,
      bet.bet_amount,
      profit,
      is_completed
    ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.sendStatus(201);
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
})

module.exports = router;
