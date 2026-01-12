// ==UserScript==
// @name         Danbooru Auto limit:200
// @namespace    https://danbooru.donmai.us/
// @version      2026-01-12___01-27-06
// @description  Danbooru Auto limit:200
// @author       RykaDev
// @match        https://danbooru.donmai.us/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donmai.us
// @updateURL    https://github.com/rykadev/my-greasemonkey-scripts/raw/refs/heads/main/scripts/danbooru_auto_limit200.user.js
// @downloadURL  https://github.com/rykadev/my-greasemonkey-scripts/raw/refs/heads/main/scripts/danbooru_auto_limit200.user.js
// ==/UserScript==

(function() {
    'use strict';
    const add_limit_200 = url => {
        try{
            if(url == "") return url; // TypeError: Failed to construct 'URL': Invalid URL
            const _url = new URL(url);
            const {pathname, searchParams} = _url;
            if(pathname != '/' && pathname != '/posts')
                return url;

            const tags = searchParams.get('tags')?.split(' ') ?? [];
            if(!tags.find(n => n == 'limit:200')){
                searchParams.set('tags', [...tags, 'limit:200'].join(' '));
                return _url.toString();
            }
        }catch(e){
            console.error(`URL: "${url}"`);
            console.error(e);
        }
        return url;
    }

    const first_url = window.location.href;
    const main_url = add_limit_200(first_url);
    if(main_url != first_url){
        window.location.href = main_url;
        return;
    }

    [...document.querySelectorAll('a')].forEach(a => a.href = add_limit_200(a.href));
})();