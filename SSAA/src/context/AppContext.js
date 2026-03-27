import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [weather, setWeather] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [taskCount, setTaskCount] = useState(0);

  return (
    <AppContext.Provider
      value={{
        selectedArea,
        setSelectedArea,
        weather,
        setWeather,
        traffic,
        setTraffic,
        taskCount,
        setTaskCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};