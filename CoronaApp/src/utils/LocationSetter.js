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
                (error) => console.log(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
              );
        });
        
    }

}

export default LocationNavigator;