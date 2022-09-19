const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
// have to specify the port because it defaults to port: 80.
const PORT = process.env.PORT || 5000;
// have to specify url because it does not recognize where url is.
axios.defaults.baseURL = 'http://localhost:' + PORT;

router.get('/', (req, res) => {
  // GET route code here
  deleteGames();
  setTimeout(res.sendStatus(200), 500)
    // pool.query(queryText, [req.user.id])
    // .then( result => {
    //     res.send(result.rows)
    // }).catch( err => {
    //     console.log(err);
    //     res.sendStatus(500);
    // })

});

const CronJob = require('cron').CronJob;
const job = new CronJob(
    // this is set to go off every hour on the hour
'0 23 15 * * *',
function() {
    console.log('Update the games');
    deleteGames();
},
null,
true,
'America/Chicago'
);

function deleteGames() {
    console.log('cron task triggered!!!');
    console.log('in delete games')
    // clear out the games table
    axios.delete('/database/games')
    .then( result => {
      deleteWeek();
      // res.sendStatus(204)
    }).catch( err => {
      console.log(err);
      // res.sendStatus(500)
    })
}

function deleteWeek() {
  console.log('in delete week')
  // clear out the table of week
  axios.delete('/database/week')
  .then( result => {
    deleteScores();
    // res.sendStatus(204)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function deleteScores() {
    console.log('in delete scores')
    // clear out the table of week
    axios.delete('/database/scores')
    .then( result => {
      getWeek();
      // res.sendStatus(204)
    }).catch( err => {
      console.log(err);
      // res.sendStatus(500)
    })
}

function getWeek() {
  console.log('in get week')
  axios.get('/api/week')
  .then( result => {
    postWeek(result);
    // res.sendStatus(200)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function postWeek(week) {
  console.log('in post week')
  axios.post('/database/week', { week: week.data.currentWeek })
  .then( result => {
    getGames();
    // res.sendStatus(201)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function getGames() {
  console.log('in get games')
  axios.get('/api/games')
  .then( result => {
    postGames(result);
    // res.sendStatus(200)
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function postGames(response) {
  console.log('in post games')
  axios.post('/database/games', { games: response.data })
  .then( result => {
    // res.sendStatus(201)
    getScores();
  }).catch( err => {
    console.log(err);
    // res.sendStatus(500)
  })
}

function getScores() {
    console.log('in get scores')
    axios.get('/database/scores')
    .then( result => {
      postScores(result);
      // res.sendStatus(200)
    }).catch( err => {
      console.log(err);
      // res.sendStatus(500)
    })
  }
  
  function postScores(response) {
    console.log('in post scores')
    axios.post('/database/scores', { scores: response.data })
    .then( result => {
      // res.sendStatus(201)
      joinBetsAndScores();
    }).catch( err => {
      console.log(err);
      // res.sendStatus(500)
      checkBets();
    })
  }

  function joinBetsAndScores() {
    console.log('checking bets!');
    axios.get('/database/betCheck')
        .then( result => {
            checkBets(result.data);
        }).catch( err => {
            console.log(err);
        })
  }

  function checkBets(bets) {
    console.log(bets);
    for( let i=0; i<bets.length; i++){
        let bet = bets[i];
        let profit = 0;
        if( bet.home_score > bet.away_score){
            if( bet.chosen_team_id == bet.global_home_team_id){
                //calc win
                console.log('WINNNER!');
                if (bet.chosen_moneyline > 99) {
                    let profitAnswer = ((Number(bet.chosen_moneyline) / 100) * Number(bet.bet_amount));
                    console.log('making profit equal to',profitAnswer);
                    let rounded = Number(profitAnswer.toFixed(2))
                    profit = rounded;

                } else if (bet.chosen_moneyline < -99) {
                    let profitAnswer = (Number(bet.bet_amount) / (Number(bet.chosen_moneyline) / -100));
                    console.log('making profit equal to',profitAnswer);
                    let rounded = Number(profitAnswer.toFixed(2))
                    profit = rounded;

                }
            } else {
                //calc loss
                console.log('loser...');
                profit = -bet.bet_amount;

            }
        } else if ( bet.away_score > bet.home_score) {
            //meaning away team wins
            if( bet.chosen_team_id == bet.global_away_team_id){
                //calc win
                console.log('WINNNER!');
                if (bet.chosen_moneyline > 99) {
                    let profitAnswer = ((Number(bet.chosen_moneyline) / 100) * Number(bet.bet_amount));
                    console.log('making profit equal to',profitAnswer);
                    let rounded = Number(profitAnswer.toFixed(2))
                    profit = rounded;

                } else if (bet.chosen_moneyline < -99) {
                    let profitAnswer = (Number(bet.bet_amount) / (Number(bet.chosen_moneyline) / -100));
                    console.log('making profit equal to',profitAnswer);
                    let rounded = Number(profitAnswer.toFixed(2))
                    profit = rounded;

                }
            } else {
                //calc loss
                console.log('loser...');
                profit = -bet.bet_amount;

            }
        } else {
            profit = 0;
        }
        axios.put(`/database/betCheck/`, {id: bet.id, profit: profit})
    }
  }

module.exports = router;