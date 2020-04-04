import { View, Text,StyleSheet,TextInput } from 'react-native';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import API from '../../api/Api';

class WorldInfoComponent extends Component{
    constructor(props){
        super(props);
    }

    state={
        data:'',
        active:0
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
    }

    render(){
        return(
            <View style={{flexDirection:"row",flex:1}}>
                <View style={styles.dataCard}>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'red'}}>Confirmed</Text>
        <Text style={{textAlign:'center', fontSize:20, color:'red'}}>{this.state.data.total_cases}</Text>
                    </View>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'green'}}>Recovered</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'green'}}>{this.state.data.total_recovered}</Text>
                    </View>
                </View >
                <View style={styles.dataCard}>
                    <View style={styles.dataDiv}> 
                        <Text style={{textAlign:'center', fontSize:25, color:'blue'}}>Active</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'blue'}}>{this.state.active}</Text>
                    </View>
                    <View style={styles.dataDiv}>
                        <Text style={{textAlign:'center', fontSize:25, color:'black'}}>Deaths</Text>
                        <Text style={{textAlign:'center', fontSize:20, color:'black'}}>{this.state.data.total_deaths}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dataCard:{
        height: 200,
        flexDirection:"column",
        flex:1,
        backgroundColor: '#ffffff'
    },
    dataDiv:{
        height: 100,
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 0.5,
    }
});

export default WorldInfoComponent;