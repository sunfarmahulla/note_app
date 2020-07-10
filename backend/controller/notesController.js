const express = require('express');
const Note = require('../models/Note');

module.exports = ({
    post: async function (req, res) {
        try {
            const { user_id,title,note } = req.body;
            const newNote = new Note({
                user_id: user_id,
                title: title,
                note: note,
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
            var id = req.params.ID;
            Note.find({user_id:id}, function(err, data){
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
           
            Note.findByIdAndUpdate(req.params.noteID,{title:req.body.title ,note: req.body.note}, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.json({data,
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