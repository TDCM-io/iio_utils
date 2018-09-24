module.exports = async function (input) {
  console.log('Authorization interactions');
  console.log('extractor input', input);

  await extractorContext.input({
    'constructor': 'Event',
    'target': {
      'cssSelector': "input[name='email']",
    },
    'typeArg': 'change',
    'eventInit': {
      'bubbles': true,
      'cancelable': false,
    },
    'value': input._credentials.username,
  });
  console.log('finished inputting username');

  await new Promise(r => setTimeout(r, 1000));

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
  }
  );
  console.log('finished inputting password');

  await new Promise(r => setTimeout(r, 1000));

  // await extractorContext.execute(function () {
  //   let alert;
  //   window.alert = msg => {alert = msg};
  // });
  extractorContext.window.alert = msg => {alert = msg};

  await extractorContext.click('input[id="the_login_button"]');

  console.log('finished click');

  await extractorContext.waitForPage();

  console.log('finished waiting for page');

  console.log('check for errors');
  let error = await extractorContext.execute(function () {
    // alert;
    if(document.querySelector('.alert-info')){
      return document.querySelector('.alert-info').innerText.replace("× ", "");
    }
    else if(msg){
      return msg;
    }
    return null;
  });

  if(error){
    console.log("error found");
    extractorContext.setMemory({
      auth_status: 'FAILURE',
      auth_message: error
    });
    console.log("error set to memory");
    return;
  }

  console.log('check for signout link');
  let signoutLink = await extractorContext.execute(function () {
    return document.querySelector('a[href="/myaccount/"][data-toggle="dropdown"]');
  });

  if(!signoutLink)
  {
    console.log("no signout link found");
    extractorContext.setMemory({
      auth_status: 'UNKNOWN',
      auth_message: ' '
    });
    return;
  }
  console.log("login passed");
  extractorContext.setMemory({
    auth_status: 'SUCCESS',
    auth_message: ' '
  });
}