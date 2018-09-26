module.exports = async function (input) {

  console.log("Interactions");

  // CASE: invalid search input

  if(!input.search || typeof input.search !== "string" || input.search.trim() === "") {
    console.log('No search input -> ending extraction');
    const data = await extractorContext.execute(function() {
      const utils = new window.__Utils(this, 'NEG 3.3.2.');
      return utils.endEx(null, 'INPUT_MISSING');
    });
    return extractorContext.return(data["data"]);
  }

  // END OF CASE -> CONTINUE

  await extractorContext.goto("https://www.officedepot.com/");
  await extractorContext.waitForPage();

  await extractorContext.input({
    "constructor": "Event",
    "target": {
      "cssSelector": "input#mainSearchField",
      "type": "text"
    },
    "typeArg": "change",
    "eventInit": {
      "bubbles": true,
      "cancelable": false
    },
    'value': input.search || 'Input falsy',
  });

  console.log('Input changed');
  
  await extractorContext.click({
    "constructor": "MouseEvent",
    "target": {
      "cssSelector": "input#searchSubmit",
    },
    "typeArg": "click"
  });
  console.log('Search submitted');

  await extractorContext.waitForPage();

  // CASE: no products found (or search leads to category)

  async function handleNoProdsFound() {
    const response = await extractorContext.execute(function() {
      if(document.querySelector('.no_result_break') ||
      document.querySelector('div#content>div#cm-page>div#cm-placement-main>div>div>h1') ||
      document.getElementById('categoryHead')) {
        const utils = new window.__Utils(this, 'NEG 3.3.2.');
        const data = utils.endEx(null, 'PRODUCT_DOES_NOT_EXIST');
        return data;
      }
      return null
    });
    return response;
  }

  const noProdsFound = await handleNoProdsFound();

  console.log('noProdsFound? ' + JSON.stringify(noProdsFound));

  if(noProdsFound) {
    console.log('No products found -> ending extraction');
    return extractorContext.return(noProdsFound["data"]);
  }

  // CASE: VALID - GET FIRST PRODUCT FOUND

  await extractorContext.click({
    "constructor": "MouseEvent",
    "target": {
      "cssSelector": "div#productView div.sku_item:first-of-type div.desc_text a",
    },
    "typeArg": "click"
  });

  console.log('Target clicked');
  
  await extractorContext.waitForPage();

  // END OF INTERACTIONS -> EXTRACT DATA

  console.log('data extraction');
  
  const data = await extractorContext.extractData({
    "fields": [
      {
        "id": "c01429bd-b92c-4adb-8798-1f8f0f6f482a",
        "name": "status",
        "type": "AUTO",
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "347c48b8-fc1e-4f05-a261-0d6373f7d96e",
        "name": "message",
        "type": "AUTO",
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "49b16b3a-6993-4664-b8ed-8fc376c25d2e",
        "name": "sku",
        "type": "TEXT",
        "selector": [
          [
            "span[itemprop=\"sku\"]"
          ]
        ],
        "defaultValue": " ",
        "regExp": "Item # ([^#]+)",
        "regExpReplace": "$1",
        "ranking": 0
      },
      {
        "id": "a92652fa-a7ea-4b8d-9efc-a261a43a168e",
        "name": "product",
        "type": "TEXT",
        "selector": [
          [
            "h1.semi_bold.fn[itemprop=\"name\"]",
            1
          ]
        ],
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "ff34d932-0aea-43cd-b471-933bd6eb7366",
        "name": "price",
        "type": "TEXT",
        "selector": [
          [
            "div.unified_price_block.lg > div.unified_price_table > div.unified_price_row.unified_sale_price.red_price > span.price_column.right"
          ],
          [
            "td.border_bottom > div.unified_price_block > div.unified_price_table > div.unified_price_row.unified_sale_price.red_price > span.price_column.right"
          ]
        ],
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "44ef61cc-39c6-461d-b92e-f710ac6c29b4",
        "name": "category",
        "type": "TEXT",
        "selector": [
          [
            "li[itemprop=\"itemListElement\"][itemtype=\"http\\:\\/\\/schema\\.org\\/ListItem\"]:nth-of-type(2) > a[class=''][itemprop=\"item\"] > span[itemprop=\"name\"]"
          ]
        ],
        "defaultValue": " ",
        "captureLink": false,
        "ranking": 0
      },
      {
        "id": "1b84dc28-9146-450b-8937-0edaaaf3c882",
        "name": "description",
        "type": "TEXT",
        "selector": [
          [
            "#descriptionContent"
          ]
        ],
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "2585b554-3da4-4898-8c06-8b0e46fa055d",
        "name": "product_url",
        "type": "AUTO",
        "xpath": "//link[@rel=\"canonical\"]/@href",
        "defaultValue": " ",
        "ranking": 0
      },
      {
        "id": "6b4305cb-d310-4220-9d57-142192be0386",
        "name": "image",
        "type": "AUTO",
        "selector": [
          [
            "div[style].s7staticimage > img[style]:nth-of-type(1)"
          ]
        ],
        "xpath": "(//div[@id=\"imageViewer_flyoutZoomView\"]//img/@src)[1]",
        "defaultValue": " ",
        "ranking": 0
      }
    ],
    "singleRecord": true,
    "noscript": true,
    "screenCapture": false
  });

  return extractorContext.return(data);
}