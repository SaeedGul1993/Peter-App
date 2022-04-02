export const Colors = {
    darkColor: '#2ba97a',
    MainBackgoundColor: '#eff9f6',
    lightdarkColor: '#82c5ab',
    lightdarkShades: '#747c74',
    darkShades: '#747374'
}

import {
    Dimensions,
    // AsyncStorage
    } from "react-native"
    import AsyncStorage from '@react-native-community/async-storage'
    
    
    export const screenHeight = Dimensions.get('window').height;
    export const screenWidth = Dimensions.get('window').width;
    
    export const appMaincolor = "orange"
    
    // export const baseUrl = 'http://192.168.0.118:3000/api/'
    
    // export const baseUrl = 'http://ms.design-services-online.com/api/'
    
    
    // export function getToken() {
    //     return new Promise(async (resolve,reject)=>{
    //         let token = await AsyncStorage.getItem('token')
    //         if(token !== null){
    //             resolve({token: token})
    //         }else{
    //             reject({token: null})
    //         }
    //     })
    // }

    export function getOneTimeSlider() {
        return new Promise(async (resolve,reject)=>{
            let slider = await AsyncStorage.getItem('slider')
            if(slider !== null){
                resolve({slider: slider})
            }else{
                reject({slider: null})
            }
        })
    }

    export function getLogin() {
        return new Promise(async (resolve, reject) => {
            let login = await AsyncStorage.getItem('login')
            if(login !== null) {
                resolve({login: login})
            }
            else {
                reject({login: null})
            }
        })
    }