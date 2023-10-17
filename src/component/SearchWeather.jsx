import React, { useEffect, useState } from 'react';


const Searchweather = () => {

    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
  
    /*
      Search button is pressed. Make a fetch call to the Open Weather Map API.
    */
    const searchPressed = () => {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b9519c2b3dbbb291ab2627137e800ba9")
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result)
        });
    };

    let emoji = null;
    if(typeof weather.main != "undefined"){
        if(weather.weather[0].main =='Clouds'){
            emoji = "fa-cloud"
        }else if(weather.weather[0].main == "Thunderstorm") {
            emoji= "fa-bolt"
        }else if(weather.weather[0].main == "Drizzle") {
            emoji= "fa-cloud-rain"
        }else if(weather.weather[0].main == "Rain") {
               emoji= "fa-cloud-shower-heavy"
        }else if(weather.weather[0].main == "Snow") {
            emoji= "fa-snow-flake"
        }else{
            emoji ="fa-smog"
        }
    }else{
        return (
            <div>Loading...</div>
        )
    }

    let temp = (weather.main.temp - 273.15).toFixed(2);
    let temp_min = (weather.main.temp_min - 273.15).toFixed(2);
    let temp_max = (weather.main.temp_max - 273.15).toFixed(2);

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', {month:'long'});
    let day = d.toLocaleString('default', {weekday:'long'});

    let time = d.toLocaleString([],{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });


    return (
        <div>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className="card text-white text-center border-0">
                            <img src= {`https://source.unsplash.com/600x900/?${weather.weather[0].main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <div className="input-group mb-4 w-75 mx-auto">
                                    <input type="search" className="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" onChange={(e) => setSearch(e.target.value)} />
                                    <button className="input-group-text" id="basic-addon2 " onClick={searchPressed}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                                <div className='bg-dark bg-opacity-50 py-3'>
                                    <h2 className="card-title">
                                        {weather.name}
                                    </h2>
                                    <p className="card-text lead text-capitalize">
                                        {day}, {month} {date}, {year}
                                        <br/>
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp} &deg;C</h1>
                                    <p className='lead fw-bolder mb-0'>{weather.weather[0].main}</p>
                                    <p className='lead'>{temp_min}&deg;C | {temp_max}&deg;C </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Searchweather;