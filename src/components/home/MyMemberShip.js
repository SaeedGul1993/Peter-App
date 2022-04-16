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
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import Images from '../../constants/images';

export default class MyMemberShip extends Component {
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

  _pending = val => {
    if (val == true) {
      this.setState({pending: true});
    } else if (val == false) {
      this.setState({pending: false});
    }
  };

  _goDetailFriend = () => {
    this.props.navigation.navigate('PurchaseMembership');
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
                MemberShip
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
              style={{marginBottom: 80, paddingHorizontal: 20}}
              showsVerticalScrollIndicator={false}>
              <View style={{marginTop: 10}}>
                <View
                  style={{
                    backgroundColor: '#D4EBFC',
                    borderRadius: 10,
                    marginVertical: 10,
                    width: '100%',
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={styles.heading}>
                        Challenge Membership Plan {'\n'}$30.00
                      </Text>

                      <View style={{alignItems: 'center', marginRight: 10}}>
                        <ImageBackground
                          style={styles.uptoPercent}
                          source={Images.blueRect}>
                          <Text style={styles.uptoText}>UPTO {'\n'}50%</Text>
                        </ImageBackground>
                        <Image
                          style={styles.polygon}
                          source={Images.bluePolygon}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '20%'}} />
                      <View
                        style={{
                          alignItems: 'flex-start',
                          marginTop: 10,
                          width: '80%',
                          paddingRight: 20,
                        }}>
                        <Text style={[styles.include, {color: '#7197FE'}]}>
                          Includes
                        </Text>

                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/Vector12.png')}
                          />
                          <Text style={styles.points}>
                            More than 3 friends and unlimited Challenges.
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/Vector12.png')}
                          />
                          <Text numberOfLines={2} style={styles.points}>
                            Complete 2 smallest challenges & get day off.
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/Vector12.png')}
                          />
                          <Text numberOfLines={2} style={styles.points}>
                            Complete the challenge, the winner gets some rewards
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <ImageBackground
                    source={require('../../commons/images/blueBack.png')}
                    style={styles.footer}>
                    <TouchableOpacity
                      onPress={() => this._goDetailFriend()}
                      style={[styles.btnBack, {backgroundColor: '#648cff'}]}>
                      <Text style={styles.btnText}>Subscribe Now</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>

                <View
                  style={{
                    backgroundColor: '#f8f1ff',
                    borderRadius: 10,
                    marginVertical: 10,
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={[styles.heading, {color: '#BE82FF'}]}>
                        Premuim Membership Plan {'\n'}$50.00
                      </Text>
                      <View style={{alignItems: 'center'}}>
                        <ImageBackground
                          style={styles.uptoPercent}
                          source={Images.purpleRect}>
                          <Text style={styles.uptoText}>50%</Text>
                        </ImageBackground>
                        <Image
                          style={styles.polygon}
                          source={Images.purplePolygon}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: '20%',
                        }}
                      />
                      <View
                        style={{
                          marginTop: 10,
                          width: '80%',
                          paddingRight: 20,
                        }}>
                        <Text style={[styles.include, {color: '#9D9D9D'}]}>
                          Includes
                        </Text>
                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/VectorLight.png')}
                          />
                          <Text numberOfLines={2} style={styles.points}>
                            More than 3 friends and unlimited Challenges.
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/VectorLight.png')}
                          />
                          <Text numberOfLines={2} style={styles.points}>
                            Complete 2 smallest challenges & get day off.
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Image
                            style={styles.tick}
                            source={require('../../commons/images/VectorLight.png')}
                          />
                          <Text numberOfLines={2} style={styles.points}>
                            Complete the challenge, the winner gets some rewards
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <ImageBackground
                    resizeMode="cover"
                    source={require('../../commons/images/purpleBack.png')}
                    style={styles.footer}>
                    <TouchableOpacity
                      onPress={this._goDetailFriend}
                      style={styles.btnBack}>
                      <Text style={styles.btnText}>Subscribe Now</Text>
                    </TouchableOpacity>
                  </ImageBackground>
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
  btnBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BE82FF',
    width: 150,
    height: 45,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 25,
  },
  footer: {
    height: 90,
    paddingLeft: 20,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  tick: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'ser',
  },
  heading: {
    fontSize: 18,
    color: '#648CFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 10,
    paddingLeft: 10,
  },
  include: {
    marginLeft: 20,
    marginTop: -20,
    fontWeight: 'bold',
  },
  uptoPercent: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  polygon: {
    width: 37,
    height: 30,
    marginTop: -5,
    resizeMode: 'contain',
  },
  uptoText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});

// #d4ebfc

// #f8f1ff
