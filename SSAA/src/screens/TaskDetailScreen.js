import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchWeather } from "../services/weatherService";
import { fetchTraffic } from "../services/trafficService";
import { AppContext } from "../context/AppContext";
import * as ImagePicker from "expo-image-picker";
import { saveTasks, loadTasks } from "../storage/taskStorage";
import CuteButton from "../components/CuteButton";

export default function TaskDetailScreen({ route }) {
  const { task } = route.params;

  const { setWeather, setSelectedArea } = useContext(AppContext);

  const [image, setImage] = useState(task.image || null);
  const [weather, setLocalWeather] = useState(null);
  const [traffic, setLocalTraffic] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSelectedArea(task.locationArea);

    const w = await fetchWeather(task.locationArea);
    const t = await fetchTraffic(task.locationArea); // ✅ FIXED

    setLocalWeather(w);
    setLocalTraffic(t);

    setWeather(w);
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      const tasks = await loadTasks();

      const updated = tasks.map((t) =>
        t.id === task.id ? { ...t, image: uri } : t
      );

      await saveTasks(updated);
    }
  };

  return (
    <View style={styles.container}>

      {/* 📌 TASK INFO */}
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>📘 {task.subject}</Text>
        <Text>📅 {task.dueDate}</Text>
        <Text>📍 {task.locationArea}</Text>
      </View>

      {/* 🌤 WEATHER */}
      {weather && (
        <View style={styles.weatherBox}>
          <Text>🌡 {weather.temp}°C</Text>
          <Text>⛅ {weather.condition}</Text>
          <Text>{weather.city}</Text>
        </View>
      )}

      {/* 🚦 TRAFFIC */}
      <View style={styles.trafficBox}>
        <Text>🚦 Traffic: {traffic?.level || "N/A"}</Text>
        <Text>{traffic?.message || "No data available 😢"}</Text>
      </View>

      {/* 📸 CAMERA */}
      <CuteButton title="📸 Capture Image" onPress={openCamera} />

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7FB",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  weatherBox: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  trafficBox: {
    backgroundColor: "#FFF3E0",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  image: {
    height: 200,
    borderRadius: 15,
    marginTop: 10,
  },
});