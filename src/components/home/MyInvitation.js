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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

const invitations = [
  {
    name: 'Challenge Name',
    inviteName: 'Self Challenge for my book completition',
    date: '1 August 2021',
    in: 'Invitation from',
    userName: 'Abdul Ahad',
    userEmail: 'abdul.ahad343223',
  },
  {
    name: 'Challenge Name',
    inviteName: 'Self Challenge for my book completition',
    date: '1 August 2021',
    in: 'Invitation from',
    userName: 'Majid Khan',
    userEmail: 'majis@.com',
  },
];

export default class MyInvitation extends Component {
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
    acceptedTrue: false,
    pending: true,
  };

  componentDidMount() {
    this.showDate();
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
    this.setState({modalVisible: !this.state.modalVisible, acceptedTrue: true});
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

  _pending = val => {
    if (val == true) {
      this.setState({pending: true});
    } else if (val == false) {
      this.setState({pending: false});
    }
  };

  _renderInvitations = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this._modalVisble}
        style={{
          backgroundColor: '#F9FAFD',
          borderRadius: 15,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginVertical: 10,
            marginRight: 0,
          }}>
          <Text
            style={{
              width: 2,
              height: 80,
              backgroundColor: '#648CFF',
            }}></Text>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#10275A',
                  marginLeft: 10,
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: '#10275A',
                  fontWeight: 'bold',
                }}>
                {item?.date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#10275A',
                  fontWeight: 'bold',
                }}>
                {item?.inviteName}
              </Text>
              <Image source={require('../../commons/images/backLeft.png')} />
            </View>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 8, color: '#10275A'}}>{item?.in}</Text>
              <Image
                source={require('../../commons/images/facebook_icon.png')}
                style={{height: 10, width: 10, marginLeft: 10}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#10275A',
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {item?.userName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#000000',
                    marginLeft: 10,
                  }}>
                  {item?.userEmail}
                </Text>
              </View>
              {this.state.acceptedTrue ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../commons/images/acceptedMan.png')}
                    style={{marginRight: 5}}
                  />
                  <Text style={{fontSize: 8, color: ' #10275A'}}>Joined</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
      pending,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginVertical: 20}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 14,
                  elevation: 2,
                  backgroundColor: 'white',
                  width: 39,
                  height: 39,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.5}
                onPress={this.back}>
                <Image source={require('../../commons/images/back.png')} />
              </TouchableOpacity>
              <Text
                style={{fontSize: 18, color: '#10275A', fontWeight: 'bold'}}>
                My Invitations
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

            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: '',
                  marginVertical: 10,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                  }}>
                  {/* <TouchableOpacity activeOpacity={0.5} onPress={() => this._changeChallengeFriend(false)} */}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._pending(true)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50%',
                      height: pending ? 36 : null,
                      backgroundColor: pending ? '#E7F1F8' : null,
                      borderRadius: pending ? 12 : null,
                      elevation: pending ? 0.5 : null,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: pending ? '#648CFF' : '#10275A',
                      }}>
                      Pending
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._pending(false)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50%',
                      height: pending ? null : 36,
                      backgroundColor: pending ? null : '#E7F1F8',
                      borderRadius: pending ? null : 12,
                      elevation: pending ? null : 0.5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: pending ? '#10275A' : '#648CFF',
                      }}>
                      Accepted
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{paddingHorizontal: 20}}
              data={invitations}
              renderItem={this._renderInvitations}
            />
          </View>

          <View style={{}}>
            <Modal isVisible={modalVisible} backdropOpacity={0.6}>
              <View
                style={{
                  marginHorizontal: 0,
                  paddingVertical: 20,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#10275A',
                    fontWeight: 'bold',
                  }}>
                  Invitation Accept
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    width: '100%',
                    backgroundColor: '',
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#2E426E',
                      fontWeight: 'bold',
                    }}>
                    Self Challenge for my book completition
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Image
                      source={require('../../commons/images/CalendarInBlack.png')}
                      style={{marginRight: 5}}
                    />
                    <Text style={{fontSize: 12, color: '#525F77'}}>
                      1 August 2021
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#10275A',
                        fontWeight: 'bold',
                      }}>
                      Challenge
                    </Text>
                    <Text style={{fontSize: 14, color: '#8A8BB3'}}>Points</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: -10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ECEAFF',
                        paddingHorizontal: 15,
                        paddingVertical: 4,
                        borderRadius: 22,
                        borderColor: '#7197FE',
                        borderWidth: 1,
                        marginRight: 5,
                      }}>
                      <Text style={{fontSize: 12, color: '#7197FE'}}>
                        10 days
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#7197FE',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 22,
                        marginRight: 5,
                      }}>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        Football
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ECEAFF',
                        paddingHorizontal: 15,
                        width: 80,
                        paddingVertical: 4,
                        borderRadius: 22,
                        borderColor: '#7197FE',
                        borderWidth: 1,
                      }}>
                      <Text style={{fontSize: 14, color: '#7197FE'}}>Eat</Text>
                    </View>
                  </View>
                  <Text>5</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#10275A',
                        marginLeft: 5,
                        fontWeight: 'bold',
                      }}>
                      Abdul Ahad
                    </Text>
                    <Text
                      style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                      abdulahad@gmail.com
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../commons/images/Google_Icon.png')}
                      style={{width: 10, height: 10, marginRight: 10}}
                    />
                    <Image
                      source={require('../../commons/images/facebook_icon.png')}
                      style={{width: 10, height: 10}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
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
                      Decline
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
                    <Text style={{fontSize: 14, color: 'white'}}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
