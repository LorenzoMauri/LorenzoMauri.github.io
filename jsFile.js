
// prende in ingresso i parametry dell'url (dopo il simbolo $ e diviso da &)
function urlParser() {
  var urlString = (window.location.href)//.toLowerCase();
  var url = new URL(urlString);
  var city = url.searchParams.get("city");
  return city;
  }
  


document.addEventListener("DOMContentLoaded", function(){
  var city = urlParser()
 
  d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/data.csv")
    .get(function(data) {
      var filteredData = (data.filter((data)=> data.citta == city))
      
      console.log(filteredData)  

      var counter = 0 
      for (i=0;i<filteredData.length;i++){
        a = parseInt(filteredData[i].venduto,10)
        
        var counter = a + counter
    }

console.log(counter)
        document.getElementById('infoCity').textContent = city;
        document.getElementById('infoVenduto').textContent = counter + ' euro';
    });
  


  
});
