import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
export default class TableComp extends Component {
 
    constructor(props){
    super(props);
    if(props.data === '')
    return;
    this.state = {
        widthArr : [110,110,110,110,110,110,110,110,110,220]
    };
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    }
    
    getKeys = function(){
        return Object.keys(this.props.data.countries_stat[0]);
        }
    
    getHeader = function(){
        return this.getKeys();
        //var keys = this.getKeys();
        //return keys.map((key, index)=>{
        //return <th key={key}>{key.toUpperCase()}</th>
        //})
        }
    
    getRowsData = function(){
        var items = this.props.data.countries_stat;
        var keys = this.getKeys();
        var dataRows = [];
        for(let i =1; i<items.length; i++)
        {
            dataRows[i-1] = Object.values(items[i]);
        }
        return dataRows;
        //return items.map((row, index)=>{
        //return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        //})
        }
    
    render() {
        if(this.props.data === '')
        return null;
        const state = this.state;
        return (
            <ScrollView horizontal={true}>
          <View style={styles.container, styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row widthArr={this.state.widthArr} data={this.getHeader()} style={styles.head} textStyle={styles.text}/>
              <Rows widthArr={this.state.widthArr} data={this.getRowsData()} textStyle={styles.text}/>
            </Table>
          </View>
          </ScrollView>
        )
      }
    }
     
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
      head: { height: 40, backgroundColor: '#f1f8ff', flex:1 },
      text: { margin: 6 , flex:1}
    });