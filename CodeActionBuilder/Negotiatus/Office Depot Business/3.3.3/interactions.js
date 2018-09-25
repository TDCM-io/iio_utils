module.exports = async function (input) {
    console.log('extractor input', input);
    var lastResponseData = await extractorContext.goto('https://www.officedepot.com/');

    var response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.3.1.");
        console.log('log inside execute');
        if (!this.input._url) {
            return utils.endEx(null, null, null, 'No url input received');
        }
        this.memory.url = this.input._url;
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    console.log('extractor memory', extractorContext.memory);
    
        // await extractorContext.goto(products[i].url);
        extractorContext.setMemory({...extractorContext.memory, ...{product_url: products[i].url}});
        response = await extractorContext.execute(async function () {
            const utils = new window.__Utils(this, "NEG 3.5.2.");
            if (!/^((https?|ftp):\/\/)?(www\.)?officedepot\.com\/a\/products\/\d+/.test(this.memory.product_url)) {
                return utils.endEx(null, 'INVALID_URL');
            }
            await utils.safeRedirect(this.memory.product_url);
            return null;
        });
        if (response) {
            return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
        }
        // TODO check if url is valid

        await extractorContext.waitForPage();

        // let quantity = products[i].quantity;
        // let quantity = products[i].quantity.text;
        
        response = await extractorContext.execute(async function () {
            const utils = new window.__Utils(this, "NEG 3.5.2.");
            var invalidSku = document.querySelector('div#pagetitle');
            if (invalidSku) {
                if (/Invalid Sku/i.test(invalidSku.innerText)) {
                    return utils.endEx(null, 'INVALID_URL');
                }
            }
            var noLongerAvailable = document.querySelector('div[class*="no_longer_avail"]');
            if (noLongerAvailable) {
                return utils.endEx(null, 'PRODUCT_OUT_OF_STOCK');
            }
            const shipOnly = document.getElementById('availabilityBlock');
            if (!shipOnly) {
                return utils.endEx(null, 'PRODUCT_NOT_AVAILABLE_FOR_SHIPPING');
            }

            var oneTimeDelivery = document.querySelector('#radioOneTimeDelivery');
            if (oneTimeDelivery) {
                oneTimeDelivery.click();
                // await utils.delay(1000);
            }
            if (this.memory.quantity > 9999) {
                return utils.endEx(null, 'INVALID_QUANTITY_PROVIDED');
            }
            var limit = document.querySelector('div#productPurchase p.unified_qty_limit');
            if (limit) {
                if (/\d/.test(limit.innerText)) {
                    if (this.memory.quantity > parseInt(limit.innerText.match(/(\d+)/)[0])) {
                        return utils.endEx(null, 'QUANTITY_EXCEEDS_MAX_ALLOWED');
                    }
                }
            }
            var qty = document.querySelector('#mainqtybox');
            qty.value = this.memory.quantity;

            var addToCart = document.querySelector('#addToCartButtonId');
            await addToCart.click();
            return null;
        });
        if (response) {
            return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
        }

        await extractorContext.waitForPage();

        await extractorContext.execute(async function () {
            var proceed = document.querySelector('#prelightboxContinueBtn');
            if (proceed) {
                proceed.click();
            }
        });

        await extractorContext.waitForPage();

        response = await extractorContext.execute(async function () {
            const utils = new window.__Utils(this, "NEG 3.5.2.");
            const temp = document.evaluate("//*[@id=\"multipleStoresModal\"]/h3", document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
            if (temp) {
                if (temp.innerText === "Buy Online & Pickup in Store") {
                    return utils.endEx(null, 'PRODUCT_NOT_AVAILABLE_FOR_SHIPPING');
                }
            }
            if (document.getElementById('skuNotAvailable')) {
                return utils.endEx(null, null, null, 'This product is not available at this time.');
            }
            if (document.getElementsByClassName('current-name variant-unselected-error font-bold')[0]) {
                return utils.endEx(null, null, null, 'Product requires additional details to add to cart.');
            }
            var quantityTooHigh = document.querySelector('[data-auid="cart_title_skuStatusMessage"]');
            if (quantityTooHigh) {
                return utils.endEx(null, 'QUANTITY_EXCEEDS_AVAILABLE_STOCK');
            }

            return null;
        });
        if (response) {
            return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
        }

    console.log('extractor memory', extractorContext.memory);

    // const data = await extractorContext.extractData(dir.config.runtimeConfig);
    const data = await extractorContext.extractData({
        "fields": [
            {
                "id": "17ce627e-5cf3-472e-83b2-db44a6c0e80e",
                "name": "sku",
                "type": "TEXT",
                "selector": [
                    [
                        "div[class='checkout_v2_sidebar_box clearfix'] tbody tr:nth-child(1) td.line_item_description:nth-child(2) div.line_item_sku"
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
                        "div[class='checkout_v2_sidebar_box clearfix'] tbody tr:nth-child(1) td.line_item_description:nth-child(2)"
                    ]
                ],
                "defaultValue": " ",
                "regExp": "(.+)\\s+Item #",
                "regExpReplace": "$1",
                "captureLink": false,
                "ranking": 0
            },
            {
                "id": "76eec753-469a-4ec8-a624-8c1198039969",
                "name": "price",
                "type": "TEXT",
                "xpath": "//td[@class='line_item_extended_price']/span[last()]",
                "regExp": "(\\$\\d+\\.\\d{2})",
                "regExpReplace": "$1",
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "b14e4307-6a02-48f2-a548-f8616d7c8086",
                "name": "quantity",
                "type": "AUTO",
                "xpath": "//td[@class='line_item_quantity' and not(@synthetic)]",
                "regExp": "(\\d+)",
                "regExpReplace": "$1",
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
                        "div[class='checkout_v2_sidebar_box clearfix'] tbody tr:nth-child(1) td.line_item_description:nth-child(2) div.line_item_sku"
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
                "xpath": "//td[@class='line_item_image' and not(@synthetic)]/img",
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
                        "td.orderSummary_subtotal"
                    ]
                ],
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "d90724ca-ce82-4c06-845d-5d8deb90c766",
                "name": "tax",
                "type": "TEXT",
                "selector": [
                    [
                        "td.orderSummary_taxes"
                    ]
                ],
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "37752d29-569e-4f9b-8da2-7901feedf85d",
                "name": "shipping",
                "type": "TEXT",
                "selector": [
                    [
                        "td.orderSummary_delivery"
                    ]
                ],
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "41acd939-d636-414e-9f1e-e8b0ecb5348e",
                "name": "discount",
                "type": "TEXT",
                "xpath": "//td[not(@synthetic)]/div[@id='checkoutSavingsAmount']/strong",
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "f8aa117c-2be8-42f7-abf5-e8bd253fc8a9",
                "name": "fees",
                "type": "AUTO",
                "xpath": "//body/@fees",
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "a315d236-9599-4e9f-93dd-c107ae5c665b",
                "name": "total",
                "type": "TEXT",
                "selector": [
                    [
                        "td.orderSummary_total"
                    ]
                ],
                "defaultValue": "0",
                "ranking": 0
            },
            {
                "id": "87503f6a-8b70-432c-90e7-c49e36cd475d",
                "name": "status",
                "type": "AUTO",
                "xpath": "//body/@status",
                "defaultValue": "SUCCESS",
                "ranking": 0
            },
            {
                "id": "c2c2a37e-fcda-4805-943c-4caf0e74a92a",
                "name": "estimated_delivery_date",
                "type": "AUTO",
                "xpath": "//div[@class='checkout_v2_sidebar_box clearfix']/h5",
                "regExp": "(\\d{2}\/\\d{2}\/\\d{4})",
                "regExpReplace": "$1",
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "4aeb0439-0d7d-4c84-8212-09a7a6d3741b",
                "name": "message",
                "type": "AUTO",
                "xpath": "//body/@message",
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