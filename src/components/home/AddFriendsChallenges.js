// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Keyboard,
//   ScrollView,
//   KeyboardAvoidingView,
//   Switch,
//   StyleSheet,
//   Picker,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/Entypo';
// import Icon2 from 'react-native-vector-icons/AntDesign';
// import Icon3 from 'react-native-vector-icons/MaterialIcons';
// import CustomMaterialMenu from '../../commons/custom/CustomMaterialMenu';
// import DatePicker from 'react-native-datepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Modal from 'react-native-modal';

// export default class AddFriendsChallenges extends Component {
//   state = {
//     title: '',
//     description: '',
//     newtag: '',
//     reminder: false,
//     date: '',
//     time1: '',
//     time2: '',
//     time1hours: 0,
//     time1minutes: 0,
//     time2hours: '',
//     time2minutes: '',
//     DatePickerVisibility: false,
//     modalVisible: false,
//     modalVisible1: false,
//     modalVisible2: false,
//     modalVisible3: false,
//     selectedCategory: '',
//     category: [
//       {
//         itemName: 'Select Category',
//       },
//       {
//         itemName: 'Football',
//       },
//       {
//         itemName: 'Fitness Exercise',
//       },
//       {
//         itemName: 'Health',
//       },
//       {
//         itemName: 'Education study',
//       },
//     ],
//     selectedType: '',
//     type: [
//       {
//         itemName: 'Select Type',
//       },
//       {
//         itemName: 'Cycling',
//       },
//       {
//         itemName: 'Weight Lifting',
//       },
//       {
//         itemName: 'Eating Food',
//       },
//       {
//         itemName: 'Meditation',
//       },
//     ],
//     timeline10days: false,
//     timeline5days: false,
//     timeline20days: false,
//     timeline25days: false,
//   };

//   componentDidMount() {
//     this.showDate();
//   }

//   ChangeCategory(value) {
//     this.setState({selectedCategory: value});
//   }

//   ChangeType(value) {
//     this.setState({selectedType: value});
//   }

//   showDate = () => {
//     let hours = new Date().getHours();
//     let minutes = new Date().getMinutes();
//     let ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     // console.log('hours means k 17%12=5',hours)
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     const strTime = hours + ':' + minutes + ' ' + ampm;
//     console.log('str Time', strTime);
//     this.setState({time1: strTime, time2: strTime});
//   };

//   back = () => {
//     // this.props.navigation.navigate('HomeScreen')
//     this.props.navigation.goBack();
//   };

//   showDatePicker = () => {
//     this.setState({DatePickerVisibility: true});
//     this.showDate();
//   };

//   hideDatePicker = () => {
//     this.setState({DatePickerVisibility: false});
//   };

//   handleConfirm = (date, time) => {
//     console.warn('A date has been picked: ', date);
//     console.warn('A time has been picked: ', time);
//     this.hideDatePicker();
//   };

//   _modalVisble = () => {
//     this.setState({modalVisible: !this.state.modalVisible});
//   };

//   _modalVisble1 = () => {
//     this.setState({modalVisible1: !this.state.modalVisible1});
//   };

//   _modalVisble2 = () => {
//     this.setState({modalVisible2: !this.state.modalVisible2});
//   };

//   _modalVisble3 = () => {
//     this.setState({modalVisible3: true});
//     setTimeout(() => {
//       this.setState({modalVisible3: false});
//       this.props.navigation.navigate('DetailFriend');
//     }, 1000);
//   };

//   _selectCategories = () => {
//     this.props.navigation.navigate('Category');
//   };

//   _selectTypes = () => {
//     this.props.navigation.navigate('Type');
//   };

//   _selectTimeline = val => {
//     console.log('color value', val);
//     if (val == '10days') {
//       this.setState({
//         timeline10days: true,
//         timeline5days: false,
//         timeline20days: false,
//         timeline25days: false,
//       });
//     }
//     if (val == '5days') {
//       this.setState({
//         timeline5days: true,
//         timeline10days: false,
//         timeline20days: false,
//         timeline25days: false,
//       });
//     }
//     if (val == '20days') {
//       this.setState({
//         timeline20days: true,
//         timeline10days: false,
//         timeline25days: false,
//         timeline5days: false,
//       });
//     }
//     if (val == '25days') {
//       this.setState({
//         timeline25days: true,
//         timeline20days: false,
//         timeline5days: false,
//         timeline10days: false,
//       });
//     }
//   };

//   _goGoogleFacebook = () => {
//     this.props.navigation.navigate('InviteFriendGgFb');
//   };

//   render() {
//     const {
//       reminder,
//       date,
//       time1,
//       time2,
//       time1hours,
//       time1minutes,
//       time2hours,
//       time2minutes,
//       DatePickerVisibility,
//       modalVisible,
//       modalVisible1,
//       modalVisible2,
//       modalVisible3,
//       selectedCategory,
//       category,
//       selectedType,
//       type,
//       timeline10days,
//       timeline20days,
//       timeline25days,
//       timeline5days,
//     } = this.state;
//     return (
//       <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//         <View style={{marginHorizontal: 20, marginVertical: 20}}>
//           <View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity activeOpacity={0.5} onPress={this.back}>
//                 <Image source={require('../../commons/images/back.png')} />
//               </TouchableOpacity>
//               <Text style={{fontSize: 18, color: '#10275A'}}>
//                 Add Challenge with Friend
//               </Text>
//               <View style={{width: 30}} />
//             </View>

//             <View
//               style={{
//                 width: '100%',
//                 height: 1,
//                 backgroundColor: '#d3d3d3',
//                 marginVertical: 10,
//               }}
//             />

//             <ScrollView>
//               <View>
//                 <Text style={{fontSize: 14, color: '#8A8BB3'}}>Title</Text>
//                 <TextInput
//                   placeholder="Challenge to cover 10km walk with friends"
//                   style={{color: '#10275A', fontSize: 16}}
//                   onChangeText={title => this.setState({title})}
//                   placeholderTextColor="#10275A"
//                   autoCapitalize="sentences"
//                   ref={ref => {
//                     this._titleinput = ref;
//                   }}
//                   returnKeyType="next"
//                   onSubmitEditing={Keyboard.dismiss}
//                   blurOnSubmit={false}
//                 />

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}>
//                   <View style={{width: '45%', alignItems: 'flex-start'}}>
//                     <Text style={{fontSize: 14, color: '#8A8BB3'}}>Date</Text>
//                     {/* <Text style={{fontSize:16,color:'#10275A',marginBottom:5}}>4 August 2021</Text> */}
//                     <DatePicker
//                       style={styles.datePickerStyle}
//                       date={date}
//                       mode="date"
//                       placeholder={date}
//                       format="DD-MM-YYYY"
//                       // minDate="01-01-2016"
//                       // maxDate="01-01-2019"
//                       confirmBtnText="Confirm"
//                       cancelBtnText="Cancel"
//                       customStyles={{
//                         dateIcon: {
//                           display: 'none',
//                           // position: 'absolute',
//                           // left: 0,
//                           // top: 4,
//                           // marginLeft: 0,
//                         },
//                         dateInput: {
//                           // marginLeft: 36,
//                           borderWidth: 0,
//                           marginLeft: -50,
//                         },
//                         dateText: {
//                           fontSize: 16,
//                           color: '#10275A',
//                         },
//                       }}
//                       onDateChange={date => {
//                         this.setState({date});
//                       }}
//                     />
//                   </View>

//                   <View style={{width: '45%', alignItems: 'flex-start'}}>
//                     <Text style={{fontSize: 14, color: '#8A8BB3'}}>Time</Text>
//                     <View style={{alignItems: 'center'}}>
//                       {/* <Text style={{fontSize:16,color:'#10275A',marginBottom:5}}>4 August 2021</Text> */}
//                       <DateTimePickerModal
//                         isVisible={DatePickerVisibility}
//                         // mode="date"
//                         mode="time"
//                         onConfirm={this.handleConfirm}
//                         onCancel={this.hideDatePicker}
//                         style={styles.datePickerStyle}
//                         // date={time1}
//                         placeholder={time1}
//                         // format=""
//                         format="hh:mm"
//                         confirmBtnText="Confirm"
//                         cancelBtnText="Cancel"
//                         customStyles={{
//                           dateIcon: {
//                             display: 'none',
//                           },
//                           dateInput: {
//                             // marginLeft: 36,
//                             borderWidth: 0,
//                             marginLeft: -50,
//                           },
//                           dateText: {
//                             fontSize: 16,
//                             color: '#10275A',
//                           },
//                         }}
//                         onDateChange={time => {
//                           console.log('time', time);
//                           this.setState({time1: time});
//                         }}
//                       />
//                       <TouchableOpacity
//                         style={{width: '100%', alignItems: 'center'}}
//                         onPress={this.showDatePicker}>
//                         <Text
//                           style={{
//                             fontSize: 16,
//                             color: '#10275A',
//                             marginBottom: 5,
//                           }}>
//                           {time1}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{fontSize: 20, color: '#10275A'}}>
//                       Timeline
//                     </Text>
//                     {/* <Icon name='dots-vertical' size={25} color='#2C406E' /> */}
//                     <CustomMaterialMenu
//                       menustyle={
//                         {
//                           //   margin: 10,
//                           //   flexDirection: 'row',
//                           //   justifyContent: 'flex-end',
//                         }
//                       }
//                       // menustyle={{marginRight: 16}}
//                       navigation={this.props.navigation}
//                       route={this.props.route}
//                       isIcon={true}
//                       iconName="dots-vertical"
//                       color="#2C406E"
//                     />
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       marginVertical: 10,
//                     }}>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={() => this._selectTimeline('10days')}
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         backgroundColor: timeline10days ? '#7197FE' : 'white',
//                         paddingHorizontal: 10,
//                         paddingVertical: 8,
//                         borderRadius: 20,
//                         borderColor: '#7197FE',
//                         borderWidth: timeline10days ? 0 : 1,
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: timeline10days ? 'white' : '#7197FE',
//                         }}>
//                         10 days
//                       </Text>
//                       <TouchableOpacity
//                         activeOpacity={0.5}
//                         style={{marginLeft: 10}}>
//                         <Text
//                           style={{
//                             fontSize: 7,
//                             color: timeline10days ? 'white' : '#7197FE',
//                           }}>
//                           X
//                         </Text>
//                       </TouchableOpacity>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={() => this._selectTimeline('5days')}
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         backgroundColor: timeline5days ? '#BE82FF' : 'white',
//                         paddingHorizontal: 10,
//                         paddingVertical: 8,
//                         borderRadius: 20,
//                         borderColor: '#BE82FF',
//                         borderWidth: timeline5days ? 0 : 1,
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: timeline5days ? 'white' : '#BE82FF',
//                         }}>
//                         5 days
//                       </Text>
//                       <TouchableOpacity
//                         activeOpacity={0.5}
//                         style={{marginLeft: 10}}>
//                         <Text
//                           style={{
//                             fontSize: 7,
//                             color: timeline5days ? 'white' : '#BE82FF',
//                           }}>
//                           X
//                         </Text>
//                       </TouchableOpacity>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={() => this._selectTimeline('20days')}
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         backgroundColor: timeline20days ? '#F57C96' : 'white',
//                         paddingHorizontal: 10,
//                         paddingVertical: 8,
//                         borderRadius: 20,
//                         borderColor: '#F57C96',
//                         borderWidth: timeline20days ? 0 : 1,
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: timeline20days ? 'white' : '#F57C96',
//                         }}>
//                         20 days
//                       </Text>
//                       <TouchableOpacity
//                         activeOpacity={0.5}
//                         style={{marginLeft: 10}}>
//                         <Text
//                           style={{
//                             fontSize: 7,
//                             color: timeline20days ? 'white' : '#C74F68',
//                           }}>
//                           X
//                         </Text>
//                       </TouchableOpacity>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={() => this._selectTimeline('25days')}
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         backgroundColor: timeline25days ? '#1EC1C3' : 'white',
//                         paddingHorizontal: 10,
//                         paddingVertical: 8,
//                         borderRadius: 20,
//                         borderColor: '#1EC1C3',
//                         borderWidth: timeline25days ? 0 : 1,
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: timeline25days ? 'white' : '#1EC1C3',
//                         }}>
//                         25 days
//                       </Text>
//                       <TouchableOpacity
//                         activeOpacity={0.5}
//                         style={{marginLeft: 10}}>
//                         <Text
//                           style={{
//                             fontSize: 7,
//                             color: timeline25days ? 'white' : '#459192',
//                           }}>
//                           X
//                         </Text>
//                       </TouchableOpacity>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{}}>
//                     <Modal
//                       isVisible={modalVisible}
//                       // isVisible={true}
//                       backdropOpacity={0.6}>
//                       <View
//                         style={{
//                           marginHorizontal: 20,
//                           paddingVertical: 20,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           backgroundColor: 'white',
//                           borderRadius: 15,
//                         }}>
//                         <Text style={{fontSize: 22, color: '#10275A'}}>
//                           New Timeline
//                         </Text>
//                         <View
//                           style={{
//                             paddingHorizontal: 20,
//                             width: '80%',
//                             backgroundColor: '#F6F6F6',
//                             borderRadius: 5,
//                             marginVertical: 10,
//                           }}>
//                           <TextInput
//                             placeholder="New Timeline"
//                             style={{color: '#10275A', fontSize: 16}}
//                             onChangeText={newtag => this.setState({newtag})}
//                             placeholderTextColor="#10275A"
//                             autoCapitalize="sentences"
//                             ref={ref => {
//                               this._newtaginput = ref;
//                             }}
//                             returnKeyType="next"
//                             onSubmitEditing={Keyboard.dismiss}
//                             blurOnSubmit={false}
//                           />
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-around',
//                             marginVertical: 10,
//                           }}>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               borderColor: '#7197FE',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderWidth: 1,
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: '#7197FE'}}>
//                               Cancel
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               backgroundColor: '#7197FE',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: 'white'}}>
//                               Save
//                             </Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </Modal>
//                   </View>
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     style={{marginVertical: 10}}
//                     onPress={this._modalVisble}>
//                     <Text style={{fontSize: 12, color: '#7197FE'}}>
//                       + Add new
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{fontSize: 20, color: '#10275A'}}>
//                       Categories
//                     </Text>
//                     {/* <Icon name='dots-vertical' size={25} color='#2C406E' /> */}
//                     <CustomMaterialMenu
//                       menustyle={
//                         {
//                           //   margin: 10,
//                           //   flexDirection: 'row',
//                           //   justifyContent: 'flex-end',
//                         }
//                       }
//                       // menustyle={{marginRight: 16}}
//                       navigation={this.props.navigation}
//                       route={this.props.route}
//                       isIcon={true}
//                       iconName="dots-vertical"
//                       color="#2C406E"
//                     />
//                   </View>
//                   <View style={{}}>
//                     <Modal
//                       isVisible={modalVisible1}
//                       // isVisible={true}
//                       backdropOpacity={0.6}>
//                       <View
//                         style={{
//                           marginHorizontal: 20,
//                           paddingVertical: 20,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           backgroundColor: '#5E87FF',
//                           borderRadius: 15,
//                         }}>
//                         <View
//                           style={{
//                             borderColor: 'white',
//                             borderWidth: 1,
//                             borderRadius: 15,
//                             marginVertical: 20,
//                             width: '90%',
//                             height: 50,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             paddingHorizontal: 15,
//                           }}>
//                           {/* <TouchableOpacity activeOpacity={0.5}
//                                                 style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'80%'}}>
//                                                 <Text style={{fontSize:15,color:'white'}}>Select Category</Text>
//                                                 <Icon3 name='keyboard-arrow-down' color='white' size={35} />
//                                             </TouchableOpacity> */}
//                           <Picker
//                             itemStyle={styles.itemStyle}
//                             mode="dropdown"
//                             style={styles.pickerStyle}
//                             selectedValue={selectedCategory}
//                             onValueChange={() => this.ChangeCategory}>
//                             {category.map((item, index) => (
//                               <Picker.Item
//                                 // color="#0087F0"
//                                 color="#10275A"
//                                 label={item.itemName}
//                                 value={item.itemName}
//                                 index={index}
//                               />
//                             ))}
//                           </Picker>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             style={{
//                               height: 30,
//                               width: 30,
//                               borderRadius: 5,
//                               borderColor: 'white',
//                               borderWidth: 1,
//                             }}>
//                             <Icon1 name="plus" color="white" size={25} />
//                           </TouchableOpacity>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-around',
//                             marginVertical: 10,
//                           }}>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble1}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               backgroundColor: 'white',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: '#5E87FF'}}>
//                               Cancel
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble1}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               backgroundColor: 'white',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: '#5E87FF'}}>
//                               Save
//                             </Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </Modal>
//                   </View>
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     style={{marginVertical: 10}}
//                     onPress={this._selectCategories}>
//                     <Text style={{fontSize: 12, color: '#7197FE'}}>
//                       + Add new
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{fontSize: 20, color: '#10275A'}}>Type</Text>
//                     {/* <Icon name='dots-vertical' size={25} color='#2C406E' /> */}
//                     <CustomMaterialMenu
//                       menustyle={
//                         {
//                           //   margin: 10,
//                           //   flexDirection: 'row',
//                           //   justifyContent: 'flex-end',
//                         }
//                       }
//                       // menustyle={{marginRight: 16}}
//                       navigation={this.props.navigation}
//                       route={this.props.route}
//                       isIcon={true}
//                       iconName="dots-vertical"
//                       color="#2C406E"
//                     />
//                   </View>
//                   <View style={{}}>
//                     <Modal
//                       isVisible={modalVisible2}
//                       // isVisible={true}
//                       backdropOpacity={0.6}>
//                       <View
//                         style={{
//                           marginHorizontal: 20,
//                           paddingVertical: 20,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           backgroundColor: '#5E87FF',
//                           borderRadius: 15,
//                         }}>
//                         <View
//                           style={{
//                             borderColor: 'white',
//                             borderWidth: 1,
//                             borderRadius: 15,
//                             marginVertical: 20,
//                             width: '90%',
//                             height: 50,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             paddingHorizontal: 15,
//                           }}>
//                           <Picker
//                             itemStyle={styles.itemStyle}
//                             mode="dropdown"
//                             style={styles.pickerStyle}
//                             selectedValue={selectedType}
//                             onValueChange={() => this.ChangeType}>
//                             {type.map((item, index) => (
//                               <Picker.Item
//                                 // color="#0087F0"
//                                 color="#10275A"
//                                 label={item.itemName}
//                                 value={item.itemName}
//                                 index={index}
//                               />
//                             ))}
//                           </Picker>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             style={{
//                               height: 30,
//                               width: 30,
//                               borderRadius: 5,
//                               borderColor: 'white',
//                               borderWidth: 1,
//                             }}>
//                             <Icon1 name="plus" color="white" size={25} />
//                           </TouchableOpacity>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-around',
//                             marginVertical: 10,
//                           }}>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble2}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               backgroundColor: 'white',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: '#5E87FF'}}>
//                               Cancel
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             onPress={this._modalVisble2}
//                             style={{
//                               width: 90,
//                               height: 35,
//                               backgroundColor: 'white',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderRadius: 5,
//                               marginHorizontal: 10,
//                             }}>
//                             <Text style={{fontSize: 14, color: '#5E87FF'}}>
//                               Save
//                             </Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </Modal>
//                   </View>
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     style={{marginVertical: 10}}
//                     onPress={this._selectTypes}>
//                     <Text style={{fontSize: 12, color: '#7197FE'}}>
//                       + Add new
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View>
//                   <Text style={{fontSize: 20, color: '#10275A'}}>
//                     Invite Friends via
//                   </Text>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-around',
//                       marginVertical: 10,
//                     }}>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={this._goGoogleFacebook}>
//                       <Image
//                         source={require('../../commons/images/google.png')}
//                       />
//                     </TouchableOpacity>
//                     <Text style={{fontSize: 14, color: '#8A8BB3'}}>or</Text>
//                     <TouchableOpacity
//                       activeOpacity={0.5}
//                       onPress={this._goGoogleFacebook}>
//                       <Image
//                         source={require('../../commons/images/facebook-6.png')}
//                         resizeMode="center"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     width: '100%',
//                     height: 1,
//                     backgroundColor: '#d3d3d3',
//                     marginVertical: 10,
//                   }}
//                 />

//                 <View style={{}}>
//                   <Modal
//                     isVisible={modalVisible3}
//                     // isVisible={true}
//                     backdropOpacity={0.6}>
//                     <View
//                       style={{
//                         marginHorizontal: 20,
//                         paddingVertical: 20,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'white',
//                         borderRadius: 15,
//                       }}>
//                       <View
//                         style={{
//                           marginVertical: 35,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                         }}>
//                         <Image
//                           source={require('../../commons/images/tick1.png')}
//                         />
//                         <Text
//                           style={{
//                             fontSize: 18,
//                             color: '#10275A',
//                             marginVertical: 20,
//                           }}>
//                           Successfully create Self Challenge
//                         </Text>
//                       </View>
//                     </View>
//                   </Modal>
//                 </View>

//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   onPress={this._modalVisble3}
//                   style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                     height: 55,
//                     backgroundColor: '#648CFF',
//                     marginTop: 20,
//                   }}>
//                   <Text style={{fontSize: 18, color: 'white'}}>Create</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   datePickerStyle: {
//     // width: 200,
//     // marginTop: 20,
//   },
//   itemStyle: {
//     fontSize: 10,
//     fontFamily: 'Roboto-Regular',
//     color: '#007aff',
//     color: 'white',
//   },
//   pickerStyle: {
//     width: '80%',
//     // height: 40,
//     color: '#007aff',
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular',
//     color: 'white',
//   },
// });

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
        itemName: 'Select Category',
      },
      {
        itemName: 'Football',
      },
      {
        itemName: 'Fitness Exercise',
      },
      {
        itemName: 'Health',
      },
      {
        itemName: 'Education study',
      },
    ],
    selectedType: '',
    type: [
      {
        itemName: 'Select Type',
      },
      {
        itemName: 'Cycling',
      },
      {
        itemName: 'Weight Lifting',
      },
      {
        itemName: 'Eating Food',
      },
      {
        itemName: 'Meditation',
      },
    ],
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
              Add Challenge with Friend
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
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderRadius: 22,
                            marginRight: 5,
                            borderColor: '#7197FE',
                            borderWidth: 1,
                          }}>
                          <Text style={{fontSize: 14, color: '#7197FE'}}>
                            {item?.title}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{marginLeft: 10}}>
                            <Text style={{fontSize: 12, color: '#7197FE'}}>
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
                      // isVisible={true}
                      backdropOpacity={0.6}>
                      <View
                        style={{
                          marginHorizontal: 20,
                          paddingVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#5E87FF',
                          borderRadius: 15,
                        }}>
                        <View
                          style={{
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 15,
                            marginVertical: 20,
                            width: '90%',
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                          }}>
                          <Picker
                            itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={styles.pickerStyle}
                            selectedValue={selectedCategory}
                            onValueChange={() => this.ChangeCategory}>
                            {category.map((item, index) => (
                              <Picker.Item
                                color="#10275A"
                                label={item.itemName}
                                value={item.itemName}
                                index={index}
                              />
                            ))}
                          </Picker>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                              height: 30,
                              width: 30,
                              borderRadius: 5,
                              borderColor: 'white',
                              borderWidth: 1,
                            }}>
                            <Icon1 name="plus" color="white" size={25} />
                          </TouchableOpacity>
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
                            onPress={this._modalVisble1}
                            style={{
                              width: 90,
                              height: 35,
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 5,
                              marginHorizontal: 10,
                            }}>
                            <Text style={{fontSize: 14, color: '#5E87FF'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this._modalVisble1}
                            style={{
                              width: 90,
                              height: 35,
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 5,
                              marginHorizontal: 10,
                            }}>
                            <Text style={{fontSize: 14, color: '#5E87FF'}}>
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
                    <Modal isVisible={modalVisible2} backdropOpacity={0.6}>
                      <View
                        style={{
                          marginHorizontal: 20,
                          paddingVertical: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#5E87FF',
                          borderRadius: 15,
                        }}>
                        <View
                          style={{
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 15,
                            marginVertical: 20,
                            width: '90%',
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                          }}>
                          <Picker
                            itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={styles.pickerStyle}
                            selectedValue={selectedType}
                            onValueChange={() => this.ChangeType}>
                            {type.map((item, index) => (
                              <Picker.Item
                                color="#10275A"
                                label={item.itemName}
                                value={item.itemName}
                                index={index}
                              />
                            ))}
                          </Picker>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                              height: 30,
                              width: 30,
                              borderRadius: 5,
                              borderColor: 'white',
                              borderWidth: 1,
                            }}>
                            <Icon1 name="plus" color="white" size={25} />
                          </TouchableOpacity>
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
                            onPress={this._modalVisble2}
                            style={{
                              width: 90,
                              height: 35,
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 5,
                              marginHorizontal: 10,
                            }}>
                            <Text style={{fontSize: 14, color: '#5E87FF'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this._modalVisble2}
                            style={{
                              width: 90,
                              height: 35,
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 5,
                              marginHorizontal: 10,
                            }}>
                            <Text style={{fontSize: 14, color: '#5E87FF'}}>
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
                <View style={{marginTop: 40, paddingHorizontal: 20}}>
                  <Text style={{fontSize: 20, color: '#10275A'}}>
                    Invite Friends via
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={this._goGoogleFacebook}>
                      <Image
                        source={require('../../commons/images/google.png')}
                      />
                    </TouchableOpacity>
                    <Text style={{fontSize: 14, color: '#8A8BB3'}}>or</Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={this._goGoogleFacebook}>
                      <Image
                        source={require('../../commons/images/facebook-6.png')}
                        resizeMode="center"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#d3d3d3',
                      marginVertical: 10,
                    }}
                  />
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
