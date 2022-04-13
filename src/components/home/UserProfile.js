import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import Modal from 'react-native-modal';
import {getLogin} from '../../commons/Constant';
const height = Dimensions.get('window').height;

export default class CreateGoalScreen extends Component {
  state = {
    modalVisible1: false,
    modalVisible2: false,
  };
  back = () => {
    this.props.navigation.goBack();
  };

  _modalVisble1 = () => {
    this.setState({modalVisible1: true});
    setTimeout(() => {
      this.setState({modalVisible1: false});
      //   this.props.navigation.navigate('Detail')
    }, 1000);
  };

  _modalVisble2 = () => {
    this.setState({modalVisible2: true});
  };

  componentDidMount() {
    getLogin()
      .then(obj => {
        console.log('obj', obj);
        console.log('obj', obj.login);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
    const {modalVisible1, modalVisible2} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginVertical: 20}}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                <View style={{width: 30}} />
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#10275A',
                  alignSelf: 'center',
                  marginTop: 20,
                  fontWeight: 'bold',
                }}>
                Peter Song
              </Text>
              <View style={{marginVertical: 3}}>
                <Text
                  style={{fontSize: 11, color: '#1D3557', alignSelf: 'center'}}>
                  My Profile
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
                    height: 100,
                    width: 100,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#7197FE',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    elevation: 2,
                  }}>
                  <Text style={{fontSize: 13, color: '#2C406E'}}>Self</Text>
                  <Text style={{fontSize: 13, color: '#2C406E', marginTop: -5}}>
                    Challenges
                  </Text>
                  <Text style={{fontSize: 14, color: '#9AA8C7'}}>2</Text>
                  <Text style={{fontSize: 10, color: '#7197FE'}}>
                    Completed
                  </Text>
                </View>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#BE82FF',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    elevation: 2,
                  }}>
                  <Text style={{fontSize: 13, color: '#2C406E'}}>Todo</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#2C406E',
                      marginTop: -5,
                    }}></Text>
                  <Text style={{fontSize: 14, color: '#9AA8C7'}}>4</Text>
                  <Text style={{fontSize: 10, color: '#BE82FF'}}>
                    Completed
                  </Text>
                </View>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#E77D7D',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    elevation: 2,
                  }}>
                  <Text style={{fontSize: 13, color: '#2C406E'}}>Friend</Text>
                  <Text style={{fontSize: 13, color: '#2C406E', marginTop: -5}}>
                    Challenges
                  </Text>
                  <Text style={{fontSize: 14, color: '#9AA8C7'}}>11</Text>
                  <Text style={{fontSize: 10, color: '#E77D7D'}}>
                    Completed
                  </Text>
                </View>
              </View>

              <View style={{marginVertical: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 16, color: '#10275A'}}>
                    My Achievements Points
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#0C1936',
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    1
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: '#e8e8e8',
                      width: '88%',
                      height: 22,
                      borderRadius: 30,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#7197FE',
                        height: 22,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40%',
                      }}>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        15 Points
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '60%',
                      }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{fontSize: 12, color: '#10275A'}}>
                        25 Points remaining
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={this._modalVisble1}
                    activeOpacity={0.5}>
                    <Icon name="eye-outline" size={25} color="#7197FE" />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#10275A',
                    textAlign: 'center',
                    marginVertical: 5,
                  }}>
                  You will get existing offer
                </Text>
                <View style={{}}>
                  <Modal
                    isVisible={modalVisible1}
                    // isVisible={true}
                    backdropOpacity={0.6}>
                    <View
                      style={{
                        marginHorizontal: 20,
                        paddingVertical: 20,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#2C406E',
                          marginVertical: 20,
                          textAlign: 'center',
                        }}>
                        Achieve 30 points
                      </Text>
                      <View style={{marginTop: 100, alignItems: 'center'}}>
                        <Text style={{fontSize: 14, color: '#10275A'}}>
                          Points remaining: 20
                        </Text>
                        <View
                          style={{
                            width: '90%',
                            height: 1,
                            backgroundColor: '#d3d3d3',
                            marginVertical: 10,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#10275A',
                          textAlign: 'center',
                        }}>
                        Rewards
                      </Text>
                      <View style={{marginVertical: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginHorizontal: 20,
                          }}>
                          <Icon
                            name="ios-checkmark"
                            size={25}
                            color="#648CFF"
                          />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 16,
                              color: '#10275A',
                            }}>
                            You will get
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginHorizontal: 20,
                          }}>
                          <Icon
                            name="ios-checkmark"
                            size={25}
                            color="#648CFF"
                          />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 16,
                              color: '#10275A',
                            }}>
                            You will get
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>

              <View
                style={{
                  height: 103,
                  borderRadius: 15,
                  backgroundColor: '#648CFF',
                  justifyContent: 'center',
                  elevation: 5,
                  marginHorizontal: 20,
                  paddingRight: 5,
                  paddingLeft: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      You are doing Great
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Completed all todos in a week
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 77,
                      width: 77,
                      borderRadius: 60,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: 30,
                  marginBottom: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{fontSize: 14, color: '#10275A', fontWeight: 'bold'}}>
                  Unlock Achievements
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this._modalVisble2}
                  style={{
                    height: 120,
                    borderRadius: 15,
                    backgroundColor: '#E7F1F8',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    elevation: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#2C406E',
                      textAlign: 'center',
                    }}>
                    Complete a challenge you will get this Batch
                  </Text>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      marginTop: 10,
                      padding: 20,
                    }}>
                    <Image
                      source={require('../../commons/images/emoji1.png')}
                    />
                  </View>
                  <Text
                    style={{textAlign: 'center', fontSize: 10, marginTop: 10}}>
                    View details
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._modalVisble2}
                style={{
                  height: 120,
                  borderRadius: 15,
                  backgroundColor: '#F1E3FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{fontSize: 14, color: '#A969EE', textAlign: 'center'}}>
                  Complete a challenge you will get this Batch
                </Text>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    padding: 20,
                  }}>
                  <Image source={require('../../commons/images/emoji2.png')} />
                </View>
                <Text
                  style={{textAlign: 'center', fontSize: 10, marginTop: 10}}>
                  View details
                </Text>
              </TouchableOpacity>
              <View style={{marginVertical: 10}} />
              <View style={{}}>
                <Modal
                  isVisible={modalVisible2}
                  backdropOpacity={0.6}
                  onBackdropPress={() =>
                    this.setState({
                      modalVisible2: false,
                    })
                  }
                  style={{width: '100%', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginHorizontal: 0,
                      paddingTop: 20,
                      paddingBottom: 50,
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      position: 'absolute',
                      bottom: -22,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#2C406E',
                        marginVertical: 15,
                        textAlign: 'center',
                      }}>
                      Complete a challenge you will get this Batch
                    </Text>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../commons/images/image20.png')}
                        resizeMode="stretch"
                        style={{marginBottom: 10}}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#10275A',
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        Batch Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#10275A',
                          marginBottom: 5,
                        }}>
                        Completed 2 self challenge in a week
                      </Text>
                      <Text style={{fontSize: 12, color: '#10275A'}}>
                        Points remaining: 20
                      </Text>
                      <View
                        style={{
                          width: '90%',
                          height: 1.5,
                          backgroundColor: '#d3d3d3',
                          marginVertical: 10,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#10275A',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      Rewards
                    </Text>
                    <View style={{marginVertical: 10, marginHorizontal: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginHorizontal: 20,
                        }}>
                        <Image
                          source={require('../../commons/images/Vector12.png')}
                          resizeMode="stretch"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 16,
                            color: '#10275A',
                          }}>
                          You will get ....
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginHorizontal: 20,
                        }}>
                        <Image
                          source={require('../../commons/images/Vector12.png')}
                          resizeMode="stretch"
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 16,
                            color: '#10275A',
                          }}>
                          You will get ....
                        </Text>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <View style={{}}>
                                <Modal
                                    // isVisible={modalVisible1}
                                    isVisible={true}
                                    backdropOpacity={0.6}
                                >
                                    <View style={{ marginHorizontal:0,paddingVertical:20,justifyContent:'center',backgroundColor:'white',borderTopLeftRadius:15,borderTopRightRadius:15,position:'absolute',bottom:-20,width:'100%'}}>
                                        <Text style={{fontSize:16,color:'#10275A',marginVertical:20,textAlign:'center'}}>Complete a challenge you will get this Batch</Text>
                                        <View style={{marginTop:100,alignItems:'center'}}>
                                            <Text style={{fontSize:14,color:'#10275A'}}>Points remaining: 20</Text>
                                            <View style={{width:'90%',height:1,backgroundColor:'#d3d3d3',marginVertical:10}} />
                                        </View>
                                        <Text style={{fontSize:18,color:'#10275A',textAlign:'center'}}>Rewards</Text>
                                        <View style={{marginVertical:10}}>
                                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginHorizontal:20}}>
                                                <Icon name='ios-checkmark' size={25} color='#648CFF' />
                                                <Text style={{marginLeft:10,fontSize:16,color:'#10275A',}}>You will get</Text>
                                            </View>
                                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginHorizontal:20}}>
                                                <Icon name='ios-checkmark' size={25} color='#648CFF' />
                                                <Text style={{marginLeft:10,fontSize:16,color:'#10275A',}}>You will get</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View> */}
      </SafeAreaView>
    );
  }
}
