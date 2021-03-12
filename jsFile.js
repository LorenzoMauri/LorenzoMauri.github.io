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

// aggrega le informazioni sul venduto per metodo di pagamento
function aggregatorSold(data) {
  var counter = 0
  for (i = 0; i < data.length; i++) {
    a = parseInt(data[i].methodValue, 10)

    var counter = a + counter

  }
  return counter
}



function lastMonth(data) {
  if (!data){return ;};
  var filteredData = data.filter((d) => d.month == 3) ;
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

// mostra la pagina iniziale
function showPage() {
 
  animateTitle();
  setTimeout(loadData, 0); // il setTimeout simula il caricamento dei dati
}

function showStatsContainer() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("statsContainer").style.display = "block";
  document.getElementById("lastMonthButton").disabled = false;
}



function aggregatePaymentMethodValue(data){

const result = data.reduce((a, {paymentMethod, Value}) => {
    a[paymentMethod] = a[paymentMethod] || {paymentMethod,  Value: 0};
    a[paymentMethod].Value += Number(Value);
    return a;
  }, {}) ; 
return Object.values(result)}



// questi sono i valori che devono venire mostrati sulle barre



 
// quando carico all'inizio la pagina,
// questa funzione deve caricare tutti i dati 


// questa funzione aggiorna l'istogramma successivamente
// alla selezione di un filtro 


function updateHist(data){
  
  //console.log(data);
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
  x.domain([0, d3.max(data, function(d){ return d.Value*1.2; })])
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
}


function selectData(data){
  
  var array= []
      for (i = 0; i < data.length; i++) {
        dict = {
          'paymentMethod' : data[i]['method'],
          'Value' : data[i]['methodValue']
        }
      array.push(dict)
      };
 return array
  
}


function loadData() {

  d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/detailsPanelData.csv")
    .get(function (data) {
      
      filteredData = data.filter((data) => cities.includes(data.city));
      
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


      //console.log(filteredData)
      filteredData= selectData(filteredData)
      filteredData = aggregatePaymentMethodValue(filteredData)

 
//console.log(filteredData)
//console.log(data)
      console.log(filteredData);
      updateHist(filteredData);



    })
};

// document.addEventListener("DOMContentLoaded", loadData);

function updateAllData(){
d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/detailsPanelData.csv")
    .get(function (data) {
      // filtro per città
      var filteredData = data.filter((data) => cities.includes(data.city));
      // filtro per mese 
      var filteredData = lastMonth(filteredData);
      console.log(filteredData)
      var counter = aggregatorSold(filteredData);

      document.getElementById('infoCity').textContent = cities.join(", ");
      document.getElementById('numRowsCsv').textContent = data.length
      document.getElementById('infoVenduto').textContent = (counter / 1e06).toFixed(2);

      document.getElementById('infoProvince').textContent = filteredData[0].province
      document.getElementById('infoRegion').textContent = filteredData[0].region
      document.getElementById('infoMacroRegion').textContent = filteredData[0].macroRegion

      showStatsContainer();



      // da qui in poi la variabile data viene cambiata per costruire il grafico 
      // a barre 


      //console.log(filteredData)
      var filteredData= selectData(filteredData)
      var filteredData = aggregatePaymentMethodValue(filteredData)

 
//console.log(filteredData)
//console.log(data)
      console.log(filteredData);
      updateHist(filteredData);



    })
};


//const canva = d3.select('.canva');
//const svg = canva.append('svg')
//.attr('width','500')
//.attr('height','500');
//svg.append('rect').attr('x','10').attr('y','20');