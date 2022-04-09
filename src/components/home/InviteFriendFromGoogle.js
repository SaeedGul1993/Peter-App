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

export default class InviteFriendFromGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFirend: '',
    };
  }
  render() {
    const {searchFirend} = this.state;

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
              placeholder="Name or Profile name"
              value={searchFirend}
              onChangeText={text => this.setState({searchFirend: text})}
            />
            <Image
              source={
                searchFirend?.length
                  ? require('../../commons/images/msgDark.png')
                  : require('../../commons/images/msgLight.png')
              }
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              source={require('../../commons/images/inviteImage.png')}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btn}>
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
