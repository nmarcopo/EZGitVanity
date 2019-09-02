// Assign common html objects to vars
var outputBlock = document.getElementById("output");

// Function for second button
document.getElementById("requestGitIo").addEventListener('click', function () {
    let githubURL = document.getElementById("githubURL").value
    // Regex to detect incorrectly formatted url
    if(!(/https?:\/\/.+\..+/g.test(githubURL))){
        // Sadly we need jQuery to trigger the modal
        $("#invalidModal").modal('show')
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
        outputBlock.innerHTML = "Request for custom URL sent! Please check to make sure that <a href=https://git.io/" + gitIoCode + " target=blank>https://git.io/" + gitIoCode + "</a> leads to your link. If it doesn't, verify that your vanity URL term is available, or check <a href=https://github.com/nmarcopo/EZGitVanity#faq target=blank>our FAQs</a> for more help.";
    });
});

// Only make "Request Vanity URL" button available when text is entered in both the 'code' and 'githubURL' section
function toggleRequestButton() {
    document.getElementById("requestGitIo").disabled = document.getElementById("githubURL").value === "" || document.getElementById("gitIoCode").value === "";
}

// Encode the 'code' so that it is compatible with the URL shortener
function encodeURL() {
    let gitIoCode = document.getElementById("gitIoCode").value;
    gitIoCode = encodeURI(gitIoCode);

    // Modify "output" text
    if (gitIoCode !== '') {
        outputBlock.innerHTML = "Check to make sure that <a href=https://git.io/" + gitIoCode + " target=blank>https://git.io/" + gitIoCode + "</a> contains the message:<br><code>No url found for " + gitIoCode + "</code><br>If it does, then you can place a request! Otherwise, please choose another vanity URL term.";
    } else {
        outputBlock.innerHTML = 'Please enter a Vanity URL term.';
    }

    toggleRequestButton();
}