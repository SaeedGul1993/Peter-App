import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
export default class CustomNotificationModal extends Component {
  render() {
    return (
      <Modal
        style={{marginHorizontal: 0,marginVertical:0}}
        visible={this.props.open}
        backdropOpacity={0.6}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#00000070',
          }}>
          <View style={styles.modalWrapper}>
            <Text
              style={{
                marginVertical: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Notification Alert !
            </Text>
            <Text style={{marginVertical: 10, textAlign: 'center'}}>
              Todo is waiting ...
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => this.props.closeModal()}>
              <Text style={{color: '#ffff'}}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: 300,
    minHeight: 150,
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#648CFF',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
