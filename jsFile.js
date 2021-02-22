
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
      
                        //console.log(filteredData)  

                        var counter = aggregatorSold(filteredData)

                        //console.log(counter)

                        document.getElementById('infoCity').textContent = city;
                        document.getElementById('infoVenduto').textContent = counter + ' euro';
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







