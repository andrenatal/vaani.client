/**
 * Created by anatal on 7/28/16.
 */

"use strict"

var LedBar = require('nascent-ledbar');

var interval = 250;

module.exports = {

    deviceready: function(){
        var idxled = 0;
        var interval = 50;
        LedBar.turnOffLeds();
        const setled = (idxled) => {
            LedBar.setLed(idxled, 0, 50, 0);
            idxled++;
            if (idxled < LedBar.getNumLeds()){
                setTimeout(setled, interval, idxled);
            } /*else {
             LedBar.turnOffLeds();
             setTimeout(setled, interval, 0);
             } */
        };

        setled(0);
    },

    keywordspot: function(){
        LedBar.turnOffLeds();
        for (let i = 0; i < LedBar.getNumLeds(); i++){
            LedBar.setLed(i, 34, 129, 204);
        }
    },

    processing: function(){
        LedBar.turnOffLeds();
    },

    playingresponse: function(){
        LedBar.turnOffLeds();
    }

}

