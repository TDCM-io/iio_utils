
 
module.exports = async function (input) {
    
    console.log('extractor input', input);
    const lastResponseData = await extractorContext.goto('http://doom.import.io');
    console.log('finished goto', lastResponseData);
    if (lastResponseData.code !== 200) {
      return {
        'status': 'FAILURE',
        'message': 'Page loaded incorrectly',
        'retryable': true,
      };
    }
  
    await extractorContext.click({
      'constructor': 'MouseEvent',
      'target': {
        'cssSelector': "a[href='php/authenticated-connectors/simple/login-page.php']",
      },
      'typeArg': 'click',
      'eventInit': {
        'bubbles': true,
        'cancelable': true,
        'detail': 1,
        'screenX': 90,
        'screenY': 429,
        'clientX': 82,
        'clientY': 151,
        'ctrlKey': false,
        'shiftKey': false,
        'altKey': false,
        'metaKey': false,
        'button': 0,
        'buttons': 0,
        'relatedTarget': null,
      },
    });
  
    console.log('finished click');
  
    await extractorContext.waitForPage();
  
    console.log('finished waiting for page');
  
    await extractorContext.input({
      'constructor': 'Event',
      'target': {
        'cssSelector': "input[name='username']",
      },
      'typeArg': 'change',
      'eventInit': {
        'bubbles': true,
        'cancelable': false,
      },
      'value': input.username || 'meep',
    });
  
    console.log('finished inputting username');
  
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
      'value': input.password || 'meep',
    }
  );
  
    console.log('finished inputting password');
  
    await extractorContext.click({
      'constructor': 'MouseEvent',
      'target': {
        'cssSelector': "button[type='submit']",
      },
      'typeArg': 'click',
      'eventInit': {
        'bubbles': true,
        'cancelable': true,
        'detail': 1,
        'screenX': 90,
        'screenY': 429,
        'clientX': 82,
        'clientY': 151,
        'ctrlKey': false,
        'shiftKey': false,
        'altKey': false,
        'metaKey': false,
        'button': 0,
        'buttons': 0,
        'relatedTarget': null,
      },
    });
  
    console.log('finished click');
  
    await extractorContext.waitForPage();
  
    console.log('finished waiting for page');
  
    const screenshotLink = await extractorContext.screenCapture();
  
    console.log(screenshotLink);
  
    extractorContext.setMemory({authSessionScreenCapture: screenshotLink});
  }