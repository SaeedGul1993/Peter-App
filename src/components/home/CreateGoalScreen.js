import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default class CreateGoalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleLogout: false,
      username: '',
      access_token: null,
      myTodos: [],
    };
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem('token');
    console.log('token', access_token);
    this.setState({access_token: access_token}, () => {
      this._getTodos(this.state.access_token);
    });
    this.getName();
  }

  _getTodos = token => {
    fetch('http://54.189.183.64/todo/api/v1/todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${raw}`
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response times of my todo', responseJson);
        this.setState({
          myTodos: responseJson?.results,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log('error', err);
      });
  };
  back = () => {
    // this.props.navigation.navigate('HomeScreen')
    this.props.navigation.navigate('Home');
  };

  _addTodo = () => {
    this.props.navigation?.navigate('AddTodo', {
      isEdit: false,
      item: null,
    });
  };

  _addSelfChallenges = () => {
    this.props.navigation.navigate('AddSelfChallenges');
  };

  _addFriendsChallenges = () => {
    this.props.navigation.navigate('AddFriendsChallenges');
  };

  _myTodo = () => {
    this.props.navigation.navigate('MyTodo');
  };

  _mySelfChallenges = () => {
    this.props.navigation.navigate('MySelfChallenges');
  };

  _myFriendsChallenges = () => {
    this.props.navigation.navigate('MyFriendsChallenges');
  };

  _pomodoroMeter = () => {
    this.props.navigation.navigate('CreatePomoDoroMeter');
  };

  _callLogout = () => {
    this.setState({modalVisibleLogout: !this.state.modalVisibleLogout});
  };

  getName = async () => {
    const firstName = await AsyncStorage.getItem('login');
    console.log('first', firstName);
    this.setState({
      username: firstName,
    });
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
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FEFFFF'}}>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#363853',
                  }}>
                  <Icon name="ios-person-outline" color="#363853" size={25} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#10275A',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  {this.state.username}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 14,
                  elevation: 3,
                  backgroundColor: 'white',
                  width: 45,
                  height: 45,
                  padding: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#10275A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10275A',
                  }}>
                  <CustomMaterialMenu
                    menustyle={{}}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    isIcon={true}
                    iconName="dots-horizontal"
                    color="black"
                    callLogout={this._callLogout}
                  />
                </View>
              </View>
            </View>

            <View style={{}}>
              <Modal
                isVisible={modalVisibleLogout}
                // isVisible={true}
                backdropOpacity={0.6}>
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
                      <Text style={{fontSize: 14, color: 'white'}}>Sure</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {/* <Text style={{fontSize:20,fontWeight:'600',color:'#10275A',alignSelf:'center',marginVertical:10}}>Peter Song</Text> */}
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#1D3557',
                  alignSelf: 'center',
                }}>
                Create
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#1D3557',
                  alignSelf: 'center',
                  marginTop: -10,
                }}>
                your goal easily
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginVertical: 10,
              }}>
              <View
                style={{
                  height: 160,
                  width: 150,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F1E3FF',
                }}>
                <View
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#BE82FF',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._addTodo}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 10,
                      borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                    }}>
                    <Icon1 name="plus" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 14, color: '#10275A', marginTop: 10}}>
                  Todo
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._myTodo}
                  style={{
                    width: '70%',
                    backgroundColor: '#BE82FF',
                    height: 25,
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, color: 'white', marginLeft: 25}}>
                      {this.state?.myTodos?.length}Todo
                    </Text>
                    <Icon2
                      name="arrowright"
                      size={20}
                      color="white"
                      style={{marginLeft: 15}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 160,
                  width: 150,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fdf9d1',
                }}>
                <View
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F8E62F',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._pomodoroMeter}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 10,
                      borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                    }}>
                    <Icon1 name="plus" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 14, color: '#10275A', marginTop: 10}}>
                  Pomodoro Timer
                </Text>
                <View
                  style={{
                    width: '70%',
                    backgroundColor: '#F8E62F',
                    height: 25,
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, color: '#303030', marginLeft: 20}}>
                      6 Created
                    </Text>
                    <Icon2
                      name="arrowright"
                      size={20}
                      color="#303030"
                      style={{marginLeft: 5}}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginVertical: 10,
              }}>
              <View
                style={{
                  height: 180,
                  width: 150,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFE4E4',
                }}>
                <Text style={{fontSize: 12, marginVertical: 5}}>Points: 5</Text>
                <View
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E77D7D',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._addFriendsChallenges}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 10,
                      borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                    }}>
                    <Icon1 name="plus" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#10275A',
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  Challenges with
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#10275A',
                    marginTop: -5,
                    textAlign: 'center',
                  }}>
                  Friends
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._myFriendsChallenges}
                  style={{
                    width: '70%',
                    backgroundColor: '#E77D7D',
                    height: 25,
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, color: 'white', marginLeft: 20}}>
                      6 Ongoing
                    </Text>
                    <Icon2
                      name="arrowright"
                      size={20}
                      color="white"
                      style={{marginLeft: 5}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 180,
                  width: 150,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#E7F1F8',
                }}>
                <Text style={{fontSize: 12, marginVertical: 5}}>Points: 5</Text>
                <View
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#648CFF',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._addSelfChallenges}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 10,
                      borderWidth: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                    }}>
                    <Icon1 name="plus" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 14, color: '#10275A', marginTop: 10}}>
                  Self Challenges
                </Text>
                <View
                  style={{
                    width: '70%',
                    backgroundColor: '#648CFF',
                    height: 25,
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginTop: 15,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._mySelfChallenges}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, color: 'white', marginLeft: 20}}>
                      3 Ongoing
                    </Text>
                    <Icon2
                      name="arrowright"
                      size={20}
                      color="white"
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
