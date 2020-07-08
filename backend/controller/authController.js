const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';
const bcrypt = require('bcryptjs');

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
                        newUser.save(function (err, user) {
                            if (err) {
                                res.send('error:' + err);
                            } else {
                                res.json({
                                    "message": "successfully registered",
                                    "userEmail": user.email,
                                    "userId": user.id
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

    login: async function (req, res) {
        try {
            const { email, password } = req.body;
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    next(err);
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        const token = jwt.sign({ id: user._id },
                            process.env.SECRET_KEY, { expiresIn: '1h' });

                        res.json({
                            status: "success", "message": "user is authenticated",
                            data: { user: user, token: token }
                        });
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
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        User.findOne({
            _id: decoded._id
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.json({ "error": "User not found" });
            }
        }).catch(err => {
            res.send('error', err);
        })
    }

})