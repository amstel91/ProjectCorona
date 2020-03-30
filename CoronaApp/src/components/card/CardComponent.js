import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons'

class CardComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            count: '1200',
            header: 'CONFIRMED',
            color: 'red'
        }
    }

    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', color:'{this.state.color}'}}>
                <View>
                  <Text style={styles.countText}>{this.state.count}</Text>
                  <FontAwesomeIcon icon={ faChartLine } size={ 20 } color={ 'red' }/>
                </View>
                <View>
                <   Text style={styles.headerText}>{this.state.header}</Text>
                </View>
            </View>  
        )
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    countText:{
        fontSize: 15,
        fontWeight: '900'
    },
    headerText:{
        fontSize: 40,
        fontWeight: '900'
    }
});