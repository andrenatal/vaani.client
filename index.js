/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

// first we load the config file
var fs = require('fs');
var config = JSON.parse(process.env.VAANI_CONFIG || fs.readFileSync("config.json"));
var logging = require('./logging');


// then all required modules
const Wakeword = require('wakeword');
const audiotools = require('./audiotools.js');
const servertools = require('./servertools.js');
//const leds = require('./leds.js');
const MemoryStream = require('memorystream');

function listen() {

  // variables for the vad
  var streamvad = null;
  var wakeTime = 0;
  var secsSilence = 0;
  var abort;

  logging.setup('222219191919');

  const resetlisten = () => {
      if (streamvad){
          streamvad.end();
          streamvad = null;
      }
      Wakeword.resume();
      Wakeword.pause();
      abort = true;
  };
  
  Wakeword.listen([config.wakeword], config.kwscore, (data, word) => {

        let samples;
        // this block is executed only the first time after the kw get spotted per iteration
        if (!streamvad) {
          //leds.keywordspot();
          audiotools.greeting();
          servertools.connectServer(Wakeword, audiotools);
          streamvad = new MemoryStream();
          wakeTime = Date.now();
          abort = false;
        }

        streamvad.write(data);

        while ((samples = streamvad.read(config.VAD_BYTES))) {
          secsSilence = audiotools.vad(samples);
          servertools.streamToServer(samples);
        }

        if ((Date.now() - wakeTime > config.MAX_LISTEN_TIME) || (secsSilence >=  config.MAX_SIL_TIME) || abort) {
          audiotools.endsound();
          resetlisten();
          servertools.endStreamToServer();
        }
    },
    () => {
        logging.addmetric("category", "action", "label", 987654321);
        audiotools.setup(Wakeword, config);
        //leds.deviceready();
        servertools.setup(Wakeword, config, audiotools, resetlisten);
    }
  );
}

listen();
