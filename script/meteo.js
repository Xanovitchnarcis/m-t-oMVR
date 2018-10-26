
jQuery(document).ready(function(){
      var temp;
      var ville;
      var apiKey = "526e1f3ea7c51a27506a1bdee27caee6";
      
      navigator.geolocation.getCurrentPosition(init);

    
      function miseAJour(_ville){ 
        
        $("div#prevision").remove();
        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?q=" + _ville + "&units=metric&mode=JSON&type=like&appid="+ apiKey +"&cnt=3", function(data) {

            temp = data["main"]["temp"];
            ville = data["name"];
        
        
            $("#meteoActu #ville").text("Ville " + ville);
            $("#meteoActu #temperature").text("Temperature " + temp + "°c");
            prevision(_ville);
    
    
          }).fail(function(){
            $("#meteoActu #ville").text("Ville inconnue : " +_ville);
            $("#meteoActu #temperature").text("");
          });
      }

      function prevision(_ville){
          
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast?q=" + _ville + "&units=metric&mode=JSON&type=like&appid="+ apiKey+"" , function(data) {

            
            for(var x = 0, compteur=0;x<data["list"].length && compteur<5;x++){
                
                if(data["list"][x]["dt_txt"].search(getDateFormat()) == -1 && data["list"][x]["dt_txt"].search("12:00:00") != -1){ //Si c'est pas le date d'aujourd'hui
                   
                    console.log(data["list"][x]["dt_txt"]);
                    var date = data["list"][x]["dt_txt"].split(" ");
                    console.log(data["list"][x]["main"]["temp"]);
                    $("body").append("<div id='prevision'><h2>"+date[0]+"</h2><p>"+data["list"][x]["main"]["temp"]+"</p><p>"+data["list"][x]["main"]["humidity"]+"% d'humidité</p></div>");
                    compteur++;
                }
                
            }
          }).fail(function(){
            
            $("#meteoActu #ville").text("Ville inconnue : " +_ville);
            $("#meteoActu #temperature").text("");
          });
      }
      

      function init(position){
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
        
        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&units=metric&mode=JSON&appid="+ apiKey +"&cnt=3", function(data) {
            //console.log(data); 
            
            temp = data["main"]["temp"];
            ville = data["name"];
        

           $("#meteoActu #ville").text("Ville " + ville);
           $("#meteoActu #temperature").text("Temperature " + temp + "°c");
           
            prevision(ville);
    
          })
          getDateFormat();
      }

      $("#formVille").submit(function(event){
          event.preventDefault();
          miseAJour($("#nomville").val());
      })

      

    

});

function getDateFormat(){
    var dateActu = new Date();
    return(dateActu.getFullYear() + "-" + (dateActu.getMonth()+1)  + "-" + dateActu.getDate());

  }
