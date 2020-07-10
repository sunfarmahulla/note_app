const mongoose = require ('mongoose');
const {Schema} =  mongoose;

const notesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
       
    },
    date:{
        type: Date,
        default: Date.now
    }
    
});

const Todo = mongoose.model('Note', notesSchema,'notes');
module.exports = Todo;