function checkDomain() {
    var domain = document.getElementById("domainName").value;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_vnnuwc6V7pZHWpV35cMw9ss5EOyC1&domainName=" + domain, true);

    // xhr.open("GET", "https://domain-availability.whoisxmlapi.com/api/v1?apiKey=YOURAPIKEY&domainName=" + domain, true);
    // https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_vnnuwc6V7pZHWpV35cMw9ss5EOyC1&domainName=google.com

    xhr.onload = function () {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var result = document.getElementById("result");
            if (response.DomainInfo.domainAvailability == "AVAILABLE") {
                result.innerHTML = "<span id='good-response'> Congratulations! <span class='inserted-domain'> " + domain + "</span> is available!</span>";
            } else {
                result.innerHTML = "<span id='bad-response'>Sorry, <span class='inserted-domain'> " + domain + "</span> is not available!</span>";
            }
        }
        else {
            console.log(xhr.responseText);
        }
    };

    xhr.send();
}

// Get the input field
var input = document.getElementById("domainName");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("domainCheck").click();
    }
});