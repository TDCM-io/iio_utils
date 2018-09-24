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
      "cssSelector": "input.col-md-8[name=\"ctl00\\$ContentPlaceholder1\\$UserLogin\\$UsernameTextBox\"][type=\"text\"]",
      "type": "tel"
    },
    "typeArg": "change",
    "eventInit": {
      "bubbles": true,
      "cancelable": false
    },
    'value': input._credentials.username || 'meep',
  });
  console.log('finished input email');
  await delay(1000);
  await extractorContext.input({
    "constructor": "Event",
    "target": {
      "cssSelector": "input.col-md-8.user-pwd[name=\"ctl00\\$ContentPlaceholder1\\$UserLogin\\$PasswordTextBox\"][type=\"password\"]",
      "type": "tel"
    },
    "typeArg": "change",
    "eventInit": {
      "bubbles": true,
      "cancelable": false
    },
    'value': input._credentials.password || 'meep',
  });

  console.log('finished input password');
  await delay(3000);
  await extractorContext.click({
    "constructor": "MouseEvent",
    "target": {
      "cssSelector": "input.yellow-button[name=\"ctl00\\$ContentPlaceholder1\\$UserLogin\\$LoginButton\"][type=\"submit\"]",
    },
    "typeArg": "click",
    "eventInit": {
      "clientX": 30,
      "clientY": 436,
      "buttons": 0,
      "shiftKey": false,
      "button": 0,
      "detail": 1,
      "cancelable": true,
      "metaKey": false,
      "altKey": false,
      "ctrlKey": false,
      "bubbles": true,
      "screenX": 108,
      "screenY": 667
    }
  });
  console.log('finished button click');

  await extractorContext.waitForPage();
  console.log('Set error message if exist');
  await extractorContext.execute(function () {

    var errorMsg = (document.querySelector("#ctl00_ContentPlaceholder1_ErrorMessageLabel") || {}).innerText;
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
      var signoutButton = document.querySelector('#ctl00_lnkLogOut');

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

  try {
    await extractorContext.click("#ctl00_lnkLoginAction1");
  } catch (error) {
    return;
  }
  if (extractorContext.memory.auth_status != 'SUCCESS') {
    return;
  }

  console.log('Find secoundary login info element');

  await extractorContext.waitForPage();

  var columnID = await extractorContext.execute(function () {
    try {


      function contains(selector, text) {
        var elements = document.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function (element) {
          return RegExp(text).test(element.textContent);
        });
      }

      var k = contains("td", input._credentials.secondary_login_info);
      console.log('Inner column id' + k);

      const regex = /ctl[1-9]\d/gm;
      const str = k[0].innerHTML;
      let m;
      var columnID = "";

      while ((m = regex.exec(str)) !== null) {

        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          columnID = match;
          console.log('Column id match' + match);
        });
      }
      return columnID;
    } catch (error) {
      console.log("Error from query sellector:" + error)
      this.memory.auth_status = 'FAILURE'
      this.memory.auth_message = "Invalid secondary login info";
    }
  });


  console.log('Column id: ' + columnID);
  //await delay(3000);

  console.log("click link");
  if (columnID) {
    try {
      await extractorContext.click("#ctl00_ContentPlaceholder1_SelectAccount1_AccountGridView_" + columnID + "_LoginLink");

    } catch (error) {
      await extractorContext.execute(function (){
        this.memory.auth_status = 'FAILURE'
        this.memory.auth_message = "Invalid secondary login info";
       });
      
      return;
    }

    console.log("link clicked")
    await extractorContext.waitForPage();
    await extractorContext.goto("https://wbmason.com/default.aspx");
  } else {
    return;
  }



};