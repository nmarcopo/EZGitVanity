$(document).ready(function(){
    // Function that executes for first button
    $("#checkCodeAvailable").click(function(){
        //properly encode URL
        // call php
        $.post("resources/gitsubmit.php",
                {
                    // pass POST queries
                    request: "check",
                    url: $("#githubURL").val(),
                    code: $("#gitIoCode").val()
                },
                function(data){
                    // display response
                    $('#output').html(data);
                });
    });

    // Function for second button
    $("#requestGitIo").click(function(){
        $.post("resources/gitsubmit.php",
                {
                    // pass queries
                    request: "submit",
                    url: $("#githubURL").val(),
                    code: $("#gitIoCode").val()
                },
                function(data){
                    // display response
                    $('#output').html(data);
                });
    });
});

// Only make "Check Availability" button available when text is entered in the 'code' section
function toggleAvailableButton(){
    if($("#gitIoCode").val() != ""){
        document.getElementById("checkCodeAvailable").disabled = false;
    }else{
        document.getElementById("checkCodeAvailable").disabled = true;
    }
}

// Only make "Request Vanity URL" button available when text is entered in both the 'code' and 'githubURL' section
function toggleRequestButton(){
    if($("#githubURL").val() != "" && $("#gitIoCode").val() != ""){
        document.getElementById("requestGitIo").disabled = false;
    }else{
        document.getElementById("requestGitIo").disabled = true;
    }
}

// Encode the 'code' so that it is compatible with the URL shortener
function encodeURL(){
    document.getElementById("gitIoCode").value = decodeURI(document.getElementById("gitIoCode").value);
    document.getElementById("gitIoCode").value = encodeURI(document.getElementById("gitIoCode").value);

    // Modify "output" text
    if(document.getElementById("gitIoCode").value !== ''){
        $('#output').html(`Check availability for the URL: https://git.io/${document.getElementById("gitIoCode").value}`);
    }else{
        $('#output').html('Please enter a Vanity URL term.');
    }
    
    toggleRequestButton();
    toggleAvailableButton();
}