import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Switch, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu'
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';

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
        today: true
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

    render() {
        const { reminder, date, time1, time2, time1hours, time1minutes, time2hours, time2minutes, DatePickerVisibility, modalVisible, modalVisible2, today } = this.state
        return(
            <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
                <View style={{marginHorizontal:20,marginVertical:20}}>

                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.back}>
                            <Image source={require('../../commons/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={{fontSize:18,color:'#10275A'}}>Self Challenges</Text>
                            <View style={{width:30}} />
                        </View>

                        <View style={{width:'100%',height:1,backgroundColor:'#d3d3d3',marginVertical:10}} />

                        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:80}}>

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#F6F6F6',borderRadius:15,paddingHorizontal:20,marginVertical:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Icon name='search' size={20} color='#BEC4D0' />
                            <TextInput
                                placeholder='Search for task'
                                style={{ color: '#10275A', fontSize:14, marginLeft:0, width:'88%' }}
                                onChangeText={title => this.setState({ title })}
                                placeholderTextColor="#C8CDD9"
                                autoCapitalize='sentences'
                                ref={ref => {
                                    this._titleinput = ref;
                                }}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                            </View>
                            <TouchableOpacity onPress={this.clearText} activeOpacity={0.5}
                                style={{height:16,width:16,borderRadius:5,backgroundColor:'#BEC4D0',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:8,color:'white'}}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{fontSize:24,color:'#10275A'}}>Todo</Text>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
                                    <Icon2 name='calendar' color='#525F77' style={{marginRight:8}} />
                                    <Text style={{fontSize:12,color:'#525F77'}}>August 2021</Text>
                                </View>
                            </View>

                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={false}
                                minDate={new Date(2018, 1, 1)}
                                maxDate={new Date(2050, 6, 3)}
                                previousTitle="Previous"
                                previousTitleStyle={{marginLeft:10}}
                                nextTitle="Next"
                                nextTitleStyle={{marginRight:10}}
                                todayBackgroundColor='#648CFF'
                                selectedDayColor='#648CFF'
                                selectedDayTextColor='white'
                                scaleFactor={375}
                                textStyle={{
                                    fontFamily: 'Cochin',
                                    color: '#000000',
                                }}
                            />
                        </View>

                        <View style={{backgroundColor:'#E5E5E5',borderRadius:10,marginVertical:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginVertical:20}}>
                                <Text style={{width:3,height:50,backgroundColor:'#648CFF'}}></Text>
                                <View style={{width:'100%'}}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20}}>
                                        <Text style={{fontSize:16,color:'#10275A'}}>Self Challenge for my book completition</Text>
                                        <CustomMaterialMenu
                                            menustyle={{
                                            }}
                                            navigation={this.props.navigation}
                                            route={this.props.route}
                                            isIcon={true}
                                            iconName='dots-vertical'
                                            color='#2C406E'
                                        />
                                    </View>
                                    <Text style={{fontSize:12,color:'#9AA8C7',marginLeft:20}}>4 August</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10,marginHorizontal:20}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#ECEAFF',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,borderColor:'#7197FE',borderWidth:1}}>
                                    <Text style={{fontSize:14,color:'#7197FE'}}>10 days</Text>
                                    <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                        <Text style={{fontSize:7,color:'#7197FE'}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#7197FE',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20}}>
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
                        </View>

                        <View style={{backgroundColor:'#E5E5E5',borderRadius:10,marginVertical:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginVertical:20}}>
                                <Text style={{width:3,height:50,backgroundColor:'#E88B8C'}}></Text>
                                <View style={{width:'100%'}}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20}}>
                                        <Text style={{fontSize:16,color:'#10275A'}}>Mobile need to be repair</Text>
                                        <CustomMaterialMenu
                                            menustyle={{
                                            }}
                                            navigation={this.props.navigation}
                                            route={this.props.route}
                                            isIcon={true}
                                            iconName='dots-vertical'
                                            color='#2C406E'
                                        />
                                    </View>
                                    <Text style={{fontSize:12,color:'#9AA8C7',marginLeft:20}}>5 August</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10,marginHorizontal:20}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fadadd',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,borderColor:'#E88B8C',borderWidth:1}}>
                                    <Text style={{fontSize:14,color:'#E88B8C'}}>10 days</Text>
                                    <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                        <Text style={{fontSize:7,color:'#E88B8C'}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#7197FE',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20}}>
                                    <Text style={{fontSize:14,color:'white'}}>Football</Text>
                                    <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                        <Text style={{fontSize:7,color:'white'}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fadadd',paddingHorizontal:10,width:90,paddingVertical:8,borderRadius:20,borderColor:'#E88B8C',borderWidth:1}}>
                                    <Text style={{fontSize:14,color:'#E88B8C'}}>Eat</Text>
                                    <TouchableOpacity activeOpacity={0.5} style={{marginLeft:10}}>
                                        <Text style={{fontSize:7,color:'#E88B8C'}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                    </View>

                </View>

                
                <TouchableOpacity activeOpacity={0.8} style={styles.absolute} onPress={this._addSelf}>
                    <Icon2
                        name="pluscircle"
                        color='#648CFF'
                        size={45}
                      />
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        bottom: 20,
        right: 30,
    }
})

