module.exports = async function (input) {
  console.log('extractor input', input);
  const lastResponseData = await extractorContext.goto('http://doom.import.io/php/authenticated-connectors/simple/logged-in-test.php');
  console.log('finished goto', lastResponseData);
  if (lastResponseData.code !== 200) {
    return {
      'status': 'FAILURE',
      'message': 'Page loaded incorrectly',
      lastResponseData,
    };
  }

  console.log('extractor memory', extractorContext.memory);

  const data = await extractorContext.extractData({
    'fields': [
      {
        'id': '5f852a88-449b-48b2-bb8d-260a4ecf68a1',
        'name': 'Header 1',
        'type': 'TEXT',
        'selector': [
          [
            'td:nth-of-type(1)',
          ],
        ],
        'captureLink': false,
        'ranking': 0,
      },
      {
        'id': 'd9607f69-f129-4b58-8b96-8cf38d19a9db',
        'name': 'Header 2',
        'type': 'TEXT',
        'selector': [
          [
            'td:nth-of-type(2)',
          ],
        ],
        'captureLink': false,
        'ranking': 0,
      },
      {
        'id': 'ee3ca9da-0ce3-462c-a2b0-a2a7993f8a60',
        'name': 'Header 3',
        'type': 'TEXT',
        'selector': [
          [
            'td:nth-of-type(3)',
          ],
        ],
        'captureLink': false,
        'ranking': 0,
      },
      {
        'id': '26f74bf4-e682-41b8-8db2-740d0fb86e1a',
        'name': 'Header 4',
        'type': 'TEXT',
        'selector': [
          [
            'td:nth-of-type(4)',
          ],
        ],
        'captureLink': false,
        'ranking': 0,
      },
      {
        'id': 'ab25373b-b00a-405b-9d3e-9815f2ef3ca6',
        'name': 'Header 5',
        'type': 'TEXT',
        'selector': [
          [
            'td:nth-of-type(5)',
          ],
        ],
        'captureLink': false,
        'ranking': 0,
      },
    ],
    'recordXPath': '//td[not(@class)][not(@style)]/text()[1]/../..',
    'singleRecord': false,
    'noscript': true,
    'screenCapture': false,
  });

  console.log('finished extraction data', data);

  return extractorContext.return(data);
}