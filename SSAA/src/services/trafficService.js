export const fetchTraffic = async () => {
  const levels = ["Low", "Medium", "Heavy"];
  const random = levels[Math.floor(Math.random() * levels.length)];

  return {
    level: random,
    message:
      random === "Heavy"
        ? "⚠️ Heavy traffic! Plan ahead"
        : "Smooth traffic",
  };
};