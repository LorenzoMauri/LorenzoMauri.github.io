
// prende in ingresso i parametry dell'url (dopo il simbolo $ e diviso da &)
function urlParser() {
  var urlString = (window.location.href)//.toLowerCase();
  var url = new URL(urlString);
  var city = url.searchParams.get("city");
  return city;
  }
  
var a = 0
function update(a){
  var b = 9
  return b+a
}  





var data =  [
   {cat: "Ristorante", value: 20, group : 'lecco',venduto:1000},
   {cat: "Bar", value: 10,group : 'lecco',venduto:2000},
   {cat: "Gelateria", value: 8,group : 'milano',venduto:359200},
   {cat: "Hotel", value: 5,group : 'milano',venduto:900000},
   {cat: "Piadineria", value: 10,group : 'lecco',venduto:900},
   {cat: "Pub", value: 10,group : 'milano',venduto: 1346803}
];


//console.log(city)
document.addEventListener("DOMContentLoaded", function(){
  var city = urlParser()
 
  d3.csv("https://raw.githubusercontent.com/LorenzoMauri/LorenzoMauri.github.io/master/DATIcartellaDiProva.csv")
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
