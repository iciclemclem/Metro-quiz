// map.js
import { METRO_DATA } from './data.js';

export class MetroMap {
    constructor(containerId, onStationClick) {
        this.container = document.getElementById(containerId);
        this.onStationClick = onStationClick;
        this.svg = null;
        
        // Bornes géographiques de l'Île-de-France ajustées au réseau métro (pour le cadrage)
        this.geoBounds = {
            minLng: 2.2200, // Ouest (La Défense)
            maxLng: 2.4600, // Est (Vincennes)
            minLat: 48.7100, // Sud (Orly)
            maxLat: 48.9300  // Nord (Mairie de Saint-Ouen)
        };
        
        // Dimensions logiques de notre espace de dessin SVG
        this.svgWidth = 800;
        this.svgHeight = 800;
    }

    init() {
        if (!this.container) return;
        
        // Injection du SVG avec une ViewBox carrée et propre
        this.container.innerHTML = `
            <svg id="metro-svg" viewBox="0 0 ${this.svgWidth} ${this.svgHeight}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <g id="svg-lines"></g>
                <g id="svg-stations"></g>
            </svg>
        `;
        
        this.svg = document.getElementById('metro-svg');
        this.render();
    }

    // Convertit les coordonnées GPS (Lat, Lng) en pixels (X, Y) pour le SVG
    project(lat, lng) {
        // Échelle Linéaire (Mercator simplifiée pour une petite zone comme Paris)
        const x = ((lng - this.geoBounds.minLng) / (this.geoBounds.maxLng - this.geoBounds.minLng)) * this.svgWidth;
        
        // En SVG, l'axe Y est inversé (le haut est 0), donc on soustrait à la hauteur max
        const y = this.svgHeight - (((lat - this.geoBounds.minLat) / (this.geoBounds.maxLat - this.geoBounds.minLat)) * this.svgHeight);
        
        return { x, y };
    }

    render() {
        const linesContainer = document.getElementById('svg-lines');
        const stationsContainer = document.getElementById('svg-stations');

        // Nettoyage au cas où
        linesContainer.innerHTML = '';
        stationsContainer.innerHTML = '';

        // 1. DESSINER LES LIGNES
        Object.keys(METRO_DATA.lines).forEach(lineId => {
            const lineInfo = METRO_DATA.lines[lineId];
            
            // On récupère et projette les stations de cette ligne
            const lineStations = METRO_DATA.stations
                .filter(s => s.lines.includes(lineId))
                .map(s => this.project(s.gps.lat, s.gps.lng));
            
            // Si on a assez de points, on trace la ligne
            if (lineStations.length > 1) {
                let pathData = `M ${lineStations[0].x} ${lineStations[0].y}`;
                for (let i = 1; i < lineStations.length; i++) {
                    pathData += ` L ${lineStations[i].x} ${lineStations[i].y}`;
                }

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", pathData);
                path.setAttribute("stroke", lineInfo.color);
                path.setAttribute("stroke-width", "5");
                path.setAttribute("fill", "none");
                path.setAttribute("stroke-linecap", "round");
                path.setAttribute("stroke-linejoin", "round");
                linesContainer.appendChild(path);
            }
        });

        // 2. DESSINER LES STATIONS
        METRO_DATA.stations.forEach(station => {
            const { x, y } = this.project(station.gps.lat, station.gps.lng);

            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.setAttribute("class", "station-node");
            group.setAttribute("data-id", station.id);

            // Le point blanc de la station
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", station.lines.length > 1 ? "8" : "5"); // Plus gros si correspondance
            circle.setAttribute("fill", "#FFFFFF");
            circle.setAttribute("stroke", "#1c1c1e");
            circle.setAttribute("stroke-width", "2");

            // Le texte (Nom + Arrondissement en plus petit)
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y - 12); // Décalé vers le haut par défaut
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "11");
            text.setAttribute("font-family", "-apple-system, BlinkMacSystemFont, sans-serif");
            text.setAttribute("font-weight", "600");
            text.setAttribute("fill", "#1c1c1e");
            text.textContent = station.name;

            group.appendChild(circle);
            group.appendChild(text);

            // Gestion de l'interaction tactile/clic
            group.addEventListener('click', () => {
                if (this.onStationClick) this.onStationClick(station);
            });

            stationsContainer.appendChild(group);
        });
    }

    highlightStation(stationId, className) {
        const node = this.svg.querySelector(`[data-id="${stationId}"] circle`);
        if (node) node.setAttribute("class", className);
    }

    resetHighlights() {
        this.svg.querySelectorAll('.station-node circle').forEach(circle => {
            circle.removeAttribute("class");
        });
    }
}
