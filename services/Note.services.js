import basePath from './../config.js';
const _noteBasePath = `${basePath}/notes/`;
const noteServices = (method, params) => {
  switch (method.toUpperCase()) {
    case 'GET_NOTES':
      return _getNotes(params);
    case 'GET_NOTE':
      return _getNote(params);
    case 'NEW_NOTE':
      return _newNote(params);
    case 'PIN_NOTE':
      return _pinNote(params);
    case 'EDIT_NOTE':
      return _editNOte(params);
    case 'DELETE_NOTE':
      return _deleteNote(params);
  }
};
const _getNotes = params => {
  return fetch(`${_noteBasePath}getNotesForUser?userid=${params.userid}`, {
    method: 'GET',
  }).then(res => res.json());
};

const _getNote = params => {
  return fetch(`${_noteBasePath}getNoteById?id=${params.noteId}`, {
    method: 'GET',
  }).then(res => res.json());
};
const _newNote = params => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return fetch(`${_noteBasePath}add`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params),
  }).then(res => {
    res.json();
  });
};
const _pinNote = params => {
  return fetch(
    `${_noteBasePath}pinNote?noteId=${params._id}&isPinned=${params.isPinned}`,
    {
      method: 'POST',
    },
  ).then(res => {
    res.json();
  });
};
const _editNOte = params => {
  const body = {
    _id: params._id,
    noteHeader: params.noteHeader,
    defaultNote: params.defaultNote,
    todoNotes: params.todoNotes,
  };
  return fetch(`${_noteBasePath}edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => {
    res.json();
  });
};

const _deleteNote = params => {
  return fetch(`${_noteBasePath}delete?noteId=${params.id}`, {
    method: 'DELETE',
  }).then(res => res.json());
};
export default noteServices;
