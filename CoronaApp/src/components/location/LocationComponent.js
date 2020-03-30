import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt,faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class LocationComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            country:"India"
        }
    }

    render(){
        return (
            <View>
              <Text style={styles.titleText}>
                 GoCorona
              </Text>
              <Text style={styles.locationText}>
                <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 10 } color={ 'white' } /> {this.state.country} {" "}
                <Text style={styles.changeLocationText}>Change Location</Text>
                {" "}<FontAwesomeIcon style={styles.editIcon} icon={ faPencilAlt } size={ 8 } color={ 'white' } />
              </Text>
            </View>  
        )
    }
}
export default LocationComponent;


const styles = StyleSheet.create({
    titleText:{
        fontSize: 20,
        fontWeight: '900',
        color: Colors.white,
    },
    locationText:{
        fontSize: 14,
        fontWeight: '900',
        color: Colors.white,
    },
    changeLocationText:{
        fontSize: 12,
        fontWeight: '900',
        textDecorationLine: 'underline'
    }
});