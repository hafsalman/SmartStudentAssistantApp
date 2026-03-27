import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { fetchWeather } from "../services/weatherService";

export default function WeatherScreen() {
  const [area, setArea] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const data = await fetchWeather(area);
    setWeather(data);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter City (e.g. Karachi)"
        value={area}
        onChangeText={setArea}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Search Weather" onPress={getWeather} />

      {weather && (
        <View style={{ marginTop: 20 }}>
          <Text>📍 City: {weather.city}</Text>
          <Text>🌡 Temperature: {weather.temp}°C</Text>
          <Text>⛅ Condition: {weather.condition}</Text>
        </View>
      )}
    </View>
  );
}