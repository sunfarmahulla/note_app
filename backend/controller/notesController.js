const express = require('express');
const Note = require('../models/Note');

module.exports = ({
    post: async function (req, res) {
        try {
            const { user_id,title,new_note } = req.body;
            const newNote = new Note({
                user_id: user_id,
                title: title,
                note: new_note,
            });
            newNote.save(function (err, data) {
                if (err) {
                    res.json({
                        'error': err,
                        "message": "something is error while uploading"
                    });
                } else {
                    res.json({
                        "message": "successfully post a new note"
                    });
                }
            })
        } catch (err) {
            console.log(err);
        }

    },

    getAll: async function (req, res) {
       try{
        Note.find({}, function(err, data){
            if(err){
                res.send(err);
            }else{
                res.json(data);
            }
        });
       }catch(err){
           console.log(err);
       } 
    },
    getByUserId: async function(req, res, next){
        try{
            Note.find({user_id:req.params.userId}, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.json(data);
                }
            })
        }catch (err) {
            console.log(err);
        }
    },
    getById: async function (req, res, next) {
        try{
            Note.findById(req.params.noteID, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.json(data);
                }
            });
        }catch(err){
            console.log(err);
        }
        
    },
    updateById: async function (req, res, next) {
        try{
            const {new_note} = req.body;
            Note.findByIdAndUpdate(req.params.noteID,{new_note}, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.json({
                        status:"200",
                        "message":"successfully updated note"
                    });
                }
            })
        }catch(err){
            console.log(err);
        }
    },
    deleteById: async function (req, res, next) {
        try{
            Note.findByIdAndDelete(req.params.noteID, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.json({status:"200",message:"successfully deleted"});
                }
            });
        }catch(err){
            console.log(err);
        }
    }


});