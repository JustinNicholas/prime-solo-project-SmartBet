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
        res.send(response.data)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

const CronJob = require('cron').CronJob;
const job = new CronJob(
'0 0 15 * * 5',
function() {
    console.log('Update the games');
    updateGames();
},
null,
true,
'America/Chicago'
);

const updateGames = () => {
    console.log('cron task triggered!!!');
    console.log('in delete games')
    axios.delete('/database/games')
        // clear out the table of week
    .then( result => {
      axios.delete('/database/week')
      console.log('in delete week')
        .then( result => {
        // GET week info from the 3rd party api.
          axios.get('/api/week')
          console.log('in get week')
          .then( result => {
            // POST the week info to the database with the response of week
            axios.post('/database/week', { week: result.data.currentWeek })
            console.log('in post week')
              .then( result => {
                // GET games info from the 3rd party api
                axios.get('/api/games')
                console.log('in get games')
                .then( result => {
                  // POST the games info to the database with the response of games response
                  axios.post('/database/games', { games: result.data })
                  console.log('in post games')
                  res.sendStatus(200)
                })
                
              })

          })

        })

    }) 
}


module.exports = router;

// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=
// current week https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=

// ppregame odds for the week: https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2022/1?key