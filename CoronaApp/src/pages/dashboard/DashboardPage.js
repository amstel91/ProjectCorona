import React, { Component} from 'react'
import { RefreshControl, ScrollView, View, Text, StyleSheet, Colors,ActivityIndicator } from 'react-native'
import CardComponent from '../../components/card/CardComponent'
import Api from '../../api/Api'
import { connect } from 'react-redux';
import {useSelector} from 'react-redux';
import LocationComponent from '../../components/location/LocationComponent'
import AppUtils from '../../utils/AppUtils'

//const [refreshing, setRefreshing] = React.useState(false);

class DashboardPage extends Component {
   state ={
      refreshing: false,
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

updateCountryStats(countryName){
   return new Promise( (resolutionFunc,rejectionFunc) => {
   metadata:Api.getCountryStats(countryName)
   .then((res) => {
      {
         //console.log(res);
         this.setState({
            metadata:res.latest_stat_by_country[0]
         });
         this.populateExactData(countryName);
         //console.log(this.state.metadata.total_cases);
         resolutionFunc();
      }
   })
   .catch(function(error) {
        console.log(error.message);
   });
   
}
   )
}

componentWillReceiveProps(nextProp)
{
   //console.log(nextProp.country.countryName);
   this.setState({
      dashCountry:nextProp.country.countryName
   });
   this.updateCountryStats(nextProp.country.countryName);
}

populateExactData = (conutry) => {
   Api.getHistoryByCountry(conutry)
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

   translateToLocalDate(date){
      if(date && date.trim()!=""){
         let splitDate=date.split(".");
         let dateString=splitDate[0]+" GMT";
         dateString=dateString.replace(/-/g, '/');
         let tDate=new Date(dateString);
         console.log("Date returned by API:",dateString)
         console.log("Date returned by API in Local Timezone:",tDate.toLocaleString())
         return AppUtils.getTimeSince(tDate);
      }
      return "";
   }
/*
   wait(timeout) {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
  
    
  
   onRefresh = React.useCallback(() => {
      setRefreshing(true);
  console.log("refresh");
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
*/


_onRefresh() {
   this.setState({refreshing: true});
   this.updateCountryStats(this.state.dashCountry).then(() => {
     this.setState({refreshing: false});
   });
}

    render() {
       if(this.state.line4.datasets[0].data === null){
          //console.log('if con');
         return (
            <View style={[styles.container, styles.horizontal]}>
               <ActivityIndicator size="large" color="#2196f3" />
            </View>
         )
       }
       else
       {
          //console.log('else con');
        return (
           <>
    <ScrollView
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)} />
        }
      >
               <View>
                  <View style={{backgroundColor: '#f9f9f9',paddingVertical:5,paddingHorizontal:10}}>
                     <Text style={styles.dashCountryText}>Statistics for {this.state.dashCountry}</Text>
                     <Text style={styles.dashLabelText}>LAST UPDATED</Text>
                     <Text style={styles.dashLabel}>{this.translateToLocalDate(this.state.metadata.record_date)}</Text>
                  </View>
               </View>
               <View>
                  <CardComponent lineData={this.state.line1} count={this.state.metadata.total_cases} header="CONFIRMED" color="#F44335"/>
                  <CardComponent lineData={this.state.line2} count={this.state.metadata.active_cases} header="ACTIVE" color="#2096F3"/>
                  <CardComponent lineData={this.state.line3} count={this.state.metadata.total_recovered} header="RECOVERED" color="#4DB052"/>
                  <CardComponent lineData={this.state.line4} count={this.state.metadata.total_deaths} header="DECEASED" color="#616161"/>
               </View>
               </ScrollView>
            </>
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
     color: 'gray',
     textAlign: 'right'
   },
   dashCountryText:{
      textAlign: 'left',
      position:'absolute',
      top:10,
      left:10,
      fontSize:15,
      fontWeight:"bold",
      color:"gray",
      zIndex: 2
   },
   dashLabelText:{
      color: 'gray',
      fontWeight:"bold",
      fontSize:10,
      textAlign: 'right'
   },
   container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
})
