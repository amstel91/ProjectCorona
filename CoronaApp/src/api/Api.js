class API{
    static BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus";
    static SIGN_UP_KEY = "290f4b382cmsh9de1ee4ea317518p1da941jsnb964a4ce8b05";
    static GOOGLEKEY = "AIzaSyDzELvXqAsZsPsLoovMulX_IO64LFj_Ll0";
    static MAPSURL = "https://maps.googleapis.com/maps/api/geocode/json";

    static getWorldStats = () => {
        const URL = API.BASE_URL + "/worldstat.php";
        console.log(URL);
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.SIGN_UP_KEY
            }
        })
            .then((res) => res.json());
    }

    static getCountryStats = (countryName) => {
        console.log(countryName);
        const URL = API.BASE_URL + "/latest_stat_by_country.php?country=" + countryName;
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.SIGN_UP_KEY
            }
        })
            .then((res) => res.json());
    }

    static getCountryHistory = (countryName) => {
        const URL = API.BASE_URL + "/cases_by_particular_country.php?country=" + countryName;
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.SIGN_UP_KEY
            }
        })
            .then((res) => res.json());
    }

    static getCountry = (latitude,longitude) => {
        console.log("longitude is" + longitude);
        console.log("latitude is" + latitude);
        
        const URL = API.MAPSURL + "?latlng="+latitude+","+longitude+"&key=" + API.GOOGLEKEY;
        console.log(URL);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        
        return fetch(URL, requestOptions)
                        
            .then((res)=>{
                return new Promise( (resolutionFunc,rejectionFunc) => {
                    res.json().then(function(data){
                        resolutionFunc(data.results[0].address_components[6].long_name)
                    });
                });
            })
            .catch(function(error) {
                    console.log("What inside");
                    alert(error.message);
                    });
    }

}

export default API;