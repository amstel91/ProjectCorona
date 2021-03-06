import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt,faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import API from '../../api/Api'
import LocationSetter from '../../utils/LocationSetter'
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';

import { connect } from 'react-redux';
import { changeCountry } from '../../actions/countryAction';
import { bindActionCreators } from 'redux';
import * as RootNavigation from '../../navigation/RootNavigation.js';
import AppUtils from '../../utils/AppUtils'


class LocationComponent extends Component {

    constructor(props){
        super(props);
        let initialName='Wait'
        if(props.country.countryName!=''){
            initialName=props.country.countryName;
        }
        this.state={
            AutoCountryName:initialName
        }
    }

    loadChecks=()=>{
        console.log("Checking android permissions");
        //console.log(this.props.navigation);
        let self=this;
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log("Feature not available");
                RootNavigation.replace('Location', {backNotAllowed:true});
                break;
              case RESULTS.DENIED:
                console.log(
                    'The permission has not been requested / is denied but requestable',
                  );
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                    if(result==RESULTS.GRANTED){
                        self.getData();
                    }else{
                        RootNavigation.replace('Location', {backNotAllowed:true});
                    }
                });
                
                break;
              case RESULTS.GRANTED:
                self.getData();
                console.log('The permission is granted');
                break;
              case RESULTS.BLOCKED:
                RootNavigation.replace('Location', {backNotAllowed:true});
                console.log('The permission is blocked');
                break;
            }
          })
          .catch(error => {
             
          });
      }

    componentDidMount = () =>{
        console.log("Logging Storage")
        AppUtils.logCurrentStorage();
        if(this.props.country==undefined || this.props.country.countryName == undefined || this.props.country.countryName==''){
            this.loadChecks();
        }
        
        
    }

    componentWillReceiveProps(props) {
        if (props.country.countryName !== this.state.AutoCountryName) {
            if(props.country.countryName == "Current Location")
            {
                this.getData();
            }
            this.setState({
                AutoCountryName:props.country.countryName
            })
        }
      }

    showChangeLocation(){
        
        RootNavigation.navigate('Location', {});
    }

    getData = () => {
        
        //console.log(LocationSetter.getCurrentCountry());
        LocationSetter.getCurrentCountry()
        .then((res) => {
            {
                //let { country, actions } = this.props;
              //console.log(res);
              this.setState({
                AutoCountryName: res
              });
              this.props.changeCountry(res);
              //this.props.dispatch(changeCountry(res));
              //console.log(this.props.country.countryName);
            }
          })
          .catch(function(error) {
              console.log(error.message);
              RootNavigation.replace('Location', {backNotAllowed:true});
          });
       };

    render(){
        return (
            //API.getWorldStats().then(res){this.state.country=res}
            <View>
              <Text style={styles.titleText}>
                 CovidMonitor
              </Text>
              <Text style={styles.locationText} onPress={this.showChangeLocation.bind(this)}>
                <FontAwesomeIcon icon={ faMapMarkerAlt } size={ 10 } color={ 'white' } /> {this.state.AutoCountryName} {" "}
                <Text style={styles.changeLocationText}>Change Location</Text>
                {" "}<FontAwesomeIcon style={styles.editIcon} icon={ faPencilAlt } size={ 8 } color={ 'white' } />
              </Text>
            </View>  
        )
    }
}
//export default LocationComponent;


const styles = StyleSheet.create({
    titleText:{
        fontSize: 20,
        fontWeight: '900',
        color: Colors.white,
    },
    locationText:{
        fontSize: 14,
        fontWeight: '900',
        color: Colors.white,
    },
    changeLocationText:{
        fontSize: 12,
        fontWeight: '900',
        textDecorationLine: 'underline'
    }
});

const mapStateToProps = state => ({
    country: state.country,
  });

function mapDispatchToProps(dispatch){
    return bindActionCreators({changeCountry}, dispatch)
}

  
  export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent)
