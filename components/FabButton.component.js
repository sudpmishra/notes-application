import React, {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';
import {useHistory} from 'react-router-native';
const FabButton = ({onLogoutPressed}) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const _onStateChange = () => {
    const openState = open ? false : true;
    setOpen(openState);
  };
  return (
    <>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'book-open-outline' : 'book-open'}
          actions={[
            {
              icon: 'note-plus',
              label: 'Add Note',
              onPress: () => {
                history.push({
                  pathname: '/editNote',
                  state: {
                    noteType: 'note',
                  },
                });
              },
            },
            {
              icon: 'checkbox-multiple-marked',
              label: 'Add Checklist',
              onPress: () => {
                history.push({
                  pathname: '/editNote',
                  state: {
                    noteType: 'todo',
                  },
                });
              },
            },
            {
              icon: 'face-profile',
              label: 'User Profile',
              onPress: () => {
                /**TODO */
                console.log('Pressed email');
              },
            },
            {
              icon: 'logout',
              label: 'Logout',
              onPress: () => {
                onLogoutPressed();
              },
            },
          ]}
          onStateChange={_onStateChange}
        />
      </Portal>
    </>
  );
};
export default FabButton;
