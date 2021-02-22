
// prende in ingresso i parametry dell'url (dopo il simbolo $ e diviso da &)
function urlParser() {
  var urlString = (window.location.href)//.toLowerCase();
  var url = new URL(urlString);
  var city = url.searchParams.get("city");
  return city;
  }
  
function aggregatorSold(filteredData){
  var counter = 0 
  for (i=0;i<filteredData.length;i++){
        a = parseInt(filteredData[i].venduto,10)
        
        var counter = a + counter
      
    }
    return counter
}

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 100,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 2600);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

var margin = {top: 50, right: 30, bottom: 90, left: 100},
width = 460 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;



document.addEventListener("DOMContentLoaded", function(){
  var city = urlParser()
  
 
  d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/data.csv")
    .get(function(data) {
                        var filteredData = (data.filter((data)=> data.citta == city))
      
                        console.log(filteredData)  

                        var counter = aggregatorSold(filteredData)

                        //console.log(filteredData[0].provincia)

                        document.getElementById('infoCity').textContent = city;
                        document.getElementById('infoVenduto').textContent = counter + ' euro';
                        
                        document.getElementById('infoProvince').textContent= filteredData[0].provincia
                        document.getElementById('infoRegion').textContent= filteredData[0].regione
                        document.getElementById('infoMacroRegion').textContent= filteredData[0].macroregione


                        
                        // da qui in poi la variabile data viene cambiata per costruire il grafico 
                        // a barre 
                        
                        
                        var data = []
                        for (i=0;i<filteredData.length;i++){
                          dict = {'Country' : filteredData[i]['payment method'],
                                  'Value' : parseInt(filteredData[i].venduto,10)}
                          data.push(dict)
                        }
                        //console.log(data)

                       
                    // append the svg object to the body of the page
                    var svg = d3.select(".canva")
                      .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform",
                              "translate(" + margin.left + "," + margin.top + ")");
                    
                    // Parse the Data

                    //console.log(data)
                    // X axis
                    var x = d3.scaleBand()
                      .range([ 0, width ])
                      .domain(data.map(function(d) { return d.Country; }))
                      .padding(0.2);
                    svg.append("g")
                      .attr("transform", "translate(0," + height + ")")
                      .call(d3.axisBottom(x))
                      .selectAll("text")
                        .attr("transform", "translate(-10,0)rotate(-45)")
                        .style("text-anchor", "end");
                    
                    // Add Y axis
                    var count = 0
                    for (i=0;i<data.length;i++){
                      value = parseInt(data[i].Value,10)
                      if(value > count){
                        count = value
                    
                      }
                 
                    }
                    
      
                    var y = d3.scaleLinear()
                      .domain([0, count*1.3])
                      .range([ height, 0]);
                    svg.append("g")
                    .call(d3.axisLeft(y));

// Bars


svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Country); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })
    .on('mouseover',function(d){document.getElementById('infoVenduto').textContent = d.Value + 'euro' })
    .on('mouseout',function(d){document.getElementById('infoVenduto').textContent = counter + ' euro' })
    //on('mouseout',)
    

// Animation
svg.selectAll("rect")
  .transition()
  .duration(900)
  .attr("y", function(d) { return y(d.Value); })
  .attr("height", function(d) { return height - y(d.Value); })
  
  .delay(function(d,i){console.log(i) ; return(i*100)})
  


  
  
    
    
    
    
                          });
  


  
                          });

                          //



//const canva = d3.select('.canva');
//const svg = canva.append('svg')
                          //.attr('width','500')
                          //.attr('height','500');
//svg.append('rect').attr('x','10').attr('y','20')







