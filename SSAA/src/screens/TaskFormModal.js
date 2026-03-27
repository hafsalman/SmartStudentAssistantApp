import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import uuid from "react-native-uuid";

export default function TaskFormModal({ navigation, route }) {
  const editTask = route.params?.task;

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setSubject(editTask.subject);
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate);
      setArea(editTask.locationArea);
    }
  }, []);

  const saveTask = async () => {
    const tasks = await loadTasks();

    if (editTask) {
      const updated = tasks.map((t) =>
        t.id === editTask.id
          ? { ...editTask, title, subject, priority, dueDate, locationArea: area }
          : t
      );
      await saveTasks(updated);
    } else {
      const newTask = {
        id: uuid.v4(),
        title,
        subject,
        priority,
        dueDate,
        locationArea: area,
      };

      await saveTasks([...tasks, newTask]);
    }

    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Subject" value={subject} onChangeText={setSubject} />
      <TextInput placeholder="Due Date" value={dueDate} onChangeText={setDueDate} />
      <TextInput placeholder="Area" value={area} onChangeText={setArea} />

      <Picker selectedValue={priority} onValueChange={(item) => setPriority(item)}>
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <Button title="Save Task" onPress={saveTask} />
    </View>
  );
}