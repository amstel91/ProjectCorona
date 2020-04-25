import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {ScrollView} from 'react-native-gesture-handler';
export default class TableComp extends Component {
  keyHeaderMappings = {
    country_name: 'Country Name',
    cases: 'Cases',
    deaths: 'Deaths',
    region: 'Region',
    total_recovered: 'Total Recovered',
    new_deaths: 'New Deaths',
    new_cases: 'New Cases',
    serious_critical: 'Serious Critical',
    active_cases: 'Active Cases',
    total_cases_per_1m_population: 'Total Cases / 1 Million',
    deaths_per_1m_population: 'Total Deaths / 1 Million',
    total_tests: 'Total Tests',
    tests_per_1m_population: 'Total Tests / 1 Million',
  };
  ignoreList=['region']
  constructor(props) {
    super(props);
    this.state = {
      widthArr: [110, 110, 110, 110, 110, 110, 110, 110, 110, 220],
    };
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  processData() {}

  getKeys = function() {
    let keyNames=[]
    Object.keys(this.props.data.countries_stat[0]).forEach(v=>{
      if(this.ignoreList.indexOf(v)==-1){
        let keyName=this.keyHeaderMappings[v]!==undefined?this.keyHeaderMappings[v]:v;
        keyNames.push(keyName);
      }
    });
    return keyNames;
  };

  getHeader = function() {
    return this.getKeys();
  };

  getRowsData = function() {
    var items = this.props.data.countries_stat;
    items.forEach(function(v){ delete v.region });
    var keys = this.getKeys();
    var dataRows = [];
    for (let i = 1; i < items.length; i++) {
      dataRows[i - 1] = Object.values(items[i]);
    }
    return dataRows;
  };

  render() {
    if (this.props.data === '') return null;
    const state = this.state;
    return (
      <ScrollView horizontal={true}>
        <View style={(styles.container, styles.dataWrapper)}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
            <Row
              widthArr={this.state.widthArr}
              data={this.getHeader()}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows
              widthArr={this.state.widthArr}
              data={this.getRowsData()}
              textStyle={styles.text}
            />
          </Table>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: { backgroundColor: '#f1f8ff', flex: 1},
  text: {margin: 6, flex: 1, height: 20, backgroundColor: '#ffffff'},
});
