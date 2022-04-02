import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

export default class Setting extends Component {
  state = {
    title: '',
    description: '',
    newtag: '',
    reminder: true,
    reminder2: false,
    date: '',
    time1: '',
    time2: '',
    time1hours: 0,
    time1minutes: 0,
    time2hours: '',
    time2minutes: '',
    DatePickerVisibility: false,
    modalVisible: false,
    modalVisible1: false,
    modalVisible2: false,
    modalVisible3: false,
    username: '',
  };

  componentDidMount() {
    this.showDate();
    this.getName();
  }

  showDate = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    // console.log('hours means k 17%12=5',hours)
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    console.log('str Time', strTime);
    this.setState({time1: strTime, time2: strTime});
  };

  back = () => {
    // this.props.navigation.navigate('HomeScreen')
    this.props.navigation.goBack();
  };

  toggleSwitch = () => {
    this.setState({reminder: !this.state.reminder});
  };

  getName = async () => {
    const firstName = await AsyncStorage.getItem('login');
    console.log('first', firstName);
    this.setState({
      username: firstName,
    });
  };

  toggleSwitch2 = () => {
    this.setState({reminder2: !this.state.reminder2});
  };

  showDatePicker = () => {
    this.setState({DatePickerVisibility: true});
    this.showDate();
  };

  hideDatePicker = () => {
    this.setState({DatePickerVisibility: false});
  };

  handleConfirm = (date, time) => {
    console.warn('A date has been picked: ', date);
    console.warn('A time has been picked: ', time);
    this.hideDatePicker();
  };

  _modalVisble = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  _modalVisble1 = () => {
    this.setState({modalVisible1: !this.state.modalVisible1});
  };

  _modalVisble2 = () => {
    this.setState({modalVisible2: !this.state.modalVisible2});
  };

  _modalVisble3 = () => {
    this.setState({modalVisible3: !this.state.modalVisible3});
  };

  _goInvitation = () => {
    this.props.navigation.navigate('MyInvitation');
  };

  _gomembership = () => {
    this.props.navigation.navigate('MyMemberShip');
  };

  render() {
    const {
      reminder,
      date,
      time1,
      time2,
      time1hours,
      time1minutes,
      time2hours,
      time2minutes,
      DatePickerVisibility,
      modalVisible,
      modalVisible1,
      modalVisible2,
      modalVisible3,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.back}>
                <Image source={require('../../commons/images/back.png')} />
              </TouchableOpacity>
              <Text
                style={{fontSize: 18, color: '#10275A', fontWeight: 'bold'}}>
                Setting
              </Text>
              <View style={{width: 30}} />
            </View>

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#d3d3d3',
                marginVertical: 10,
              }}
            />

            <ScrollView
              style={{marginBottom: 80}}
              showsVerticalScrollIndicator={false}>
              <View style={{marginTop: 10}}>
                <Text
                  style={{fontSize: 16, color: '#10275A', fontWeight: 'bold'}}>
                  General
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._modalVisble}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Change Name
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 3,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#10275A', marginRight: 10}}>
                    {this.state.username}
                  </Text>
                  <Image
                    source={require('../../commons/images/backleft.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{}}>
                <Modal
                  isVisible={modalVisible}
                  // isVisible={true}
                  backdropOpacity={0.6}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      paddingVertical: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#10275A',
                        fontWeight: 'bold',
                      }}>
                      My Name
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        width: '80%',
                        backgroundColor: '#F6F6F6',
                        borderRadius: 5,
                        marginVertical: 10,
                      }}>
                      <TextInput
                        placeholder="Abdul Ahad"
                        style={{color: '#10275A', fontSize: 16}}
                        onChangeText={newtag => this.setState({newtag})}
                        placeholderTextColor="#10275A"
                        autoCapitalize="sentences"
                        ref={ref => {
                          this._newtaginput = ref;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                      />
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
                        onPress={this._modalVisble}
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
                        <Text style={{fontSize: 14, color: '#7197FE'}}>
                          Cancel
                        </Text>
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
                        <Text style={{fontSize: 14, color: 'white'}}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._modalVisble1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Remove all Todo
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>
              <View style={{}}>
                <Modal
                  isVisible={modalVisible1}
                  // isVisible={true}
                  backdropOpacity={0.6}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      paddingVertical: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#10275A',
                        fontWeight: 'bold',
                      }}>
                      Remove All Todo
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        Are you sure remove all Todo
                      </Text>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        from this account ?
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
                        onPress={this._modalVisble1}
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
                        <Text style={{fontSize: 14, color: '#7197FE'}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this._modalVisble1}
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

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._modalVisble2}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Remove all Self challenges
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>
              <View style={{}}>
                <Modal
                  isVisible={modalVisible2}
                  // isVisible={true}
                  backdropOpacity={0.6}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      paddingVertical: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#10275A',
                        fontWeight: 'bold',
                      }}>
                      Remove all Self challenges
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        Are you sure remove all Challenges
                      </Text>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        from this account ?
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
                        onPress={this._modalVisble2}
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
                        <Text style={{fontSize: 14, color: '#7197FE'}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this._modalVisble2}
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

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._modalVisble3}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Remove all Friend challenges
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>
              <View style={{}}>
                <Modal
                  isVisible={modalVisible3}
                  // isVisible={true}
                  backdropOpacity={0.6}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      paddingVertical: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#10275A',
                        fontWeight: 'bold',
                      }}>
                      Remove all Friend challenges
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        Are you sure remove all Challenges
                      </Text>
                      <Text style={{fontSize: 16, color: '#10275A'}}>
                        from this account ?
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
                        onPress={this._modalVisble3}
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
                        <Text style={{fontSize: 14, color: '#7197FE'}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this._modalVisble3}
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

              <View style={{marginTop: 15}}>
                <Text
                  style={{fontSize: 16, color: '#10275A', fontWeight: 'bold'}}>
                  Invitations
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._goInvitation}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  My Invitations
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>

              <View style={{marginTop: 15}}>
                <Text
                  style={{fontSize: 16, color: '#10275A', fontWeight: 'bold'}}>
                  Membership & Offers
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._gomembership}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Membership Plan
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._gonotificationoffer}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  My Offer & Notifications
                </Text>
                <Image source={require('../../commons/images/backleft.png')} />
              </TouchableOpacity>

              <View style={{marginTop: 15}}>
                <Text
                  style={{fontSize: 16, color: '#10275A', fontWeight: 'bold'}}>
                  Notifications
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Allow Notification
                </Text>
                <Switch
                  trackColor={{false: '#d3d3d3', true: '#648CFF'}}
                  thumbColor={this.state.reminder ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleSwitch}
                  value={this.state.reminder}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 16, color: '#10275A'}}>
                  Allow the Notification Rings
                </Text>
                <Switch
                  trackColor={{false: '#d3d3d3', true: '#648CFF'}}
                  thumbColor={this.state.reminder2 ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleSwitch2}
                  value={this.state.reminder2}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
