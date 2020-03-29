class API{
    BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus";

    /** 
     * Dummy Method structure
     * Usage in other file
     * import API from {'./Api.js'}
     * 
     * API.getStatsByCountry("India").then(data => {
     *  //do something
     * })
    */
    static getStatsByCountry(countryName){
        return fetch(BASE_URL+"/"+countryName);
    }
}

export default API;