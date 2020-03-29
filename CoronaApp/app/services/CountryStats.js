import React from 'react';

class CountryStats {
    state = {
        countryName:'',
        data:''
    }

    constructor(countryName){
        super(countryName);
     this.infoUpdate = this.infoUpdate.bind(this);
 }

getinfo(){
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country="+this.countryName, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "290f4b382cmsh9de1ee4ea317518p1da941jsnb964a4ce8b05"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
}

}