export const fetchWeather = async (city) => {
  try {
    const API_KEY = "API_KEY";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) return null;

    return {
      temp: data.main.temp,
      condition: data.weather[0].main,
      city: data.name,
    };
  } catch {
    return null;
  }
};