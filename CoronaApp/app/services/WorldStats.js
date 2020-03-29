import React from 'react';

class WorldStats {
    state = {
        data:''
    }

    constructor(){
        this.getData = this.getData.bind(this);
    }

    componentDidMount = () =>{
        this.getinfo();
    }

getinfo(){
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "290f4b382cmsh9de1ee4ea317518p1da941jsnb964a4ce8b05"
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
}

getData(){
    return data.total_cases;
}

}