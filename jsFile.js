// variabili globali
var filteredData;
var data ; 


var cities = urlParser().split(',') // "lecco,milano" -> ["lecco", "milano"]

var margin = {
  top: 50,
  right: 30,
  bottom: 90,
  left: 100
};
var width = 460 - margin.left - margin.right;
var height = 450 - margin.top - margin.bottom;


// prende in ingresso i parametry dell'url (dopo il simbolo $ e diviso da &)
function urlParser() {
  var urlString = (window.location.href) //.toLowerCase();
  var url = new URL(urlString);
  var city = url.searchParams.get("city");
  return city;
}

function aggregatorSold(filteredData) {
  var counter = 0
  for (i = 0; i < filteredData.length; i++) {
    a = parseInt(filteredData[i].methodValue, 10)

    var counter = a + counter

  }
  return counter
}



function lastMonth() {
  var data = filteredData
  if (!filteredData);

  var dates = []
  for (i = 0; i < 10; i++) {
    dates.push(filteredData[i].data)
  }
  filteredData = data.filter((d) => d.month == 3) ;
  return filteredData
  }




function animateTitle() {
  // Wrap every letter in a span
  var textWrapper = document.querySelector('.ml3');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({
      loop: false
    })
    .add({
      targets: '.ml3 .letter',
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 1000,
      delay: (el, i) => 150 * (i + 1)
    }).add({
      targets: '.ml3',
      opacity: 100,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}

function showPage() {
  animateTitle();
  setTimeout(loadData, 0); // il setTimeout simula il caricamento dei dati
}

function showStatsContainer() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("statsContainer").style.display = "block";
  document.getElementById("lastMonthButton").disabled = false;
}
function load_Data(){ // successivamente rinominare in loadData 
console.log(8)}
// quando carico all'inizio la pagina,
// questa funzione deve caricare tutti i dati 

function update(){

console.log(8)}
// questa funzione aggiorna l'istogramma successivamente
// alla selezione di un filtro 






function loadData() {

  d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/detailsPanelData.csv")
    .get(function (data) {
      var data = data ;
      
      filteredData = data.filter((data) => cities.includes(data.city));

      //console.log(filteredData)

      var counter = aggregatorSold(filteredData)

      document.getElementById('infoCity').textContent = cities.join(", ");
      document.getElementById('numRowsCsv').textContent = data.length
      document.getElementById('infoVenduto').textContent = (counter / 1e06).toFixed(2);

      document.getElementById('infoProvince').textContent = filteredData[0].province
      document.getElementById('infoRegion').textContent = filteredData[0].region
      document.getElementById('infoMacroRegion').textContent = filteredData[0].macroRegion

      showStatsContainer();



      // da qui in poi la variabile data viene cambiata per costruire il grafico 
      // a barre 


      var data = []
      for (i = 0; i < filteredData.length; i++) {
        dict = {
          'paymentMethod': filteredData[i]['method'],
          'Value': filteredData[i].methodValue / 1000
        }
        data.push(dict)
      }
    


      
      
      // set the dimensions and margins of the graph
      var margin = {top: 80, right: 30, bottom: 30, left: 100},
          width = 500 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
      
      // set the ranges
      var y = d3.scaleBand()
                .range([height, 0])
                .padding(0.1);
      
      var x = d3.scaleLinear()
                .range([0, width]);
                
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
      
        
                
      
        // Scale the range of the data in the domains
        x.domain([0, d3.max(data, function(d){ return d.Value; })])
        y.domain(data.map(function(d) { return d.paymentMethod; }));
        //y.domain([0, d3.max(data, function(d) { return d.sales; })]);
      
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            //.attr("x", function(d) { return x(d.sales); })
            .attr("width", function(d) {return x(d.Value); } )
            .attr("y", function(d) { return y(d.paymentMethod); })
            .attr("height", y.bandwidth())
            ;
            
        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
      
        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));



    });
}

// document.addEventListener("DOMContentLoaded", loadData);




//const canva = d3.select('.canva');
//const svg = canva.append('svg')
//.attr('width','500')
//.attr('height','500');
//svg.append('rect').attr('x','10').attr('y','20')