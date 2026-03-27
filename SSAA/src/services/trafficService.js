export const fetchTraffic = async (area) => {
  if (!area) {
    return {
      level: "Unknown",
      message: "Please enter an area",
    };
  }

  const normalized = area.toLowerCase().trim();

  const trafficData = {
    karachi: "Heavy",
    lahore: "Medium",
    islamabad: "Low",
  };

  let level = trafficData[normalized];

  if (!level) {
    const levels = ["Low", "Medium", "Heavy"];
    level = levels[Math.floor(Math.random() * levels.length)];
  }

  return {
    level,
    message:
      level === "Heavy"
        ? "⚠️ Heavy traffic! Plan ahead"
        : level === "Medium"
        ? "🚗 Moderate traffic"
        : "✅ Smooth traffic",
  };
};