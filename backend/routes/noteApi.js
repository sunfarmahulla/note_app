const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
process.env.SECRET_KEY = 'secret';
const NoteController = require('../controller/notesController');

router.post('/notes/post', NoteController.post);
router.get('/notes/get/all', NoteController.getAll);
router.get('/notes/get/:userID', NoteController.getByUserId);
router.get('/notes/get/:noteID', NoteController.getById);
router.put('/notes/update/:noteID', NoteController.updateById);
router.delete('/notes/delete/:noteID', NoteController.deleteById);

module.exports = router;