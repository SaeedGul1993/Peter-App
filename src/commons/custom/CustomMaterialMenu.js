import React from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
//import menu and menu item
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon33 from 'react-native-vector-icons/Ionicons';

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
        style={{marginTop: 50}}
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
              <Icon name={props.iconName} size={15} color={props.color} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => _menu.show()}>
              <Image
                source={require('../../commons/images/emoji.png')}
                style={{alignSelf: 'center', marginTop: 10}}
              />
            </TouchableOpacity>
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
        {props.route.name === 'CreateGoalScreen' ||
        props.route.name === 'Home' ? (
          <>
            <MenuItem
              onPress={() => {
                props.navigation.navigate('UserProfile');
                _menu.hide();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Icon33 name="ios-person-outline" color="#363853" size={20} />
                <Text style={{marginLeft: 5}}> My Profile</Text>
              </View>
            </MenuItem>
            <MenuItem
              style={{justifyContent: 'center', height: 20}}
              onPress={() => {
                props.navigation.navigate('Setting');
                _menu.hide();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../commons/images/Setting.png')}
                  resizeMode="center"
                />
                <Text style={{marginLeft: 5}}> Setting</Text>
              </View>
            </MenuItem>
            <MenuItem
              style={{justifyContent: 'center'}}
              onPress={() => {
                _call();
                _menu.hide();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../commons/images/Logout.png')}
                  resizeMode="center"
                />
                <Text style={{marginLeft: 5}}> logout</Text>
              </View>
            </MenuItem>
          </>
        ) : null}
        {props.route.name === 'MyTodo' ? (
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
