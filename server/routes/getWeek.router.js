const { default: axios } = require('axios');
const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
    const queryText = 'SELECT * FROM week;';

    pool.query(queryText)
    .then( result => {
        console.log('result of week', result.rows);
        res.send(result.rows)
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