async function apiFetch() {
const url = "https://api.openweathermap.org/data/2.5/forecast?lat=30.418343299999997&lon=-107.9191084&appid=cb7221712f151082d97513e48d6676fd&units=metric";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("weather data",data); 
        return data;
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  export async function createCards(){  
    try{
    const weatherData = await apiFetch();
    const sunriseTimestamp = new Date(weatherData["city"]["sunrise"] * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Mexico_City', 
    });

    const sunsetTimestamp = new Date(weatherData["city"]["sunset"] * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Mexico_City', 
    });
    const weatherIcons = {
      Clear: "☀️", 
      Clouds: "☁️",
      Rain: "🌧️",
      Snow: "❄️",
      Thunderstorm: "⛈️",
      Drizzle: "🌦️",
      Mist: "🌫️",
      Smoke: "💨",
      Haze: "🌫️",
      Dust: "🌪️",
      Fog: "🌫️",
      Sand: "🏜️",
      Ash: "🌋",
      Squall: "🌪️",
      Tornado: "🌪️",
  };

    const currentData = weatherData["list"][0];
    const huminity = currentData["main"]["humidity"];
    const min = currentData["main"]["temp_min"];
    const max = currentData["main"]["temp_max"];
    const mainWeather = currentData["weather"][0]["main"];
    const weatherIcon = weatherIcons[mainWeather] || "❓";
    const temp = currentData["main"]["temp"];
    const currentWeather = document.createElement("section");
    currentWeather.innerHTML = `
    <section class="card" data-title="Current Weather">
    <section class="weather-info">
        <section class="weather-icon">${weatherIcon}</section>
        <section>
            <strong>${temp} °C</strong>
            <p>
                ${mainWeather}<br>
                High: ${max} °C<br>
                Min: ${min} °C<br>
                Humidity: ${huminity}%<br>
                Sunrise: ${sunriseTimestamp}<br>
                Sunset: ${sunsetTimestamp}
            </p>
        </section>
        </section>
    </section>
`;
/// second weather card
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const dias = {};
let currentDate = new Date();
for (let i = 0; i < 3; i++) {
  const dateCompare = formatDate(currentDate); 
  const dailyData = weatherData.list.filter((elemento) => 
      elemento.dt_txt.startsWith(dateCompare)
  );
  const totalTemp = dailyData.reduce((acc, elemento) => {
      const min = elemento.main.temp_min;
      const max = elemento.main.temp_max;
      return acc + (min + max) / 2;
  }, 0);

  const averageTemp = dailyData.length > 0 ? totalTemp / dailyData.length : 0;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekDay = daysOfWeek[currentDate.getDay()];
  const textDay = i==0?"Today":weekDay;
  dias[textDay] = parseFloat(averageTemp.toFixed(2));
  currentDate.setDate(currentDate.getDate() + 1);
}
const weatherForecast = document.createElement("section");
weatherForecast.classList.add("card");
weatherForecast.setAttribute("data-title","Weather Forecast");
weatherForecast.innerHTML = Object.entries(dias)
    .map(([k, v]) => `
        <p>${k}: <strong>${v}</strong> °C</p>
    `).join("");

    return [currentWeather,weatherForecast];
               
    }catch(error){
      console.log("Error en createCards:",error);
    }
    
  }

  // <div class="card" data-title="Weather Forecast">Card 3</div>