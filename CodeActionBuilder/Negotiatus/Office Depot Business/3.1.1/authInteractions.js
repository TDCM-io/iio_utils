module.exports = async function (input) {



  console.log("auth interactions");

  function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  console.log('finished waiting for page');

  await extractorContext.waitForPage(); 
  await extractorContext.input({
    "constructor": "Event",
    "target": {
      "cssSelector": "#loginNameBsd",
      "type": "tel"
    },
    "typeArg": "change",
    "eventInit": {
      "bubbles": true,
      "cancelable": false
    },
    'value': input._credentials.username,
  });
  console.log('finished input email');
  await delay(1000);
  await extractorContext.input({
    "constructor": "Event",
    "target": {
      "cssSelector": "#loginPasswordBsd",
      "type": "tel"
    },
    "typeArg": "change",
    "eventInit": {
      "bubbles": true,
      "cancelable": false
    },
    'value': input._credentials.password,
  });

  console.log('finished input password');
  await delay(3000);
  await extractorContext.click("#loginSubmit");
  console.log('finished button click');

  await extractorContext.waitForPage();
  console.log('Set error message if exist');
  await extractorContext.execute(function () {

    var errorMsg = (document.querySelector(".block-copy") || {}).innerText;
    if (errorMsg) {
      this.memory.auth_message = errorMsg;
    }
  });

  console.log('Set status');
  await extractorContext.waitForPage();
  await extractorContext.execute(function () {

    if (this.memory.auth_message) {
      this.memory.auth_status = 'FAILURE';

    } else {
      var signoutButton = document.querySelector('.logout-item');

      if (!signoutButton) {
        this.memory.auth_status = 'UNKNOWN';
        this.memory.auth_message = 'User is not logged in, for an unknown reason.';
        throw "User is not logged in, for an unknown reason.";
      } else {
        this.memory.auth_status = 'SUCCESS';
      }
      this.memory.auth_message = ' ';
    }
  });
  if (extractorContext.memory.auth_status == 'UNKNOWN') {
    return extractorContext.reportBlocked(result.code, 'Incorrect status code');
  }

  
    await extractorContext.goto("https://business.officedepot.com/billboard/billboard.do");
  



};