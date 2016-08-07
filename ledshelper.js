/**
 * Created by anatal on 8/7/16.
 */

const child_process = require('child_process');
const shelloutAsync = (command, params) => child_process.fork(command, params.split(' '));

module.exports = {

    keywordspot: function () {
        shelloutAsync('leds.js --processing');
    },

    processing: function () {
        shelloutAsync('leds.js --processing');

    },

    deviceready: function () {
        shelloutAsync('leds.js --deviceready');
    },

    response: function () {
        shelloutAsync('leds.js --response');
    },

    listening: function () {
        shelloutAsync('leds.js --listening');
    },

    error: function () {
        shelloutAsync('leds.js --error');
    },
}

