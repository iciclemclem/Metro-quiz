// map.js
import { METRO_DATA } from './data.js';

export class MetroMap {
    constructor(containerId, onStationClick) {
        this.container = document.getElementById(containerId);
        this.onStationClick = onStationClick; // Callback quand on clique sur une station
        this.svg = null;
    }

    init() {
        if (!this.container) return;
        
        // Création du SVG avec une viewBox adaptative (Largeur 500, Hauteur 400 pour notre schéma)
        this.container.innerHTML = `
            <svg id="metro-svg" viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <g id="svg-lines"></g>
                <g id="svg-stations"></g>
            </svg>
        `;
        
        this.svg = document.getElementById('metro-svg');
        this.render();
    }

    render() {
        const linesContainer = document.getElementById('svg-lines');
        const stationsContainer = document.getElementById('svg-stations');

        // 1. Dessiner les lignes (Relier les stations qui partagent une ligne)
        // Pour un proto simple, on trace des lignes directes entre stations partageant la même ligne
        Object.keys(METRO_DATA.lines).forEach(lineId => {
            const lineInfo = METRO_DATA.lines[lineId];
            const lineStations = METRO_DATA.stations.filter(s => s.lines.includes(lineId));
            
            // Tracé d'un chemin simple liant les stations de la ligne dans l'ordre du tableau
            if (lineStations.length > 1) {
                let pathData = `M ${lineStations[0].x} ${lineStations[0].y}`;
                for (let i = 1; i < lineStations.length; i++) {
                    pathData += ` L ${lineStations[i].x} ${lineStations[i].y}`;
                }

                const polyline = document.createElementNS("http://www.w3.org/2000/svg", "path");
                polyline.setAttribute("d", pathData);
                polyline.setAttribute("stroke", lineInfo.color);
                polyline.setAttribute("stroke-width", "6");
                polyline.setAttribute("fill", "none");
                polyline.setAttribute("stroke-linecap", "round");
                polyline.setAttribute("stroke-linejoin", "round");
                linesContainer.appendChild(polyline);
            }
        });

        // 2. Dessiner les stations (Les points cliquables)
        METRO_DATA.stations.forEach(station => {
            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.setAttribute("class", "station-node");
            group.setAttribute("data-id", station.id);

            // Le rond de la station
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", station.x);
            circle.setAttribute("cy", station.y);
            circle.setAttribute("r", station.lines.length > 1 ? "8" : "6"); // Plus grand si correspondance
            circle.setAttribute("fill", "#FFFFFF");
            circle.setAttribute("stroke", "#000000");
            circle.setAttribute("stroke-width", "2");

            // Le texte (Nom de la station) - décalé légèrement vers le haut
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", station.x);
            text.setAttribute("y", station.y - 12);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "10");
            text.setAttribute("font-family", "sans-serif");
            text.setAttribute("font-weight", "bold");
            text.textContent = station.name;

            group.appendChild(circle);
            group.appendChild(text);

            // Événement de clic/touch
            group.addEventListener('click', () => {
                if (this.onStationClick) {
                    this.onStationClick(station);
                }
            });

            stationsContainer.appendChild(group);
        });
    }

    // Méthode pour colorer une station (ex: Vert si juste, Rouge si faux)
    highlightStation(stationId, className) {
        const node = this.svg.querySelector(`[data-id="${stationId}"] circle`);
        if (node) {
            node.setAttribute("class", className);
        }
    }

    // Réinitialiser les couleurs des stations
    resetHighlights() {
        this.svg.querySelectorAll('.station-node circle').forEach(circle => {
            circle.removeAttribute("class");
        });
    }
}
