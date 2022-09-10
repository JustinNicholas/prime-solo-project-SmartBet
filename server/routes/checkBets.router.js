const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here
      const queryText = `
      SELECT "user_bets".id, "user_bets".bet_amount, "user_bets".score_id, "user_bets".chosen_team_id, "user_bets".chosen_moneyline, "user_bets".is_completed, "scores".is_over, "scores".score_id, "scores".away_score, "scores".global_away_team_id, "scores".home_score, "scores".global_home_team_id FROM "user_bets"
      JOIN "scores"
      ON "scores".score_id = "user_bets".score_id
      WHERE is_over= TRUE AND is_completed = FALSE;`;
  
      pool.query(queryText)
      .then( result => {
          res.send(result.rows)
      }).catch( err => {
          console.log(err);
          res.sendStatus(500);
      })
  
  });

  router.put('/', (req, res) => {
    const bet = req.body;
    console.log('bets', bet);
    const queryText = `
    UPDATE "user_bets"
    SET "profit" = $1,
    "is_completed" = TRUE
    WHERE "user_bets".id = $2;`;

    
    const queryValues = [
        bet.profit,
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
})


module.exports = router;
