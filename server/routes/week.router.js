const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${process.env.SPORTS_API_KEY}`)
    .then( response => {
        console.log('Response', response);
        res.send({currentWeek: response.data});
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.post('/', (req, res) => {
  const week = req.body.week;

    let queryText = `INSERT INTO "week" ("week")
    VALUES ($1);`;
    let queryValues = [week];
    console.log(queryValues);

    pool.query(queryText, queryValues)
      .then( result => {
        res.sendStatus(201);
      }).catch( err => {
        console.log(err);
        res.sendStatus(500)
      })
    // }

});

router.delete('/', (req, res) => {
  const queryText = 'DELETE FROM "week"'
  pool.query(queryText)
  .then( result => {
    res.sendStatus(204)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500)
  });
});

module.exports = router;

// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=
// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=