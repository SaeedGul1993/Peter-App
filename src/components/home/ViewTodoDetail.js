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
import {getToken} from '../../commons/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import Tick from '../../commons/images/tick1.png';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

export default class ViewTodoDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      newtag: '',
      reminder: false,
      date: moment().format('MM-DD-YYYY'),
      time1: '',
      time2: '',
      time1hours: 0,
      time1minutes: 0,
      time2hours: '',
      time2minutes: '',
      DatePickerVisibility: false,
      DatePickerVisibility1: false,

      modalVisible: false,
      modalVisible2: false,
      token: null,
      emoji: [],
      selectedEmoji: null,
      tags: [],
      access_token: '',
      selectedId: '',
      reminderTime: moment().format('hh:mm A'),
      editTodoId: null,
      todoTime: moment().format('hh:mm A'),
      reminderTime2: moment().format('hh:mm A'),
    };
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem('token');
    console.log('token', access_token);
    this.setState({
      access_token,
    });
    this.showDate();
    this.getEmoji();
    this.getTags();
    console.log('params', this.props.route?.params);
    let item = this.props?.route?.params?.item;
    let isEdit = this.props?.route?.params?.isEdit;

    if (isEdit === true) {
      this.setState({
        title: item?.name,
        description: item?.description,
        date: item?.due_date,
        reminderTime: item?.reminder_time,
        editTodoId: item?.id,
        selectedEmoji: item?.emoji,
        selectedId: item?.emoji,
        tags: item?.tags,
      });
    }
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

  getEmoji = () => {
    console.log('token', this.state.access_token);
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InNhYWQiLCJleHAiOjE2NDA1MjkyOTIsImVtYWlsIjoicGN0MTIzNEB5YWhvby5jb20ifQ.1ihM8Jhn3l6cSfjejAjHNlnX95M70RgLX7NSFACPEhs';

    console.log('get emoji token', this.state.access_token);
    fetch('http://54.189.183.64/common/api/v1/emoji/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `JWT ${this.state.token}`,
        Authorization: `JWT ${this.state.access_token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('emoji response', responseJson);
        this.setState({emoji: responseJson.results});
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  getTags = () => {
    console.log('get tags token', this.state.access_token);
    fetch('http://54.189.183.64/common/api/v1/tags/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.access_token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('tags response', responseJson);
        this.setState({tags: responseJson.results});
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  _updatetodo = () => {
    if (this.state.title == '') {
      alert('Enter Title');
    } else if (this.state.description == '') {
      alert('Enter Description');
    } else {
      this.checkUpdatedInputFields();
    }
  };

  checkUpdatedInputFields = () => {
    console.log('toeken', this.state.access_token);
    const body = JSON.stringify({
      name: this.state.title,
      description: this.state.description,
      due_date: this.state.date,
      emoji: this.state.selectedEmoji,
      // tags: this.state.tags,
      reminder_time: this.state.reminderTime,
    });
    console.log('body of add todo', body, this.state?.editTodoId);
    fetch(
      'http://54.189.183.64/todo/api/v1/todo/' + this.state?.editTodoId + '/',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${raw}`
          Authorization: `JWT ${this.state.access_token}`,
        },
        body: body,
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('response', responseJson);
        // this.setState({todoList:responseJson.results})
        this._modalVisble2();
        this.setState(
          {
            title: '',
            description: '',
          },
          () => {},
        );
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  _addTodo = () => {
    if (this.state.title == '') {
      alert('Enter Title');
    } else if (this.state.description == '') {
      alert('Enter Description');
    } else {
      this.checkInputFields();
    }
  };

  checkInputFields = () => {
    console.log('toeken', this.state.access_token);
    const body = JSON.stringify({
      name: this.state.title,
      description: this.state.description,
      due_date: moment(this.state.date, ['MM-DD-YYYY']).format('YYYY-MM-DD'),
      emoji: this.state.selectedEmoji,
      tags: this.state.tags?.map(item => {
        return item?.id;
      }),
      reminder_time: this.state.reminderTime,
    });
    console.log('body of add todo', body);
    fetch('http://54.189.183.64/todo/api/v1/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${raw}`
        Authorization: `JWT ${this.state.access_token}`,
      },
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response', responseJson);
        this._modalVisble2();
        this.setState({
          title: '',
          description: '',
        });
      })
      .catch(err => {
        console.log('error', err?.response);
      });
  };

  _addTag = () => {
    const body = JSON.stringify({
      code: (Math.random() * Math.ceil(2)).toFixed(4),
      name: this.state.newtag,
    });
    console.log('tag body', body);
    fetch('http://54.189.183.64/common/api/v1/tags/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.access_token}`,
      },
      body: body,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response', responseJson);
        if (typeof responseJson?.code[0] === 'object') {
          this._modalVisble();
          return alert(responseJson?.code[0]);
        } else {
          this._modalVisble();
          this.getTags();
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  _deleteTag = ind => {
    alert('delete');
    console.log('ind', typeof ind);
    const id = ind.toString();

    fetch(`http://54.189.183.64/common/api/v1/tags/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.access_token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response in delte tags', responseJson);
        this.getTags();
      })
      .catch(err => {
        console.log('err', err?.data);
      });
  };

  back = () => {
    this.props.navigation.navigate('CreateGoalScreen');
  };

  toggleSwitch = () => {
    this.setState({reminder: !this.state.reminder});
  };

  showDatePicker = () => {
    this.setState({DatePickerVisibility1: true});
    this.showDate();
  };

  showDatePicker1 = () => {
    if (this.state.reminder) {
      this.setState({DatePickerVisibility: true});
      this.showDate();
    }
  };

  hideDatePicker = () => {
    this.setState({DatePickerVisibility: false});
  };

  hideDatePicker1 = () => {
    this.setState({DatePickerVisibility1: false});
  };
  handleConfirmReminderTime = time => {
    let reminderTime = moment(time).format('hh:mm[:ss[.uuuuuu]]');
    let rTime = moment(time).format('hh:mm A');

    this.setState(
      {
        reminderTime: reminderTime,
        reminderTime2: rTime,
      },
      () => {
        this.hideDatePicker();
      },
    );
  };

  handleConfirmTodoTime = time => {
    let rTime = moment(time).format('hh:mm A');
    this.setState(
      {
        todoTime: rTime,
      },
      () => {
        this.hideDatePicker1();
      },
    );
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
      this.props.navigation.navigate('MyTodo', {
        fromUpdated: this.props.route?.params?.isEdit
          ? Math.random()
          : Math.random(),
      });
    }, 1000);
  };

  render() {
    console.log('this.state.emoji', this.props.route.params.item);
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
      emoji,
      tags,
    } = this.state;
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
                  source={require('../../commons/images/back.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={{fontSize: 18, color: '#10275A'}}>Todo Detail </Text>
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
              contentContainerStyle={{flexGrow: 1}}
              style={{paddingTop: 20, marginBottom: 120}}
              showsVerticalScrollIndicator={false}>
              <View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, color: '#8A8BB3'}}>Title</Text>
                  <TextInput
                    placeholder="Enter Title"
                    style={{
                      color: '#10275A',
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      marginBottom: 10,
                    }}
                    editable={false}
                    value={this.state.title}
                    onChangeText={title => this.setState({title})}
                    autoCapitalize="sentences"
                    ref={ref => {
                      this._titleinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text
                    style={{fontSize: 14, color: '#8A8BB3', marginBottom: 10}}>
                    Date
                  </Text>
                  <Text>{date}</Text>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#d3d3d3',
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, color: '#8A8BB3'}}>Reminder</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginBottom: 10,
                    }}>
                    {/* <Switch
                      trackColor={{false: '#d3d3d3', true: '#648CFF'}}
                      thumbColor={this.state.reminder ? 'white' : 'white'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={this.toggleSwitch}
                      value={this.state.reminder}
                    /> */}
                    <View style={{width: '45%', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{width: '100%', alignItems: 'center'}}
                        onPress={this.showDatePicker1}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: reminder ? '#10275A' : '#d3d3d3',
                            marginBottom: 5,
                          }}>
                          {moment(this.state.reminderTime, [
                            'hh:mm:ss',
                          ]).format('hh:mm')}
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
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, color: '#8A8BB3'}}>
                    Description
                  </Text>
                  <TextInput
                    placeholder="Enter Description"
                    style={{
                      color: '#10275A',
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      marginBottom: 10,
                    }}
                    editable={false}
                    value={this.state.description}
                    onChangeText={description => this.setState({description})}
                    autoCapitalize="sentences"
                    ref={ref => {
                      this._titleinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, color: '#8A8BB3'}}>Tags</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginVertical: 10,
                    }}>
                    <FlatList
                      data={tags}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={item => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              backgroundColor: '#ECEAFF',
                              paddingHorizontal: 10,
                              paddingVertical: 8,
                              borderRadius: 20,
                              marginRight: 10,
                            }}>
                            <Text style={{fontSize: 14, color: '#8F81FE'}}>
                              {item?.item?.name}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {}}
                              style={{
                                marginLeft: 10,
                                width: 20,
                                alignItems: 'center',
                              }}>
                              <Text style={{fontSize: 10, color: '#665EB5'}}>
                                X
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>

                <View style={{}}>
                  <Modal isVisible={modalVisible2} backdropOpacity={0.6}>
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
                          {this.state.editTodoId !== null
                            ? 'Successfully update your Todo'
                            : 'Successfully create your Todo'}
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
                <Text style={{fontSize: 14, color: '#8A8BB3', paddingLeft: 20}}>
                  Emoji
                </Text>
                {emoji?.length ? (
                  <FlatList
                    data={emoji}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(val, ind) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              selectedId: val?.item?.id,
                              selectedEmoji: val?.item?.id,
                            });
                          }}
                          key={ind}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            margin: 20,
                          }}>
                          {val?.item?.id === this.state.selectedId ? (
                            <Image
                              source={Tick}
                              style={{
                                width: 20,
                                height: 20,
                                right: 0,
                                position: 'absolute',
                                borderWidth: 2,
                              }}
                            />
                          ) : null}
                          <Image
                            source={{uri: val?.item?.file}}
                            resizeMode="contain"
                            style={{
                              height: 50,
                              width: 50,
                              marginRight: 25,
                              borderWidth: 1,
                            }}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <Text style={{textAlign: 'center'}}>No Emoji Selected</Text>
                )}
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
});
