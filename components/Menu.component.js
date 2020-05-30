import React, {useState} from 'react';
import {Menu, IconButton} from 'react-native-paper';

const MenuComponent = ({
  isPinned,
  itemId,
  editItem,
  deleteItem,
  pinItem,
  ...rest
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const _toggleMenu = () => {
    const visible = menuVisible ? false : true;
    setMenuVisible(visible);
  };
  return (
    <Menu
      visible={menuVisible}
      onDismiss={_toggleMenu}
      anchor={<IconButton {...rest} icon="dots-vertical" onPress={_toggleMenu} />}>
      <Menu.Item
        icon="square-edit-outline"
        onPress={() => {
          _toggleMenu();
          editItem(itemId);
        }}
        title="Edit"
      />
      <Menu.Item
        icon="delete-empty"
        onPress={() => {
          _toggleMenu();
          deleteItem(itemId);
        }}
        title="Delete"
      />
      <Menu.Item
        icon={isPinned ? 'pin-off' : 'pin'}
        title={isPinned ? 'Unpin' : 'Pin'}
        onPress={() => {
          _toggleMenu();
          pinItem(itemId, isPinned);
        }}
      />
    </Menu>
  );
};

export default MenuComponent;
