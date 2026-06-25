// data.js
export const METRO_DATA = {
    lines: {
        "1": { name: "Ligne 1", color: "#FFCD00", textColor: "#000000" },
        "4": { name: "Ligne 4", color: "#BB4D00", textColor: "#FFFFFF" },
        "14": { name: "Ligne 14", color: "#622289", textColor: "#FFFFFF" }
    },
    stations: [
        // Ligne 1
        { id: "la_defense", name: "La Défense", lines: ["1"], x: 50, y: 100 },
        { id: "charles_de_gaulle_etoile", name: "Charles de Gaulle - Étoile", lines: ["1", "2", "6"], x: 150, y: 100 },
        { id: "chatelet", name: "Châtelet", lines: ["1", "4", "7", "11", "14"], x: 300, y: 180 },
        { id: "nation", name: "Nation", lines: ["1", "2", "6", "9"], x: 450, y: 180 },
        
        // Ligne 4 (du Nord au Sud, croise Châtelet)
        { id: "porte_de_clignancourt", name: "Porte de Clignancourt", lines: ["4"], x: 300, y: 40 },
        { id: "barbes_rochechouart", name: "Barbès - Rochechouart", lines: ["4", "2"], x: 300, y: 90 },
        { id: "mairie_de_montrouge", name: "Mairie de Montrouge", lines: ["4"], x: 300, y: 320 },

        // Ligne 14 (Diagonale, croise Châtelet)
        { id: "saint_lazare", name: "Saint-Lazare", lines: ["14", "3", "12", "13"], x: 200, y: 120 },
        { id: "olympiades", name: "Olympiades", lines: ["14"], x: 400, y: 280 }
    ]
};
