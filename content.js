
try{
	var dataTable = document.getElementsByTagName("table")[4];
	var cells =Array.from(dataTable.getElementsByTagName("td")).slice(9 , -1); 
	cells.forEach(webTMSFunction);
}
catch (e) {
	console.log("Extension works");
	
	// Select the node that will be observed for mutations
	var targetNode = document.getElementById('content');
	console.log(targetNode);
	// Options for the observer (which mutations to observe)
	var config = { attributes: true, childList: true, subtree: true };

	// Callback function to execute when mutations are observed
	var callback = function(mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		console.log(mutationsList);
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {
				console.log('A child node has been added or removed.');
			}
			else if (mutation.type === 'attributes') {
				console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);

	// Later, you can stop observing
	observer.disconnect();







	// $("body").on('DOMSubtreeModified', "#content", function() {
	// 	try{
	// 		console.log('course table loaded');

	// 		// var dataTable = document.getElementsByTagName("table")[0];
	// 		// var cells =Array.from(dataTable.getElementsByTagName("td")); 
	// 		// cells.forEach(bannerFuntion);
					
	// 		var cells =Array.from(document.getElementsByClassName("email")); 
	// 		cells.forEach(bannerFuntion);
		
	// 	}
	// 	catch(e){
	// 		console.log('course table not loaded yet');

	// 	}
	// });

	// id="table1" , class="email"

           
	
}
var counter = 0;


function bannerFuntion(value, index, array) {
	console.log(value);
		  try{
			  console.log(value.parentNode);
			  var prof_name_plain_text = value.innerHTML;
			  console.log(prof_name_plain_text);
			  var prof_name_api_query = prof_name_plain_text.replace(/ /g, "+");
  
			  var api_url = "https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?solrformat=true&rows=20&wt=json&json.wrf=noCB&callback=noCB&q=" + prof_name_api_query + "+AND+schoolid_s%3A1521&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=20&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s&fq=";
			  console.log(api_url);
  
			  var api_response_json = ""
			  var proffesor_key = 0
			  $.get(api_url, function(response, status){
				  api_response_json =  JSON.parse( JSON.stringify(response.replace(new RegExp(/\)$/) , '').replace("noCB(" , "") ) );
				  try {
				  proffesor_key = JSON.parse( api_response_json)["response"]["docs"][0]["pk_id"];
						var professor_url  = "https://cors-anywhere.herokuapp.com/http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" +  proffesor_key +"&showMyProfs=true";
						$.get(professor_url, function(response) {
							try {
								  parser = new DOMParser();
								  doc = parser.parseFromString(response, "text/html")
								  var professor_quality_score = doc.getElementsByClassName("RatingValue__Numerator-qw8sqy-2 gxuTRq")[0].innerHTML;
								  if (professor_quality_score < 1){
									value.parentNode.style.backgroundColor = "rgb(#FF0000)";                                 

								  }
								  else if (professor_quality_score > 1 && professor_quality_score < 2){
									value.parentNode.style.backgroundColor = "rgb(#FF3c00)";                                 

								  }
								  else if (professor_quality_score > 2 && professor_quality_score < 3){
									value.parentNode.style.backgroundColor = "rgb(#FF9600)";                                 

								  }
								  else if (professor_quality_score > 3 && professor_quality_score < 4){
									value.parentNode.style.backgroundColor = "rgb(#FFfa00)";                                 

								  }
								  else if (professor_quality_score > 4 && professor_quality_score <= 5){
									value.parentNode.style.backgroundColor = "rgb(#17ff00)";                                 

								  }
								} 
							catch (e) {console.log("Proffessor request Error" , e);}
						});  
				}
				  catch (e) {console.log("Professor ID Error" , e);}
				});    
			}
			catch (e){
				console.log(e)
			 }
		
  
		
}





function webTMSFunction(value, index, array) {
	
	if (index % 10 == 0){

	  if (index == 0) { return; }
		try{
			var prof_name_plain_text = array[index+ ((index /10) - 1) ].innerHTML;
			var prof_name_api_query = prof_name_plain_text.replace(/ /g, "+");

			var api_url = "https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?solrformat=true&rows=20&wt=json&json.wrf=noCB&callback=noCB&q=" + prof_name_api_query + "+AND+schoolid_s%3A1521&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=20&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s&fq=";
			console.log(api_url);

			var api_response_json = ""
			var proffesor_key = 0
			$.get(api_url, function(response, status){
				api_response_json =  JSON.parse( JSON.stringify(response.replace(new RegExp(/\)$/) , '').replace("noCB(" , "") ) );
				try {
				proffesor_key = JSON.parse( api_response_json)["response"]["docs"][0]["pk_id"];
					  var professor_url  = "https://cors-anywhere.herokuapp.com/http://www.ratemyprofessors.com/ShowRatings.jsp?tid=" +  proffesor_key +"&showMyProfs=true";
					  $.get(professor_url, function(response) {
						  try {
								parser = new DOMParser();
								doc = parser.parseFromString(response, "text/html")
								var professor_quality_score = doc.getElementsByClassName("RatingValue__Numerator-qw8sqy-2 gxuTRq")[0].innerHTML;
								array[index+ ((index /10) - 1) ].innerHTML = array[index+ ((index /10) - 1) ].innerHTML + " (" +professor_quality_score + ")";
								array[index+ ((index /10) - 1) ].style.backgroundColor = "hsl(120, " + 100 +"%,"+ (professor_quality_score) * 10 + "%)";                                 
								if (professor_quality_score <= 1){
									array[index+ ((index /10) - 1) ].style.backgroundColor = "#FF0000";                                 

								  }
								  else if (professor_quality_score > 1 && professor_quality_score < 2){
									array[index+ ((index /10) - 1) ].style.backgroundColor = "#FF3c00";                                 

								  }
								  else if (professor_quality_score > 2 && professor_quality_score < 3){
									array[index+ ((index /10) - 1) ].style.backgroundColor = "#FF9600";                                 

								  }
								  else if (professor_quality_score > 3 && professor_quality_score < 4){
									array[index+ ((index /10) - 1) ].style.backgroundColor = "#FFfa00";                                 

								  }
								  else if (professor_quality_score > 4 && professor_quality_score <= 5){
									array[index+ ((index /10) - 1) ].style.backgroundColor = "#17ff00";                                 

								  }

							  } 
						  catch (e) {console.log("Proffessor request Error" , e);}
					  });  
			  }
				catch (e) {console.log("Professor ID Error" , e);}
			  });    
		  }
		  catch (e){
			  console.log(e)
		   }
	  }

}
