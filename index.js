// ==UserScript==
// @name         Auto Movie Player
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.nnn.ed.nico/courses/*/chapters/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ed.nico
// @grant        none
// @require      https://code.jquery.com/jquery-3.7.1.js
// @run-at      document-end
// ==/UserScript==

(function () {
    'use strict';
    let intervalId = undefined;

    setTimeout(() => {
        $(".cmgDL").after('<button id="stop-button">Stop Play</button>');
        $(".cmgDL").after('<button id="start-button">Start Play</button>');

        let changeColor = (state) => {
            if(state) {
                $("#start-button").css("background-color","lightgreen");
                $("#stop-button").css("background-color","");
            } else {
                $("#start-button").css("background-color","");
                $("#stop-button").css("background-color","tomato");
            }
        }

        changeColor(false);

        console.log($("#stop-button"));
        $("#stop-button").on('click', () => {
            console.log("stop");
            changeColor(false);
            clearInterval(intervalId);
        });


        $("#start-button").on('click', () => {
            console.log("start!!");
            changeColor(true);

            intervalId = setInterval(() => {
                if($('iframe').contents().find('video').get(0).ended){
                    console.log("ended!!");
                    setTimeout(() => {
                        const playList = $('ul[aria-label="必修教材リスト"] > li > .cpELFc > .cqkVcF');
                        // const playNotDoneElement = $('ul[aria-label="必修教材リスト"] > li > .hoWVG > .cqkVcF');
                        const playListRaw = playList.get();
                        playListRaw[playListRaw.length - 1].click();
                    }, 1000);
                }

            }, 3000);
        });
    }, 2000);
})();
