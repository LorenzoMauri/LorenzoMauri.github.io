function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    url = "https://lorenzomauri.github.io/index.html";

    var viz = new tableau.Viz(containerDiv, url);
}

initViz();