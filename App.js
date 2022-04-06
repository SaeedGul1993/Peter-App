// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import 'react-native-gesture-handler';
import * as React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from './src/components/authentication/SplashScreen';
// import SliderScreen from './src/components/authentication/SliderScreen'
import SliderScreen1 from './src/components/authentication/SliderScreen1';
import SliderScreen2 from './src/components/authentication/SliderScreen2';
import SliderScreen3 from './src/components/authentication/SliderScreen3';
import LoginScreen from './src/components/authentication/LoginScreen';
import Home from './src/components/home/Home';
import CreateGoalScreen from './src/components/home/CreateGoalScreen';
import UserProfile from './src/components/home/UserProfile';
import AddTodo from './src/components/home/AddTodo';
import MyTodo from './src/components/home/MyTodo';
import AddSelfChallenges from './src/components/home/AddSelfChallenges';
import Setting from './src/components/home/Setting';
import MySelfChallenges from './src/components/home/MySelfChallenges';
import MyMemberShip from './src/components/home/MyMemberShip';
import PurchaseMembership from './src/components/home/PurchaseMembership';
import PomoDoroTimer from './src/components/home/MyPomodoroMeter';
import CreatePomoDoroMeter from './src/components/home/PomoDoroTimer';
import AddFriendsChallenges from './src/components/home/AddFriendsChallenges';
import ViewTodoDetailScreen from './src/components/home/ViewTodoDetail';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          // bottom:25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 70,
          //  ...styles.shadow
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            // <Icon
            //   name="home"
            //   color={color}
            //   size={size}
            // />
            <Image
              source={require('./src/commons/images/stroke2.png')}
              color={color}
              size={size}
            />
          ),
          //       tabBarIcon:({focused}) => (
          //         <View style={{ alignItems:'center', justifyContent:'center', top:10}}>
          //            <Icon  name={'home'} size={25}
          //                          color={focused? 'red' : '#b6b6b6' }
          //                           />

          //            <Text style={{ color: focused? 'red' : '#b6b6b6',
          //           fontSize:13
          //           }}>
          //  Home
          //            </Text>
          //         </View>
          //      )
        }}
      />
      <Tab.Screen
        name="ProjectScreen"
        component={Projects}
        options={{
          tabBarLabel: 'Project',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            // <Icon
            //   name="search"
            //   color={color}
            //   size={size}
            // />
            <Image
              source={require('./src/commons/images/stroke.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        // name="SearchScreen"
        // component={Search}
        name="CreateGoalScreen"
        component={CreateGoalScreen}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <IconAnt name="pluscircle" color="#648CFF" size={45} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={Favourite}
        options={{
          tabBarLabel: 'Favourite',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            // <IconMaterial
            //   name="facebook-messenger"
            //   color={color}
            //   size={size}
            // />
            <Image
              source={require('./src/commons/images/stroke4.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            // <IconMaterial
            //   name="vector-difference"
            //   color={color}
            //   size={size}
            // />
            // color to change hi nh ho skta hai
            <Image
              source={require('./src/commons/images/vector.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      // initialRouteName="AddTodo"
      // initialRouteName="MyTodo"
      initialRouteName="SplashScreen"
      // screenOptions={{
      //   headerLeft: () => (
      //     <NavigationDrawerStructure navigationProps={navigation} />
      //   ),
      //   headerStyle: {
      //     backgroundColor: '#f4511e', //Set Header color
      //   },
      //   headerTintColor: '#fff', //Set Header text color
      //   headerTitleStyle: {
      //     fontWeight: 'bold', //Set Header text style
      //   },
      // }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SliderScreen1"
        component={SliderScreen1}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SliderScreen2"
        component={SliderScreen2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SliderScreen3"
        component={SliderScreen3}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        // component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateGoalScreen"
        component={CreateGoalScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddFriendsChallenges"
        component={AddFriendsChallenges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyTodo"
        component={MyTodo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddSelfChallenges"
        component={AddSelfChallenges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MySelfChallenges"
        component={MySelfChallenges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyMemberShip"
        component={MyMemberShip}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PurchaseMembership"
        component={PurchaseMembership}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PomoDoroTimer"
        component={PomoDoroTimer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatePomoDoroMeter"
        component={CreatePomoDoroMeter}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ViewTodo"
        component={ViewTodoDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SettingScreenStack />
      {/* <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home Screen Option'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="SettingScreenStack"
          options={{drawerLabel: 'Setting Screen Option'}}
          component={SettingScreenStack}
        />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default App;

class Projects extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Projects</Text>
      </View>
    );
  }
}

class Search extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Search</Text>
      </View>
    );
  }
}

class Favourite extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Favourite</Text>
      </View>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  navigatorContainer: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
