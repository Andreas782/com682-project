RAV = "https://prod-30.centralus.logic.azure.com:443/workflows/ae2121fe8ec14ecc82891dc96144928a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1KCWfrBSrmdtjztug3Ru-MbHo9VqPkNFE66IUvYmg18";

RIVURI1 = "https://prod-19.centralus.logic.azure.com/workflows/358ccfffe00b46de840b92cdb5bdee52/triggers/manual/paths/invoke/rest/v1/videos/";
RIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ep9DjiitxbleaU-d9O0pJVHuLCiyo-ofBby4MU1m9L0";

BLOB_ACCOUNT = "https://videostoragecom682.blob.core.windows.net";

var updateID;


//Handlers for page load
$(document).ready(function(){
getVideos();

$('#comment').on('input', ':text', function(){
  comment();
})

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
          if (sessionStorage.getItem('token') == 'auth-token') {
            items.push( '<button type="button" id="delVids" class="btn btn-danger" onclick=deleteVideo("'+val.id+'")>Delete</button> ');
            items.push( '<button id="showUpdateForm" type="button" class="btn btn-secondary" onclick=getUpdateID("'+val.id+'")>Update Video</button> <br><br>');};
          items.push( '<input type="text" name="comment" id="comment" placeholder="Add comment">' );
          items.push( '<input type="number" name="rating" id="rating" placeholder="Add rating">' );
          items.push( '<div id="vid-info-"'+val.id+'" onclick=getVideo("'+val.id+'")><p>More Info</p></div> ');
          items.push("<hr />")
        });

      //Append the contents of the items array to the VideoList Div 
      $( "<ul/>", { 
        "class": "my-new-list",
        "id": "my-new-list",
        html: items.join( "" )
      }).appendTo( "#VideoList" ); 
       }); 
}

   //A function to delete an video with a specific ID.
//The id paramater is provided to the function as defined in the relevant on click handler
function deleteVideo(id){
  $.ajax({

    url: DIVURI1 + id + DIVURI2,
    type: 'DELETE',
    success: function (msg){
    }
  });
}

function showUpdateForm(){
  $('#newVideoForm').toggle(); 
  $('#updateForm').toggle();
}

function getUpdateID(id){
  updateID = id;
  sessionStorage.setItem('updateID', updateID)
}

   //A function to get the video of a file with a specific ID.
   function getVideo(id){
    $('#vid-info').html('<div id="infoDiv" class="spinner-borde smalldesc" role="status"><span class="sr-only">&nbsp;</span>');
    var a = "#vid-info-"+id+""
    $.getJSON(RIVURI1 + id + RIVURI2, function( data ) {
    
      var info = [];
      info.push( "Publisher: " + data.Publisher + "<br>");
      info.push( "Producer: " + data.Producer + " <br>");
      info.push( "Genre: " + data.Genre+ "<br>"); 
      info.push( "userID: " + data.userID+ "<br>");
    
    $("<ul/>", {
      "class":"vid-info",
      html: info.join(""),
    }).appendTo(a)
    });
  }

    //A function to get the video of a file with a specific ID.
function getVideo(id){
$('#vid-info').html('<div id="infoDiv" class="spinner-borde smalldesc" role="status"><span class="sr-only">&nbsp;</span>');
var a = "#vid-info-"+id+""
$.getJSON(RIVURI1 + id + RIVURI2, function( data ) {

  var info = [];
  info.push( "Publisher: " + data.Publisher + "<br>");
  info.push( "Producer: " + data.Producer + " <br>");
  info.push( "Genre: " + data.Genre+ "<br>"); 
  info.push( "userID: " + data.userID+ "<br>");

$("<ul/>", {
  "class":"vid-info",
  html: info.join(""),
}).appendTo(a)
});

}
function comment(){

}

function rate(){


}