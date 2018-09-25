module.exports = async function (input) {
  console.log('Authorization interactions');
  console.log('extractor input', input);

  console.log('input username');
  await extractorContext.input({
    'constructor': 'Event',
    'target': {
      'cssSelector': "input[name='loginName']",
    },
    'typeArg': 'change',
    'eventInit': {
      'bubbles': true,
      'cancelable': false,
    },
    'value': input._credentials.username,
  });
  console.log('O.K.');

  await new Promise(r => setTimeout(r, 1000));

  console.log('input password');
  await extractorContext.input({
    'constructor': 'Event',
    'target': {
      'cssSelector': "input[name='password']",
    },
    'typeArg': 'change',
    'eventInit': {
      'bubbles': true,
      'cancelable': false,
    },
    'value': input._credentials.password,
  });
  console.log('O.K.');

  await new Promise(r => setTimeout(r, 1000));

  console.log('press login button');
  await extractorContext.click('input[type="submit"]');
  console.log('redirecting');
  await extractorContext.waitForPage();
  console.log('O.K.');

  console.log('check for errors');
  let error = await extractorContext.execute(function () {
    if(document.querySelector('.block-copy')){
      return document.querySelector('.block-copy').innerText;
    }
    else{
      err = document.querySelectorAll('#loginForm .error');
      if(err){
        if(err.length > 1){
          return err[0].innerText + ". " + err[1].innerText;
        }
        else{
          return err[0].innerText;
        }
      }
    }
    return null;
  });

  if (error) {
    console.log("error found");
    extractorContext.setMemory({
      auth_status: 'FAILURE',
      auth_message: error
    });
    console.log("error set to memory");
    return;
  }

  console.log("check for signout link");
  let signoutLink = await extractorContext.execute(function () {
    return document.querySelector('.logout-item');
  });

  if (!signoutLink) {
    console.log("no signout link found");
    extractorContext.setMemory({
      auth_status: 'UNKNOWN',
      auth_message: ' '
    });
    return extractorContext.reportBlocked(result.code, 'Incorrect status code');
  }
  console.log("login passed");
  extractorContext.setMemory({
    auth_status: 'SUCCESS',
    auth_message: ' '
  });
}