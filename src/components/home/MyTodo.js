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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import CalendarStrip from 'react-native-calendar-strip';

export default class CreateGoalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      newtag: '',
      reminder: false,
      date: '',
      time1: '',
      time2: '',
      time1hours: 0,
      time1minutes: 0,
      time2hours: '',
      time2minutes: '',
      DatePickerVisibility: false,
      modalVisible: false,
      modalVisible2: false,
      today: true,
      todayTodos: moment().format('YYYY-MM-DD'),
      myTodos: [],
      access_token: '',
      loading: true,
      myTodyTodos: [],
      searchTodo: '',
      searchCalendarDate: '',
      isSchedule: false,
      calendarDateTodo: true,
      inComingTodos: [],
      editTodoId: null,
      menuHide: false,
    };
    this.getToken();
  }

  async getToken() {
    const access_token = await AsyncStorage.getItem('token');
    this.setState(
      {
        access_token,
      },
      () => {},
    );
    this._getTodos(access_token);
    this.showDate();
    this.getEmoji();
  }

  componentDidMount() {
    this.getToken();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.route?.params?.fromUpdated !==
      this.props.route?.params?.fromUpdated
    ) {
      this.getToken();
    }
  }

  _doneTheTodo = item => {
    // console.log('toeken', this.state.access_token);
    const body = JSON.stringify({
      name: item?.name,
      description: item?.description,
      due_date: item?.due_date,
      emoji: item?.emoji,
      tags: item?.tags,
      reminder_time: item?.reminder_time,
      completed_date: item?.due_date,
      is_completed: true,
    });
    // console.log('body of done todo', body, item);
    fetch('http://54.189.183.64/todo/api/v1/todo/' + item?.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${raw}`
        Authorization: `JWT ${this.state.access_token}`,
      },
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('response', responseJson);
        // this.setState({todoList:responseJson.results})
        alert('todo is done successfully');
        this.getToken();
        this.setState({menuHide: true});
      })
      .catch(err => {
        // console.log('error', err);
      });
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
        // console.log('response times of my todo', responseJson?.results);
        let filetered = responseJson?.results?.filter(
          item => item?.is_completed === false,
        );
        let filteredOutTodayTodos = filetered?.filter(
          item =>
            moment(item?.due_date, ['YYYY-MM-DD']).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD'),
        );
        let filteredOutInComingTodos = filetered?.filter(
          item =>
            moment(item?.due_date, ['YYYY-MM-DD']).format('YYYY-MM-DD') >
            moment().format('YYYY-MM-DD'),
        );
        // console.log('inComing todos', filteredOutInComingTodos);
        // console.log('myTodyTodos', filteredOutTodayTodos);

        this.setState({
          myTodyTodos: filteredOutTodayTodos,
          myTodos: filetered,
          inComingTodos: filteredOutInComingTodos,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        // console.log('error', err);
      });
  };

  getEmoji = () => {
    fetch('http://54.189.183.64/common/api/v1/emoji/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.access_token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('emoji response', responseJson);
        this.setState({emoji: responseJson.results});
      })
      .catch(err => {
        // console.log('err', err);
      });
  };

  showDate = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    console.log('hours means k 17%12=5', hours);
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    this.setState({time1: strTime, time2: strTime});
  };

  back = () => {
    // this.props.navigation.navigate('HomeScreen')
    this.props.navigation.navigate('CreateGoalScreen');
  };

  _addSelf = () => {
    this.props.navigation?.navigate('AddTodo', {
      isEdit: false,
      item: null,
    });
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

  _modalVisble2 = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalVisible2: true,
    });
    setTimeout(() => {
      this.setState({modalVisible2: false, modalVisible: false});
    }, 1000);
  };

  _today = val => {
    if (val == true) {
      this.setState({today: true});
    } else if (val == false) {
      this.setState({today: false});
    }
  };

  clearText = () => {
    this._titleinput.clear();
  };

  // search todos here
  searchValueByTitle = title => {
    return records => {
      let searchRecord = `${records?.name}${records?.due_date}`;
      return (
        searchRecord?.toLowerCase().includes(title?.toLowerCase()) || !title
      );
    };
  };

  renderTodosItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ViewTodo', {isEdit: true, item})
        }>
        <View
          style={{
            backgroundColor: '#F9FAFD',
            borderRadius: 15,
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
                backgroundColor: '#648CFF',
              }}
            />
            <View style={{width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                }}>
                <Text style={{fontSize: 16, color: '#2C406E'}}>
                  {item.name}
                </Text>
                <CustomMaterialMenu
                  menustyle={{}}
                  resetTodo={() => {
                    this.props.navigation?.navigate('AddTodo', {
                      isEdit: true,
                      item,
                    });
                  }}
                  doneTodo={() => {
                    this._doneTheTodo(item);
                  }}
                  menuHide={this.state.menuHide}
                  navigation={this.props.navigation}
                  route={this.props.route}
                  isIcon={true}
                  iconName="dots-vertical"
                  color="#2C406E"
                />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: '#10275A',
                  marginLeft: 10,
                }}>
                {item.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
              marginHorizontal: 20,
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
                  backgroundColor: '#648CFF20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 0,
                }}>
                <Text style={{fontSize: 11, color: '#648CFF'}}>Urgent</Text>
              </View>
              <View
                style={{
                  height: 25,
                  width: 50,
                  borderRadius: 5,
                  backgroundColor: '#648CFF20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <Text style={{fontSize: 11, color: '#648CFF'}}>Home</Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 20,
                color: '#9AA8C7',
                fontSize: 14,
              }}>
              {moment(item.created_at).format('LT')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    // console.log(
    //   'this.state?.myTodyTodos',
    //   this.state?.myTodyTodos,
    //   'this.state.inComingTodos',
    //   this.state.inComingTodos,
    //   '',
    // );
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
      modalVisible2,
      today,
    } = this.state;
    // console.log('myTodos', this.state.myTodos);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 0, marginVertical: 20}}>
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
                <Image
                  resizeMode="contain"
                  source={require('../../commons/images/back.png')}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 18, color: '#10275A'}}>My Todo</Text>
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
              style={{marginBottom: 80}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F6F6F6',
                    paddingHorizontal: 20,
                    borderRadius: 15,
                    marginBottom: 15,
                  }}>
                  <Icon name="search" size={20} color="#BEC4D0" />
                  <TextInput
                    placeholder="Search for task"
                    value={this.state.searchTodo}
                    style={{
                      color: '#10275A',
                      fontSize: 14,
                      marginLeft: 0,
                      width: '88%',
                      paddingHorizontal: 20,
                    }}
                    onChangeText={title =>
                      this.setState({
                        searchTodo: title,
                      })
                    }
                    placeholderTextColor="#C8CDD9"
                    autoCapitalize="sentences"
                    ref={ref => {
                      this._titleinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({searchTodo: ''});
                    }}
                    activeOpacity={0.5}
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: 5,
                      backgroundColor: '#BEC4D0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 8, color: 'white'}}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontSize: 24, color: '#10275A'}}>Todo</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon2
                      name="calendar"
                      color="#525F77"
                      style={{marginRight: 8}}
                    />
                    <Text style={{fontSize: 12, color: '#525F77'}}>
                      {moment().format('MMMM YYYY')}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, paddingHorizontal: 20}}>
                  <CalendarStrip
                    selectedDate={this.state.todayTodos}
                    onDateSelected={e => {
                      this.setState({
                        searchCalendarDate: moment(e).format('YYYY-MM-DD'),
                        searchTodo: '',
                        calendarDateTodo: true,
                        today:
                          moment().format('YYYY-MM-DD') ===
                          moment(e).format('YYYY-MM-DD')
                            ? true
                            : false,
                        isSchedule: false,
                        todayTodos: moment(e).format('YYYY-MM-DD'),
                      });
                    }}
                    daySelectionAnimation={{
                      type: 'border',
                      duration: 100,
                      borderWidth: 1,
                      borderHighlightColor: '#648CFF',
                    }}
                    markedDatesStyle={{
                      backgroundColor: 'red',
                    }}
                    dayContainerStyle={{
                      borderRadius: 0,
                    }}
                    highlightDateContainerStyle={{
                      backgroundColor: '#648CFF',
                      borderRadius: 12,
                      height: 70,
                      paddingVertical: 10,
                    }}
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    highlightDateNumberStyle={{color: 'white', marginTop: 6}}
                    highlightDateNameStyle={{
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}
                    showMonth={false}
                    style={{paddingTop: 0, paddingBottom: 0, height: 100}}
                    //calendarColor={'#3343CE'}
                    calendarHeaderStyle={{color: 'white'}}
                    dateNumberStyle={{
                      color: 'black',
                      fontWeight: '100',
                      marginTop: 6,
                    }}
                    dateNameStyle={{
                      color: 'black',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}
                    iconContainer={{flex: 0.1}}
                  />
                </View>

                {/* <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={false}
                  minDate={new Date(2018, 1, 1)}
                  maxDate={new Date(2050, 6, 3)}
                  previousTitle="Previous"
                  previousTitleStyle={{marginLeft: 10}}
                  nextTitle="Next"
                  nextTitleStyle={{marginRight: 10}}
                  todayBackgroundColor="#648CFF"
                  selectedDayColor="#648CFF"
                  selectedDayTextColor="white"
                  scaleFactor={375}
                  textStyle={{
                    fontFamily: 'Cochin',
                    color: '#000000',
                  }}
                /> */}

                <View
                  style={{
                    width: '70%',
                    alignSelf: 'center',
                    backgroundColor: '',
                    marginVertical: 10,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 45,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        this.setState({
                          todayTodos: moment().format('YYYY-MM-DD'),
                          isSchedule: false,
                          today: true,
                          calendarDateTodo: true,
                        });
                      }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        height: today ? 40 : null,
                        backgroundColor: today ? '#E7F1F8' : null,
                        borderRadius: today ? 12 : null,
                        elevation: today ? 0.5 : null,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: today ? '#648CFF' : '#10275A',
                        }}>
                        Today
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        this.setState({
                          today: false,
                          isSchedule: true,
                          calendarDateTodo: false,
                        });
                      }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        height: this.state.isSchedule ? 40 : null,
                        backgroundColor: this.state.isSchedule
                          ? '#E7F1F8'
                          : null,
                        borderRadius: this.state.isSchedule ? 12 : null,
                        elevation: this.state.isSchedule ? 0.5 : null,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: this.state.isSchedule ? '#648CFF' : '#10275A',
                        }}>
                        Schedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{paddingHorizontal: 20}}>
                {today == true && this.state.calendarDateTodo === true && (
                  <View>
                    {this.state.loading ? (
                      <ActivityIndicator color="blue" />
                    ) : (
                      <View>
                        {this.state?.myTodyTodos
                          ?.filter(
                            this.searchValueByTitle(
                              this.state.searchTodo || this.state.todayTodos,
                            ),
                          )
                          .map(item => this.renderTodosItem(item))}
                      </View>
                    )}
                  </View>
                )}
                {this.state.isSchedule &&
                  this.state?.inComingTodos.map(item => {
                    return (
                      <View style={{marginBottom: 50}}>
                        <View
                          style={{
                            backgroundColor: '#F1E3FF',
                            borderRadius: 10,
                            marginVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: 10,
                              marginVertical: 15,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginHorizontal: 5,
                                }}>
                                <Text style={{fontSize: 11, color: '#BE82FF'}}>
                                  {item?.due_date !== null
                                    ? moment(item?.due_date).format('MMMM DD')
                                    : '8 Jan'}
                                </Text>
                                <Text style={{color: '#9AA8C7', fontSize: 14}}>
                                  {moment(item?.reminder_time, [
                                    'hh:mm[:ss[.uuuuuu]]',
                                  ]).format('hh:mm A')}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#BE82FF',
                                  marginLeft: 20,
                                  fontWeight: '800',
                                }}>
                                {item?.name}
                              </Text>
                            </View>
                            <CustomMaterialMenu
                              menustyle={{}}
                              navigation={this.props.navigation}
                              route={this.props.route}
                              isIcon={true}
                              iconName="dots-vertical"
                              color="#2C406E"
                            />
                          </View>
                        </View>
                      </View>
                    );
                  })}
                {this.state.calendarDateTodo && this.state.today === false && (
                  <View>
                    {this.state.loading ? (
                      <ActivityIndicator color="blue" />
                    ) : (
                      <View>
                        {this.state?.myTodos
                          ?.filter(
                            this.searchValueByTitle(
                              this.state.searchTodo ||
                                this.state.searchCalendarDate,
                            ),
                          )
                          .map(item => this.renderTodosItem(item))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.absolute}
          onPress={this._addSelf}>
          <Image source={require('../../commons/images/Group6880.png')} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
});
