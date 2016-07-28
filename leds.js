/**
 * Created by anatal on 7/28/16.
 */

"use strict"

var LedBar = require('nascent-ledbar');

var interval = 250;

module.exports = {


    appstarted: function(){

        var idxled = 0;
        var interval = 50;
        LedBar.turnOffLeds();
        const setled = (idxled) => {
            console.log('idxled', idxled);
            LedBar.setLed(idxled, 0, 50, 0, 0);
            idxled++;
            if (idxled < 16){
                setTimeout(setled, interval, idxled);
            } /*else {
             LedBar.turnOffLeds();
             setTimeout(setled, interval, 0);
             } */
        };

        setled(0);

    },

    deviceready: function(){
        LedBar.turnOffLeds();
    },

    keyworddeteted: function(){
        LedBar.turnOffLeds();
    },

    processing: function(){
        LedBar.turnOffLeds();
    },

    playingresponse: function(){
        LedBar.turnOffLeds();
    }

}

