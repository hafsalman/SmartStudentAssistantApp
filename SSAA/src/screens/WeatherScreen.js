import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import CuteButton from "../components/CuteButton";
import { fetchWeather } from "../services/weatherService";

export default function WeatherScreen() {
  const [area, setArea] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const data = await fetchWeather(area);
    setWeather(data);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F7F7FB" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🌦 Weather Search
      </Text>

      <TextInput
        placeholder="Enter City (Karachi)"
        value={area}
        onChangeText={setArea}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
      />

      <CuteButton title="Search" onPress={getWeather} />

      {weather && (
        <View
          style={{
            backgroundColor: "#E3F2FD",
            padding: 15,
            borderRadius: 15,
            marginTop: 15,
          }}
        >
          <Text>📍 {weather.city}</Text>
          <Text>🌡 {weather.temp}°C</Text>
          <Text>⛅ {weather.condition}</Text>
        </View>
      )}
    </View>
  );
}