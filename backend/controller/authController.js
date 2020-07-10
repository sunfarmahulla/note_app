const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';
const bcrypt = require('bcryptjs');
'use strict';
 var sessionstorage = require('sessionstorage');


module.exports = ({
    home: async function (req, res) {
        try {
            res.status(200).send("Hello Note");
        } catch (err) {
            console.log(err);
        }
    },
    register: async function (req, res) {
        try {
            const { name, email, password } = req.body;
            User.findOne({ email: email }).then(user => {
                if (user) {
                    res.status(404).json({ status: "error", "message": "Email is already in use", data: null });
                } else {
                    const newUser = new User({
                        name, email, password
                    });
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save(function (err, data) {
                            if (err) {
                                res.send('error:' + err);
                            } else {
                                res.json({
                                    "message": "successfully registered",
                                    "userEmail": data.email,
                                    "userId": data.id
                                })
                            }
                        })
                    }))
                }
            })

        } catch (err) {
            console.log(err);
        }


    },

    login: async function (req, res, next) {
        try {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) {
                    next(err);
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {

                        const payload = {
                            user: {
                              id: user.id
                            }
                          };
                    
                          jwt.sign(
                            payload,
                            "randomString",
                            {
                              expiresIn: 3600
                            },
                            (err, token) => {
                              if (err) throw err;
                              sessionstorage.setItem('token', token);
                              res.status(200).json({ user:user,
                                token
                              });
                            }
                          );

                        
                    } else {
                        res.json({ status: "error", "message": "Invaild email and password", data: null });
                    }
                }
            });

        } catch (err) {
            console.log(err);
        }
    },

    profile: async function (req, res, next) {
        try {
            //use auth middleware
            const user = await User.findById(req.user.id);
            res.json(user);
          } catch (e) {
            res.send({ message: "Error in Fetching user" });
          }
    }

})