import React, { Component } from 'react'
import { View, Text, StyleSheet, Colors } from 'react-native'
import CardComponent from '../../components/card/CardComponent'
import Api from '../../api/Api'
import { connect } from 'react-redux';
import {useSelector} from 'react-redux';
import LocationComponent from '../../components/location/LocationComponent'
class DashboardPage extends Component {
   state ={
      dashCountry:'',
      metadata: {total_cases:0, active_cases:0, total_recovered:0, total_deaths:0, record_date:''}
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

      const line1 = {
         labels : ['','','','','',''],
         datasets: [
           {
             data: [ 12, 3, 5, 10, 44, 34 ],
             strokeWidth: 3, // optional
           },
         ],
       };
       const line2 = {
         labels : ['','','','','',''],
         datasets: [
           {
             data: [ 12, 3, 5, 10, 44, 34 ],
             strokeWidth: 3, // optional
           },
         ],
       };const line3 = {
         labels : ['','','','','',''],
         datasets: [
           {
             data: [ 12, 3, 5, 10, 44, 34 ],
             strokeWidth: 3, // optional
           },
         ],
       };const line4 = {
         labels : ['','','','','',''],
         datasets: [
           {
             data: [ 12, 3, 5, 10, 44, 34 ],
             strokeWidth: 3, // optional
           },
         ],
       };
       //const cntry = useSelector(state => state.country);
       //console.log("Country"+this.props.country[0]);
       //if(this.state.dashCountry == '') return null;
        return (
           <View style={{flex: 1, flexDirection: 'column', paddingTop:0, justifyContent:'space-around'}}>
              <Text style={styles.dashLabel}>Last Updated</Text>
              <Text style={styles.dashLabel}>{this.state.metadata.record_date} GMT</Text>
              <CardComponent lineData={line1} count={this.state.metadata.total_cases} header="CONFIRMED" color="red"/>
              <CardComponent lineData={line2} count={this.state.metadata.active_cases} header="ACTIVE" color="red"/>
              <CardComponent lineData={line3} count={this.state.metadata.total_recovered} header="RECOVERED" color="red"/>
              <CardComponent lineData={line4} count={this.state.metadata.total_deaths} header="DECEASED" color="red"/>
           </View>
        )
     }
}

const mapStateToProps = state => ({
   country: state.country,
 });

export default connect(mapStateToProps)(DashboardPage)

const styles = StyleSheet.create({
   dashLabel: {
     backgroundColor: '#FFFFFF',
     color: '#00AA55',
     textAlign: 'right'
   }
})