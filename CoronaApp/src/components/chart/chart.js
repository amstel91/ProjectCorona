import React, { Component } from 'react';
import {LineChart} from 'react-native-chart-kit'
import { View, Text } from 'react-native';

class Chart extends Component{

    constructor(props){
        super(props);
    }

    render(){
    return (
        <View>
        <LineChart
            data={this.props.lineData}
            width={200} // from react-native
            height={50}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withInnerLines={false}
            withOuterLines={true}
            withDots={false}
            
            chartConfig={{
                
                decimalPlaces:0,
                color: (opacity = 0.5) => `rgba(255, 0, 0, ${opacity})`,
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                paddingRight: 0,
            }}
            style={{
                marginVertical: -8,
                borderRadius: 16
              }}
        />
        </View>
    )
}
}

export default Chart;