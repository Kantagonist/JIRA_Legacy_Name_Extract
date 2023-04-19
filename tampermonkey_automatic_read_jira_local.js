// ==UserScript==
// @name         Create commit message
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  copies the JIRA Tag and description and preformats the commit message, can also create standard pathname
// @author       https://github.com/Kantagonist
// @match        https://<your-hostname-here>/*
// @icon         <your-icon-address-here>
// @grant        none
// ==/UserScript==

document.addEventListener("keypress", onKeydown);

function onKeydown(event) {

     let hasPressed1 = event.keyCode == 49
     let hasPressed2 = event.keyCode == 50

    // runs script if "1" or "2" key is pressed
    if (hasPressed1 || hasPressed2) {

        // get ticket number
        let ticketNumber = document.querySelector('[data-issue-key]').innerText;

        // get ticket summary
        let ticketSummary = document.getElementById('summary-val').innerText;

        // create output string
        let result = ''
        if (hasPressed1) {
            result += '[' + ticketNumber + '] ' + ticketSummary + '\n\n\n\{\}'
        } else {
            result += ticketNumber + '_' + ticketSummary.replaceAll(' ', '_').replaceAll(':', '');
        }

        // write to clipboard
        navigator.clipboard.writeText(result);

        // debug
        console.log('copied to clipboard:\n' + result)
    }
}
