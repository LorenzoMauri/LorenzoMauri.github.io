function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    url = "https://public.tableau.com/profile/lorenzo8599#!/vizhome/VIZ_16110635714310/Dashboard1?publish=yes";

    var viz = new tableau.Viz(containerDiv, url);
};

initViz();