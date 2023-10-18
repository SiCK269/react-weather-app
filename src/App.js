import React, { useEffect, useState, useCallback } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

import { CSSTransition } from "react-transition-group";

import "./App.css";

// Icons
let iconBaseUrl = "http://openweathermap.org/img/wn/";
let iconFormat = ".png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState("01d");
  const [description, setdescription] = useState("clear");
  const [gif, setGif] = useState("");

  const fetchData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c144ccd6d1292712280851db80e4405b`;
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setdescription(weatherData?.weather?.[0].description);
    const main = weatherData?.weather?.[0].main;

    switch (main) {
      case "Snow":
        setGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
        break;
      case "Clouds":
        setGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')");
        break;
      case "Fog":
        setGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
        break;
      case "Rain":
        setGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')");
        break;
      case "Clear":
        setGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')");
        break;
      case "Thunderstorm":
        setGif(
          "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
        );
        break;
      default:
        setGif("");
        break;
    }

    const tempIcon = iconBaseUrl + weatherData?.weather?.[0].icon + iconFormat;
    setIcon(tempIcon);
  }, [weatherData.weather]);

  const handleInputChange = (e) => {
    var tempCity = e.target.value;
    setCity(tempCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setShow(true);
  };

  const mainStyle = {
    transition: 1,
    backgroundImage:
      gif ?? "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)",
    backgroundSize: "cover",
    borderRadius: "15px",
  };

  var showWeather = null;

  if (show) {
    showWeather = (
      <MDBCard
        style={mainStyle}
        className="text-white bg-image shadow-4-strong"
      >
        <MDBCardHeader className="p-4 border-0">
          <div className="text-center mb-3">
            <p className="h2 mb-1">{city}</p>
            <p className="mb-1">
              <strong>{description}</strong>
            </p>
            <p className="display-1 mb-1">{weatherData.main?.temp}°C</p>
            <span className="">Pressure: {weatherData.main?.pressure}</span>
            <span className="mx-2">|</span>
            <span className="">Humidity:{weatherData.main?.humidity}%</span>
          </div>
        </MDBCardHeader>

        <MDBCardBody className="px-5">
          <MDBRow className="align-items-center">
            <MDBCol lg="6">
              <strong>Today</strong>
            </MDBCol>

            <MDBCol lg="4" className="text-center">
              <img className="w-10" src={icon} alt="" />
            </MDBCol>

            <MDBCol lg="4" className="text-end">
              {weatherData.main?.temp}°
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage:
          gif ?? "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)",
        backgroundSize: "cover",
      }}
    >
      <div className="wrapper">
        <section className="vh-100">
          <MDBContainer className="h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="9" lg="7" xl="5">
                <MDBCardHeader
                  className="p-4 border-0"
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <div className="text-center mb-3">
                    <input
                      type="text"
                      placeholder="Enter city name"
                      value={city}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Get Weather
                    </button>
                  </div>
                </MDBCardHeader>
                {showWeather}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  );
};

export default Weather;
