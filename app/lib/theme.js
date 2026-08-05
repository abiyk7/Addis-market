export const COLORS = {
  parchment: "#EFEADC",
  parchmentDark: "#E3DAC0",
  card: "#FBF8EF",
  ink: "#241A12",
  inkSoft: "#5B4A3A",
  coffee: "#4A3222",
  coffeeDark: "#2E1F14",
  gold: "#C6952F",
  goldDark: "#A87A22",
  rust: "#9A3E2B",
  forest: "#2E5339",
};

export const CATEGORIES = [
  { id: "cars", amh: "መኪኖች", en: "Cars", emoji: "🚗" },
  { id: "realestate", amh: "ቤቶች", en: "Real Estate", emoji: "🏠" },
  { id: "electronics", amh: "ኤሌክትሮኒክስ", en: "Electronics", emoji: "📱" },
  { id: "furniture", amh: "የቤት እቃዎች", en: "Furniture", emoji: "🛋️" },
  { id: "fashion", amh: "አልባሳት", en: "Fashion", emoji: "👗" },
  { id: "jobs", amh: "ስራዎች", en: "Jobs", emoji: "💼" },
  { id: "other", amh: "ሌላ", en: "Other", emoji: "📦" },
];

export const catById = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[6];
