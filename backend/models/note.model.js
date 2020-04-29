const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const toDoSchema = new Schema(
    {
        toDo:
        {
            type: String,
            required: true,
            trim: true,
        },
        isChecked:
        {
            type: Boolean,
            default: false,
        }
    },

    {
        timestamps: true
    });

const noteSchema = new Schema(
    {
        noteHeader: {
            type: String,
            required: true,
            trim: true,
        },
        defaultNote: {
            type: String,
            trim: true,
        },
        todoNotes: [toDoSchema]
    },

    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;