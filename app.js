let currentMode = "";
let selectedLine = null;

const selector = document.getElementById("lineSelector");
const content = document.getElementById("content");

createLineButtons();

function createLineButtons(){

    selector.innerHTML="";

    Object.keys(lines).forEach(line=>{

        const div=document.createElement("div");

        div.className="line-card";
        div.style.background=lines[line].color;
        div.style.color="#000";
        div.textContent=line;

        div.onclick=()=>selectLine(line);

        selector.appendChild(div);

    });

}

function showRevision(){
    currentMode="revision";
    content.innerHTML="<h2>Sélectionnez une ligne</h2>";
}

function showQuiz(){
    currentMode="quiz";
    content.innerHTML="<h2>Sélectionnez une ligne</h2>";
}

function selectLine(line){

    selectedLine=line;

    if(currentMode==="revision"){
        renderRevision();
    }

    if(currentMode==="quiz"){
        startQuiz();
    }

}

function renderRevision(){

    const data=lines[selectedLine];

    let html=`
        <h2>Ligne ${selectedLine}</h2>
        <div class="map">
    `;

    data.stations.forEach(station=>{

        html+=`
            <span style="color:${data.color}">
                ●
            </span>
        `;

    });

    html+=`</div><div class="station-list">`;

    data.stations.forEach(station=>{

        html+=`
            <div class="station">
                ${station}
            </div>
        `;

    });

    html+=`</div>`;

    content.innerHTML=html;

}

function startQuiz(){

    const data=lines[selectedLine];

    const target=
        data.stations[
            Math.floor(Math.random()*data.stations.length)
        ];

    let html=`
        <h2>Ligne ${selectedLine}</h2>

        <h3>Trouve :</h3>

        <p>${target}</p>

        <div class="map">
    `;

    data.stations.forEach(station=>{

        html+=`
        <span
            class="station-dot"
            onclick="checkAnswer('${station}','${target}')">
        </span>
        `;

    });

    html+=`</div>`;

    content.innerHTML=html;

}

function checkAnswer(clicked,target){

    if(clicked===target){

        alert("Bonne réponse ✅");

    }else{

        alert(
            "Mauvaise réponse ❌\n" +
            "Tu as choisi : " + clicked
        );

    }

    startQuiz();

}