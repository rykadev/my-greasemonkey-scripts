// ==UserScript==
// @name         Disable SteamDB NSFW Blur
// @namespace    https://steamdb.info/
// @version      2026-01-12___00-52-17
// @description  Disable SteamDB NSFW Blurs
// @author       RykaDev
// @updateURL    https://github.com/rykadev/my-greasemonkey-scripts/raw/master/remove_steamdb_nsfw_filter.user.js
// @downloadURL  https://github.com/rykadev/my-greasemonkey-scripts/raw/master/remove_steamdb_nsfw_filter.user.js
// @match        https://steamdb.info/*
// @icon         https://steamdb.info/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Disable hover
    const styleSheet = document.createElement("style");

    styleSheet.textContent = `
.hover_screenshots_blur{
    filter: unset !important;
}
`;
    document.head.appendChild(styleSheet);

    // Auto click "View +18 screenshots" button
    const interval = setInterval(() => {
        const el = document.querySelector('#js-view-adult-screenshots');
        if(el){
            el.click();
            // clearInterval(interval); // Honestly the small performance benefit isn't worth the hassle with some edgecases where the button doesn't get clicked
        }
    }, 50);

})();