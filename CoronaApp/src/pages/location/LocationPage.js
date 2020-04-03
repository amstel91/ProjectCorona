import { View, Text,StyleSheet,TextInput } from 'react-native';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class LocationSelectorComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <View style={{flexDirection:"row",flex:1}}>
                    <View style={{width:30,paddingTop:14,paddingLeft:10}}>
                            <FontAwesomeIcon style={{justifyContent: 'flex-start'}} icon={ faSearch } size={ 20 } color={ '#c3c3c3' } />
                    </View>
                    <View>
                        <TextInput
                            style={styles.searchBar}
                            placeholder={"Search"}
                            autoFocus={true}
                            textContentType={"countryName"}
                            clearButtonMode={"always"}
                            //onChangeText={text => onChangeText(text)}
                            //value={value}
                        />
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar:{
        height: 50,
        justifyContent: 'flex-end',
        fontSize:20
    }
});

export default LocationSelectorComponent;