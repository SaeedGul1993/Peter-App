import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'

export default class SplashScreen extends Component {

    state = { splash: true }

    goLogin = () => {
        this.props.navigation.navigate('LoginScreen')
    }

    gonext = () => {
        this.props.navigation.navigate('SliderScreen3')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={this.goLogin} style={{ alignItems: 'flex-end', top: 20, right: 20 }}>
                    {/* <Image source={require('../../commons/images/skip.png')} /> */}
                    <Text style={{fontSize:14,color:'#1D3557'}}>skip</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Image source={require('../../commons/images/heading2.png')} />
                    <Image source={require('../../commons/images/subheading2.png')} /> */}
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#1D3557'}}>Pursue goals that</Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#1D3557'}}>seems tough</Text>
                    <Text style={{fontSize:13,color:'#000000'}}>Simplifies your effort by making it more</Text>
                    <Text style={{fontSize:13,color:'#000000'}}>fun and playful</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../commons/images/slider2.png')} resizeMode='contain' />
                </View>
                <View style={{ justifyContent: 'center', marginBottom: 20, marginHorizontal: 20, marginTop: 80 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={require('../../commons/images/dots2.png')} resizeMode='contain' style={{ marginHorizontal: 3 }} />
                            <Image source={require('../../commons/images/dots1.png')} resizeMode='contain' style={{ marginHorizontal: 3 }} />
                            <Image source={require('../../commons/images/dots2.png')} resizeMode='contain' style={{ marginHorizontal: 3 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.gonext}>
                            {/* <Image source={require('../../commons/images/next.png')} resizeMode='contain' style={{width:70,height:50}} /> */}
                            <View style={{backgroundColor:'#618AFF',width:75,height:40,alignItems:'center',justifyContent:'center',borderRadius:20}}>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}