RAV = "https://prod-30.centralus.logic.azure.com:443/workflows/ae2121fe8ec14ecc82891dc96144928a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1KCWfrBSrmdtjztug3Ru-MbHo9VqPkNFE66IUvYmg18";

DIVURI1 = "https://prod-29.centralus.logic.azure.com/workflows/b032b5344e4d4b119cb8406b1b56ecfc/triggers/manual/paths/invoke/rest/v1/videos/";
DIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=unncd-rgefEsebKbTgInWxV0jGWgGfmMmRmPjKAxcgQ";

RIVURI1 = "https://prod-19.centralus.logic.azure.com/workflows/358ccfffe00b46de840b92cdb5bdee52/triggers/manual/paths/invoke/rest/v1/videos/";
RIVURI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ep9DjiitxbleaU-d9O0pJVHuLCiyo-ofBby4MU1m9L0";

CURI = "https://prod-06.centralus.logic.azure.com:443/workflows/010e29ee37534493bbc9953abcce47be/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ntHl7bNs7bn50fdm4ccy84AcBrizxSBbKStJJ7oBbz0";

BLOB_ACCOUNT = "https://videostoragecom682.blob.core.windows.net";

//Handlers for page load
$(document).ready(function(){
getVideos();

$('#search-button').click(function(){
  search();
})

$('#clear-button').click(function(){
  clearSearch();
})

$('#btn-login').click(function(){
  window.location.href = "login.html"
})

$('#btn-logout').click(function(){
  window.location.href = "login.html"
  sessionStorage.removeItem('auth');
  sessionStorage.removeItem('userID');
})
});

function search(){
    const searchInput = document.querySelector('#search-bar');
    const searchTerm = searchInput.value;
    $('#videos-div').html('<div id="videoDiv" class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>'); 

    $.getJSON(RAV, function(data){
      var items = [];

      $.each(data, function (key, val){
        if (searchTerm == val.Title){
          items.push( ' Title: ' + val.Title + '<br>');
          items.push( ' <video controls> <source src="'+BLOB_ACCOUNT+val.filePath+'" type="video/mp4" /></video> ');
        }
      });

        //Clear the videolist div  
        $('#videos-div').empty(); 
    
        //Append the contents of the items array to the VideoList Div 
        $( "<ul/>", { 
          "class": "my-new-list",
          "id": "my-new-list",
          html: items.join( "" )
        }).appendTo( "#videos-div" ); 
          });
}
function clearSearch(){
  $('#videos-div').empty();
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
          items.push( "Title: " + val.Title + "<br>");
          items.push( "Age Rating : " + val.AgeRating + "<br>"); 
          items.push( ' <video controls> <source src="'+BLOB_ACCOUNT+val.filePath+'" type="video/mp4" /></video> ');
          if (sessionStorage.getItem('token') == 'auth-token') {
            items.push( '<button type="button" id="delVids" class="btn btn-danger" onclick=deleteVideo("'+val.id+'")>Delete</button> ');
            items.push( '<button id="showUpdateForm" type="button" class="btn btn-secondary" onclick=getUpdateID("'+val.id+'")>Update Video</button> <br><br>');};
          items.push( '<form id="comment-form"><input type="text" name="comment" id="comment" form="comment-form" placeholder="Add comment"><button type="button" id="comment-button" onclick=commentSub() form="comment=form">Submit</button></form>');
          items.push( '<div id="vid-info-'+val.id+'" ><button type="button" id="get-vid-button" onclick=getVideo("'+val.id+'")>MoreInfo</button></div> ');
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
  window.location.href = "index.html";
}

   //A function to get the video of a file with a specific ID.
   function getVideo(id){  
    var a = document.getElementById('vid-info-'+id)
    var info = [];
    $.getJSON(RIVURI1 + id + RIVURI2, function( data ) {
      info.push( "Publisher: " + data.Publisher + "<br>");
      info.push( "Producer: " + data.Producer + " <br>");
      info.push( "Genre: " + data.Genre+ "<br>"); 
      info.push( "<button onclick=clearInfo('"+id+"')>Clear</button>")

    $("<ul/>", {
      "class":"new-vid-info",
      "id": "new-vid-info",
      html: info.join(""),
    }).appendTo(a);
    });
  
  }
function clearInfo(id){
  var a = document.getElementById('vid-info-'+id)
  $(a).empty();
}

function commentSub(){
commentForm = new FormData();
commentForm.append('comment', $('#comment').val());

$.ajax({
  url: CURI,
  type: 'POST',
  data: commentForm,
  processData: false,
  contentType: false,
  Cache: false,
  success: function (msg) {
    $("#comment-form")[0].reset();
  }
});
}

