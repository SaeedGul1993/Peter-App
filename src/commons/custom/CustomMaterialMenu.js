import React from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
//import menu and menu item
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomMaterialMenu = props => {
  // console.log('props',props)
  // const CustomMaterialMenu = ({ props, callLogout }) => {
  let _menu = null;

  const _call = () => {
    props.callLogout();
  };

  return (
    <View style={props.menustyle}>
      <Menu
        ref={ref => (_menu = ref)}
        button={
          props.isIcon ? (
            <TouchableOpacity onPress={() => _menu.show()}>
              {/* <Image
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/menu_icon.png',
                }}
                style={{width: 30, height: 30}}
              /> */}
              <Icon name={props.iconName} size={25} color={props.color} />
            </TouchableOpacity>
          ) : (
            <Text onPress={() => _menu.show()} style={props.textStyle}>
              {props.menutext}
            </Text>
          )
        }>
        {props.route.name === 'FirstPage' ? (
          <MenuItem
            onPress={() => {
              props.navigation.navigate('SecondPage');
              _menu.hide();
            }}>
            Go to second Page
          </MenuItem>
        ) : null}
        {props.route.name === 'SecondPage' ? (
          <MenuItem
            onPress={() => {
              props.navigation.navigate('FirstPage');
              _menu.hide();
            }}>
            Go to first Page
          </MenuItem>
        ) : null}
        {props.route.name === 'CreateGoalScreen' ? (
          <>
            <MenuItem
              onPress={() => {
                props.navigation.navigate('UserProfile');
                _menu.hide();
              }}>
              My Profile
            </MenuItem>
            <MenuItem
              onPress={() => {
                props.navigation.navigate('Setting');
                _menu.hide();
              }}>
              Setting
            </MenuItem>
            <MenuItem
              onPress={() => {
                _call();
                _menu.hide();
              }}>
              Log Out
            </MenuItem>
          </>
        ) : null}
        {props.route.name === 'Home' || props.route.name === 'MyTodo' ? (
          <>
            <MenuItem
              onPress={() => {
                _menu.hide();
              }}>
              Disable
            </MenuItem>
            {/* <MenuItem disabled>Disabled option</MenuItem> */}
            <MenuItem
              onPress={() => {
                props.resetTodo();
              }}>
              Reset
            </MenuItem>
            {/* <MenuDivider /> */}
            <MenuItem
              onPress={() => {
                props.doneTodo();
                _menu.hide();
              }}>
              Done
            </MenuItem>
          </>
        ) : null}
      </Menu>
    </View>
  );
};

export default CustomMaterialMenu;
