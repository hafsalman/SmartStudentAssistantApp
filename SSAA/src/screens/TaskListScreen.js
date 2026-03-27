import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import { AppContext } from "../context/AppContext";
import CuteButton from "../components/CuteButton";

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
      <CuteButton title="+ Add Task" onPress={() => navigation.navigate("Form")} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No Study Tasks</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFF",
              padding: 15,
              marginVertical: 10,
              borderRadius: 16,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>

            <Text>{item.subject}</Text>
            <Text>{item.priority}</Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <CuteButton
                title="View"
                onPress={() => navigation.navigate("Details", { task: item })}
              />

              <CuteButton
                title="Edit"
                color="#7F7EFF"
                onPress={() => navigation.navigate("Form", { task: item })}
              />

              <CuteButton
                title="Delete"
                color="#FF5C5C"
                onPress={() => deleteTask(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
    padding: 15,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  addBtnWrapper: {
    marginBottom: 15,
    alignSelf: "flex-start",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 12,
    borderRadius: 18,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subText: {
    fontSize: 13,
    color: "#666",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});