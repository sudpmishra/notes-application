const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const toDoSchema = new Schema(
  {
    toDo: {
      type: String,
      required: true,
      trim: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const noteSchema = new Schema(
  {
    noteHeader: {
      type: String,
      required: true,
      trim: true,
    },
    pinned: {
      type: Boolean,
      required: true,
      default: false,
    },
    defaultNote: {
      type: String,
      trim: true,
    },
    todoNotes: [toDoSchema],
    userid: {
      type: String,
      triM: true,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
