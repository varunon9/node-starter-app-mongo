const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const validationService = require('./validationService');
const models = require('../models');

const bcrypt = require('bcrypt');

module.exports = {

    signup: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.password) {
                reject('Missing params');
            } else {
                validationService.doesSuchUserExist(params.email)
                    .then(result => {
                        if (result) {
                            reject('This email has been used. Try Login');
                        } else { 
                            bcrypt.hash(params.password, 2).then((hash) => {
                                params.password = hash;
                                // insert user info to db

                                new models.user(params).save().then(user => {
                                    resolve(user);
                                }).catch((err) => {
                                    console.error('Error occured while creating user:', err);
                                    reject('Server side error');
                                });
                            }).catch((err) => {
                                console.error('Error encrypting password', err);
                                reject('Server side error');
                            });             
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },

    loginUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.password) {
                reject('Missing params');
            } else {
                validationService.doesSuchUserExist(params.email)
                    .then(result => {
                        if (result) {
                            models.user.findOne({
                                email: params.email
                            }).then(user => {
                                if (user) {
                                    bcrypt.compare(params.password, user.password)
                                        .then(function(res) {
                                            if (res == true) {
                                                resolve(user);
                                            } else {
                                                reject('Password mismatch');
                                            }
                                    }).catch((err) => {
                                        console.error('Error decrypting password', err);
                                        reject('Server side error');
                                    });
                                }
                            }).catch(err => {
                                reject('Server side Error');
                            })
                        } else {
                            reject('User does not exist');
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },

    getUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email) {
                reject('Invalid Request');
            } else {
                validationService.doesSuchUserExist(params.email)
                    .then(result => {
                        if (result) {
                            models.user.findOne({
                                email: params.email
                            }).then(user => {
                                if (user) {
                                    resolve(user);
                                }
                            }).catch(err => {
                                reject('Server side Error');
                            })
                        } else {
                            reject('User does not exist');
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },

    updateUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email) {
                reject('Missing Params');
            } else {
                models.user.findOneAndUpdate({
                    email: params.email,
                }, params).then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject('No such User exist');
                    }
                }).catch(err => {
                    console.error('Error occured at saveUser', err);
                    reject('Server side error');
                });
            }
        });
    }
};