import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Text,
} from 'react-native';
import {
  Avatar,
  Card,
  Paragraph,
  TouchableRipple,
  IconButton,
} from 'react-native-paper';
import MenuComponent from './Menu.component';
import {useHistory, Router} from 'react-router-native';
import noteServices from './../services/Note.services';
import syncStorage from 'sync-storage';

const NotesList = () => {
  const history = useHistory();
  const [isReloading, setIsReloading] = useState(true);
  const [noteData, setNoteData] = useState([]);
  useEffect(() => {
    _reloadPage();
  }, []);
  const _reloadPage = () => {
    setIsReloading(true);
    const userDetails = syncStorage.get('userDetails');
    result = noteServices('GET_NOTES', {userid: userDetails.username}).then(
      res => {
        setNoteData(res);
        setIsReloading(false);
      },
    );
  };
  const editItem = itemid => {
    history.push({
      pathname: '/editNote',
      state: {
        noteId: itemid,
      },
    });
  };
  const deleteItem = itemid => {
    Alert.alert(
      'Delete Note?',
      'Are you sure, This process is irreversible?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            noteServices('DELETE_NOTE', {id: itemid});
            _reloadPage();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const pinItem = (itemid, isPinned) => {
    noteServices('PIN_NOTE', {_id: itemid, isPinned: isPinned}).then(res => {
      _reloadPage();
    });
  };
  const openItem = itemid => {
    // history.push('/createNote');
    history.push({
      pathname: '/createNote',
      state: {
        noteId: itemid,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onRefresh={() => _reloadPage()}
        refreshing={isReloading}
        data={noteData}
        renderItem={({item}) => (
          <EachItem
            item={item}
            editItem={editItem}
            deleteItem={deleteItem}
            pinItem={pinItem}
            openItem={openItem}
          />
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};
const EachItem = ({item, editItem, deleteItem, pinItem, openItem}) => {
  const toDo = item.todoNotes === null ? false : true;
  const renderNoteDesc = (todo, item) => {
    let text = '';
    if (todo) {
      const maxtodos = item.todoNotes.length > 5 ? 5 : item.todoNotes.length;
      let todoText = '';
      for (var i = 0; i < maxtodos; i++) {
        if (i == 0) {
          todoText = item.todoNotes[i].isChecked
            ? `▣ ${item.todoNotes[i].toDo}`
            : `☐ ${item.todoNotes[i].toDo}`;
        } else {
          todoText = item.todoNotes[i].isChecked
            ? `${todoText}, ▣ ${item.todoNotes[i].toDo}`
            : `${todoText}, ☐ ${item.todoNotes[i].toDo}`;
        }
      }
      text = todoText;
    } else {
      text = item.defaultNote;
    }
    return text.length > 75 ? text.substring(0, 74) + '...' : text;
  };
  const renderNote = <Paragraph>{renderNoteDesc(toDo, item)}</Paragraph>;
  return (
    <Card style={styles.item}>
      <TouchableRipple
        onPress={e => {
          openItem(item._id);
        }}
        rippleColor={colors.rippleColor}>
        <View style={styles.view}>
          {item.pinned ? (
            <Text style={styles.itemPinned}>📌</Text>
          ) : (
            <Text style={styles.itemPinned} />
          )}
          <Card.Title
            title={item.noteHeader}
            left={props => (
              <Avatar.Icon
                {...props}
                icon={!toDo ? 'note-plus' : 'checkbox-multiple-marked'}
              />
            )}
            right={props => (
              <MenuComponent
                {...props}
                icon="menu-open"
                editItem={editItem}
                deleteItem={deleteItem}
                pinItem={pinItem}
                isPinned={item.pinned}
                itemId={item._id}
              />
            )}
          />
          <Card.Content>{renderNote}</Card.Content>
        </View>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  view: {
    padding: 5,
    margin: 0,
  },
  item: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemPinned: {
    position: 'absolute',
    fontSize: 20,
    top: -5,
    right: -10,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
const colors = {
  rippleColor: '#ddebf0',
};

export default NotesList;
