import React, { Component } from 'react'
import { View, Text, StyleSheet, Colors } from 'react-native'
import CardComponent from '../../components/card/CardComponent'
import Api from '../../api/Api'
import { connect } from 'react-redux';
import {useSelector} from 'react-redux';
import LocationComponent from '../../components/location/LocationComponent'
import API from '../../api/Api';
class DashboardPage extends Component {
   state ={
      dashCountry:'',
      metadata: {total_cases:0, active_cases:0, total_recovered:0, total_deaths:0, record_date:''},
      line1 : {
         datasets: [
           {
             data: null,
             strokeWidth: 3, // optional
           },
         ],
       },
       line2 : {
         datasets: [
           {
             data: null,
             strokeWidth: 3, // optional
           },
         ],
       },
       line3 : {
         datasets: [
           {
             data: null,
             strokeWidth: 3, // optional
           },
         ],
       },
       line4 : {
         datasets: [
           {
             data: null,
             strokeWidth: 3, // optional
           },
         ],
       }
   }

componentWillReceiveProps(nextProp)
{
   //console.log(nextProp.country.countryName);
   this.setState({
      dashCountry:nextProp.country.countryName
   });
   metadata:Api.getCountryStats(nextProp.country.countryName)
   .then((res) => {
      {
         //console.log(res);
         this.setState({
            metadata:res.latest_stat_by_country[0]
         });
         this.populateExactData(nextProp.country.countryName);
         //console.log(this.state.metadata.total_cases);
      }
   })
   .catch(function(error) {
        console.log(error.message);
   });
}

populateExactData = (conutry) => {
   API.getHistoryByCountry(conutry)
   .then((res) => {
      // for(let i = 0;i < res[0].length;i++){
      //    console.log(res[0][i]);
      // }
      this.setState({
         line1 : {
            datasets: [
              {
                data: res[0],
                strokeWidth: 3, // optional
              },
            ],
          },
          line2 : {
            datasets: [
              {
                data: res[1],
                strokeWidth: 3, // optional
              },
            ],
          },line3 : {
            datasets: [
              {
                data: res[2],
                strokeWidth: 3, // optional
              },
            ],
          },line4 : {
            datasets: [
              {
                data: res[3],
                strokeWidth: 3, // optional
              },
            ],
          },
      });
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
       if(this.state.line4.datasets[0].data === null){
          //console.log('if con');
         return (
            <View style={{flex: 1, flexDirection: 'column', paddingTop:0, justifyContent:'flex-start'}}>
               <Text style={styles.dashLabel}>Last Updated</Text>
               <Text style={styles.dashLabel}>{this.state.metadata.record_date} GMT</Text>
               <Text>Hold on, we are learning how to make it fast</Text>
               
             </View>
         )
       }
       else
       {
          //console.log('else con');
        return (
           <View style={{flex: 1, flexDirection: 'column', paddingTop:0, justifyContent:'space-around'}}>
              <Text style={styles.dashLabel}>Last Updated</Text>
              <Text style={styles.dashLabel}>{this.state.metadata.record_date} GMT</Text>
              <CardComponent lineData={this.state.line1} count={this.state.metadata.total_cases} header="CONFIRMED" color="red"/>
              <CardComponent lineData={this.state.line2} count={this.state.metadata.active_cases} header="ACTIVE" color="blue"/>
              <CardComponent lineData={this.state.line3} count={this.state.metadata.total_recovered} header="RECOVERED" color="green"/>
              <CardComponent lineData={this.state.line4} count={this.state.metadata.total_deaths} header="DECEASED" color="black"/>
            </View>
        )
       }
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
