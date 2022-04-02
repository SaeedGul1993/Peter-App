import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {getLogin, getOneTimeSlider} from '../../commons/Constant';

export default class SplashScreen extends Component {
  state = {splash: true};

  componentDidMount() {
    getLogin()
      .then(obj => {
        console.log('login obj', obj);
        if (obj.login !== null) {
          setTimeout(() => {
            this.props.navigation.navigate('Home');
          }, 1000);
        }
      })
      .catch(err => {
        console.log('err1', err);
        getOneTimeSlider()
          .then(obj => {
            console.log('slider obj', obj);
            if (obj.slider !== null) {
              setTimeout(() => {
                // this.setState({ splash: false })
                this.props.navigation.navigate('LoginScreen');
              }, 1000);
            }
            // else {
            //     this.props.navigation.navigate('SliderScreen')
            // }
          })
          .catch(err => {
            console.log('err', err);
            setTimeout(() => {
              // this.setState({ splash: false })
              this.props.navigation.navigate('SliderScreen1');
            }, 1000);
          });
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../commons/images/3icons/app-logo.jpeg')}
            resizeMode="center"
          />
        </View>
      </SafeAreaView>
    );
  }
}
