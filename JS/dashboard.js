RAV = "https://prod-30.centralus.logic.azure.com:443/workflows/ae2121fe8ec14ecc82891dc96144928a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1KCWfrBSrmdtjztug3Ru-MbHo9VqPkNFE66IUvYmg18";

RIVURI1 = "https://prod-19.centralus.logic.azure.com/workflows/358ccfffe00b46de840b92cdb5bdee52/triggers/manual/paths/invoke/rest/v1/videos/";
RIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ep9DjiitxbleaU-d9O0pJVHuLCiyo-ofBby4MU1m9L0";

BLOB_ACCOUNT = "https://videostoragecom682.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function() {
    getVideos();
});

function search(){
    const searchInput = document.querySelector('#search-input');
    const searchTerm = searchInput.value;
    const videos = document.querySelectorAll('#videos video');
    
    videos.forEach((video) => {
        if (video.src.includes(searchTerm)) {
        video.style.display = 'block';
        } else {
        video.style.display = 'none';
        }
    });
}

//A function to get a list of all the assets and write them to the Div with the VideoList Div
function getVideos(){
  //Replace the current HTML in that div with a loading message 
  $('#VideoList').html('<div id="videoDiv" class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>'); 
 
  $.getJSON(RAV, function( data ) { 
 
    //Create an array to hold all the retrieved videos 
    var items = []; 
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data 
      $.each( data, function( key, val ) { 
          items.push("<hr />");
          items.push( "Title: " + val["Title"] + "<br>");
          items.push( "Age Rating : " + val["AgeRating"] + "<br>"); 
          items.push( ' <video controls> <source src="'+BLOB_ACCOUNT+val.filePath+'" type="video/mp4" /></video> ');
          items.push( '<button type="button" id="delVids" class="btn btn-danger" onclick=deleteVideo("'+val.id+'")>Delete</button> ');
          items.push( '<button id="showUpdateForm" type="button" class="btn btn-secondary" onclick=showUpdateForm("'+val.id+'");getID("'+val.id+'")>Update Video</button> <br><br>');
          items.push( '<div id="vid-info-"'+val.id+'" onclick=getVideo("'+val.id+'")><p>More Info</p></div> ');
          items.push("<hr />")
        });
     
      //Clear the videolist div  
      $('#VideoList').empty(); 
        
      //Append the contents of the items array to the VideoList Div 
      $( "<ul/>", { 
        "class": "my-new-list",
        "id": "my-new-list",
        html: items.join( "" )
      }).appendTo( "#VideoList" ); 
       }); 
}