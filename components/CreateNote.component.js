import React from 'react';
import {View, Text, Button} from 'react-native';
const CreateNote = ({location, history}) => {
  return (
    <View>
      <Text>CreateNote Component</Text>
      <Text>This is note id {location.state.noteId}</Text>
      <Button
        onPress={() => {
          history.goBack();
        }}
        title="Back"
      />
    </View>
  );
};

export default CreateNote;
