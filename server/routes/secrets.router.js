const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.isAuthenticated() && req.user.clearance_level < 6) {
    console.log('req.user:', req.user);
    pool.query(`SELECT * FROM "secret"
            WHERE "secrecy_level" < 6;`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }
    else if (req.isAuthenticated() && req.user.clearance_level < 13) {
        console.log('req.user:', req.user);
        pool.query(`SELECT * FROM "secret"
            WHERE "secrecy_level" < 13;`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }
    else if (req.isAuthenticated() && req.user.clearance_level >= 13) {
        console.log('req.user:', req.user);
        pool.query(`SELECT * FROM "secret";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

module.exports = router;