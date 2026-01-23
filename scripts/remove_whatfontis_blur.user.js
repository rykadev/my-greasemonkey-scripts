// ==UserScript==
// @name         Disable WhatFontIs Blur
// @namespace    https://www.whatfontis.com/
// @version      2026-01-23___12-47-56
// @description  Disable WhatFontIs Blur
// @author       RykaDev
// @updateURL    https://github.com/rykadev/my-greasemonkey-scripts/raw/refs/heads/main/scripts/remove_whatfontis_blur.user.js
// @downloadURL  https://github.com/rykadev/my-greasemonkey-scripts/raw/refs/heads/main/scripts/remove_whatfontis_blur.user.js
// @match        https://www.whatfontis.com/*
// @icon         https://www.whatfontis.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const styleSheet = document.createElement("style");

    styleSheet.textContent = `
.blur{
    filter: unset !important;
    color: #212529;
    text-shadow: unset;
}
`;
    document.head.appendChild(styleSheet);
})();