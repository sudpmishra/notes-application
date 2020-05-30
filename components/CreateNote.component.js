import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, BackHandler} from 'react-native';
import noteServices from '../services/Note.services';
import {Appbar, Card, Paragraph, IconButton, Divider} from 'react-native-paper';
import Colors from '../assets/colors';
const CreateNote = ({location, history, isEdit = false}) => {
  const [note, setNote] = useState({
    pinned: false,
    _id: '',
    noteHeader: '',
    todoNote: false,
    defaultNote: '',
    todoNotes: [],
    userid: '',
  });
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
  const editNote = noteid => {
    history.push({
      pathname: '/editNote',
      state: {
        noteId: noteid,
      },
    });
  };
  const _reloadPage = () => {
    noteServices('GET_NOTE', {noteId: location.state.noteId}).then(res => {
      setNote(...res);
    });
  };
  const ContentComponent = () => {
    if (note.defaultNote !== null) {
      return <Paragraph style={styles.cardDesc}>{note.defaultNote}</Paragraph>;
    } else {
      return (
        <View style={styles.cardDesc}>
          {note.todoNotes.map((obj, index) => {
            return (
              <View style={styles.checkboxes} key={index}>
                <IconButton
                  icon={
                    obj.isChecked
                      ? 'check-box-outline'
                      : 'checkbox-blank-outline'
                  }
                />
                <Text>{obj.toDo}</Text>
              </View>
            );
          })}
        </View>
      );
    }
  };
  return (
    <View>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction
          style={styles.backbutton}
          icon="archive"
          onPress={() => history.push('/home')}
        />
        <Appbar.Action
          icon="square-edit-outline"
          style={styles.editbutton}
          onPress={() => editNote(note._id)}
        />
        <Appbar.Action
          icon="pin"
          color={note.pinned ? Colors.danger : Colors.black}
          onPress={() => {
            noteServices('PIN_NOTE', {_id: note._id, isPinned: note.pinned});
            _reloadPage();
          }}
          style={note.pinned ? styles.pinbutton : styles.pinbutton}
        />
        <Appbar.Action
          icon="delete"
          onPress={() => console.log('Pressed delete')}
          style={styles.deletebutton}
        />
      </Appbar>
      <Card style={styles.card}>
        <Card.Title
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubTitle}
          title={note.noteHeader}
          subtitle={`#${note._id}`}
        />
        <Divider />
        <Card.Content>
          <ContentComponent />
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  appbar: {
    left: 0,
    right: 0,
    position: 'absolute',
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
  editbutton: {
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
    marginTop: 60,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  cardTitle: {fontSize: 40, paddingTop: 30, fontWeight: 'bold'},
  cardSubTitle: {fontSize: 20, paddingTop: 10, fontStyle: 'italic'},
  cardDesc: {
    fontSize: 20,
    paddingTop: 20,
    lineHeight: 25,
  },
  checkboxes: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default CreateNote;
