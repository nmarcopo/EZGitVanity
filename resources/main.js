// Assign common html objects to vars
var outputBlock = document.getElementById("output");

// Function that executes for first button
document.getElementById("checkCodeAvailable").addEventListener('click', function() {
    //properly encode URL
    // call php
    let gitIoCode = document.getElementById("gitIoCode").value;
    outputBlock.innerHTML = "Check to make sure that <a href=https://git.io/" + gitIoCode + " target=blank>https://git.io/" + gitIoCode + "</a> contains the message:<br><code>No url found for " + gitIoCode + "</code><br>If it does, then you can place a request! Otherwise, please choose another vanity URL term.";
});

// Function for second button
document.getElementById("requestGitIo").addEventListener('click', function () {
    let githubURL = document.getElementById("githubURL").value
    if(!(/https?:\/\//g.test(githubURL))){
        outputBlock.innerHTML = "Please format your original GitHub URL using http:// or https://.";
        return;
    }

    let gitIoCode = document.getElementById("gitIoCode").value;
    fetch("https://git.io/", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "url=" + $("#githubURL").val() + "&code=" + $("#gitIoCode").val(),
    }).then(function () {
        outputBlock.innerHTML = "Request for custom URL sent! Please check to make sure that <a href=https://git.io/" + gitIoCode + " target=blank>https://git.io/" + gitIoCode + "</a> leads to your link. If it doesn't, verify that your vanity URL term is available.";
    });
});

// Only make "Check Availability" button available when text is entered in the 'code' section
function toggleAvailableButton() {
    document.getElementById("checkCodeAvailable").disabled = $("#gitIoCode").val() === "";
}

// Only make "Request Vanity URL" button available when text is entered in both the 'code' and 'githubURL' section
function toggleRequestButton() {
    document.getElementById("requestGitIo").disabled = $("#githubURL").val() === "" || $("#gitIoCode").val() === "";
}

// Encode the 'code' so that it is compatible with the URL shortener
function encodeURL() {
    document.getElementById("gitIoCode").value = decodeURI(document.getElementById("gitIoCode").value);
    document.getElementById("gitIoCode").value = encodeURI(document.getElementById("gitIoCode").value);

    // Modify "output" text
    if (document.getElementById("gitIoCode").value !== '') {
        outputBlock.innerHTML = `Check availability for the URL: https://git.io/${document.getElementById("gitIoCode").value}`;
    } else {
        outputBlock.innerHTML = 'Please enter a Vanity URL term.';
    }

    toggleRequestButton();
    toggleAvailableButton();
}