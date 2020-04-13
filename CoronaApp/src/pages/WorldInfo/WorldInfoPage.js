import { View, Text,StyleSheet, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import API from '../../api/Api';
import AppUtils from '../../utils/AppUtils'
import TableComp from '../../components/chart/statTable'

class WorldInfoComponent extends Component{
    constructor(props){
        super(props);
    }

    state={
        data:'',
        active:0,
        statdata:''
    }
    

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

    componentDidMount(){
        API.getWorldStats()
        .then((res) => {
            {
              console.log(res);
              this.setState({
                data: res
              });
              var tc = res.total_cases.replace(/,/g,"");
              var tr = res.total_recovered.replace(/,/g,"");
              var td = res.total_deaths.replace(/,/g,"");
              //var nf = new Intl.NumberFormat();
                //nf.format(tc);
              console.log(tc.toLocaleString(navigator.language, { minimumFractionDigits: 0 }));
              //let tmp = Number(res.total_recovered);
              this.setState({
              active:tc-tr-td
              });
            }
          })
          .catch(function(error) {
              console.log("What");
              alert(error.message);
              });

        API.getTableData()
        .then((res) => {
            {
              console.log(res);
              this.setState({
                statdata: res
              });
            }
          })
          .catch(function(error) {
              console.log("What");
              alert(error.message);
              });
    }

    render(){
        return(
            <ScrollView>
            <View style={{flexDirection:"column",flex:1}}>
                <View style={{backgroundColor: '#f9f9f9',paddingVertical:5,paddingHorizontal:10}}>
                     <Text style={styles.dashCountryText}>Statistics for World</Text>
                     <Text style={styles.dashLabelText}>LAST UPDATED</Text>
                     <Text style={styles.dashLabel}>{this.translateToLocalDate(this.state.data.statistic_taken_at)}</Text>
                  </View>
                {/* <Text style={styles.dashLabel}>Last Updated</Text>
                <Text style={styles.dashLabel}>{this.state.data.statistic_taken_at} GMT</Text> */}
                <View style={{flexDirection:"row"}}>
                <View style={styles.dataCard}>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#F44335'}}>Confirmed</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'#F44335',fontWeight:"bold"}}>{this.state.data.total_cases}</Text>
                    </View>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#4DB052'}}>Recovered</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'#4DB052',fontWeight:"bold"}}>{this.state.data.total_recovered}</Text>
                    </View>
                </View >
                <View style={styles.dataCard}>
                    <View style={styles.dataDiv}> 
                        <Text style={{textAlign:'center', fontSize:25, color:'#2096F3'}}>Active</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'#2096F3',fontWeight:"bold"}}>{this.state.active}</Text>
                    </View>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#616161'}}>Deaths</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'#616161',fontWeight:"bold"}}>{this.state.data.total_deaths}</Text>
                    </View>
                </View>
                </View>
                <TableComp data={this.state.statdata}/>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    dataCard:{
        height: 200,
        flexDirection:"column",
        flex:1,
        backgroundColor: '#fff',
    },
    dataDiv:{
        height: 100,
        justifyContent: 'center',
        borderColor: '#e7e7e7',
        borderWidth: 0.5,
        // borderRadius: 10
    },
    // dashLabel: {
    //     backgroundColor: '#FFFFFF',
    //     color: '#00AA55',
    //     textAlign: 'right'
    //   },
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
});

export default WorldInfoComponent;