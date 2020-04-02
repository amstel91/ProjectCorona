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
                        let cntry = '';
                        for(let i = 0; i < data.results[0].address_components.length; i++)
                        {
                            //console.log(data.results[0].address_components[i].types[0]);
                            if(data.results[0].address_components[i].types[0] == "country")
                                cntry = data.results[0].address_components[i].long_name;
                        }
                        console.log(cntry);
                        if(cntry == "United States") //Google Map gives "United States"
                            cntry = "USA";          //RapidAPI takes "USA"
                        //resolutionFunc(data.results[0].address_components[4].long_name)
                        resolutionFunc(cntry);
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