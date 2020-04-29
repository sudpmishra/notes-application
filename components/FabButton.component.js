import React, {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';
const FabButton = ({onLogoutPressed}) => {
  const [open, setOpen] = useState(false);
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
                /**TODO */
                console.log('Pressed add');
              },
            },
            {
              icon: 'checkbox-multiple-marked',
              label: 'Add Checklist',
              onPress: () => {
                /**TODO */
                console.log('Pressed star');
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
