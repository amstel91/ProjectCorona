import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {default as countries} from '../../data/countries.json';
import API from '../../api/Api';
class LocationSelectorComponent extends Component {
  constructor(props) {
    super(props);
    this.allCountries = countries;
    this.state = {
      countryList: countries,
    };
  }

  componentDidMount(){
    API.getAffectedCountries().then(data=>{
        this.allCountries=data.affected_countries
    })
  }

  flatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#e7e7e7'}} />
    );
  };

  getItem(item) {
    Alert.alert(item);
  }

  onChangeText(text) {
    let filteredCountries = this.allCountries.filter(
      (item) => item.indexOf(text.trim()) > -1,
    );
    this.setState({countryList: filteredCountries});
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{width: 30, paddingTop: 14, paddingLeft: 10}}>
            <FontAwesomeIcon
              style={{justifyContent: 'flex-start'}}
              icon={faSearch}
              size={20}
              color={'#c3c3c3'}
            />
          </View>
          <View>
            <TextInput
              style={styles.searchBar}
              placeholder={'Search'}
              autoFocus={true}
              textContentType={'countryName'}
              clearButtonMode={'always'}
              onChangeText={this.onChangeText.bind(this)}
            />
          </View>
        </View>

        <SafeAreaView style={styles.container}>
          {this.flatListItemSeparator()}
          <FlatList
            data={this.state.countryList}
            ItemSeparatorComponent={this.flatListItemSeparator}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={this.getItem.bind(this, item)}
                underlayColor="#D3D3D3">
                <View>
                  <Text style={styles.item}>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size={15}
                      color={'#c3c3c3'}
                    />{' '}
                    {item}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    justifyContent: 'flex-end',
    fontSize: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#696969',
  },
  container: {
    marginTop: 50,
  },
});

export default LocationSelectorComponent;
