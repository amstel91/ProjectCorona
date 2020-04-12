import { View, Text ,StyleSheet,Linking } from 'react-native';
import React, { Component } from 'react';

class OSSComponent extends Component{

    render(){
        let DataSource = "https://rapidapi.com/astsiatsko/api/coronavirus-monitor?endpoint=apiendpoint_1f6e9f84-d051-4d4d-9106-8bbeb3f162c4"
        let ReactNativeLicense = "https://github.com/facebook/react-native/blob/master/LICENSE"
        return(
            <View style={styles.MainContainer}>
 
            <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('https://rapidapi.com/astsiatsko/api/coronavirus-monitor?endpoint=apiendpoint_1f6e9f84-d051-4d4d-9106-8bbeb3f162c4') } >API's used for Data Source.</Text>
            <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('https://github.com/facebook/react-native/blob/master/LICENSE') } >React-Native License used for App development .</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection : 'column'
    },
   
    TextStyle: {
   
      color: '#E91E63',
      textDecorationLine: 'underline'
   
    }
  });

export default OSSComponent;