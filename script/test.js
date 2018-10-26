
 jQuery(document).ready(function(){
      var temp;
      var ville;
      var apiKey = "526e1f3ea7c51a27506a1bdee27caee6";
      
      navigator.geolocation.getCurrentPosition(init);

    
      function miseAJour(_ville){ 
          
        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?q=" + _ville + "&units=metric&mode=JSON&appid="+ apiKey +"&cnt=3", function(data) {

            temp = data["main"]["temp"];
            ville = data["name"];
        
        
           //$("#ville").text("Ville " + ville);
           //$("#temperature1").text("Temperature " + temp + "°c");
           $("body").append("<h1>Ville : " + ville +"</h1>");
           $("body").append("<h2>Temperature : " + temp +"°c</h2>");
    
    
          }).fail(function(){
            //$("#ville").text("Ville inconnue");
            $("body").append("Ville inconnue : " +_ville);
          });
      }

      function init(position){
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
 
        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&units=metric&mode=JSON&appid="+ apiKey +"&cnt=3", function(data) {
            console.log(data); 
            temp = data["main"]["temp"];
            ville = data["name"];
        
        
           $("#ville").text("Ville " + ville);
           $("#temperature1").text("Temperature " + temp + "°c");
           
    
    
          }).fail(function(){
            $("#ville").text("Ville inconnue");
          });
      }

      $("#formVille").submit(function(event){
          event.preventDefault();
          miseAJour($("#nomville").val());
      })

});
