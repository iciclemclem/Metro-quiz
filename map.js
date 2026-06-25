function renderMap(activeLine = null, onClick = null, highlightId = null) {

  const container = document.getElementById("map");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // LIGNES
  lines.forEach(line => {
    const pts = stations.filter(s => s.lines.includes(line.id));

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

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

    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    c.setAttribute("cx", s.x);
    c.setAttribute("cy", s.y);
    c.setAttribute("r", highlightId === s.id ? 10 : 7);

    c.setAttribute("fill", highlightId === s.id ? "#00ff88" : "white");

    c.style.cursor = "pointer";

    const visible = !activeLine || s.lines.includes(activeLine);

    c.setAttribute("opacity", visible ? "1" : "0.2");

    c.onclick = () => onClick && onClick(s);

    svg.appendChild(c);
  });

  container.innerHTML = "";
  container.appendChild(svg);
}