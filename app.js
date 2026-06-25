// app.js
import { MetroMap } from './map.js';

function handleStationClick(station) {
    const hud = document.getElementById('quiz-hud');
    // On affiche maintenant la zone géographique (ex: Paris 1er, Bagneux...)
    hud.innerHTML = `
        <strong>${station.name}</strong> (${station.zone})<br>
        <span style="font-size:0.85rem; color:#8e8e93;">Lignes : ${station.lines.join(', ')}</span>
    `;
    
    map.highlightStation(station.id, 'success');
    setTimeout(() => map.resetHighlights(), 800);
}

const map = new MetroMap('map-wrapper', handleStationClick);
document.addEventListener('DOMContentLoaded', () => {
    map.init();
});
