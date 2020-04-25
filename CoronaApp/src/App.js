/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DashboardPage from './pages/dashboard/DashboardPage';
import LocationComponent from './components/location/LocationComponent';
import LocationSelectorComponent from './pages/location/LocationPage';
import NewsPage from './pages/news/NewsPage';
import WorldInfoComponent from './pages/WorldInfo/WorldInfoPage'
import {createStackNavigator} from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faNewspaper, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { navigationRef } from './navigation/RootNavigation';
import * as RootNavigation from './navigation/RootNavigation';
import OSSComponent from './pages/DataSource/SourceOfData';



import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Directions } from 'react-native-gesture-handler';
const Stack = createStackNavigator();
const App: () => React$Node = () => {

  let gotoWorlInfoPage=()=>{
        console.log("goWorld");
        RootNavigation.navigate('WorldInfo', {});
  }
  let gotoOSSPage=()=>{
    console.log("OSSAndDataSource");
    RootNavigation.navigate('OSSAndDataSource', {});
  }
  let gotoNewsPage=()=>{
    console.log("NewsPage");
    RootNavigation.navigate('NewsPage', {});
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#1081db" translucent = {true} />
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardPage} options={{
          headerTitle: props => <LocationComponent {...props} />,
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={styles.global}>
              <TouchableOpacity style={{flexDirection: 'column', flex: 1}} onPress={gotoWorlInfoPage}>
                <FontAwesomeIcon icon={ faGlobe } size={ 24 } color={ 'white' }/>
                <Text style={styles.iconText}>World</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'column', flex: 1,marginLeft:15}} onPress={gotoNewsPage}>
                <FontAwesomeIcon icon={ faNewspaper } size={ 24 } color={ 'white' } />
                <Text style={styles.iconText}>News</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'column', flex: 1,marginLeft:15}} onPress={gotoOSSPage}>
                <FontAwesomeIcon icon={ faInfoCircle } size={ 24 } color={ 'white' } />
                <Text style={styles.iconText}>About</Text>
              </TouchableOpacity>
              
            </View>
          )
        }} />
        <Stack.Screen name="Location" component={LocationSelectorComponent} options={{
          title: "Select Country",
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="WorldInfo" component={WorldInfoComponent} options={{
          title: "World Information",
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="OSSAndDataSource" component={OSSComponent} options={{
          title: "OSS and Data Source",
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="NewsPage" component={NewsPage} options={{
          title: "News",
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  global: {
    right: 10,
    justifyContent: 'space-between',
    flexDirection : 'row',
  },
  TextStyle: {
 
    color: '#E91E63',
    textDecorationLine: 'underline',
    flex:1,
    alignSelf:'flex-end',
    paddingLeft: 5,
    fontSize: 15
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  iconText:{
    fontSize: 9,
    color:Colors.white,
    textAlign:"center"
  }
});

export default App;
