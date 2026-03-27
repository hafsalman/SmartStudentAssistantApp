import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, Image } from "react-native";
import { fetchWeather } from "../services/weatherService";
import { fetchTraffic } from "../services/trafficService";
import { AppContext } from "../context/AppContext";
import * as ImagePicker from "expo-image-picker";
import { saveTasks, loadTasks } from "../storage/taskStorage";
import trafficData from "../data/trafficData.json";

export default function TaskDetailScreen({ route }) {
  const { task } = route.params;
  const { setWeather, setTraffic, setSelectedArea } = useContext(AppContext);

  const [image, setImage] = useState(task.image || null);
  const [weather, setLocalWeather] = useState(null);
  const [traffic, setLocalTraffic] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSelectedArea(task.locationArea);

    const w = await fetchWeather(task.locationArea);
    const t = await fetchTraffic();

    setLocalWeather(w);
    setLocalTraffic(t);

    setWeather(w);
    setTraffic(t);
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

      // SAVE IMAGE IN STORAGE
      const tasks = await loadTasks();

      const updated = tasks.map((t) =>
        t.id === task.id ? { ...t, image: uri } : t
      );

      await saveTasks(updated);
    }
  };

  const getTraffic = () => {
    const found = trafficData.find(
      (t) => t.area.toLowerCase() === task.locationArea.toLowerCase()
    );

    return found || {
      level: "Unknown",
      message: "No data available",
    };
  };

  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.subject}</Text>
      <Text>📅 {task.dueDate}</Text>

      {weather && (
        <>
          <Text>🌡 {weather.temp}°C</Text>
          <Text>{weather.condition}</Text>
          <Text>{weather.city}</Text>
        </>
      )}

      {traffic && (
        <>
          <Text>🚗 {traffic.level}</Text>
          <Text>{traffic.message}</Text>
        </>
      )}

      <Button title="Capture Image" onPress={openCamera} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}