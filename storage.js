const STORAGE_KEY = "metro_quiz_progress_v3";

function loadProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getStationStats(id) {
  const data = loadProgress();
  return data[id] || {
    success: 0,
    fail: 0,
    ease: 1
  };
}

function updateStation(id, success) {
  const data = loadProgress();

  if (!data[id]) {
    data[id] = { success: 0, fail: 0, ease: 1 };
  }

  if (success) {
    data[id].success++;
    data[id].ease *= 1.05; // plus facile → moins fréquent
  } else {
    data[id].fail++;
    data[id].ease *= 0.7; // plus difficile → plus fréquent
  }

  saveProgress(data);
}