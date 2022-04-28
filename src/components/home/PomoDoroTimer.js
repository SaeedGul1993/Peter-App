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
  Dimensions,
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
import Images from '../../constants/images';
import {SwipeListView} from 'react-native-swipe-list-view';

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
    modalVisible2: false,
    today: true,
    myTodos: [],
    access_token: '',
    loading: true,
    modal: false,
    myTimers: [],
    timerTitle: '',
    completedTimers: [],
    modal2: false,
    selectedIndex: null,
    edit: false,
    searchTimerByName: '',
    searchByTime: '',
  };

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem('token');
    console.log('token', access_token);
    this.setState({
      access_token,
    });
    this.showDate();
    this._getTodos();
  }

  _getTodos = () => {
    fetch('http://54.189.183.64/todo/api/v1/todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${raw}`
        Authorization: `JWT ${this.state.access_token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('_getTodos responseJson', responseJson);
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

  showDate = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    // console.log('hours means k 17%12=5',hours)
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
    this.setState({
      modal: true,
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

  _addTimer = () => {
    this.setState(prevState => ({
      myTimers: [
        {
          title: this.state.timerTitle,
          created_at: moment().format('DD MMMM'),
          completed: false,
        },
        ...prevState.myTimers,
      ],
      modal: false,
    }));
  };
  _searchPomodoroTimerByNameAndTime = search => {
    return records => {
      let searchValue = `${records?.title}${records?.created_at}`;
      return (
        searchValue.toLowerCase().includes(search.toLowerCase()) || !search
      );
    };
  };

  _timerAddInCompleted = () => {
    const {selectedIndex} = this.state;
    console.log('selectedIndex', selectedIndex);
    let mappedOut = this.state.myTimers?.map((item, index) => {
      if (index === selectedIndex) {
        return {
          ...item,
          completed: true,
        };
      } else {
        return item;
      }
    });
    let filteredOutForCompletedTimer = mappedOut?.filter(
      item => item?.completed === true,
    );
    let filteredOutForInCompletedTimer = mappedOut?.filter(
      item => item?.completed === false,
    );
    this.setState(prevState => ({
      myTimers: [...filteredOutForInCompletedTimer],
      completedTimers: [
        ...prevState?.completedTimers,
        ...filteredOutForCompletedTimer,
      ],
      modal2: false,
    }));
  };

  _editTimer = () => {
    let mappedOut = this.state.myTimers?.map((item, index) => {
      if (index === this.state.selectedIndex) {
        return {
          title: this.state.timerTitle,
          created_at: moment().format('DD MMMM'),
          completed: false,
        };
      } else {
        return item;
      }
    });
    this.setState({
      myTimers: mappedOut,
      modal: false,
      edit: false,
    });
  };

  _deleteTimer = selectedIndex => {
    this.state.myTimers?.splice(selectedIndex, 1);
    this.setState({myTimers: this.state.myTimers});
  };

  _editModal = (title, index) => {
    this.setState({
      timerTitle: title,
      selectedIndex: index,
      modal: true,
      edit: true,
    });
  };

  _today = val => {
    if (val == true) {
      this.setState({today: true});
    } else if (val == false) {
      this.setState({today: false});
    }
  };

  clearText = () => {
    this.setState({
      searchTimerByName: '',
    });
  };

  renderMyTimers = timer => {
    return (
      <SwipeListView
        rightOpenValue={-Dimensions.get('window').width / 2}
        data={timer}
        renderItem={(data, rowMap) => (
          console.log('data', data),
          (
            <View style={styles.tile}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modal2: true, selectedIndex: data?.index});
                }}>
                <Image
                  style={styles.checkboxx}
                  source={
                    data?.item?.completed ? Images.checkedBox : Images.Rectangle
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  data?.item?.completed === false
                    ? this.props.navigation.navigate('PomoDoroTimer')
                    : () => {}
                }
                style={{width: '95%'}}>
                <View style={{paddingHorizontal: 10}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {data?.item?.title}
                  </Text>
                  <Text
                    style={{
                      color: '#9AA8C7',
                      fontSize: 14,
                    }}>
                    {data?.item?.created_at}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        )}
        renderHiddenItem={(data, rowMap) =>
          data?.item?.completed !== true && (
            <View style={styles.tileRightSide}>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => this._editModal(data?.item?.title, data?.index)}>
                <Image source={Images.editIcon} resizeMode="center" />
                <Text style={{fontSize: 12}}>Title</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 15}} onPress={() => {}}>
                <Image source={Images.rotateIcon} resizeMode="center" />
                <Text style={{fontSize: 12}}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => this._deleteTimer(data?.index)}>
                <Image source={Images.deleteIcon} resizeMode="center" />
                <Text style={{fontSize: 12}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    );
  };

  renderTodosItem = item => {
    return (
      <View
        style={{
          backgroundColor: '#E5E5E5',
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Text
            style={{
              width: 3,
              height: 50,
              backgroundColor: '#648CFF',
            }}
          />
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text style={{fontSize: 16, color: '#2C406E'}}>{item.name}</Text>
              <CustomMaterialMenu
                menustyle={{}}
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
                marginLeft: 20,
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
                backgroundColor: '#d3d3d3',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text style={{fontSize: 11, color: '#648CFF'}}>Urgent</Text>
            </View>
            <View
              style={{
                height: 25,
                width: 50,
                borderRadius: 5,
                backgroundColor: '#d3d3d3',
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
            {moment(item.created_at).format('LTS')}
          </Text>
        </View>
      </View>
    );
  };

  subscribedPlan = () => (
    <Modal
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => this.setState({modal: false})}
      isVisible={this.state.modal}
      //isVisible={true}
    >
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <View
          style={{
            marginVertical: 35,
          }}>
          {this.state.edit ? (
            <Text style={styles.addPomo}>Edit Pomodoro Title</Text>
          ) : (
            <Text style={styles.addPomo}>Add Pomodoro Title</Text>
          )}
          <TextInput
            value={this.state.timerTitle}
            onChangeText={txt => this.setState({timerTitle: txt})}
            placeholder="Gaming on laptop"
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => this.setState({modal: false})}
              style={styles.btn}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.state.edit ? this._editTimer() : this._addTimer()
              }
              style={styles.btn1}>
              <Text style={styles.text1}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  _completedTimerModal = () => (
    <Modal
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => this.setState({modal2: false})}
      isVisible={this.state.modal2}
      //isVisible={true}
    >
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <View
          style={{
            marginVertical: 35,
          }}>
          <Text style={styles.addPomo}>Timer</Text>
          <Text style={{textAlign: 'center', marginTop: 10}}>
            Are you sure to Complete this timer ?
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => this.setState({modal2: false})}
              style={styles.btn}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._timerAddInCompleted()}
              style={styles.btn1}>
              <Text style={styles.text1}>Sure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
      modalVisible2,
      today,
    } = this.state;
    console.log('myTimers', this.state.myTimers);
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
              <Text style={{fontSize: 18, color: '#10275A'}}>
                Pomodoro Meter
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
              nestedScrollEnabled={true}
              style={{marginBottom: 120, flexGrow: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F6F6F6',
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Icon name="search" size={20} color="#BEC4D0" />
                  <TextInput
                    placeholder="Search for Timer"
                    style={{
                      color: '#10275A',
                      fontSize: 14,
                      marginLeft: 0,
                      width: '88%',
                    }}
                    value={this.state.searchTimerByName}
                    onChangeText={txt =>
                      this.setState({searchTimerByName: txt})
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
                </View>
                <TouchableOpacity
                  onPress={this.clearText}
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

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <Text style={styles.heading}>Calendar</Text>
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

                <View style={{flex: 1, marginHorizontal: 20}}>
                  <CalendarStrip
                    selectedDate={this.state.date}
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
                    style={{paddingTop: 20, paddingBottom: 10, height: 100}}
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
              </View>

              <Text style={[styles.heading, {paddingHorizontal: 20}]}>
                My Timers
              </Text>

              {this.state.myTimers?.length ? (
                this.renderMyTimers(
                  this.state.myTimers?.filter(
                    this._searchPomodoroTimerByNameAndTime(
                      this.state.searchTimerByName,
                    ),
                  ),
                )
              ) : (
                <Text style={{textAlign: 'center'}}>No Timer Create </Text>
              )}
              {this.subscribedPlan()}
              {this._completedTimerModal()}

              <Text style={[styles.heading, {paddingHorizontal: 20}]}>
                Completed Timers
              </Text>
              {this.state.completedTimers?.length ? (
                this.renderMyTimers(this.state.completedTimers)
              ) : (
                <Text style={{textAlign: 'center'}}>
                  No completed timer yet
                </Text>
              )}
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
  heading: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkboxx: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  tile: {
    backgroundColor: '#F9FAFD',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
  },
  tileRightSide: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    padding: 10,
    zIndex: 10000,
  },
  input: {
    backgroundColor: '#F6F6F6',
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    color: '#000000',
  },
  addPomo: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  row: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: {
    borderColor: '#7197FE',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 90,
    alignItems: 'center',
  },
  text: {
    color: '#7197FE',
  },
  btn1: {
    borderColor: '#7197FE',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#7197FE',
    width: 90,
    alignItems: 'center',
  },
  text1: {
    color: 'white',
  },
});
