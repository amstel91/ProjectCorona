import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CardComponent from '../../components/card/CardComponent'
import Api from '../../api/Api'
import { connect } from 'react-redux';
import {useSelector} from 'react-redux';
import LocationComponent from '../../components/location/LocationComponent'
class DashboardPage extends Component {
   state ={
      dashCountry:'',
      metadata: {total_cases:0, active_cases:0, total_recovered:0, total_deaths:0}
   }

componentWillReceiveProps(nextProp)
{
   console.log(nextProp.country.countryName);
   this.setState({
      dashCountry:nextProp.country.countryName
   });
   metadata:Api.getCountryStats(nextProp.country.countryName)
   .then((res) => {
      {
         console.log(res);
         this.setState({
            metadata:res.latest_stat_by_country[0]
         });
         console.log(this.state.metadata.total_cases);
      }
   })
   .catch(function(error) {
        console.log("WhatCountry");
        alert(error.message);
   });
}

/*
componentDidUpdate(prevProps, prevState){
   if(prevState.dashCountry !== this.state.dashCountry){
   Api.getCountryStats(this.state.dashCountry)
   .then((res) => {
      {
         console.log(res);
         this.setState({
            metadata:res.latest_stat_by_country[0]
         });
         console.log(this.state.metadata.total_cases);
      }
   })
   .catch(function(error) {
        console.log("WhatCountry");
        alert(error.message);
   });
   }
}

static getDerivedStatFromProps(nextPros, prevState)
{
   if(nextPros.country.countryName !== prevState.dashCountry){
      console.log(nextPros.country.countryName);
      return {dashCountry: nextPros.country.countryName};
   }
   return null;
}
*/
    render() {
       //const cntry = useSelector(state => state.country);
       //console.log("Country"+this.props.country[0]);
       //if(this.state.dashCountry == '') return null;
        return (
           <View style={{flex: 1, flexDirection: 'column'}}>
              <Text>
                  {this.state.dashCountry}
              </Text>
              <Text>
                  {this.state.metadata.total_cases}
              </Text>
              <CardComponent count={this.state.metadata.total_cases} header="CONFIRMED" color="red"/>
              <CardComponent count={this.state.metadata.active_cases} header="ACTIVE" color="red"/>
              <CardComponent count={this.state.metadata.total_recovered} header="RECOVERED" color="red"/>
              <CardComponent count={this.state.metadata.total_deaths} header="DECEASED" color="red"/>
           </View>
        )
     }
}

const mapStateToProps = state => ({
   country: state.country,
 });

export default connect(mapStateToProps)(DashboardPage)