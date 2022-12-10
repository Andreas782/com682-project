CIU = "https://prod-105.westeurope.logic.azure.com:443/workflows/126f5609041f4231aa3cd62035746750/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TfEyJwrjGveb6EsNmFZKb5ALd9MtvlEPQqSwRF3mvYo";

loginURI = "https://prod-246.westeurope.logic.azure.com:443/workflows/1d48914ba1a74b03a1fd2ab3b10c0ba7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lLuDPk90192pJEUkcq1_pi1BEiYzTgL8FI1Plk_Gr1c";

$(document).ready(function() {

$("#signUp").click(function(){
    $("#signUp-form").toggle();
    $("#login-form").toggle();
});
$("#signUp-button").click(function(){
    signUp();
});

$("#login-form-button").click(function(){
    login();
});

});

function login(){
    var email = $('#email-field').val();
    var password = $('#password-field').val();
    if (email === "andreas@email.com" && password === "password") {
        window.location.href = "index.html";
        sessionStorage.setItem('token', 'auth-token')
        alert("You have successfully logged in.")
    }
    if (email === "user@email.com" && password === "password") {
        alert("You have successfully logged in.")
        window.location.href = "dashboard.html";
    }   
    if (email != "user@email.com" && email != "andreas@email.com"){
        alert("You have entered invalid user info")
    }
}

function signUp(){
    signUpData = new FormData(); 
 
//Get form variables and append them to the form data object 
signUpData.append('FirstName', $('#FirstName').val());
signUpData.append('LastName', $('#LastName').val()); 
signUpData.append('Email', $('#Email').val()); 

$.ajax({
    url: CIU,
    data: signUpData,
    type: 'POST',
    enctype: 'multipart/form-data', 
    cache: false, 
    contentType: false, 
    processData: false,
    success: function(){ 
        console.log('SUCCESS');
    }
});
 
}