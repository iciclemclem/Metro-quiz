let mode = "home";
let currentLine = 1;
let currentQuestion = null;

function goHome() {
  document.getElementById("ui").innerHTML = `
    <h2>Choisis une ligne</h2>
    ${lines.map(l =>
      `<button onclick="startLine(${l.id})">Ligne ${l.id}</button>`
    ).join("")}
  `;

  renderMap();
}

function startLine(line) {
  currentLine = line;
  startQuiz();
}

function startQuiz() {
  nextQuestion();
}

function pickWeightedStation() {

  const pool = stations.filter(s => s.lines.includes(currentLine));

  const weighted = [];

  pool.forEach(s => {
    const stats = getStationStats(s.id);

    const weight = 1 / (stats.ease || 1);

    for (let i = 0; i < weight * 10; i++) {
      weighted.push(s);
    }
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
}

function nextQuestion() {

  currentQuestion = pickWeightedStation();

  document.getElementById("ui").innerHTML = `
    <h2>Ligne ${currentLine}</h2>
    <p>👉 Trouve : <b>${currentQuestion.name}</b></p>
  `;

  renderMap(currentLine, handleClick);
}

function handleClick(station) {

  const correct = station.id === currentQuestion.id;

  updateStation(station.id, correct);

  document.getElementById("ui").innerHTML = correct
    ? `<h2>✔ Correct</h2><p>${station.name}</p>`
    : `<h2>✖ Faux</h2><p>Bonne réponse : ${currentQuestion.name}</p>`;

  renderMap(currentLine, handleClick, currentQuestion.id);

  setTimeout(nextQuestion, 900);
}

goHome();