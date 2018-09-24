module.exports = async function (input) {
  console.log('Authorization interactions');
  console.log('extractor input', input);

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
  });
  console.log('finished inputting password');

  await new Promise(r => setTimeout(r, 1000));

  await extractorContext.click('button[type="submit"]');

  console.log('finished click');

  await extractorContext.waitForPage();

  console.log('finished waiting for page');

  let error = await extractorContext.execute(function () {
    err = document.querySelector('div[id="error"]');
    if (err) {
      return err.querySelector('div > ul').innerText.replace("\n", " ");
    }
    return null;
  });

  let signoutLink = await extractorContext.execute(function () {
    return document.querySelector('a[data-auid="global_link_logout"]');
  });

  await new Promise(r => setTimeout(r, 3000));

  if (error) {
    console.log("error found");
    extractorContext.setMemory({
      auth_message: error
    });
  }
  if (extractorContext.memory.auth_message) {
    console.log("error set to memory");
    extractorContext.setMemory({
      auth_status: 'FAILURE',
      auth_message: extractorContext.memory.auth_message
    });
    return;
  } else if (!signoutLink) {
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