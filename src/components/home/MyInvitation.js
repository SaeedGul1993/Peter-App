import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Switch, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu'
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";

export default class MyInvitation extends Component {

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
        pending: true
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
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        console.log('str Time', strTime)
        this.setState({ time1: strTime, time2: strTime })
    }

    back = () => {
        // this.props.navigation.navigate('HomeScreen')
        this.props.navigation.goBack()
    }

    toggleSwitch = () => {
        this.setState({ reminder: !this.state.reminder })
    }

    toggleSwitch2 = () => {
        this.setState({ reminder2: !this.state.reminder2 })
    }

    showDatePicker = () => {
        this.setState({ DatePickerVisibility: true });
        this.showDate()
    };

    hideDatePicker = () => {
        this.setState({ DatePickerVisibility: false });
    };

    handleConfirm = (date, time) => {
        console.warn("A date has been picked: ", date);
        console.warn("A time has been picked: ", time);
        this.hideDatePicker();
    };

    _modalVisble = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    _modalVisble1 = () => {
        this.setState({ modalVisible1: !this.state.modalVisible1 })
    }

    _modalVisble2 = () => {
        this.setState({ modalVisible2: !this.state.modalVisible2 })
    }

    _modalVisble3 = () => {
        this.setState({ modalVisible3: !this.state.modalVisible3 })
    }

    _pending = (val) => {
        if (val == true) {
            this.setState({ pending: true })
        }
        else if (val == false) {
            this.setState({ pending: false })
        }
    }

    render() {
        const { reminder, date, time1, time2, time1hours, time1minutes, time2hours, time2minutes, DatePickerVisibility, modalVisible, modalVisible1, modalVisible2, modalVisible3, pending } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.back}>
                                <Image source={require('../../commons/images/back.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, color: '#10275A', fontWeight: 'bold' }}>My Invitations</Text>
                            <View style={{ width: 30 }} />
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#d3d3d3', marginVertical: 10 }} />

                        <ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false}>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ width: '70%', alignSelf: 'center', backgroundColor: '', marginVertical: 10, borderRadius: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 45 }}>
                                        {/* <TouchableOpacity activeOpacity={0.5} onPress={() => this._changeChallengeFriend(false)} */}
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => this._pending(true)}
                                            style={{ alignItems: 'center', justifyContent: 'center', width: '50%', height: pending ? 40 : null, backgroundColor: pending ? '#E7F1F8' : null, borderRadius: pending ? 10 : null, elevation: pending ? 0.5 : null }}>
                                            <Text style={{ fontSize: 17, color: pending ? '#648CFF' : '#10275A' }}>Pending</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => this._pending(false)}
                                            style={{ alignItems: 'center', justifyContent: 'center', width: '50%', height: pending ? null : 40, backgroundColor: pending ? null : '#E7F1F8', borderRadius: pending ? null : 10, elevation: pending ? null : 0.5 }}>
                                            <Text style={{ fontSize: 17, color: pending ? '#10275A' : '#648CFF' }}>Accepted</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity activeOpacity={0.5} onPress={this._modalVisble}
                                style={{ backgroundColor: '#E5E5E5', borderRadius: 10, marginVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 20 }}>
                                    <Text style={{ width: 3, height: 100, backgroundColor: '#648CFF' }}></Text>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 20 }}>
                                            <Text style={{ fontSize: 12, color: '#9AA8C7', marginLeft: 20 }}>Challenge Name</Text>
                                            <Text style={{ fontSize: 12, color: '#9AA8C7', marginLeft: 20 }}>1 August 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                            <Text style={{ fontSize: 15, color: '#10275A' }}>Self Challenge for my book completition</Text>
                                            <Image source={require('../../commons/images/backleft.png')} />
                                        </View>
                                        <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 10, color: '#10275A' }}>Invitation from</Text>
                                            <Image source={require('../../commons/images/facebook_icon.png')} style={{ height: 10, width: 10, marginLeft: 10 }} />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                            <Image source={require('../../commons/images/thumnail-image/1.png')} style={{ marginLeft: 15 }} />
                                            <Text style={{ fontSize: 16, color: '#10275A', marginLeft: 10 }}>Abdul Ahad</Text>
                                            <Text style={{ fontSize: 12, color: '#10275A', marginLeft: 10 }}>abdulahad@gmail.com</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>

                    <View style={{}}>
                        <Modal
                            isVisible={modalVisible}
                            // isVisible={true}
                            backdropOpacity={0.6}
                        >
                            <View style={{ marginHorizontal: 0, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                                <Text style={{ fontSize: 22, color: '#10275A', fontWeight: 'bold' }}>Invitation Accept</Text>
                                <View style={{ paddingHorizontal: 20, width: '100%', backgroundColor: '', marginVertical: 20 }}>
                                    <Text style={{ fontSize: 16, color: '#2E426E' }}>Self Challenge for my book completition</Text>
                                    <Text style={{ fontSize: 12, color: '#9AA8C7' }}>1 August 2021</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ fontSize: 16, color: '#10275A' }}>Challenge</Text>
                                        <Text style={{ fontSize: 14, color: '#9AA8C7' }}>Points</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ECEAFF', paddingHorizontal: 10, width: 90, paddingVertical: 8, borderRadius: 20, borderColor: '#7197FE', borderWidth: 1, marginRight: 10 }}>
                                            <Text style={{ fontSize: 14, color: '#7197FE' }}>10 days</Text>
                                            <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 7, color: '#7197FE' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#7197FE', paddingHorizontal: 10, width: 90, paddingVertical: 8, borderRadius: 20, marginRight: 10 }}>
                                            <Text style={{ fontSize: 14, color: 'white' }}>Football</Text>
                                            <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 7, color: 'white' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ECEAFF', paddingHorizontal: 10, width: 90, paddingVertical: 8, borderRadius: 20, borderColor: '#7197FE', borderWidth: 1 }}>
                                            <Text style={{ fontSize: 14, color: '#7197FE' }}>Eat</Text>
                                            <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 7, color: '#7197FE' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{ fontSize: 16, color: '#10275A' }}>5</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                                    <Image source={require('../../commons/images/thumnail-image/1.png')} />
                                    <Text style={{ fontSize: 16, color: '#10275A', marginLeft: 5 }}>Abdul Ahad</Text>
                                    <Text style={{ fontSize: 12, color: '#10275A', marginLeft: 5 }}>abdulahad@gmail.com</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 30 }}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={this._modalVisble}
                                        style={{ width: 90, height: 35, borderColor: '#7197FE', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 14, color: '#7197FE' }}>Decline</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={this._modalVisble}
                                        style={{ width: 90, height: 35, backgroundColor: '#7197FE', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 14, color: 'white' }}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}