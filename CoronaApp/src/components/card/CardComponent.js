import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Chart from '../chart/chart'

class CardComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            /*count: '1200',
            header: 'CONFIRMED',
            color: 'red'*/
            count: props.count,
            header: props.header,
            color: props.color
        }
    }

    componentWillReceiveProps(props) {
        console.log(this.props.count);
        //const { refresh, id } = this.props;
        if (props.count !== this.state.count) {
          //this.fetchShoes(id)
            //.then(this.refreshShoeList)
            this.setState({
                count:this.props.count
            })
        }
      }

    render(){
        return (
            <View style={styles.cardStyle}>
                <View>
                  <Text style={styles.countText}>{this.state.count}</Text>
                  <Chart lineData={this.props.lineData}/>
                </View>
                <View>
                  <Text style={styles.headerText}>{this.state.header}</Text>
                </View>
            </View>  
        )
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    countText:{
        fontSize: 20,
        fontWeight: '900',
        zIndex : 1
    },
    headerText:{
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: '900',
        zIndex : 0,
        paddingTop : 30
    },
    cardStyle:{
        paddingLeft: 20,
        flex: 1,
        flexDirection: 'row',
        alignContent:'flex-start',
        color:'red'}
});