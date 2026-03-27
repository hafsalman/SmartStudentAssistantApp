import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import { AppContext } from "../context/AppContext";

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const { setTaskCount } = useContext(AppContext);

  const fetchTasks = async () => {
    const data = await loadTasks();
    setTasks(data);
    setTaskCount(data.length);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTasks);
    return unsubscribe;
  }, []);

  const deleteTask = (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const updated = tasks.filter((t) => t.id !== id);
          await saveTasks(updated);
          fetchTasks();
        },
      },
    ]);
  };

  return (
    <View>
      <Button title="Add Task" onPress={() => navigation.navigate("Form")} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No Study Tasks</Text>}
        renderItem={({ item }) => (
          <View>
            <Text onPress={() => navigation.navigate("Details", { task: item })}>
              {item.title} ({item.priority})
            </Text>

            <Button title="Edit" onPress={() => navigation.navigate("Form", { task: item })} />
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}