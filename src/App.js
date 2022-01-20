import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Image } from "./img/10d.png";

const api = {
  key: "183c4c856a1cee21766dcdd7dc2fd9ea",
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}/weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
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

  return (
    <div className="h-screen bg-gradient-to-b from-[#485563] to-[#29323c] font-Lato">
      {/* Search */}
      <div className="flex items-center justify-center space-x-5 py-5 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
          placeholder="Search a city..."
          className="px-3 border-none bg-[#29323c] text-white outline-none rounded-md placeholder:text-gray-300 p-1"
        />
        <div className="flex items-center bg-[#003366] text-gray-200 px-4 py-2 rounded-lg">
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xl">
        <div className="flex items-center justify-center space-x-5">
          <div className="bg-[#003366] px-3 py-2 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faLocationArrow} size="1x" />
          </div>
          <h4>{weather.name}</h4>
        </div>
        <p className="my-5">{dateBuilder(new Date())}</p>
      </div>

      {/* Results of the search */}
      <div className="">
        {/* First box */}
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="max-w-xs mx-auto bg-[#003366] flex flex-col items-center justify-center text-white">
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt=""
                className="mt-5 h-24 w-24"
              />
              <h1 className="text-5xl py-10">{weather.main.temp}° C</h1>
              <p></p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
