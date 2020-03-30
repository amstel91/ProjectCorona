
export const getWorldStats = () => {
    const URL = `https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php`;
    return fetch(URL)
            .then((res) => res.json());
}

export const getCountryStats = (countryName) => {
    const URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country={countryName}';
    return fetch(URL)
            .then((res) => res.json());
}

export const getCountryHistory = (countryName) => {
    const URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country={countryName}';
    return fetch(URL)
            .then((res) => res.json());
}