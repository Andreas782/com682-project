//The URIs of the REST endpoint
CIV = "https://prod-00.centralus.logic.azure.com:443/workflows/a4eed56a3a8d48daacc5eff8b30b1985/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rG5WIFGai54YeNbq-WRND2jaxlBTJDlg_Ki7sOF42fM";
RAV = "https://prod-30.centralus.logic.azure.com:443/workflows/ae2121fe8ec14ecc82891dc96144928a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1KCWfrBSrmdtjztug3Ru-MbHo9VqPkNFE66IUvYmg18";
RIVURI1 = "https://prod-19.centralus.logic.azure.com/workflows/358ccfffe00b46de840b92cdb5bdee52/triggers/manual/paths/invoke/rest/v1/videos/";
RIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ep9DjiitxbleaU-d9O0pJVHuLCiyo-ofBby4MU1m9L0";

DIVURI1 = "https://prod-29.centralus.logic.azure.com/workflows/b032b5344e4d4b119cb8406b1b56ecfc/triggers/manual/paths/invoke/rest/v1/videos/";
DIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=unncd-rgefEsebKbTgInWxV0jGWgGfmMmRmPjKAxcgQ";

UIVURI1 = "https://prod-22.centralus.logic.azure.com/workflows/15fc38018e2240209590442e8da40da5/triggers/manual/paths/invoke/rest/v1/videos/";
UIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aXPOUWGGulzPsRxUxEwzfHMSl2kb319utw2cGoHedGM";

BLOB_ACCOUNT = "https://videostoragecom682.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

    //Run the get videos function
    getVideos();

  });

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  });

  $("#updateVideo").click(function(){
    updateVideo();
  });

});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

//Create a form data object 
submitData = new FormData(); 
 
//Get form variables and append them to the form data object 
submitData.append('Title', $('#Title').val());
submitData.append('userID', $('#userID').val()); 
submitData.append('Producer', $('#Producer').val()); 
submitData.append('Publisher', $('#Publisher').val());
submitData.append('Genre', $('#Genre').val());
submitData.append('AgeRating', $('#AgeRating').val());
submitData.append('File', $('#UpFile')[0].files[0]); 
 
//Post the form data  to the endpoint, note the need to set the content type header 
$.ajax({ 
    url: CIV, 
    data: submitData, 
    cache: false, 
    enctype: 'multipart/form-data', 
    contentType: false, 
    processData: false, 
    type: 'POST', 
    success: function(data){ 
       
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
          items.push( '<button id="updateVideo" type="button" class="btn btn-secondary" onclick=showUpdateForm("'+val.id+'")>Update Video</button> <br><br>');
          items.push( '<div id="vid-info" onclick=getVideo("'+val.id+'")><p>More Info</p></div> ');

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

    //A function to get the video of a file with a specific ID.
function getVideo(id){
$('#VideoInfo').html('<div id="infoDiv" class="spinner-borde smalldesc" role="status"><span class="sr-only">&nbsp;</span>');

$.getJSON(RIVURI1 + id + RIVURI2, function( data ) {

  var info = [];
  info.push( "Publisher: " + data.Publisher + "<br>");
  info.push( "Producer: " + data.Producer + " <br>");
  info.push( "Genre: " + data.Genre+ "<br>"); 
  info.push( "userID: " + data.userID+ "<br>");

$("<ul/>", {
  "class":"vid-info",
  html: info.join(""),
}).appendTo("#vid-info")
});

}
function showUpdateForm(id){

  $('#newVideoForm').hide();
  $('#updateForm').show();

  return id;
}

function updateVideo(id){

  updateData = new FormData(); 
  //Get form variables and append them to the form data object 

  updateData.append('Title', $('#updateTitle').val());
  // updateData.append('userID', $('#userID').val()); 
  updateData.append('Producer', $('#updateProducer').val()); 
  updateData.append('Publisher', $('#updatePublisher').val());
  updateData.append('Genre', $('#updateGenre').val());
  updateData.append('AgeRating', $('#updateAgeRating').val());
  updateData.append('File', $('#updateUpFile')[0].files[0]); 
   
  $.ajax({
    url: UIVURI1 + id + UIVURI2,
    data: updateData,      
    cache: false, 
    enctype: 'multipart/form-data', 
    type: 'PUT',
    contentType: false, 
    processData: false,
    success: function (msg) {

    }
  });
}

function search(){
  
  var input;
  input = document.getElementById('search-bar');

  }
