(function (){

$(init);

function init()
{
  $("#searchMovie").click(searchMovie);


  function searchMovie()
  {
  	var title=$("#movieTitle").val();
  	//alert("serach movie"+title);
  	var table=$("#results");
  	var tbody=$("#results tbody");   //table.find("tbody");
  

  	$.ajax({

  		url:'http://www.omdbapi.com/?s='+title,
  		type:'GET',
  		datatype: 'JSON',
  		success: function(movies)
  		{
  			if(movies.Response=="True")
  			{
  				
  			
  			tbody.empty();
  				$("#errormsg").empty();
  			
  			
  			for(var m in movies.Search)
  			{
  				//console.log("hello");
  				//console.log("------>"+movies.Search[m].Title);
  				var movie=movies.Search[m];
  				
  				var title=movie.Title;
  				
  				var plot=movie.Type;

  				var posterurl=movie.Poster;
  				
  				var imbd=movie.imdbID;

  				var year=movie.Year;

  				var tr=$("<tr>");
  				var titleTd=$("<td>").append(title);
  				//var plotTd=$("<td"+plot+"<td>");
  				var yearplot=$("<td>").append(year);
  				var plott=$("<td>").append(plot);
  				var imdbplot=$("<td>").append(imbd);
  				var img=$("<img class=img-responsive >").attr("src",posterurl);
  				var posterTd=$("<td>").append(img);
  				//var postw=$("<td>").append()


  				//tr.append(posterurl);
  				tr.append(titleTd);
  				tr.append(plott);
  				tr.append(yearplot);
  				tr.append(imdbplot);
  				tr.append(posterTd)
  				tbody.append(tr);



  			}
  		}

  		else 
  		{


  			document.getElementById("errormsg").innerHTML="YOU ENTERED INCORRECT MOVIE NAME";
  			tbody.empty();

  		}
  	},
    error:function(){
      alert("Error loading file")
    }

  	});


  }

}

})();