import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      UserEmail: '',
      UserAge: '',
      UserAddress: '',
      UserPassword: '',
      userInfo: '',
      gettingLoginStatus: true,
    };
  }

  componentDidMount() {
    console.log('call');
    AsyncStorage.setItem('slider', JSON.stringify('abcd'));
    GoogleSignin.configure();
    this._isSignedIn();
    this.loginnn();
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // alert('User is already signed in');
      // Set User Info if user is already signed in
      this._getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    this.setState({gettingLoginStatus: false});
  };

  _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      this.setState({userInfo: info});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      console.log('User Info --> ', userInfo);
      console.log('user token', tokens.accessToken);
      console.log('ab', userInfo.user.name);
      const b = AsyncStorage.setItem(
        'login',
        JSON.stringify(userInfo.user.name),
      );
      this.props.navigation.navigate('Home');
      //   var raw = JSON.stringify({"access_token":tokens.accessToken.toString(),"code":"string"})
      //   fetch('http://54.189.183.64/rest-auth/google/', {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json'
      //       },
      //       // body: {
      //       //     // "access_token": data.accessToken.toString(),
      //       //     "code": "string"
      //       // }
      //       body: raw,
      //   })
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //       console.log('response',responseJson)
      //     //   const b = AsyncStorage.setItem('login',JSON.stringify(responseJson.user.first_name))
      //   })
      //   .catch((error) => {
      //       console.log('err',error)
      //   })
      this.setState({userInfo: userInfo});
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  _signOut = async () => {
    this.setState({gettingLoginStatus: true});
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      this.setState({userInfo: null});
    } catch (error) {
      console.error(error);
    }
    this.setState({gettingLoginStatus: false});
  };

  go = () => {
    this.props.navigation.navigate('Home');
  };

  loginnn = () => {
    console.log('yes');
    fetch('http://54.189.183.64/social-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: {
      //     // "access_token": data.accessToken.toString(),
      //     "code": "string"
      // }
      body: JSON.stringify({
        facebook_access_token:
          'EAAICRiMthbQBAD0hYzTWEdgcQEH7SlXS8INZBCr6131OA4ba0igiFZAWsYL8QnkPyVsNAyUgv6ycthw43FgzzQqIKBKyumOHbPU0PA5B8ZAJ92XGgNsVzy3gT9p0FrAVEydzfNZAz1yICh8ZBRIVTMDgyEJDBhe633poBsMbczhMRHGHusxlTrV2xuHZBgeBXx0cRO8HFempx3N17JphQk1qvqfxXZCCsZBndnyWd7m3D6fM0x52oxhx1K49ZCcBsyaQZD',
        facebook_response: {},
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          'response',
          responseJson.user.first_name + ' ' + responseJson.user.last_name,
        );
        const b = AsyncStorage.setItem(
          'login',
          JSON.stringify(
            responseJson.user.first_name + ' ' + responseJson.user.last_name,
          ),
        );
      })
      .catch(error => {
        console.log('err', error);
      });
  };

  _gofacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('Access Token :: ' + data.accessToken.toString());

            var raw = JSON.stringify({
              access_token: data.accessToken.toString(),
              code: 'string',
            });
            fetch('http://54.189.183.64/rest-auth/facebook/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // body: {
              //     // "access_token": data.accessToken.toString(),
              //     "code": "string"
              // }
              body: raw,
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log(
                  'response',
                  responseJson.user.first_name +
                    ' ' +
                    responseJson.user.last_name,
                );
                const b = AsyncStorage.setItem(
                  'login',
                  JSON.stringify(
                    responseJson.user.first_name +
                      ' ' +
                      responseJson.user.last_name,
                  ),
                );
              })
              .catch(error => {
                console.log('err', error);
              });
            // var raw = JSON.stringify({"access_token": data.accessToken.toString(),"code":"string"});
            // var requestOptions = {
            // method: 'POST',
            // // headers: myHeaders,
            // body: raw,
            // redirect: 'follow'
            // };
            // fetch("http://54.189.183.64/rest-auth/facebook/", requestOptions)
            // .then(response => response.json())
            // .then(result => console.log('result',result))
            // .catch(error => console.log('error', error));
          });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
      this.go(),
    );
    //this.props.navigation.navigate('LoginWithFacebook')
  };

  _gogoogle = () => {
    // this.props.navigation.navigate('LoginWithGoogle')
    this._signIn();
  };

  Login = () => {
    // alert('login')
    const {UserEmail, UserPassword} = this.state;
    if (UserEmail !== '' || UserPassword !== '') {
      if (UserEmail !== '') {
        if (UserPassword !== '') {
          let obj = {
            email: UserEmail,
            password: UserPassword,
          };
          console.log(obj);
          const b = AsyncStorage.setItem('login', JSON.stringify(obj));
          this.props.navigation.navigate('Home');
          // Axios.post(baseUrl+'login', obj)
          // .then((obj) => {
          //   console.log('obj',obj)
          //   if (obj.status == 200) {
          //     console.log('token',obj.data.token)
          //     console.log('role',obj.data.role.id)
          //     // async await nh lagaya
          //     // console.log('token',JSON.stringify(obj.data.token))
          //     const b = AsyncStorage.setItem('token',obj.data.token)
          //     const c = AsyncStorage.setItem('role',JSON.stringify(obj.data.role.id))
          //     this.props.navigation.navigate('DashBoard')
          //     console.log('b')
          //   }
          //   else {
          //     console.log('else',obj.data)
          //   }
          // })
          // .catch((err) => {
          //   console.log('error',err.response)
          //   console.log('err2',err)
          //   alert(err.response.data.message)
          //   alert(err.response.data.errors.email)
          // })
        } else {
          alert('Please Enter Password');
        }
      } else {
        alert('Please Enter Email');
      }
    } else {
      alert('Please Enter Email & Password');
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{marginTop: 20}}>
              <KeyboardAvoidingView enabled>
                <Image
                  source={require('../../commons/images/3icons/app-logo.jpeg')}
                  style={{alignSelf: 'center'}}
                  resizeMode="center"
                />

                {/* <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:24,fontWeight:'bold'}}>Login</Text>
                    </View> */}

                <View style={{marginTop: 50, marginLeft: 20}}>
                  <Text style={{top: 15, fontWeight: 'bold'}}>Email</Text>
                </View>
                <View style={styles.SectionStyle}>
                  {/* <Icon
                        name="envelope"
                        type="font-awesome"
                        size={15}
                        iconStyle={{ padding: 10 }}
                        color="#413E4F"
                        /> */}

                  <TextInput
                    style={{flex: 1, color: '#939393'}}
                    onChangeText={UserEmail => this.setState({UserEmail})}
                    // underlineColorAndroid="#413E4F"
                    placeholder="Username"
                    placeholderTextColor="#939393"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    ref={ref => {
                      this._emailinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      this._passwordinput && this._passwordinput.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <View style={{marginLeft: 20}}>
                  <Text style={{top: 15, fontWeight: 'bold'}}>Password</Text>
                </View>
                <View style={styles.SectionStyle}>
                  {/* <Icon
                        name="place"
                        type="material-icons"
                        size={15}
                        iconStyle={{ padding: 10 }}
                        color="#413E4F"
                        /> */}

                  <TextInput
                    style={{flex: 1, color: '#939393'}}
                    onChangeText={UserPassword => this.setState({UserPassword})}
                    // underlineColorAndroid="#413E4F"
                    placeholder="Password"
                    placeholderTextColor="#939393"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    ref={ref => {
                      this._passwordinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                </View>
                {/* <Text style={{fontSize:16,textAlign:'right',marginRight:25}}>Forgot password?</Text> */}
                <TouchableOpacity
                  style={[styles.ButtonStyle, {marginTop: 30}]}
                  activeOpacity={0.5}
                  onPress={this.Login}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      // color: 'black',
                      // fontWeight: 'bold',
                      // paddingVertical: 10,
                      fontSize: 18,
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 25,
                    marginTop: 80,
                  }}>
                  <Text style={{fontSize: 16, color: '#939393'}}>
                    Don't have an account?
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.ButtonStyle,
                    {
                      backgroundColor: 'white',
                      elevation: 5,
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 40,
                    },
                  ]}
                  activeOpacity={0.5}
                  onPress={this._gogoogle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      Sign in with
                    </Text>
                    <Image
                      source={require('../../commons/images/google.png')}
                      style={{marginLeft: 10}}
                      resizeMode="contain"
                    />
                  </View>
                  {/* <Image source={require('../../commons/images/group6.png')} /> */}
                  <View
                    style={{
                      backgroundColor: '#618AFF',
                      height: 30,
                      width: 55,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icons name="ios-arrow-forward" size={25} color="white" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.ButtonStyle,
                    {
                      backgroundColor: 'white',
                      elevation: 5,
                      marginTop: 10,
                      marginBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 40,
                    },
                  ]}
                  activeOpacity={0.5}
                  onPress={this._gofacebook}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      Sign in with
                    </Text>
                    <Image
                      source={require('../../commons/images/facebook.png')}
                      style={{marginLeft: 10}}
                      resizeMode="contain"
                    />
                  </View>
                  {/* <Image source={require('../../commons/images/group6.png')} /> */}
                  <View
                    style={{
                      backgroundColor: '#618AFF',
                      height: 30,
                      width: 55,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icons name="ios-arrow-forward" size={25} color="white" />
                  </View>
                </TouchableOpacity>

                {/* <View style={[{backgroundColor:'white'},styles.button]}>
                        <Icons name='arrow-forward-circle' size={35} color='#ec1c24' style={{ marginRight: 0 }} />
                    </View> */}
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
          <View style={[{backgroundColor: 'white'}, styles.button]}>
            {/* <Icons name='arrow-forward-circle' size={35} color='#ec1c24' style={{ marginRight: 0 }} /> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    //   margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
  },

  ButtonStyle: {
    // backgroundColor: 'white',
    backgroundColor: '#618AFF',
    borderWidth: 0,
    color: '#FFFFFF',
    // borderColor: '#51D8C7',
    height: 50,
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    //   marginTop: 30,
    justifyContent: 'center',
    elevation: 5,
  },
  button: {
    // width: '100%',
    height: 50,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
