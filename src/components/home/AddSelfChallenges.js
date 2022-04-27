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
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';

export default class CreateGoalScreen extends Component {
  state = {
    title: '',
    description: '',
    newtag: '',
    reminder: false,
    date: moment().format('YYYY-MM-DD'),
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
    selectedCategory: '',
    timeLine: [
      {
        title: '25 days',
      },
      {
        title: '20 days',
      },
      {
        title: '5 days',
      },
      {
        title: '30 days',
      },
      {
        title: '35 days',
      },
      {
        title: '10 days',
      },
      {
        title: '15 days',
      },
    ],
    category: [
      {
        heading: 'Sports',
        data: [
          {
            name: 'Football',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Walking/Jogging',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Health',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Education study',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
        ],
      },
      {
        heading: 'Thoughts',
        data: [
          {
            name: 'Football',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Walking/Jogging',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Health',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Education study',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
        ],
      },
      {
        heading: 'Excercise',
        data: [
          {
            name: 'Football',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Walking/Jogging',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Health',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
          {
            name: 'Education study',
            image: require('../../commons/images/soccer-ball_26bd.png'),
            checked: false,
          },
        ],
      },
    ],
    selectedType: '',
  };

  componentDidMount() {
    this.showDate();
  }

  ChangeCategory(value) {
    this.setState({selectedCategory: value});
  }

  ChangeType(value) {
    this.setState({selectedType: value});
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
    this.setState({modalVisible3: true});
    setTimeout(() => {
      this.setState({modalVisible3: false});
    }, 1000);
  };

  onClicked = (mainIndex, SubIndex) => {
    let mappedOut = this.state?.category?.map((item, index) => {
      if (index === mainIndex) {
        return {
          heading: item?.heading,
          data: item?.data?.map((subItem, subIndex) => {
            if (subIndex === SubIndex) {
              return {
                ...subItem,
                checked: !subItem?.checked,
              };
            } else {
              return {
                ...subItem,
              };
            }
          }),
        };
      } else {
        return {...item};
      }
    });
    this.setState({
      category: mappedOut,
    });
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
      selectedCategory,
      category,
      selectedType,
      type,
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
              <Text style={{fontSize: 18, color: '#10275A', fontWeight: '900'}}>
                Add Self Challenge
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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 20,
                paddingBottom: 130,
              }}>
              <View style={{flex: 1}}>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, color: '#8A8BB3'}}>Title</Text>
                  <TextInput
                    placeholder="Enter Title "
                    style={{
                      color: '#10275A',
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                    }}
                    onChangeText={title => this.setState({title})}
                    placeholderTextColor="#10275A"
                    autoCapitalize="sentences"
                    ref={ref => {
                      this._titleinput = ref;
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
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: 40,
                  }}>
                  <View
                    style={{
                      width: '45%',
                      alignItems: 'flex-start',
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      justifyContent: 'center',
                    }}>
                    <View style={{alignItems: 'flex-start'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#8A8BB3',
                          marginBottom: 15,
                        }}>
                        Date
                      </Text>
                      <DateTimePickerModal
                        isVisible={DatePickerVisibility}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                        style={styles.datePickerStyle}
                        placeholder={time1}
                        format="hh:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            display: 'none',
                          },
                          dateInput: {
                            borderWidth: 0,
                            marginLeft: -50,
                          },
                          dateText: {
                            fontSize: 16,
                            color: '#10275A',
                          },
                        }}
                        onDateChange={time => {
                          console.log('time', time);
                          this.setState({time1: time});
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        onPress={this.showDatePicker}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#10275A',
                            marginBottom: 5,
                          }}>
                          {date}
                        </Text>
                        <Image
                          style={{marginTop: -10, marginRight: 5}}
                          resizeMode="contain"
                          source={require('../../commons/images/Calendar.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '45%',
                      alignItems: 'flex-start',
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      justifyContent: 'center',
                    }}>
                    <View style={{alignItems: 'flex-start'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#8A8BB3',
                          marginBottom: 15,
                        }}>
                        Time
                      </Text>
                      <DateTimePickerModal
                        isVisible={DatePickerVisibility}
                        mode="time"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                        style={styles.datePickerStyle}
                        placeholder={time1}
                        format="hh:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            display: 'none',
                          },
                          dateInput: {
                            borderWidth: 0,
                            marginLeft: -50,
                          },
                          dateText: {
                            fontSize: 16,
                            color: '#10275A',
                          },
                        }}
                        onDateChange={time => {
                          console.log('time', time);
                          this.setState({time1: time});
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        onPress={this.showDatePicker}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#10275A',
                            marginBottom: 5,
                          }}>
                          {time1}
                        </Text>
                        <Image
                          style={{marginTop: -10, marginRight: 5}}
                          resizeMode="contain"
                          source={require('../../commons/images/clock.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginTop: 40,
                      marginBottom: 10,
                    }}>
                    <Text style={{fontSize: 20, color: '#10275A'}}>
                      Timeline
                    </Text>
                    <Icon name="dots-vertical" size={25} color="#2C406E" />
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{width: 20}} />
                    {this.state.timeLine?.map(item => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#ECEAFF50',
                            paddingHorizontal: 10,
                            paddingVertical: 7,
                            borderRadius: 25,
                            marginRight: 5,
                            borderColor: '#7197FE',
                            borderWidth: 1,
                          }}>
                          <Text style={{fontSize: 12, color: '#7197FE'}}>
                            {item?.title}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{marginLeft: 10}}>
                            <Text style={{fontSize: 10, color: '#7197FE'}}>
                              X
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                  <View style={{}}>
                    <Modal isVisible={modalVisible} backdropOpacity={0.6}>
                      <View
                        style={{
                          marginHorizontal: 20,
                          paddingVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          borderRadius: 15,
                        }}>
                        <Text style={{fontSize: 22, color: '#10275A'}}>
                          New Timeline
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
                            placeholder="New Timeline"
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
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Save
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{marginVertical: 10}}
                      onPress={this._modalVisble}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#7197FE',
                          marginLeft: 10,
                        }}>
                        + Add new
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#d3d3d3',
                        marginVertical: 10,
                      }}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginTop: 40,
                    }}>
                    <Text style={{fontSize: 20, color: '#10275A'}}>
                      Categories
                    </Text>
                    <Icon name="dots-vertical" size={25} color="#2C406E" />
                  </View>
                  <View style={{}}>
                    <Modal
                      isVisible={modalVisible1}
                      style={{margin: 0}}
                      // isVisible={true}
                      backdropOpacity={0.6}>
                      <View
                        style={{
                          paddingVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          backgroundColor: 'white',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          style={{width: '95%'}}
                          onPress={() =>
                            this.setState({
                              modalVisible1: false,
                            })
                          }>
                          <View style={{width: '95%'}}>
                            <Text
                              style={{
                                alignSelf: 'flex-end',
                                color: 'grey',
                                fontSize: 20,
                              }}>
                              x
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Select Category
                        </Text>
                        <FlatList
                          data={this.state.category}
                          renderItem={item => {
                            return (
                              <View
                                style={{
                                  minWidth: '100%',
                                  paddingHorizontal: 20,
                                }}
                                key={item?.index}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    marginBottom: 10,
                                  }}>
                                  {item?.item?.heading}
                                </Text>
                                <FlatList
                                  nestedScrollEnabled
                                  data={item?.item?.data}
                                  renderItem={items => {
                                    return (
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          minWidth: '100%',
                                          alignItems: 'center',
                                          marginBottom: 5,
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                          }}>
                                          <Image
                                            source={items?.item?.image}
                                            style={{marginRight: 5}}
                                          />
                                          <Text>{items?.item?.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.onClicked(
                                              item?.index,
                                              items?.index,
                                            )
                                          }>
                                          <Image
                                            source={
                                              items.item?.checked
                                                ? require('../../commons/images/selectedTick.png')
                                                : require('../../commons/images/unSelectedTick.png')
                                            }
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  }}
                                />
                              </View>
                            );
                          }}
                        />
                        <View style={{paddingHorizontal: 20, width: '100%'}}>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this._modalVisble1}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 15,
                              height: 55,
                              backgroundColor: '#648CFF',
                              marginTop: 20,
                            }}>
                            <Text style={{fontSize: 18, color: 'white'}}>
                              Done
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{marginVertical: 10}}
                      onPress={this._modalVisble1}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#7197FE',
                          marginLeft: 10,
                        }}>
                        + Add new
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#d3d3d3',
                        marginVertical: 10,
                      }}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginTop: 40,
                    }}>
                    <Text style={{fontSize: 20, color: '#10275A'}}>Type</Text>
                    <Icon name="dots-vertical" size={25} color="#2C406E" />
                  </View>
                  <View style={{}}>
                    <Modal
                      isVisible={modalVisible2}
                      style={{margin: 0}}
                      // isVisible={true}
                      backdropOpacity={0.6}>
                      <View
                        style={{
                          paddingVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          backgroundColor: 'white',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          style={{width: '95%'}}
                          onPress={() =>
                            this.setState({
                              modalVisible2: false,
                            })
                          }>
                          <View style={{width: '95%'}}>
                            <Text
                              style={{
                                alignSelf: 'flex-end',
                                color: 'grey',
                                fontSize: 20,
                              }}>
                              x
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Select Type
                        </Text>
                        <FlatList
                          data={this.state.category}
                          renderItem={item => {
                            return (
                              <View
                                style={{
                                  minWidth: '100%',
                                  paddingHorizontal: 20,
                                }}
                                key={item?.index}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    marginBottom: 10,
                                  }}>
                                  {item?.item?.heading}
                                </Text>
                                <FlatList
                                  nestedScrollEnabled
                                  data={item?.item?.data}
                                  renderItem={items => {
                                    return (
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          minWidth: '100%',
                                          alignItems: 'center',
                                          marginBottom: 5,
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                          }}>
                                          <Image
                                            source={items?.item?.image}
                                            style={{marginRight: 5}}
                                          />
                                          <Text>{items?.item?.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.onClicked(
                                              item?.index,
                                              items?.index,
                                            )
                                          }>
                                          <Image
                                            source={
                                              items.item?.checked
                                                ? require('../../commons/images/selectedTick.png')
                                                : require('../../commons/images/unSelectedTick.png')
                                            }
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  }}
                                />
                              </View>
                            );
                          }}
                        />
                        <View style={{paddingHorizontal: 20, width: '100%'}}>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this._modalVisble1}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 15,
                              height: 55,
                              backgroundColor: '#648CFF',
                              marginTop: 20,
                            }}>
                            <Text style={{fontSize: 18, color: 'white'}}>
                              Done
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{marginVertical: 10}}
                      onPress={this._modalVisble2}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#7197FE',
                          marginLeft: 10,
                        }}>
                        + Add new
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#d3d3d3',
                        marginVertical: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{}}>
                  <Modal isVisible={modalVisible3} backdropOpacity={0.6}>
                    <View
                      style={{
                        marginHorizontal: 20,
                        paddingVertical: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 15,
                      }}>
                      <View
                        style={{
                          marginVertical: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../commons/images/tick1.png')}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#10275A',
                            marginVertical: 20,
                          }}>
                          Successfully create Self Challenge
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._modalVisble3}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                      height: 55,
                      backgroundColor: '#648CFF',
                      marginTop: 20,
                    }}>
                    <Text style={{fontSize: 18, color: 'white'}}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  datePickerStyle: {
    // width: 200,
    // marginTop: 20,
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#007aff',
    color: 'white',
  },
  pickerStyle: {
    width: '80%',
    // height: 40,
    color: '#007aff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
});
