import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const header = ({header}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
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
          onPress={() => navigation.goBack()}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: '#10275A', fontWeight: 'bold'}}>
          {header}
        </Text>
        <View style={{width: 30}} />
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#d3d3d3',
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default header;

const styles = StyleSheet.create({});
