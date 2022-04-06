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
  Animated,
} from 'react-native';

import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Images from '../../constants/images';

export default class PomodoroMeter extends Component {
  state = {
    play: false,
    count: 0,
    timer: 62,
    modal: true,
    key: 0,

    // timer: 50
  };

  componentDidMount() {}

  back = () => {
    this.props.navigation.goBack();
  };

  _playchange = () => {
    this.setState({play: !this.state.play, count: this.state.count + 1});
  };

  _pausechange = () => {
    this.setState({play: !this.state.play});
  };

  stopTimer = () => {
    this.setState({
      play: !this.state.play,
    });
  };

  _resetTheTimer = () => {
    this.setState(prevstate => ({key: prevstate.key + 1, play: false}));
  };

  render() {
    const {play, count, timer} = this.state;
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
                Pomodoro Meter
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
            <View style={{alignItems: 'center', marginTop: 60}}>
              <CountdownCircleTimer
                key={this.state.key}
                trailColor={'#7197FE'}
                size={250}
                trailStrokeWidth={3}
                strokeWidth={3}
                isPlaying={play}
                duration={timer}
                onUpdate={e => {
                  console.log('onUpdate', e);
                }}
                colors={[
                  ['#d3d3d3', 0.4],
                  ['#d3d3d3', 0.4],
                  ['#d3d3d3', 0.2],
                ]}>
                {({remainingTime, animatedColor}) => {
                  const minutes = Math.floor(remainingTime / 60);
                  const seconds = remainingTime % 60;
                  return (
                    <View>
                      <Animated.Text
                        style={{
                          color: 'black',
                          width: 100,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>
                        {`${minutes}:${seconds}`}
                      </Animated.Text>
                      <Text
                        style={{fontSize: 14, color: '#10275A', marginTop: 10}}>
                        Gaming on laptop
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#10275A',
                          marginTop: 10,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        Count {count}
                      </Text>
                    </View>
                  );
                }}
              </CountdownCircleTimer>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 70,
                }}>
                <TouchableOpacity onPress={this._resetTheTimer}>
                  <Image
                    style={styles.play}
                    source={require('../../commons/images/Icon24.png')}
                  />
                </TouchableOpacity>

                {play == true ? (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._pausechange}>
                    <Image
                      style={styles.play}
                      source={require('../../commons/images/Icon.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._playchange}>
                    <Image
                      style={styles.play}
                      source={require('../../commons/images/Icon23.png')}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => this.stopTimer()}>
                  <Image
                    style={styles.play}
                    source={require('../../commons/images/Icon25.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
  play: {
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
});
