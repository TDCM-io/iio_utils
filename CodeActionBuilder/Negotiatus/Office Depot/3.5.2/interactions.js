module.exports = async function (input) {
    console.log('extractor input', input);
    function delay(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const lastResponseData = await extractorContext.goto('https://www.officedepot.com/');
    console.log('finished goto', lastResponseData.code);
    // if (lastResponseData.code !== 200) {
    //     return {
    //         'status': 'FAILURE',
    //         'message': 'Page loaded incorrectly',
    //         lastResponseData
    //     };
    // }
    console.log('x');
    var products, urlQuantities;
    await extractorContext.execute(async function () {
        console.log("1");
        if (!this.input.products) {
            // return with message 'Urls and quantities were not recieved.'
        }
        this.memory.products = this.input.products;
        this.memory.urlQuantities = this.input.products.length;
        urlQuantities = this.input.products.length;
        products = this.input.products;
        console.log('products input', this.input.products);

        // await new Promise(resolve => setTimeout(resolve, 5000));
    });

    console.log('products:', products);
    console.log('urlQuantities:', urlQuantities);
    console.log('extractor memory', extractorContext.memory);
    products = extractorContext.memory.products;
    for (let i = 0; i < products.length; i++) {
        await extractorContext.goto(products[i].url);
        await extractorContext.waitForPage();
        let quantity = products[i].quantity;
        await extractorContext.execute(function (quantity) {
            var oneTimeDelivery = document.querySelector('#radioOneTimeDelivery');
            if (oneTimeDelivery) {
                oneTimeDelivery.click();
            }
            var qty = document.querySelector('#mainqtybox');
            qty.value = quantity;
            // wait a bit
            // check if given quantity exceeds max
            var addToCart = document.querySelector('#addToCartButtonId');
            addToCart.click();
            // wait a bit
        });
        console.log('page', products[i].url)
    }

    await extractorContext.goto('https://www.officedepot.com/cart/shoppingCart.do');
    await extractorContext.waitForPage();
    await extractorContext.execute(function () {
        const close = document.getElementsByClassName('ss_close')[0];
        if (close) {
            close.click();
        }
        var emptyCart = document.querySelector('#cartEmptyMessage');
        if (emptyCart) {
            const data = extractorContext.createData({
                'auth_status': extractorContext.memory.auth_status,
                'auth_message': extractorContext.memory.auth_message,
                'status': 'FAILURE',
                'message': 'Shopping cart contains no items.'
            });
            return extractorContext.return(data);
        }
        var checkoutButton = document.querySelector('[data-auid="cart_button_ContinueTop"]');
        checkoutButton.click();
    });
    await extractorContext.waitForPage();
    await extractorContext.execute(function () {
        var continueButton = document.querySelector('[class="btn primary fixed_width"]')
        continueButton.click();
    });
    await extractorContext.waitForPage();
    await extractorContext.execute(function () {
        var zip = document.querySelector('#postalCode1-2');
        zip = this.input.zip;
        //to be continued
    });


    console.log('extractor memory', extractorContext.memory);

    const data = await extractorContext.extractData({
      'fields': [
          {
            "id": "17ce627e-5cf3-472e-83b2-db44a6c0e80e",
            "name": "sku",
            "type": "TEXT",
            "selector": [
              [
                "div.item_sku"
              ]
            ],
            "defaultValue": " ",
            "regExp": "# (.+)",
            "regExpReplace": "$1",
            "ranking": 0
          },
          {
            "id": "482e854f-35f2-419a-8a0d-f7d3f9c6dafb",
            "name": "product",
            "type": "TEXT",
            "selector": [
              [
                "a.itemname"
              ]
            ],
            "defaultValue": " ",
            "captureLink": false,
            "ranking": 0
          },
          {
            "id": "76eec753-469a-4ec8-a624-8c1198039969",
            "name": "price",
            "type": "TEXT",
            "selector": [
              [
                "span[class='']:nth-of-type(1)"
              ]
            ],
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "b14e4307-6a02-48f2-a548-f8616d7c8086",
            "name": "quantity",
            "type": "AUTO",
            "xpath": "//input[@title=\"quantity\"]/@value",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "2adcd12d-b250-49bc-9834-b3781f6c008b",
            "name": "category",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "360dbfb7-a252-4f4b-b24f-5e9a77401db7",
            "name": "product_url",
            "type": "TEXT",
            "selector": [
              [
                "div.item_sku"
              ]
            ],
            "defaultValue": " ",
            "regExp": "# (.+)",
            "regExpReplace": "https://www.officedepot.com/a/products/$1/",
            "ranking": 0
          },
          {
            "id": "188c0a17-66fd-4482-b775-6102af4edfd5",
            "name": "image",
            "type": "IMAGE",
            "selector": [
              [
                "td.nopad_left > a > img"
              ]
            ],
            "defaultValue": " ",
            "captureLink": false,
            "ranking": 0
          },
          {
            "id": "d5dd5cd0-7d8b-44e6-9aaf-fa6bff16ca37",
            "name": "subtotal",
            "type": "TEXT",
            "selector": [
              [
                "div.row.clearfix.rel > table > tbody > tr:nth-of-type(1) > td"
              ]
            ],
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "d90724ca-ce82-4c06-845d-5d8deb90c766",
            "name": "tax",
            "type": "TEXT",
            "selector": [
              [
                "td.csaAutoScroll"
              ]
            ],
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "37752d29-569e-4f9b-8da2-7901feedf85d",
            "name": "shipping",
            "type": "TEXT",
            "selector": [
              [
                "tr:not(.cart_entry_details):nth-of-type(3) > td:not(.description):not(.pad_top)"
              ]
            ],
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "41acd939-d636-414e-9f1e-e8b0ecb5348e",
            "name": "discount",
            "type": "TEXT",
            "selector": [
              [
                "div.pr12.row.clearfix.right.savings > strong"
              ]
            ],
            "defaultValue": "$0",
            "ranking": 0
          },
          {
            "id": "f8aa117c-2be8-42f7-abf5-e8bd253fc8a9",
            "name": "fee",
            "type": "AUTO",
            "defaultValue": "$0",
            "ranking": 0
          },
          {
            "id": "a315d236-9599-4e9f-93dd-c107ae5c665b",
            "name": "total",
            "type": "TEXT",
            "selector": [
              [
                "div.row.clearfix.rel > table > tfoot > tr > td"
              ]
            ],
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "87503f6a-8b70-432c-90e7-c49e36cd475d",
            "name": "status",
            "type": "AUTO",
            "defaultValue": "SUCCESS",
            "ranking": 0
          },
          {
            "id": "c2c2a37e-fcda-4805-943c-4caf0e74a92a",
            "name": "estimated_delivery_date",
            "type": "AUTO",
            "ranking": 0
          },
          {
            "id": "4aeb0439-0d7d-4c84-8212-09a7a6d3741b",
            "name": "message",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          }
        ],
        "singleRecord": true,
        "noscript": true,
        "screenCapture": true
    });

    console.log('finished extraction data', data);

    return extractorContext.return(data);
}