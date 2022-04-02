import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage'

const App = (props) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  const goLogin = () => {
    const a = 'abcd'
    const b = AsyncStorage.setItem('slider',a)
    props.navigation.navigate('LoginScreen')
  }

  const RenderItem = ({item}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                <ImageBackground source={item.image} resizeMode='cover' style={{width:'100%',height:'100%'}} >
                    <View style={{flex:1,alignItems:'center',justifyContent:'flex-end',marginBottom:70}}>
                        <TouchableOpacity onPress={goLogin} style={{backgroundColor:'#ec1c24',width:300,height:60,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'white',fontSize:18}}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
  };



  return (
    <>
      {showRealApp ? (
        goLogin()
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          dotStyle={{backgroundColor:'grey',marginBottom:30}}
          activeDotStyle={{backgroundColor:'white',marginBottom:30}}
        />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    image: require('../../commons/images/car.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: require('../../commons/images/hotel.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: require('../../commons/images/flight.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: require('../../commons/images/cruise.png'),
    backgroundColor: '#3395ff',
  },
];