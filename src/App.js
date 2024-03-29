import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faSearch,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Sunny from "./img/sunny-removebg.png";
import Test from "./img/test.png";

const api = {
  key: "183c4c856a1cee21766dcdd7dc2fd9ea",
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${api.base}/forecast?q=${query}&units=metric&cnt=7&lang=ro&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => setWeather(result));
    }
  };

  const searchIcon = (e) => {
    e.preventDefault();
    if (query.length === 0) return;
    fetch(
      `${api.base}/forecast?q=${query}&units=metric&cnt=7&lang=ro&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => setWeather(result));
  };

  const faren = () => {
    fetch(
      `${api.base}/forecast?q=${query}&units=imperial&lang=ro&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => setWeather(result));
    setActive(false);
    setActive2(true);
  };

  const celsius = () => {
    fetch(
      `${api.base}/forecast?q=${query}&units=metric&lang=ro&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => setWeather(result));
    setActive(true);
    setActive2(false);
  };

  const dateBuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let time = d.getHours() + ":" + d.getMinutes();
    return `${day}, ${time}`;
  };

  const nextDay = (nd) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let tomorrow = days[nd.getDay() + 1];
    return tomorrow;
  };

  return (
    <div className="min-h-screen   background font-Lato">
      {/* Search */}
      <div className="flex items-center justify-center space-x-5 py-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
          placeholder="Search a city..."
          className="px-3 border-none bg-[#29323c] text-white outline-none rounded-md placeholder:text-gray-300 p-1"
        />
        <div
          onClick={searchIcon}
          className="flex items-center bg-[#035B95] text-gray-200 px-4 py-2 rounded-lg cursor-pointer"
        >
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xl">
        <div className="flex items-center justify-center space-x-5">
          <div className="bg-[#035B95] px-3 py-2 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faLocationArrow} size="1x" />
          </div>
          {typeof weather.list !== "undefined" ? (
            <h4 className="text-2xl fade-up">
              {weather.city.name}, {weather.city.country}
            </h4>
          ) : (
            ""
          )}
        </div>
        <p className="my-5 text-xl">{dateBuilder(new Date())}</p>
      </div>

      {/* First box from results */}

      {typeof weather.list !== "undefined" ? (
        <div className="fade-up">
          <div className="max-w-xs mx-auto bg-gradient-to-b from-[#4389A2] to-[#5C258D] flex flex-col items-center justify-center text-white rounded-2xl">
            {weather.list[0].main.temp < 10 ? (
              <img src={Test} className="w-28 h-28" alt="" />
            ) : (
              <img src={Sunny} className="w-24 h-24 mt-5" alt="" />
            )}
            <h1 className="text-5xl py-5 font-bold">
              {Math.round(weather.list[0].main.temp)} °C
            </h1>
            <h3 className="text-2xl text-gray-400 capitalize font-bold">
              {weather.list[0].weather[0].description}
            </h3>
            <div className="flex items-center justify-center space-x-32 my-2">
              <button
                onClick={celsius}
                className={`${
                  active && "bg-[#8E54E9]"
                }  bg-[#190061] py-2 px-3 rounded-lg font-bold`}
              >
                °C
              </button>

              <button
                onClick={faren}
                className={` ${
                  active2 && "bg-[#8E54E9]"
                } bg-[#190061] py-2 px-3 rounded-lg font-bold `}
              >
                °F
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Humidity and Wind */}
      {typeof weather.list !== "undefined" ? (
        <div className="fade-up-2">
          <div className="flex items-center font-bold py-4 justify-center max-w-xs mx-auto bg-[#0E0E52] mt-5 rounded-2xl space-x-28 text-white">
            {/* Humidity */}
            <div className="flex flex-col items-center">
              <h1 className="text-lg">
                <FontAwesomeIcon icon={faTint} size="1x" className="mr-2" />
                {weather.list[0].main.humidity}%
              </h1>
              <h3 className="text-gray-400">Umiditate</h3>
            </div>
            {/* Wind */}
            <div className="flex flex-col items-center">
              <h1 className="text-lg">
                <FontAwesomeIcon icon={faWind} size="1x" className="mr-2" />
                {weather.list[0].wind.speed} km/h
              </h1>
              <h3 className="text-gray-400">Vânt</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Next Days Wather */}
      {typeof weather.list !== "undefined" ? (
        <div className="fade-up-3">
          <div className="grid grid-cols-3 gap-5 text-center max-w-xs mx-auto mt-5 pb-5">
            {/* first card */}
            <div className="bg-[#08BDBD] text-white font-bold flex flex-col justify-center items-center rounded-2xl py-2">
              <h1>{nextDay(new Date())}</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[1].main.temp_min)} °C /{" "}
                {Math.round(weather.list[1].main.temp_max)} °C
              </p>
            </div>
            <div className="bg-[#0E34A0] text-white font-bold flex flex-col justify-center items-center rounded-2xl">
              <h1>TUE</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[2].main.temp_min)} °C /{" "}
                {Math.round(weather.list[2].main.temp_max)} °C
              </p>
            </div>
            <div className="bg-[#08BDBD] text-white font-bold flex flex-col justify-center items-center rounded-2xl">
              <h1>WED</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[3].main.temp_min)} °C /{" "}
                {Math.round(weather.list[3].main.temp_max)} °C
              </p>
            </div>
            <div className="bg-[#0E34A0] text-white font-bold flex flex-col justify-center items-center rounded-2xl py-2">
              <h1>THU</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[4].main.temp_min)} °C /{" "}
                {Math.round(weather.list[4].main.temp_max)} °C
              </p>
            </div>
            <div className="bg-[#08BDBD] text-white font-bold flex flex-col justify-center items-center rounded-2xl">
              <h1>FRI</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[5].main.temp_min)} °C /{" "}
                {Math.round(weather.list[5].main.temp_max)} °C
              </p>
            </div>
            <div className="bg-[#0E34A0] text-white font-bold flex flex-col justify-center items-center rounded-2xl">
              <h1>SAT</h1>
              <img
                src={`https://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt=""
                className="w-8 h-8"
              />
              <p>
                {Math.round(weather.list[6].main.temp_min)} °C /{" "}
                {Math.round(weather.list[6].main.temp_max)} °C
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
