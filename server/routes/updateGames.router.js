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
  axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Schedules/${year}?key=${process.env.SPORTS_API_KEY}`)
    .then( response => {
        res.send(response.data)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});


module.exports = router;

// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=
// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=

// ppregame odds for the week: https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2022/1?key
