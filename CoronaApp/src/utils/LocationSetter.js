navigator.geolocation = require('@react-native-community/geolocation');
import API from "../api/Api"

class LocationNavigator{

    static getCurrentCountry =  () => {
        let country = '';
        return new Promise( (resolutionFunc,rejectionFunc) => {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    API.getCountry(position.coords.latitude,position.coords.longitude)
                    .then((res) => {
                        {
                            country = res;
                            resolutionFunc(country);
                        }
                        })
                        .catch(function(error) {
                            console.log(error.message);
                            rejectionFunc(error.message);
                            });
                },
                (error) => {
                    console.log(error.message);
                    rejectionFunc(error.message);
                },
                { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 },
              );
        });
        
    }

}

export default LocationNavigator;