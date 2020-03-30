class API{
    BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus";

    static getWorldStats = () => {
        const URL = BASE_URL + "/worldstat.php";
        return fetch(URL)
            .then((res) => res.json());
    }

    static getCountryStats = (countryName) => {
        const URL = BASE_URL + "/latest_stat_by_country.php?country=" + countryName;
        return fetch(URL)
            .then((res) => res.json());
    }

    static getCountryHistory = (countryName) => {
        const URL = BASE_URL + "/cases_by_particular_country.php?country=" + countryName;
        return fetch(URL)
            .then((res) => res.json());
}

}

export default API;