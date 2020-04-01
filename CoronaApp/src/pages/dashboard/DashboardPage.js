import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CardComponent from '../../components/card/CardComponent'
import { connect } from 'react-redux';
import LocationComponent from '../../components/location/LocationComponent'
class DashboardPage extends Component {
    render() {
       //console.log("Country"+this.props.country[0]);
        return (
           <View style={{flex: 1, flexDirection: 'column'}}>
              <Text>
                  {this.props.country[0]}
              </Text>
              <CardComponent count="1100" header="CONFIRMED" color="red"/>
              <CardComponent count="800" header="ACTIVE" color="red"/>
              <CardComponent count="100" header="RECOVERED" color="red"/>
              <CardComponent count="200" header="DECEASED" color="red"/>
           </View>
        )
     }
}

const mapStateToProps = state => ({
   country: state.country,
 });

export default connect(mapStateToProps)(DashboardPage)