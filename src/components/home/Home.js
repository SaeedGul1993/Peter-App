import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import IconAnt from 'react-native-vector-icons/AntDesign';
import CustomPerson from './CustomPerson';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default class Home extends Component {
  state = {
    selfChallenges: true,
    challengewithFriend: false,
    modalVisibleLogout: false,
    myTodyTodos: [],
    access_token: null,
    todayTodos: moment().format('YYYY-MM-DD'),
  };

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem('token');
    console.log('token', access_token);
    this.setState(
      {
        access_token,
      },
      () => {
        this._getTodos(this.state.access_token);
      },
    );
    this.buildLink();
    dynamicLinks().onLink(this.handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log('background listener', link?.url);
      });
  }
  handleDynamicLink = link => {
    console.log('foreground listener', link?.url);
  };

  componentWillUnmount() {
    dynamicLinks().onLink(this.handleDynamicLink);
  }
  async buildLink() {
    const link = await dynamicLinks().buildShortLink(
      {
        link: 'https://stretchyo.page.link/invite',
        domainUriPrefix: 'https://stretchyo.page.link',
        analytics: {
          campaign: 'friend_invitation',
        },
        android: {
          packageName: 'com.taskmanager',
        },
      },
      'UNGUESSABLE',
    );
    console.log('link', link);
  }
  _goGoal = () => {
    this.props.navigation.navigate('CreateGoalScreen');
  };

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
        console.log('response times of my todo', responseJson?.results);
        let filteredOutTodayTodos = responseJson?.results?.filter(
          item =>
            moment(item?.due_date).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD'),
        );
        console.log('filteredOutTodayTodos', filteredOutTodayTodos);
        this.setState({
          myTodyTodos: filteredOutTodayTodos,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log('error', err);
      });
  };

  _goGoal1 = () => {
    this.props.navigation.navigate('UserProfile');
  };
  _goGoal2 = () => {
    this.props.navigation.navigate('Setting');
  };

  _changeSelf = val => {
    if (val == true) {
      this.setState({selfChallenges: true});
    } else if (val == false) {
      this.setState({selfChallenges: false});
    }
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

  _changeChallengeFriend = val => {
    if (val == true) {
      this.setState({challengewithFriend: true});
    } else if (val == false) {
      this.setState({challengewithFriend: false});
    }
  };

  render() {
    const {selfChallenges, challengewithFriend} = this.state;
    // console.log('this',this.props.navigation)
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView
          style={{marginBottom: 80}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginVertical: 20,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
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
                  }}>
                  <CustomMaterialMenu
                    menutext="Show Menu"
                    menustyle={{
                      marginTop: -10,
                    }}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    isIcon={false}
                    iconName="dots-horizontal"
                    color="white"
                    isTodo={false}
                    callLogout={this._callLogout}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: 18, paddingLeft: 20}}>Todo</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View style={{width: 20}} />

                  {this.state.myTodyTodos?.length ? (
                    this.state.myTodyTodos?.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('ViewTodo', {
                              isEdit: true,
                              item,
                            })
                          }>
                          <View
                            style={{
                              minHeight: 90,
                              width: 180,
                              borderRadius: 10,
                              backgroundColor:
                                item?.is_completed === true
                                  ? 'white'
                                  : '#648CFF',
                              padding: 10,
                              elevation: 3,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color:
                                    item?.is_completed === true
                                      ? 'black'
                                      : 'white',
                                }}>
                                {moment(item?.reminder_time, [
                                  'hh:mm[:ss[.uuuuuu]]',
                                ]).format('hh:mm A')}
                              </Text>
                              {item?.is_completed === true ? (
                                <Image
                                  source={require('../../commons/images/tick.png')}
                                  resizeMode="contain"
                                />
                              ) : (
                                <CustomMaterialMenu
                                  menutext="Show Menu"
                                  menustyle={{
                                    marginTop: -10,
                                  }}
                                  isTodo={true}
                                  navigation={this.props.navigation}
                                  route={this.props.route}
                                  isIcon={true}
                                  iconName="dots-horizontal"
                                  color="white"
                                />
                              )}
                            </View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color:
                                  item?.is_completed === true
                                    ? 'black'
                                    : 'white',
                              }}>
                              {item?.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color:
                                  item?.is_completed === true
                                    ? 'black'
                                    : 'white',
                              }}>
                              {item?.description}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({
                                    modalVisibleLogout: true,
                                  })
                                }>
                                <Image
                                  source={require('../../commons/images/person.png')}
                                />
                              </TouchableOpacity>

                              <View
                                style={{
                                  backgroundColor: '#E7F1F8',
                                  height: 20,
                                  width: 45,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 5,
                                }}>
                                <Text style={{color: '#648CFF', fontSize: 10}}>
                                  Urgent
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <Text style={{textAlign: 'center'}}>
                      No Recent Todo Available
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18, paddingLeft: 20}}>
                Self Challenges
              </Text>
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                  backgroundColor: '#d3d3d350',
                  marginVertical: 10,
                  borderRadius: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 32,
                    paddingVertical: 2,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._changeSelf(true)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: selfChallenges ? '49%' : '50%',
                      height: selfChallenges ? 28 : null,
                      backgroundColor: selfChallenges ? 'white' : null,
                      borderRadius: selfChallenges ? 7 : null,
                    }}>
                    <Text style={{fontSize: 16}}>On Going</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._changeSelf(false)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: selfChallenges ? '50%' : '49%',
                      height: selfChallenges ? null : 28,
                      backgroundColor: selfChallenges ? null : 'white',
                      borderRadius: selfChallenges ? null : 7,
                    }}>
                    <Text style={{fontSize: 16}}>Up Coming</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{width: 20}} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      height: 130,
                      width: 250,
                      borderRadius: 10,
                      backgroundColor: 'white',
                      padding: 10,
                      elevation: 3,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Image
                        source={require('../../commons/images/person2.png')}
                      />
                      <Image
                        source={require('../../commons/images/tick.png')}
                      />
                    </View>
                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                      Online Learning Self Motivation
                    </Text>
                    <View style={{marginTop: 5}}>
                      <Text style={{fontSize: 10}}>
                        lorem epsum text for lorem ipsum
                      </Text>
                      <Text style={{fontSize: 10}}>
                        lorem epsum text for lorem ipsum
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 130,
                      width: 250,
                      borderRadius: 10,
                      backgroundColor: '#648CFF',
                      padding: 10,
                      elevation: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../commons/images/home-icon4.png')}
                      />
                      <View style={{marginLeft: 10, marginTop: 20}}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Online Yoga Class
                        </Text>
                        <View style={{marginTop: 5}}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                          <Text style={{color: 'white', fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                        marginTop: 10,
                        marginLeft: 10,
                      }}>
                      10:00am - 11:25am
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18, paddingLeft: 20}}>
                Challenge with Friend
              </Text>
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                  backgroundColor: '#d3d3d350',
                  marginVertical: 10,
                  borderRadius: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 32,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._changeChallengeFriend(true)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: challengewithFriend ? '49%' : '50%',
                      height: challengewithFriend ? 28 : null,
                      backgroundColor: challengewithFriend ? 'white' : null,
                      borderRadius: challengewithFriend ? 7 : null,
                    }}>
                    <Text style={{fontSize: 16}}>On Going</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._changeChallengeFriend(false)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: challengewithFriend ? '50%' : '49%',
                      height: challengewithFriend ? null : 28,
                      backgroundColor: challengewithFriend ? null : 'white',
                      borderRadius: challengewithFriend ? null : 7,
                    }}>
                    <Text style={{fontSize: 16}}>Up Coming</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{width: 20}} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      height: 90,
                      width: 280,
                      borderRadius: 10,
                      backgroundColor: '#E7F1F8',
                      padding: 10,
                      elevation: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../commons/images/person2.png')}
                      />
                      <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                          Online Learning Self Motivation
                        </Text>
                        <View style={{marginTop: 5}}>
                          <Text style={{fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                          <Text style={{fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 90,
                      width: 280,
                      borderRadius: 10,
                      backgroundColor: '#F1E3FF',
                      padding: 10,
                      elevation: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../commons/images/meeting.png')}
                      />
                      <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                          Speed Earning Self Motivation
                        </Text>
                        <View style={{marginTop: 5}}>
                          <Text style={{fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                          <Text style={{fontSize: 10}}>
                            lorem epsum text for lorem ipsum
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', color: '#12175E'}}>
                Recent
              </Text>
              <TouchableOpacity
                onPress={() => this.props?.navigation?.navigate('MyTodo')}>
                <Text style={{fontSize: 12, color: '#393F93'}}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 20}}>
              {this.state.myTodyTodos?.length ? (
                this.state?.myTodyTodos?.map(item => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#F9FAFD',
                        borderRadius: 10,
                        marginVertical: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginHorizontal: 10,
                          marginVertical: 20,
                        }}>
                        <Text
                          style={{
                            width: 2.5,
                            height: 50,
                            backgroundColor: '#E88B8C',
                          }}
                        />
                        <View style={{width: '100%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              marginLeft: 10,
                              marginRight: 0,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#2C406E',
                                fontWeight: '500',
                              }}>
                              {item?.name}
                            </Text>
                            <CustomMaterialMenu
                              menustyle={{}}
                              navigation={this.props.navigation}
                              route={this.props.route}
                              isIcon={true}
                              iconName="dots-vertical"
                              color="#2C406E"
                              isTodo={true}
                            />
                          </View>
                          <Text
                            style={{
                              marginLeft: 10,
                              color: '#9AA8C7',
                              fontSize: 14,
                            }}>
                            {moment(item?.created_at).format('hh:mm A')}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              height: 25,
                              width: 50,
                              borderRadius: 5,
                              backgroundColor: '#E88B8C20',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 11, color: '#E88B8C'}}>
                              Urgent
                            </Text>
                          </View>
                          <View
                            style={{
                              height: 25,
                              width: 50,
                              borderRadius: 5,
                              backgroundColor: '#E88B8C20',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{fontSize: 11, color: '#E88B8C'}}>
                              Home
                            </Text>
                          </View>
                        </View>
                        <Text style={{fontSize: 11, color: '#E88B8C'}}>
                          {moment(item?.due_date).format('YYYY-MM-DD') ===
                            moment().format('YYYY-MM-DD') && 'Today'}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={{textAlign: 'center'}}>
                  No Recent Todo Available
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.tabBarStyle}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 24,
              marginTop: 12,
            }}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={require('../../commons/images/Home.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._goGoal1}>
              <Image
                source={require('../../commons/images/icons/search.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._goGoal}>
              <Image source={require('../../commons/images/Group6880.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._goGoal1}>
              <Image source={require('../../commons/images/Group23.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._goGoal2}>
              <Image source={require('../../commons/images/Activity.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          <Modal
            isVisible={this.state.modalVisibleLogout}
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    // bottom:25,
    bottom: 10,
    left: 20,
    right: 20,
    elevation: 3,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 70,

    //  ...styles.shadow
  },
});
