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

router.post('/', (req, res) => {
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
                  let profitAnswer = ((Number(bet.chosen_moneyline) / 100) * Number(bet.bet_amount)) + Number(bet.bet_amount);
                  console.log('making profit equal to',profitAnswer);
                  profit = profitAnswer;
                  is_completed = true;
              } else if (bet.chosen_moneyline < -99) {
                  let profitAnswer = (Number(bet.bet_amount) / (Number(bet.chosen_moneyline) / -100)) + Number(bet.bet_amount);
                  console.log('making profit equal to',profitAnswer);
                  profit = profitAnswer,
                  is_completed = true;
              }
          } else {
              console.log('must be null still');
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