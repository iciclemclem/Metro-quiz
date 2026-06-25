// app.js
import { MetroMap } from './map.js';

// Fonction temporaire pour simuler le comportement au clic
function handleStationClick(station) {
    const hud = document.getElementById('quiz-hud');
    hud.innerHTML = `Station cliquée : <strong>${station.name}</strong> (Lignes: ${station.lines.join(', ')})`;
    
    // Exemple d'animation flash verte sur la station cliquée
    map.highlightStation(station.id, 'success');
    setTimeout(() => {
        map.resetHighlights();
    }, 1000);
}

// Initialisation de la carte dans le div #map-wrapper
const map = new MetroMap('map-wrapper', handleStationClick);
document.addEventListener('DOMContentLoaded', () => {
    map.init();
});
