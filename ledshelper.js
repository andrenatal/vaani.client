/**
 * Created by anatal on 8/7/16.
 */

const child_process = require('child_process');
const shelloutAsync = (command, params) => child_process.spawn(command, params.split(' '));

module.exports = {

    keywordspot: function () {
        shelloutAsync('node.js', 'leds.js --processing');
    },

    processing: function () {
        shelloutAsync('node.js', 'leds.js --processing');

    },

    deviceready: function () {
        shelloutAsync('node.js', 'leds.js --deviceready');
    },

    response: function () {
        shelloutAsync('node.js', 'leds.js --response');
    },

    listening: function () {
        shelloutAsync('node.js', 'leds.js --listening');
    },

    error: function () {
        shelloutAsync('node.js', 'leds.js --error');
    },
}

