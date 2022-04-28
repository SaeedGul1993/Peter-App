import AsyncStorage from '@react-native-community/async-storage';
import {Avatar} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Toast from 'react-native-simple-toast';

export default class InviteFriendFromGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFirend: '',
      emails: [],
      access_token: '',
    };
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem('token');
    this.setState({
      access_token: access_token,
    });
  }

  _hitApiCallForInvataionSendOnGoogleMail = () => {
    let body = {
      emails: this.state.emails,
      challenge: (Math.random() * 2).toFixed(0),
    };
    console.log('body', body);
    if (this.state.emails?.length) {
      fetch(
        'http://54.189.183.64/challenge/api/v1/friend-invitation/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${this.state.access_token}`,
          },
          body: body,
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('invitation  response', responseJson);
          Toast.show('Invitation is send successfully');
          this.setState({emails: [], searchFirend: ''});
        })
        .catch(err => {
          console.log('err', err?.response);
        });
    } else {
      Toast.show('Please select at least one email');
    }
  };

  _pushUserInArray = () => {
    if (this.state.searchFirend?.length) {
      this.setState(prevState => {
        return {
          emails: [this.state.searchFirend, ...prevState.emails],
          searchFirend: '',
        };
      });
    } else {
      Toast.show('Please field is required!');
    }
  };
  render() {
    const {searchFirend} = this.state;
    console.log('emails', this.state.emails);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../commons/images/back.png')} />
            </TouchableOpacity>
            <Text style={{fontSize: 18, color: '#10275A', fontWeight: '900'}}>
              Invite Friends for Challenge
            </Text>
          </View>
          <View style={styles.row1}>
            <Text style={styles.row1Text}>Search Friends on Facebook</Text>
            <Image source={require('../../commons/images/google.png')} />
          </View>
          <View style={styles.row2}>
            <TextInput
              placeholder="search to email"
              style={{color: '#000000'}}
              value={searchFirend}
              onChangeText={text => this.setState({searchFirend: text})}
            />
            <TouchableOpacity
              onPress={() =>
                searchFirend?.length ? this._pushUserInArray() : () => {}
              }>
              <Image
                source={
                  searchFirend?.length
                    ? require('../../commons/images/msgDark.png')
                    : require('../../commons/images/msgLight.png')
                }
              />
            </TouchableOpacity>
          </View>
          {this.state.emails?.length ? (
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: 10,
                marginHorizontal: 20,
              }}>
              <Avatar.Group
                _avatar={{
                  size: 'xs',
                }}>
                {this.state.emails?.map(() => {
                  return (
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                      }}>
                      AJ
                    </Avatar>
                  );
                })}
              </Avatar.Group>
            </View>
          ) : null}
          <View style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              source={require('../../commons/images/inviteImage.png')}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              onPress={() => this._hitApiCallForInvataionSendOnGoogleMail()}
              style={styles.btn}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    borderRadius: 14,
    elevation: 2,
    backgroundColor: 'white',
    width: 39,
    height: 39,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  row1Text: {
    color: '#4E4F87',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 150,
  },
  btn: {
    height: 50,
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#648CFF',
  },
  btnText: {
    color: '#ffffff',
  },
  btnWrapper: {
    alignSelf: 'stretch',
  },
});
