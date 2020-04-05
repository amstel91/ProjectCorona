import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Chart from '../chart/chart'
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        //console.log(this.props.count);
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
        let textColor={
          color:this.props.color
        }
        //console.log(styles[varStyle]);
        return (
            <View>
              <View style={[styles.cardStyle,styles[varStyle]]}>
                  <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                    <Chart lineData={this.props.lineData} color={this.props.color}/>
                    <View style={{flexDirection:"column",alignSelf: 'flex-end',justifyContent:'space-between',paddingRight:20}}>
                      <Text style={[styles.countText,textColor]}>{this.state.count}</Text>
                      <Text style={[styles.headerText,textColor]}>{this.state.header}</Text>
                    </View>
                  </View>
              </View>
            </View>
        )
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    countText:{
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:'right',
        // alignSelf: 'flex-end'
    },
    headerText:{
        fontSize: 20,
        fontWeight: '900',
        textAlign:'right',
        // alignSelf: 'flex-end'
    },
    cardStyle:{
        // flex: 1,
        // flexDirection: 'row',
        // alignContent:'flex-start',
         paddingVertical:30,
         borderBottomWidth:1,
         paddingHorizontal:10,
         borderBottomColor:"#e7e7e7",
        // justifyContent:'space-between',
        backgroundColor:Colors.white
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