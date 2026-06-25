let mode = "home";
let currentLine = null;
let currentQuestion = null;
let score = 0;

function goHome() {
  mode = "home";
  document.getElementById("ui").innerHTML = `
    <h2>Choisis une ligne</h2>
    ${lines.map(l =>
      `<button onclick="selectLine(${l.id})">Ligne ${l.id}</button>`
    ).join("")}
  `;

  renderMap();
}

function setMode(m) {
  mode = m;
  goHome();
}

function selectLine(lineId) {
  currentLine = lineId;

  if (mode === "quiz") startQuiz();
  if (mode === "revision") showRevision();
}

function showRevision() {
  document.getElementById("ui").innerHTML =
    `<h2>Révision Ligne ${currentLine}</h2>`;

  renderMap(currentLine);
}

function startQuiz() {

  score = 0;

  nextQuestion();
}

function nextQuestion() {

  const filtered = stations.filter(s =>
    s.lines.includes(currentLine)
  );

  currentQuestion =
    filtered[Math.floor(Math.random() * filtered.length)];

  document.getElementById("ui").innerHTML = `
    <h2>Quiz Ligne ${currentLine}</h2>
    <p>👉 Trouve : <b>${currentQuestion.name}</b></p>
    <p>Score : ${score}</p>
  `;

  renderMap(currentLine, handleAnswer);
}

function handleAnswer(station) {

  const ui = document.getElementById("ui");

  if (station.id === currentQuestion.id) {
    score++;

    ui.innerHTML = `
      <h2>✔ Bonne réponse</h2>
      <p>${station.name}</p>
      <p>Score : ${score}</p>
    `;
  } else {
    ui.innerHTML = `
      <h2>✖ Faux</h2>
      <p>Bonne réponse : ${currentQuestion.name}</p>
      <p>Score : ${score}</p>
    `;
  }

  setTimeout(nextQuestion, 800);
}

// init
goHome();