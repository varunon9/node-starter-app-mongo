const express = require('express');
const router = express.Router();

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const middlewares = require('../middlewares');

// middleware to verify a token
router.use(middlewares.verifyToken);

// middleware to make blank parameters fields null
// params must be object
router.use('/save', function(req, res, next) {
    const params = req.body;
    try {
        Object.keys(params).forEach(function(key) {
            if (params[key] == '') {
                params[key] = null;
            }
        });
    } catch (e) {
        console.error('Exception at save middleware', e);
    }

    next();
});


router.get('/', function(req, res, next) {
    res.render('dashboard', {
        mobile: req.decoded.mobile,
        id: req.decoded.id,
        name: req.decoded.name,
        email: req.decoded.email
    });
});

router.post('/get/user/profile', function(req, res, next) {
    const params = req.body;
    params.email = req.decoded.email;

    userService.getUser(params)
        .then(user => {
            res.json({
                success: true,
                result: user
            });
        }).catch(err => {
            res.json({
                success: false,
                message: err
            });
        });
});

router.post('/update/user', function(req, res, next) {
    const params = req.body;

    // can't update email and password
    params.email = req.decoded.email;
    delete params.password;
    
    userService.updateUser(params)
        .then(user => {
            res.json({
                success: true,
                result: user
            });
        }).catch(err => {
            res.json({
                success: false,
                message: err
            });
        });
});

module.exports = router;