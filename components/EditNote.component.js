import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, ScrollView, BackHandler} from 'react-native';
import noteServices from '../services/Note.services';
import {Appbar, Card, TextInput, Checkbox, Button} from 'react-native-paper';
import Colors from '../assets/colors';
const EditNote = ({location, history}) => {
  const [note, setNote] = useState({
    pinned: false,
    _id: '',
    noteHeader: '',
    defaultNote: '',
    todoNotes: [],
    userid: '',
  });
  const [isNewNote, setIsNewNote] = useState(true);
  const [noteHeader, setNoteHeader] = useState('');
  const [defaultNote, setDefaultNote] = useState('');
  const [todoNotes, settodoNotes] = useState([]);
  useEffect(() => {
    _reloadPage();
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, []);
  const _reloadPage = () => {
    if (location.state.noteId !== undefined) {
      noteServices('GET_NOTE', {noteId: location.state.noteId}).then(res => {
        setNote(...res);
        setNoteHeader(res[0].noteHeader);
        setDefaultNote(res[0].defaultNote);
        settodoNotes(res[0].todoNotes);
        setIsNewNote(false);
        console.log(res[0].todoNotes);
      });
    } else {
      if (location.state.noteType === 'note') {
        settodoNotes(null);
      } else {
        settodoNotes([{toDo: '', isChecked: false}]);
        setDefaultNote(null);
      }
    }
  };
  const _saveUpdateNote = () => {
    if (todoNotes !== null) {
      if (todoNotes[todoNotes.length - 1].toDo.trim() === '') {
        todoNotes.pop();
      }
    }
    const noteDetails = {
      ...note,
      noteHeader: noteHeader,
      defaultNote: defaultNote,
      todoNotes: todoNotes,
    };
    if (isNewNote) {
      noteServices('NEW_NOTE', noteDetails).then(() => {
        history.push({
          pathname: '/home',
          state: {
            noteId: note._id,
          },
        });
      });
    } else {
      if (
        note.noteHeader === noteDetails.noteHeader &&
        note.todoNotes === noteDetails.todoNotes &&
        note.defaultNote === noteDetails.defaultNote
      ) {
        alert('Same!');
      } else {
        noteServices('EDIT_NOTE', noteDetails).then(() => {
          history.push({
            pathname: '/createNote',
            state: {
              noteId: note._id,
            },
          });
        });
      }
    }
  };
  const _discardNote = () => {
    history.push('/home');
  };
  const title = isNewNote
    ? todoNotes === null
      ? 'Create new note'
      : 'Create new checklist'
    : `#${note._id}`;
  return (
    <View>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction
          icon="content-save-edit"
          style={styles.backbutton}
          onPress={() => {
            if (
              note.noteHeader === noteHeader &&
              note.todoNotes === todoNotes &&
              note.defaultNote === defaultNote
            ) {
              _discardNote();
            } else {
              Alert.alert(
                'Discard Note?',
                'Are you sure, Your changes will be lost?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      _discardNote();
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
        />
        <Appbar.Action
          icon="content-save-edit"
          onPress={() => _saveUpdateNote()}
          style={styles.pinbutton}
        />
        <Appbar.Action
          icon="book-remove"
          onPress={() => {
            _discardNote();
          }}
          style={styles.deletebutton}
        />
      </Appbar>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title subtitleStyle={styles.cardSubTitle} subtitle={title} />
          <TextInput
            mode="outlined"
            label="Note Title"
            style={styles.cardTitle}
            value={noteHeader}
            onChangeText={text => setNoteHeader(text)}
          />
          <Card.Content>
            <ContentComponent
              defaultNote={defaultNote}
              setDefaultNote={setDefaultNote}
              todoNotes={todoNotes}
              settodoNotes={settodoNotes}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const ContentComponent = ({
  defaultNote,
  setDefaultNote,
  todoNotes,
  settodoNotes,
}) => {
  if (defaultNote !== null) {
    return (
      <TextInput
        mode="outlined"
        style={styles.cardDesc}
        label="Note"
        multiline={true}
        numberOfLines={4}
        value={defaultNote}
        onChangeText={text => setDefaultNote(text)}
      />
    );
  } else {
    return (
      <View style={styles.cardDesc}>
        {todoNotes.map((obj, index) => {
          return (
            <View style={styles.checkboxes} key={`${obj.toDo}-${index}`}>
              <Checkbox.Android
                color={Colors.primary}
                status={obj.isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  let list = [...todoNotes];
                  list[index].isChecked = list[index].isChecked ? false : true;
                  settodoNotes(list);
                }}
              />
              <TextInput
                style={styles.todoDesc}
                defaultValue={obj.toDo}
                onEndEditing={e => {
                  let list = [...todoNotes];
                  list[index].toDo = e.nativeEvent.text;
                  settodoNotes(list);
                }}
              />
            </View>
          );
        })}
        <Button
          icon="playlist-plus"
          mode="contained"
          color={Colors.primary}
          uppercase={false}
          style={styles.addNewButton}
          onPress={() => {
            const newList = [...todoNotes, {toDo: '', isChecked: false}];
            if (todoNotes[todoNotes.length - 1].toDo !== '')
              settodoNotes(newList);
          }}>
          Add New Item
        </Button>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  appbar: {
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
  },
  backbutton: {
    position: 'absolute',
    left: 0,
    right: 'auto',
  },
  deletebutton: {
    position: 'absolute',
    left: 'auto',
    right: 0,
  },
  savebutton: {
    position: 'absolute',
    left: 'auto',
    right: 80,
  },
  pinbutton: {
    position: 'absolute',
    left: 'auto',
    right: 40,
  },
  card: {
    padding: 5,
    margin: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  cardTitle: {fontSize: 40, fontWeight: 'bold', margin: 10},
  cardSubTitle: {fontSize: 20, paddingTop: 10, fontStyle: 'italic'},
  cardDesc: {
    fontSize: 15,
    marginTop: 10,
    padding: 0,
    lineHeight: 25,
  },
  checkboxes: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoDesc: {
    backgroundColor: Colors.white,
    margin: 5,
    height: 40,
    width: '80%',
  },
  addNewButton: {
    backgroundColor: Colors.primary,
    marginTop: 10,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    fontSize: 20,
  },
  saveButtonContent: {
    fontSize: 20,
  },
});
export default EditNote;
