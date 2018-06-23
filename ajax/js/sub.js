$(document).ready(function(){
	var url = window.location.search;
	var querySplite = url.split('?')[1];
	var queryData = querySplite.split('&');
	
	var object = {}
	for(var i in queryData){
		var separate = queryData[i].split('=');
		var dataKey = separate[0];
		var dataValue = separate[1];
		object[dataKey] = dataValue // 객체에 배열로 키,값 추가하는 방법
	}

	$.ajax({
			type:"GET",
			url:"https://api.themoviedb.org/3/movie/"+object.id+"?api_key=4e274d69e45505fb8c29905cf475a0dd",
			dataType:"json",
			success:function(ajaxdata, textStatus, jqXHR) {
				var data = ajaxdata;
				$(".contents h2").text(data.original_title);
				//$(".contents-text .decs").text(data.overview);
				//console.log(data.original_title);
			},
			error:function( jqXHR, textStatus, errorThrown ) {
				console.log(error);
			}

	});


	$.ajax({
		type:"GET",
		url:"https://api.themoviedb.org/3/movie/"+object.id+"/credits?api_key=4e274d69e45505fb8c29905cf475a0dd",
		dataType:"json",
		success:function(ajaxdata, textStatus, jqXHR) {
			var dataCrew = ajaxdata.crew;
			var dataCast = ajaxdata.cast;
			var html = "";
			var html2 = '';
			//감독, 역할 
			dataCrew.forEach(function(v,i){
				if(i <= 5){
					html += '<dl class="col-4"> '+
						'<dt>'+v.name+'</dt>' +
						'<dd>'+v.job+'</dd>' +
					'</dl>'
				}
			});
			$(".crew-group").html(html);


			//캐스팅 
			dataCast.forEach(function(v,i){
				if(i <= 3){
					html2+='<li class="col-3">'+
						'<img src="https://image.tmdb.org/t/p/w500'+v.profile_path+'"/>'+
						'<p class="casting">'+v.name+'</p>'+
						'<span>'+v.character+'</span>'
					'</li>'					
				}
			});
			$(".billed-group").html(html2);

		}
	});

	//배경이미지 (poster)

		$.ajax({
			type:"GET",
			url:"https://api.themoviedb.org/3/movie/"+object.id+"/images?api_key=4e274d69e45505fb8c29905cf475a0dd",
			dataType:"json",
			success:function(ajaxdata, textStatus, jqXHR) {
				var backimgData = ajaxdata.posters;
				var html = '';


				backimgData.forEach(function(v,i){
					if(i <= 10 ){
						html +='<p class="back-img" style="background-image:url(https://image.tmdb.org/t/p/w500'+v.file_path+');"></p>'
						console.log(123);
					}
				});
				
				$(".sub-slider").html(html);

				$(".sub-slider").slick({
					arrows: false,
					dots: false //true
				});

			}

		});




});