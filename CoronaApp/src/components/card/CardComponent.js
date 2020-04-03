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
                count:props.count
            })
        }
      }

    render(){

        let varStyle = this.props.color;
        console.log(styles[varStyle]);
        return (
            <View style={[styles.cardStyle,styles[varStyle]]}>
                <View>
                  <Text style={[styles.countText,styles[varStyle]]}>{this.state.count}</Text>
                  <Chart lineData={this.props.lineData} color={this.props.color}/>
                </View>
                <View>
                  <Text style={[styles.headerText,styles[varStyle]]}>{this.state.header}</Text>
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
        zIndex : 1,
        position:'absolute',
        paddingTop:30,
        paddingLeft:5
    },
    headerText:{
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: '900',
        zIndex : 0,
        paddingTop : 30,
        color: 'red',
    },
    cardStyle:{
        paddingLeft: 20,
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignContent:'flex-start',
        paddingBottom:0
    },
    red: {
        color: 'red',
      },
    blue: {
        color: 'blue',
      },
    green: {
        color: 'green',
      },
    black: {
        color: 'black',
      },
});