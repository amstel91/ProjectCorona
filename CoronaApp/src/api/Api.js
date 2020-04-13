import {apikeyArr} from '../constants/ApiKeys'
class API{
    static BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus";
    static SIGN_UP_KEY = "290f4b382cmsh9de1ee4ea317518p1da941jsnb964a4ce8b05";
    static GOOGLEKEY = "AIzaSyDzELvXqAsZsPsLoovMulX_IO64LFj_Ll0";
    static MAPSURL = "https://maps.googleapis.com/maps/api/geocode/json";
    static SIGN_UP_KEY_SECONDARY = "e40ca55336msh0c0aceb4a149847p1f82dejsnff8fb5264622";
    static NEWS_API = "http://newsapi.org/v2/top-headlines?";
    static NEWS_API_COVID = "http://newsapi.org/v2/everything?";
    static GENERATED_KEY = "";
    static keyGenerator = () =>{
        let idx = Math.floor(Math.random()*apikeyArr.length);
        console.log(idx);
        this.GENERATED_KEY = apikeyArr[idx];
    }

    static getTableData = () =>{
        const URL = API.BASE_URL + "/cases_by_country.php";
        API.keyGenerator();
        //console.log(URL);
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        })
            .then((res) => res.json());
    }

    static getWorldStats = () => {
        const URL = API.BASE_URL + "/worldstat.php";
        API.keyGenerator();
        //console.log(URL);
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        })
            .then((res) => res.json());
    }

    static getNews = () => {
        let URL=API.NEWS_API_COVID+"q=corona%20AND%20covid&apiKey=2fe876657cce4d178a661a945ec240c7&sortBy=publishedAt&language=en"
        var req = new Request(URL);
        return fetch(req)
            .then(res => res.json())
    }

    static getCountryStats = (countryName) => {
        API.keyGenerator();
        //console.log(countryName);
        const URL = API.BASE_URL + "/latest_stat_by_country.php?country=" + countryName;
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        })
            .then((res) => res.json());
    }

    static getAffectedCountries = () => {
        API.keyGenerator();
        const URL = API.BASE_URL + "/affected.php";
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        })
            .then((res) => res.json());
    }

    static getCountryDetails = (countryName) => {
        API.keyGenerator();
        const URL = "https://restcountries-v1.p.rapidapi.com/name/" + countryName;
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        })
            .then((res) => res.json());
    }

    static getCountry = (latitude,longitude) => {
        //console.log("longitude is" + longitude);
        //console.log("latitude is" + latitude);
        
        const URL = API.MAPSURL + "?latlng="+latitude+","+longitude+"&key=" + API.GOOGLEKEY;
        //console.log(URL);

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
                        //console.log(cntry);
                        if(cntry == "United States") //Google Map gives "United States"
                            cntry = "USA";          //RapidAPI takes "USA"
                        //resolutionFunc(data.results[0].address_components[4].long_name)
                        resolutionFunc(cntry);
                    });
                });
            })
            .catch(function(error) {
                    console.log(error.message);
                    //alert(error.message);
                    });
    }

    static getHistoryByCountry = Country =>{
        API.keyGenerator();
        //console.log(`Fetching ${Country} 's readings`);
        let requestOptions = {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }
        };

        const URL = API.BASE_URL + "/cases_by_particular_country.php?country=" + Country;
        //console.log(URL);
        return fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": API.GENERATED_KEY
            }})
        .then((res) => {
            return new Promise((resolve,reject)=>{
               res.json().then(function(data){
                  //console.log(data);
                  let allCases = [];
                  let activeCases = [];
                  let deathCases = [];
                  let totalCases = [];
                  let recoveredCases = [];
                  let currentDate = data.stat_by_country[0].record_date.split(" ")[0];
                  for(let i = 0;i < data.stat_by_country.length;i++){
                    let date = data.stat_by_country[i].record_date.split(" ")[0];
                    if(currentDate !== date){
                        console.log(currentDate);
                        currentDate = date;
                        let total = data.stat_by_country[i-1].total_cases.replace(/,/g,"");
                        let active = data.stat_by_country[i-1].active_cases.replace(/,/g,"");
                        let recovered = data.stat_by_country[i-1].total_recovered.replace(/,/g,"");
                        let death = data.stat_by_country[i-1].total_deaths.replace(/,/g,"");
                        totalCases.push(parseInt(total));
                        activeCases.push(parseInt(active));
                        recoveredCases.push(parseInt(recovered)); 
                        deathCases.push(parseInt(death));
                    }          
                  }
                  let finalValue = data.stat_by_country.length - 1;
                  let total = data.stat_by_country[finalValue].total_cases.replace(/,/g,"");
                  let active = data.stat_by_country[finalValue].active_cases.replace(/,/g,"");
                  let recovered = data.stat_by_country[finalValue].total_recovered.replace(/,/g,"");
                  let death = data.stat_by_country[finalValue].total_deaths.replace(/,/g,"");
                  totalCases.push(parseInt(total));
                  activeCases.push(parseInt(active));
                  recoveredCases.push(parseInt(recovered)); 
                  deathCases.push(parseInt(death));
                  allCases.push(totalCases);
                  allCases.push(activeCases);
                  allCases.push(recoveredCases);
                  allCases.push(deathCases);
                  resolve(allCases);
               });
            });
         })
        .catch((error) => reject(console.log(error.message)));

    }

}

export default API;