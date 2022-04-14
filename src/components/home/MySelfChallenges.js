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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';

export default class MySelfChallenges extends Component {
  state = {
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
    todayDate: moment().format('YYYY-MM-DD'),
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

  _addSelf = () => {
    this.props.navigation.navigate('AddSelfChallenges');
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

  _renderCards = () => {
    return (
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
              <Text
                numberOfLines={1}
                style={{fontSize: 16, color: '#2C406E', width: 200}}>
                Self Challenge for my book completition
              </Text>
              <CustomMaterialMenu
                menustyle={{}}
                resetTodo={() => {}}
                doneTodo={() => {}}
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
              5 August
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
              backgroundColor: '#fadadd',
              paddingHorizontal: 10,
              width: 90,
              paddingVertical: 8,
              borderRadius: 22,
              borderColor: '#E88B8C',
              borderWidth: 1,
            }}>
            <Text style={{fontSize: 14, color: '#E88B8C'}}>10 days</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7197FE',
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 22,
              marginHorizontal: 5,
            }}>
            <Text style={{fontSize: 14, color: 'white'}}>Football</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fadadd',
              paddingHorizontal: 10,
              width: 90,
              paddingVertical: 8,
              borderRadius: 22,
              borderColor: '#E88B8C',
              borderWidth: 1,
            }}>
            <Text style={{fontSize: 14, color: '#E88B8C'}}>Eat</Text>
          </View>
        </View>
      </View>
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
      modalVisible2,
      today,
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
              <Text style={{fontSize: 18, color: '#10275A'}}>
                Self Challenges
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
              style={{marginBottom: 80, paddingHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F6F6F6',
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Icon name="search" size={20} color="#BEC4D0" />
                  <TextInput
                    placeholder="Search for task"
                    style={{
                      color: '#10275A',
                      fontSize: 14,
                      marginLeft: 0,
                      width: '88%',
                    }}
                    onChangeText={title => this.setState({title})}
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
                    marginTop: 20,
                  }}>
                  <Text style={{fontSize: 24, color: '#10275A'}}>
                    Challenges
                  </Text>
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

                <View style={{flex: 1}}>
                  <ReactNativeCalendarStrip
                    selectedDate={this.state.todayDate}
                    onDateSelected={e => {}}
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
              </View>
              {this._renderCards()}
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
