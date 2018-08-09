async function (a) {
  /* ACTION 1 - JS Action that loads external utils lib */
  (function () {
    var libURL = 'https://cdn.rawgit.com/TDCM-io/iio/6011fe8a09c5c08c7a0b73f288f8ab62cebdc490/utils.js', // Add valid URL to latest utils lib
      utilsEl = document.createElement('script'),
      scriptEl = document.querySelector("head script");

    utilsEl.type = "application/javascript";
    utilsEl.src = libURL;
    scriptEl.parentNode.insertBefore(utilsEl, scriptEl);
  })()
  /* END ACTION 1 */
}

/* ACTION 2 - time delay */
// In between Delay action of at least 5 sec
/* END ACTION 2 */

async function(a) {
  /* ACTION 3 - JS Action for parsing lib to JSON and assigning this.memory.utils */
  (function () {
    if (window.utils) {
      this.memory.utils = JSON.stringify(window.utils, function (key, val) {
        return (typeof val === 'function') ? (val + '') : val;
      });
    } else { console.log('Utils lib not loaded in the window.'); this.return(this.createData({ status: 'FAILURE', message: 'Utils lib not loaded in the window.' })) }
  }.bind(this))()
  /* END ACTION 3 */
}

// Code to parse utils lib 

async function(a) {
  /* ACTION 4 - JS Action for reading utils from this.memory, parsing it and assigning in window */
  (function () {
    if (this.memory.utils) {
      var localUtils = JSON.parse(this.memory.utils), utilsKeys = Object.keys(localUtils);
      for (var i = 0; i < utilsKeys.length; i++) {
        var key = utilsKeys[i], value = localUtils[key];
        if (typeof value === 'string' && value.indexOf('function') > -1) {
          eval('localUtils.' + key + '=' + value); // Eval strings with functions into functions 
        }
      }
      window.utils = localUtils;
    } else { console.log('Utils lib not loaded in the memory.'); this.return(this.createData({ status: 'FAILURE', message: 'Utils lib not loaded in the memory.' })) }
  }.bind(this))();
  /* END ACTION 4 */
}