const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')

// Get all the notes using : GET "api/notes/fetchallnotes". login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured!!');
    }
})

// Add a new Note using : POST "api/notes/addnote". login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 5 }),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body
        // validate the request body or json passed in request.
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.json({ errors: error.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id

        })

        const savedNote = await note.save();

        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured!!');
    }
})


// Update the existing Note using : PUT "api/notes/updatenote". login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, descripiton, tag } = req.body

        // create new note
        const newNote = {};

        if (title) {
            newNote.title = title
        }

        if (descripiton) {
            newNote.descripiton = descripiton
        }
        if (tag) {
            newNote.tag = tag
        }

        //Find the note to be updated and update it 
        let note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error !!');
    }
})



// Delete the existing Note using : Delete "api/notes/deletenote". login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be updated and delete it 

        let note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Allowed deletiononly if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ 'success': 'Note has been deleted', note: note });

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error !!');
    }
})

module.exports = router 