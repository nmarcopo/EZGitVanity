<?php

if($_POST['request'] == 'check'){
    // check if code is set
    if(!validateField('code')){
        exit("Error, code not set.");
    }

    // check availability of code
    if(isCodeAvailable($_POST['code'])){
        exit("Vanity URL <a target=blank href=\"https://git.io/" . $_POST['code'] . "\">https://git.io/" . $_POST['code'] . "</a> is available. OK to request.");
    }else{
        exit("Vanity URL <a target=blank href=\"https://git.io/" . $_POST['code'] . "\">https://git.io/" . $_POST['code'] . "</a> is unavailable. Request Another.");
    }
}elseif($_POST['request'] == 'submit'){
    // check if fields are set
    if(!validateField('code') || !validateField('url')){
        exit("Error, one or more field is not set.");
    }
    $response = createShortLink($_POST['url'], $_POST['code']);
    exit($response);
}else{
    exit("Error: Request not recognized.");
}

// Validate if form fields are filled
function validateField($field){
    if($_POST[$field] == ""){
        return false;
    }else{
        consoleLog("$field is set. Proceeding with execution");
        return true;
    }
}

// Checks if vanity URL is available
function isCodeAvailable($code){
    $ch = curl_init();

    // Send a request to git.io
    curl_setopt($ch, CURLOPT_URL, "https://git.io/$code");
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    $result = curl_exec($ch);

    // Returns true if nobody has chosen that vanity yet.
    if(curl_getinfo($ch, CURLINFO_HTTP_CODE) == '404'){
        return true;
    }else{
        return false;
    }
}

// Attempts to create a git.io shortlink
function createShortLink($url, $code){
    // check if url is available
    if(!isCodeAvailable($code)){
        return "Cannot create link. Vanity URL <a href=\"https://git.io/$code\">https://git.io/$code</a> is taken.";
    }

    $ch = curl_init();

    // Set curl options
    curl_setopt($ch, CURLOPT_URL, "https://git.io");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "url=$url&code=$code");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 1);

    // add http headers
    $headers = array();
    $headers[] = "Content-Type: application/x-www-form-urlencoded";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // send request
    $headers = curl_exec($ch);    
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // $headers now has a string of the HTTP headers
    $headers = explode("\n", $headers);
    foreach($headers as $header) {
        if (stripos($header, 'Location:') !== false) {
            $header = substr($header, strlen('Location: ')); // get just the url
            break;
        }
    }

    // clean up the URL
    $header = rtrim($header);

    // return success or error message
    if($header == "https://git.io/$code"){
        return "Vanity URL has been created for <a href=$url>$url</a> at <a href=$header>$header</a>.";
    }else if(substr($header, 0, 7) === "Invalid"){
        return "Please enter your URL as \"http[s]://...\"";
    }else if(substr($header, 0, 4) === "Must"){
        return "Your URL must be a GitHub URL. Other URLs cannot be shortened with git.io.";
    }else{
        return "Vanity URL already exists for <a href=$url>$url</a> (<a href=$header>$header</a>) - you cannot create more than one vanity URL for the same page.<br>Tip: add an empty query (a question mark ('?')) to create a vanity URL for this page.<br>i.e. copy and paste this link into the GitHub URL field and try again:<br><a href=\"$url?\">$url?</a>";
    }

}

function consoleLog($message){
    echo "<script type='text/javascript'>console.log('$message');</script>";
}

?>
