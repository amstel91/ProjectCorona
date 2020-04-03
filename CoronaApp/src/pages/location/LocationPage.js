import { View, Text,StyleSheet,TextInput } from 'react-native';
import React, { Component } from 'react';
class LocationSelectorComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TextInput
                    style={styles.searchBar}
                    placeholder={"Search"}
                    autoFocus={true}
                    //onChangeText={text => onChangeText(text)}
                    //value={value}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar:{
        height: 40,
        borderBottomColor: '#c3c3c3',
        borderBottomWidth: 1,
    }
});

export default LocationSelectorComponent;