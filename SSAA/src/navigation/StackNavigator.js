import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import TaskFormModal from "../screens/TaskFormModal";
import WeatherScreen from "../screens/WeatherScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TaskListScreen} />
      <Stack.Screen name="Details" component={TaskDetailScreen} />
      <Stack.Screen
        name="Form"
        component={TaskFormModal}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>
  );
}