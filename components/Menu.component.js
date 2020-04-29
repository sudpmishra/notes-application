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
      anchor={<IconButton {...rest} icon="menu-open" onPress={_toggleMenu} />}>
      <Menu.Item
        icon="square-edit-outline"
        onPress={() => {
          editItem(itemId);
        }}
        title="Edit"
      />
      <Menu.Item
        icon="delete-empty"
        onPress={() => {
          deleteItem(itemId);
        }}
        title="Delete"
      />
      <Menu.Item
        icon={isPinned ? 'pin-off' : 'pin'}
        title={isPinned ? 'Unpin' : 'Pin'}
        onPress={() => {
          pinItem(itemId);
        }}
      />
    </Menu>
  );
};

export default MenuComponent;
