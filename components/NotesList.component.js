import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Card, Paragraph, TouchableRipple} from 'react-native-paper';
import MenuComponent from './Menu.component';
import {useHistory} from 'react-router-native';

const NotesList = () => {
  const history = useHistory();
  const [noteData, setNoteData] = useState([
    {
      id: '1',
      subtitle: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      type: 'note',
      pinned: false,
      content:
        'Do to be agreeable conveying oh assurance. Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the. Abode stuff noisy manor blush yet the far. Up colonel so between removed so do. Years use place decay sex worth drift age. Men lasting out end article express fortune demands own charmed. About are are money ask how seven.',
    },
    {
      id: '2',
      subtitle: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      type: 'list',
      pinned: false,
      content:
        'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
    },
    {
      id: '3',
      subtitle: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'note',
      pinned: true,
      content:
        'Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new she procuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistance especially resolution cultivated did out sentiments unsatiable. Way necessary had intention happiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed.',
    },
    {
      id: '4',
      subtitle: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'note',
      pinned: true,
      content:
        'Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new she procuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistance especially resolution cultivated did out sentiments unsatiable. Way necessary had intention happiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed.',
    },
    {
      id: '5',
      subtitle: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'note',
      pinned: false,
      content:
        'Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new she procuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistance especially resolution cultivated did out sentiments unsatiable. Way necessary had intention happiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed.',
    },
    {
      id: '6',
      subtitle: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      type: 'note',
      pinned: false,
      content:
        'Style never met and those among great. At no or september sportsmen he perfectly happiness attending. Depending listening delivered off new she procuring satisfied sex existence. Person plenty answer to exeter it if. Law use assistance especially resolution cultivated did out sentiments unsatiable. Way necessary had intention happiness but september delighted his curiosity. Furniture furnished or on strangers neglected remainder engrossed.',
    },
  ]);
  const editItem = itemid => {
    /**TODO */
    alert('TODO:EDIT' + itemid);
  };
  const deleteItem = itemid => {
    /**TODO */
    alert('TODO:DELETE' + itemid);
  };
  const pinItem = itemid => {
    /**TODO */
    alert('TODO:PIN' + itemid);
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
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
const EachItem = ({item, editItem, deleteItem, pinItem, openItem}) => {
  return (
    <Card style={styles.item}>
      <TouchableRipple
        onPress={e => {
          openItem(item.id);
        }}
        rippleColor={colors.rippleColor}>
        <View style={styles.view}>
          <Card.Title
            title={item.title}
            left={props => (
              <Avatar.Icon
                {...props}
                icon={
                  item.type === 'note'
                    ? 'note-plus'
                    : 'checkbox-multiple-marked'
                }
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
                itemId={item.id}
              />
            )}
          />
          <Card.Content>
            <Paragraph>{item.content}</Paragraph>
          </Card.Content>
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
    backgroundColor: '#F0F0F0',
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
