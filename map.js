function renderMap(activeLine = null, onStationClick = null) {

  const container = document.getElementById("map");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // LIGNES
  lines.forEach(line => {

    const path = stations.filter(s => s.lines.includes(line.id));

    for (let i = 0; i < path.length - 1; i++) {

      const a = path[i];
      const b = path[i + 1];

      const el = document.createElementNS("http://www.w3.org/2000/svg", "line");

      el.setAttribute("x1", a.x);
      el.setAttribute("y1", a.y);
      el.setAttribute("x2", b.x);
      el.setAttribute("y2", b.y);

      el.setAttribute("stroke", line.color);
      el.setAttribute("stroke-width", "4");

      svg.appendChild(el);
    }
  });

  // STATIONS
  stations.forEach(s => {

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circle.setAttribute("cx", s.x);
    circle.setAttribute("cy", s.y);
    circle.setAttribute("r", "7");

    const visible =
      activeLine === null || s.lines.includes(activeLine);

    circle.setAttribute("fill", visible ? "white" : "#444");

    circle.style.cursor = "pointer";

    circle.onclick = () => {
      if (onStationClick) onStationClick(s);
    };

    svg.appendChild(circle);
  });

  container.innerHTML = "";
  container.appendChild(svg);
}