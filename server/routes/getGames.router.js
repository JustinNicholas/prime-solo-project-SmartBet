const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    const queryText = 'SELECT * FROM games;';

    pool.query(queryText)
    .then( result => {
        res.send(result.rows)
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    })

});

module.exports = router;