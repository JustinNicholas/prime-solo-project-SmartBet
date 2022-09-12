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
    SELECT "user_bets".*, "scores".score_id, "scores".away_score, "scores".home_score, "scores".away_team, "scores".home_team, "scores".is_over, "games".channel FROM "user_bets"
    LEFT JOIN "scores"
	ON "scores".score_id = "user_bets".score_id
    LEFT JOIN "games"
	ON "games".score_id = "scores".score_id
    WHERE user_id = $1
    ORDER BY time;`;

    // `
    // SELECT * FROM "user_bets"
    // WHERE user_id = $1
    // ORDER BY time;`;

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

  router.put('/:id', (req, res) => {
    const bet = req.body;
    console.log('bets', bet);
    const queryText = `
    UPDATE "user_bets"
    SET "user_id" = $1,
    "score_id" = $2,
    "chosen_team" = $3,
    "chosen_team_id" = $4,
    "chosen_moneyline" = $5,
    "un_chosen_team" = $6,
    "un_chosen_team_id" = $7,
    "un_chosen_moneyline" = $8,
    "week" = $9,
    "time" = $10,
    "bet_amount" = $11,
    "profit" = $12,
    "is_completed" = $13
    WHERE "id" = $14;`;

    let profit = 0;
    let is_completed = false;

    profitCalc(bet);

function profitCalc(bet){
    if (bet.is_completed === false){
//just submit as is. no profit needed and is_complete will remain false
        profit = 0;
        is_completed = false;
    } else if (bet.is_completed === true) {
        if (bet.winner_same){
            if (bet.profit > 0){
                // now its a win
                // recalc profit
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
            } else if (bet.profit < 0 ) {
                // now its a loss
                // profit = -bet amount
                profit = -bet.bet_amount;
                is_completed = true;
            }
        } else if (bet.winner_same === false) {
            if (bet.profit > 0){
                // now its a loss
                // profit = -bet amount
                profit = -bet.bet_amount;
                is_completed = true;
            } else if (bet.profit < 0 ) {
                //now its a win
                // recalc profit
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
    }
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
        is_completed,
        bet.id
      ];
  
      console.log(queryValues);
      
      pool.query(queryText, queryValues)
      .then( result => {
          console.log(queryValues);
          res.sendStatus(201);
      }).catch( err => {
        console.log(err);
        res.sendStatus(500);
      })
}


})

module.exports = router;