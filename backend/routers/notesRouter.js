const router = require('express').Router();
let Note = require('../models/note.model');

/***
 * GET all notes for user
 */
router.route('/getNotesForUser').get((req, res) => {
  const requserid = req.query.userid;
  Note.find({userid: requserid}, [], {
    sort: {
      pinned: -1, //Sort by Date Added DESC
    },
  })
    .then(Notes => {
      return res.json(Notes);
    })
    .catch(err => res.status(400).json('ERROR: ' + err));
});
/***
 * GET single note
 */
router.route('/getNoteById').get((req, res) => {
  const reqId = req.query.id;
  Note.find({_id: reqId})
    .then(Notes => {
      return res.json(Notes);
    })
    .catch(err => res.status(400).json('ERROR: ' + err));
});
/***
 * HOmepage
 */
router.route('/').get((req, res) => {
  res.json('Notes Page');
});

/***
 * Pin notes for supplied post
 */
router.route('/pinNote').post((req, res) => {
  const _id = req.query.noteId;
  const isPinned = req.query.isPinned === 'true' ? true : false;
  Note.findByIdAndUpdate({_id}, {pinned: !isPinned}, function(err, result) {
    if (err) {
      console.log('error');
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route('/add').post((req, res) => {
  let newNoteJson = {
    noteHeader: req.body.noteHeader,
    pinned: false,
    defaultNote: null,
    todoNotes: null,
    userid: req.body.userid,
  };
  if (req.body.type.toLowerCase() == 'note') {
    newNoteJson = {...newNoteJson, defaultNote: req.body.defaultNote};
  } else {
    newNoteJson = {...newNoteJson, todoNotes: req.body.todoNotes};
  }
  const newNote = new Note(newNoteJson);

  newNote
    .save()
    .then(() =>
      res.json(
        `Note with title ${newNoteJson.noteHeader} for user: ${
          newNoteJson.userid
        } Added!`,
      ),
    )
    .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/edit').post((req, res) => {
  let id = req.body._id;
  let header =
    req.body.noteHeader !== null
      ? req.body.noteHeader.trim()
      : req.body.noteHeader;
  let defNote =
    req.body.defaultNote !== null
      ? req.body.defaultNote.trim()
      : req.body.defaultNote;
  let toDos = req.body.todoNotes;
  Note.findByIdAndUpdate(
    {_id: id},
    {noteHeader: header, defaultNote: defNote, todoNotes: toDos},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send({...result._doc, oMessage: 'Note Updated Successfully'});
      }
    },
  );
});

router.route('/delete').delete((req, res) => {
  let id = req.query.noteId;
  Note.remove({_id: id}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({oMessage: 'Note Deleted Successfully'});
    }
  });
});
module.exports = router;
