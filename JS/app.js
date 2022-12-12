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
 $("#updateForm").hide();
 $("#btn-login").click(login);
 $("#btn-logout").click(logout);

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
    updateVideo(updateID);
  });

  $('#showUpdateForm').click(function(){
    showUpdateForm();
  })
});


//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
var userID = sessionStorage.getItem('userID')
//Create a form data object 
submitData = new FormData(); 
 
//Get form variables and append them to the form data object 
submitData.append('Title', $('#Title').val());
submitData.append('userID', userID); 
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
    success: function(){ 
       console.log('SUCCESS');
       $("#newVideoForm")[0].reset();
    } 

});

}

function showUpdateForm(){
  $('#newVideoForm').toggle(); 
  $('#updateForm').toggle();
}

 
function updateVideo(id){
  var id = sessionStorage.getItem('id', updateID)
  updateData = new FormData(); 
  //Get form variables and append them to the form data object 

  updateData.append('Title', $('#updateTitle').val());
  updateData.append('Producer', $('#updateProducer').val()); 
  updateData.append('Publisher', $('#updatePublisher').val());
  updateData.append('Genre', $('#updateGenre').val());
  updateData.append('AgeRating', $('#updateAgeRating').val());
   
  $.ajax({
    url: UIVURI1 + id + UIVURI2,
    data: updateData,      
    cache: false, 
    enctype: 'multipart/form-data', 
    type: 'PUT',
    contentType: false, 
    processData: false,
    success: function (msg) {
      $("#updateForm")[0].reset();
    }
  });
}
 
  function login() {
    window.location.href = "login.html";
  }

  function logout() {
    alert('You have logged out')
    window.location.href = "login.html";
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('userID')
  }