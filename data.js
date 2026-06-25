const lines = [
  { id: 1, color: "#FFCD00" },
  { id: 4, color: "#BE418D" },
  { id: 14, color: "#62259D" }
];

// Stations simplifiées (V2 carte)
const stations = [
  // LIGNE 1
  { id: 1, name: "La Défense", x: 80, y: 250, lines: [1] },
  { id: 2, name: "CDG Étoile", x: 180, y: 250, lines: [1] },
  { id: 3, name: "Concorde", x: 280, y: 250, lines: [1,4,14] },
  { id: 4, name: "Châtelet", x: 380, y: 250, lines: [1,4,14] },
  { id: 5, name: "Bastille", x: 480, y: 250, lines: [1] },

  // LIGNE 4
  { id: 6, name: "Gare du Nord", x: 280, y: 120, lines: [4] },
  { id: 7, name: "Saint-Michel", x: 380, y: 350, lines: [4] },
  { id: 8, name: "Montparnasse", x: 380, y: 450, lines: [4] },

  // LIGNE 14
  { id: 9, name: "Saint-Lazare", x: 200, y: 150, lines: [14] },
  { id: 10, name: "Pyramides", x: 300, y: 200, lines: [14] },
  { id: 11, name: "Bercy", x: 500, y: 300, lines: [14] },
  { id: 12, name: "Olympiades", x: 600, y: 350, lines: [14] }
];