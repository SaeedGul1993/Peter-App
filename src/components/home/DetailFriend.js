import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Switch, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon4 from 'react-native-vector-icons/Ionicons'
import Icon5 from 'react-native-vector-icons/Feather'
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu'
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';

export default class DetailFriend extends Component {

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
        notification2: '#d3d3d3',
        notification3: "#d3d3d3"
    }

    componentDidMount() {
        this.showDate()
    }

    showDate = () => {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        // console.log('hours means k 17%12=5',hours)
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        console.log('str Time',strTime)
        this.setState({time1:strTime,time2:strTime})
    }

    back = () => {
        // this.props.navigation.navigate('HomeScreen')
        this.props.navigation.goBack()
    }

    _addSelf = () => {
        this.props.navigation.navigate('AddSelfChallenges')
    }

    showDatePicker = () => {
        this.setState({DatePickerVisibility:true});
        this.showDate()
      };
    
      hideDatePicker = () => {
        this.setState({DatePickerVisibility:false});
      };
    
      handleConfirm = (date, time) => {
        console.warn("A date has been picked: ", date);
        console.warn("A time has been picked: ", time);
        this.hideDatePicker();
      };

      _modalVisble = () => {
          this.setState({modalVisible:!this.state.modalVisible})
      }

      _modalVisble2 = () => {
        this.setState({modalVisible:!this.state.modalVisible,modalVisible2:true})
        setTimeout(() => {
            this.setState({modalVisible2:false,modalVisible:false})
        }, 1000);
      }

      _today = (val) => {
        if (val == true) {
            this.setState({today:true})
        }
        else if (val == false) {
            this.setState({today:false})
        }
      }

      clearText = () => {
          this._titleinput.clear()
      }

      _notification2 = () => {
          this.setState({notification2:'#7197FE'})
      }

      _notification3 = () => {
        this.setState({notification3:'#7197FE'})
    }

    render() {
        const { reminder, date, time1, time2, time1hours, time1minutes, time2hours, time2minutes, DatePickerVisibility, modalVisible, modalVisible2, today, notification2, notification3 } = this.state
//         let today1 = moment();
// let day = today1.clone().startOf('month');
// let customDatesStyle = [];
// while(day.add(1, 'day').isSame(today1, 'month')) {
//   customDatesStyle.push({
//     date: day.clone(),
//     // Random colors
//     style: {backgroundColor: '#'+('#00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)},
//     textStyle: {color: 'black'}, // sets the font color
//     containerStyle: [], // extra styling for day container
//     allowDisabled: true, // allow custom style to apply to disabled dates
//   });
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{marginHorizontal:20,marginVertical:20}}>

                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.back}>
                            <Image source={require('../../commons/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={{fontSize:18,color:'#10275A'}}>Detail Friend</Text>
                            <View style={{height:30,width:30,borderRadius:10,borderWidth:1,alignItems:'center',justifyContent:'center',color:'#363853'}}>
                                <CustomMaterialMenu
                                            menustyle={{
                                            //   margin: 10,
                                            //   flexDirection: 'row',
                                            //   justifyContent: 'flex-end',
                                            }}
                                            // menustyle={{marginRight: 16}}
                                            navigation={this.props.navigation}
                                            route={this.props.route}
                                            isIcon={true}
                                            iconName='dots-horizontal'
                                            color='black'
                                            callLogout={this._callLogout}
                                        />
                            </View>
                        </View>

                        <View style={{width:'100%',height:1,backgroundColor:'#d3d3d3',marginVertical:10}} />

                        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:150}}>

                        <View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                                <Text style={{fontSize:24,color:'#10275A'}}>Timeline of your Challenge</Text>
                            </View>

                            <CalendarPicker
                                startFromMonday={true}
                                // allowRangeSelection={true}
                                allowRangeSelection={false}
                                minDate={new Date(2018, 1, 1)}
                                maxDate={new Date(2050, 6, 3)}
                                // maxRangeDuration={7}
                                // disabledDates={[8,9]}
                                // weekdays={['Mon','Tue','Wed','Thur','Fri','Sat','Sun']}
                                // months={['January','Febraury','March','April','May','June','July','August','September','October','November','December',]}
                                previousTitle="Previous"
                                previousTitleStyle={{marginLeft:10}}
                                nextTitle="Next"
                                nextTitleStyle={{marginRight:10}}
                                todayBackgroundColor='#648CFF'
                                // selectedDayColor="#E7F1F8"
                                // selectedDayTextColor="#000000"
                                // customDatesStyles={customDatesStyle}
                                selectedDayColor='#648CFF'
                                selectedDayTextColor='white'
                                scaleFactor={375}
                                textStyle={{
                                    fontFamily: 'Cochin',
                                    color: '#000000',
                                }}
                                //   onDateChange={onDateChange}
                            />
                        </View>

                        <View style={{marginVertical:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',marginVertical:20}}>
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize:16,color:'#2E426E'}}>Self Challenge for my book completition</Text>
                                    <Text style={{fontSize:12,color:'#9AA8C7'}}>1 August 2021</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                                        <Text style={{fontSize:16,color:'#10275A'}}>Challenge</Text>
                                        <Text style={{fontSize:14,color:'#9AA8C7'}}>Points</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#ECEAFF',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,borderColor:'#7197FE',borderWidth:1,marginRight:10}}>
                                        <Text style={{fontSize:14,color:'#7197FE'}}>10 days</Text>
                                        <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                            <Text style={{fontSize:7,color:'#7197FE'}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#7197FE',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,marginRight:10}}>
                                        <Text style={{fontSize:14,color:'white'}}>Football</Text>
                                        <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                            <Text style={{fontSize:7,color:'white'}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#ECEAFF',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,borderColor:'#7197FE',borderWidth:1}}>
                                        <Text style={{fontSize:14,color:'#7197FE'}}>Eat</Text>
                                        <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                            <Text style={{fontSize:7,color:'#7197FE'}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{fontSize:16,color:'#10275A'}}>5</Text>
                                </View>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{fontSize:16,color:'#10275A'}}>Days Stats</Text>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5}}>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#7197FE',width:'50%',paddingVertical:8,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
                                        <Text style={{fontSize:12,color:'white'}}>6 days done</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#e8e8e8',width:'35%',paddingVertical:8,borderTopRightRadius:20,borderBottomRightRadius:20}}>
                                        <Text style={{fontSize:12,color:'#10275A'}}>3 days remaining</Text>
                                    </View>
                                    <Icon4 name='notifications-outline' size={25} color='#d3d3d3' />
                                </View>
                            </View>
                        </View>

                        <View style={{marginVertical:10,alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#10275A'}}>View details for achieve earlier</Text>
                        </View>
                        <Text style={{fontSize:24,color:'#10275A'}}>Friends Timeline</Text>
                        <View style={{marginTop:20}}>
                            <Text style={{fontSize:16,color:'#10275A'}}>Abdul Ahad</Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{fontSize:14,color:'#10275A'}}>abdulahad@gmail.com</Text>
                                <Text style={{fontSize:14,color:"#0C1936",fontWeight:'bold',marginRight:40}}>1st</Text>
                            </View>
                            {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#e8e8e8',borderRadius:20}}>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#7197FE',width:'55%',paddingVertical:8,borderRadius:20}}>
                                        <Text style={{fontSize:14,color:'white'}}>6 days done</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#e8e8e8',width:'38%',paddingVertical:8,borderRadius:20}}>
                                        <Text style={{fontSize:14,color:'#10275A',marginLeft:10}}>3 days remaining</Text>
                                    </View>
                                </View>
                                <Icon4 name='notifications-outline' size={25} color='#d3d3d3' />
                            </View> */}
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#e8e8e8',width:'90%',height:40, borderRadius:20}}>
                                    <View style={{backgroundColor:'#7197FE',height:40,borderRadius:20,justifyContent:'center',alignItems:'center',width:'60%'}}>
                                        <Text style={{fontSize:12,color:'white'}}>6 days done</Text>
                                    </View>
                                    <View style={{height:40,borderRadius:20,justifyContent:'center',alignItems:'center',width:'40%'}}>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:12,color:'#10275A'}}>3 days remaining</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={this._notification2} activeOpacity={0.5}>
                                    <Icon4 name='notifications-outline' size={25} color={notification2} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={{fontSize:16,color:'#10275A'}}>Peter Song</Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{fontSize:14,color:'#10275A'}}>petersong@gmail.com</Text>
                                <Text style={{fontSize:14,color:"#0C1936",fontWeight:'bold',marginRight:40}}>2nd</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#e8e8e8',borderRadius:20}}>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#7197FE',width:'38%',paddingVertical:8,borderRadius:20}}>
                                        <Text style={{fontSize:12,color:'white'}}>3 days done</Text>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#e8e8e8',width:'55%',paddingVertical:8,borderRadius:20}}>
                                        <Text style={{fontSize:12,color:'#10275A'}}>6 days remaining</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={this._notification3} activeOpacity={0.5}>
                                    <Icon4 name='notifications-outline' size={25} color={notification3} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        </ScrollView>
                    </View>

                </View>

                <View style={styles.absolute}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20}}>
                        <Text style={{fontSize:14,color:'#0C1936'}}>Today CheckIn</Text>
                        <Text style={{fontSize:16,color:'#0C1936',fontWeight:'bold'}}>Later</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:16,color:"#0C1936",fontWeight:'bold',marginRight:10}}>Do it</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this._modalVisble2}>
                                <Icon5
                                    name="check-square"
                                    color='#648CFF'
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{}}>
                                <Modal
                                    isVisible={modalVisible2}
                                    // isVisible={true}
                                    backdropOpacity={0.6}
                                >
                                    <View style={{ marginHorizontal:20,paddingVertical:20,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:15}}>
                                        <View style={{marginVertical:35,alignItems:'center',justifyContent:'center'}}>
                                        <Image source={require('../../commons/images/tick1.png')} />
                                        <Text style={{fontSize:18,color:'#10275A',marginVertical:20}}>That's Great</Text>
                                        </View>
                                    </View>
                                </Modal>
                            </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#d3d3d3',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    }
})

// create your own custom modal
// https://www.positronx.io/react-native-modal-tutorial-with-examples/
// https://www.youtube.com/watch?v=u79-3aqAsBY