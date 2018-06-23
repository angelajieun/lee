$(document).ready(function(){

	$.ajax({
		type:"GET",
		url:"https://api.themoviedb.org/3/movie/popular?api_key=4e274d69e45505fb8c29905cf475a0dd",
		dataType:"json",
		success:function(ajaxdata, textStatus, jqXHR) {
			var data = ajaxdata.results;
			var html = "";
			
			data.forEach(function(v,i){ // value,index
				if(i <= 4){ // TOP5만 보여주기
					html +=
								'<div class="main-visual" style="background-image:url(https://image.tmdb.org/t/p/w500'+v.poster_path+');">' +
									'<div class="main-text-wrap">' +
										'<h1>'+v.title+'</h1>' +
										'<p class="sub-text">'+v.overview+'</p>' +
									'</div>' +
									'<div class="more-btn"><a href="sub.html?id='+v.id+'&lang='+v.original_language+'">MORE</a></div>' + 
								'</div>'
				}
			});
			$(".main-slider").html(html);

			$('.main-slider').slick({
					arrows:false,
					dots:true
			});
		},
		error:function( jqXHR, textStatus, errorThrown ) {
			console.log(error);
		}
	}); // $.ajax

	
});