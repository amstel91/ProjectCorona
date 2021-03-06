import React, { Component } from 'react';
import {LineChart} from 'react-native-chart-kit'
import { View, Text } from 'react-native';

class Chart extends Component{

    constructor(props){
        super(props);
    }

    render(){
        //console.log("renderring");
        //console.log(this.props.lineData.datasets[0].data.length);
    return (
        
        <View style={{marginLeft:-60,backgroundColor:"#ffffff"}}>
        <LineChart
            data={this.props.lineData}
            width={250} // from react-native
            height={80}
            withVerticalLabels={false}
            withHorizontalLabels={false}        
            withInnerLines={false}
            withOuterLines={false}
            withDots={false}
            bezier
            
            chartConfig={{
                
                decimalPlaces:0,
                color: (opacity = 0.5) => this.props.color,
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                paddingRight: 0,
            }}
            style={{
                marginVertical: -8,
                borderRadius: 16,
                paddingTop: 10
              }}
        />
        </View>
    )
}
}

export default Chart;