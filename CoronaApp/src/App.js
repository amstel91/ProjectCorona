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
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DashboardPage from './pages/dashboard/DashboardPage';
import LocationComponent from './components/location/LocationComponent';
import LocationSelectorComponent from './pages/location/LocationPage';
import WorldInfoComponent from './pages/WorldInfo/WorldInfoPage'
import {createStackNavigator} from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { navigationRef } from './navigation/RootNavigation';
import * as RootNavigation from './navigation/RootNavigation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();
const App: () => React$Node = () => {
  let loadData = () =>{
    
  }
  loadData();
  let gotoWorlInfoPage=()=>{
        console.log("goWorld");
    RootNavigation.navigate('WorldInfo', {});
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
              <FontAwesomeIcon icon={ faGlobe } size={ 24 } color={ 'white' } onPress={gotoWorlInfoPage}/>
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
      </Stack.Navigator>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  global: {
    position: 'absolute',
    right: 20,
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
});

export default App;
