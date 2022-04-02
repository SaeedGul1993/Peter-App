import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import CreateGoalScreen from './CreateGoalScreen';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default class CustomPerson extends Component {
  state = {
    modalVisibleLogout: false,
  };

  _callLogout = () => {
    this.setState({modalVisibleLogout: !this.state.modalVisibleLogout});
  };

  _modalVisble = async () => {
    this._callLogout();
    AsyncStorage.removeItem('login');
    this.props.navigation.navigate('LoginScreen');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('err', error);
    }
  };

  render() {
    const {modalVisibleLogout} = this.state;
    //console.log('dekho', this.props);
    const route = this.props.route.name == 'CustomPerson';
    return (
      <View>
        <CustomMaterialMenu
          menustyle={{}}
          navigation={this.props.navigation}
          route={route}
          isIcon={true}
          iconName="dots-horizontal"
          color="transparent"
          callLogout={this._callLogout}
        />
        <View style={{}}>
          <Modal isVisible={modalVisibleLogout} backdropOpacity={0.6}>
            <View
              style={{
                marginHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 15,
              }}>
              <Text style={{fontSize: 22, color: '#10275A'}}>Log Out</Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 18, color: '#10275A'}}>
                  Are you sure to log out from
                </Text>
                <Text style={{fontSize: 18, color: '#10275A'}}>
                  this account ?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._callLogout}
                  style={{
                    width: 90,
                    height: 35,
                    borderColor: '#7197FE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 14, color: '#7197FE'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._modalVisble}
                  style={{
                    width: 90,
                    height: 35,
                    backgroundColor: '#7197FE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 14, color: 'white'}}>Sure</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
