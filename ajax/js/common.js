$(document).ready(function(){


$('.main-slider').slick();


	$.ajax({
		type:"GET",
		url:"https://api.themoviedb.org/3/movie/popular?api_key=4e274d69e45505fb8c29905cf475a0dd",
		dataType:"json",
		success:function(ajaxdata, textStatus, jqXHR) {
			var data = ajaxdata.results;
			var html = "";
			
			data.forEach(function(v,i){ // value,index
				html +="<h3>"+(i+1)+"위 : "+v.title+"<br><img style='' src='https://image.tmdb.org/t/p/w500/"+v.poster_path+"'>"+"</h3>"

				console.log();
			});
			$(".title").html(html);

			

			//var array = [1,2,3,4,5];
			//array.forEach( function( v, i ){
			//  if( v === 3 ){
			//	console.log( v + ":" + i); 
			//  }
			//}); 

		},
		error:function( jqXHR, textStatus, errorThrown ) {
			console.log(error);
		}
	}); // $.ajax

});