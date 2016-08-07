/**
 * Created by anatal on 7/28/16.
 */

"use strict"

var LedBar = require('nascent-ledbar');
var program = require('commander');

program
    .version('0.0.1')
    .option('--deviceready', 'Show Device ready')
    .option('--kws', 'Show Keyword spot')
    .option('--processing', 'Show Processing')
    .option('--response', 'Show response')
    .parse(process.argv);


    const deviceready = () => {
        var idxled = 0;
        var interval = 50;
        LedBar.turnOffLeds();
        const setled = (idxled) => {
            LedBar.setLed(idxled, 0, 50, 0);
            idxled++;
            if (idxled < LedBar.getNumLeds()){
                setTimeout(setled, interval, idxled);
            } else {
                cb();
            } /*else {
             LedBar.turnOffLeds();
             setTimeout(setled, interval, 0);
             } */
        };

        setled(0);
    };

    const keywordspot = () => {
        LedBar.turnOffLeds();
        for (let i = 0; i < LedBar.getNumLeds(); i++){
            LedBar.setLed(i, 34, 129, 204);
        }
    };

    const processing = () => {
        LedBar.turnOffLeds();
        var idxled = 0;
        var inverted = false;
        var interval = 50;
        LedBar.turnOffLeds();
        const setled = (idxled) => {
            console.log('idxled', idxled);
            if (inverted){
                LedBar.setLed(idxled, 0, 0, 0, 0);
                idxled--;
            } else {
                LedBar.setLed(idxled, 34, 129, 204, 0);
                idxled++;
            }
            if (idxled < 16){
                setTimeout(setled, interval, idxled);
            }

            if (idxled === 15) {
                inverted = true;
            } else if (idxled === 0) {
                inverted = false;
            }
        };
        setled(0);
    };

    const playingresponse = () => {
        LedBar.turnOffLeds();
    };

if (program.deviceready) deviceready();
if (program.kws) keywordspot();
if (program.processing) processing();
if (program.response) playingresponse();
