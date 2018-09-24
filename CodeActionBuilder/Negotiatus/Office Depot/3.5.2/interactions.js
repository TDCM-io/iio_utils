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
    console.log('log outside execute');
    var response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        console.log('log inside execute');
        if (!this.input.products) {
            return utils.endEx(null, null, null, 'No product url inputs');
        }
        this.memory.products = this.input.products;
        this.memory.zip = this.input.zip;
        this.memory.urlQuantities = this.input.products.length;
        this.memory.urls = [];
        for (let i = 0; i < this.input.products.length; i++) {
            this.memory.urls.push(this.input.products[i].quantity);
        }
        console.log('products input', this.input.products);

        // await new Promise(resolve => setTimeout(resolve, 5000));
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    console.log('extractor memory', extractorContext.memory);
    products = extractorContext.memory.products;
    for (let i = 0; i < products.length; i++) {
        await extractorContext.goto(products[i].url);
        // TODO check if url is valid
        await extractorContext.waitForPage();

        // let quantity = products[i].quantity;
        // let quantity = products[i].quantity.text;
        let quantity = extractorContext.memory.products[i].quantity;
        extractorContext.setMemory({...extractorContext.memory, ...{quantity: quantity}});
        
        response = await extractorContext.execute(async function () {
            const utils = new window.__Utils(this, "NEG 3.5.2.");
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
                return utils.endEx(null, null, null, 'Maximum quantity exceeded.');
            }
            var qty = document.querySelector('#mainqtybox');
            qty.value = this.memory.quantity;
            // wait a bit
            // await new Promise(resolve => setTimeout(resolve, 1000));
            // check if given quantity exceeds max

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
                return utils.endEx(null, null, null, 'Maximum quantity exceeded.');
            }

            return null;
        });
        if (response) {
            return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
        }
        console.log('page', products[i].url)
    }

    await extractorContext.goto('https://www.officedepot.com/cart/shoppingCart.do');
    await extractorContext.waitForPage();

    response = await extractorContext.execute(function () {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        const close = document.getElementsByClassName('ss_close')[0];
        if (close) {
            close.click();
        }
        var emptyCart = document.querySelector('#cartEmptyMessage');
        if (emptyCart) {
            return utils.endEx(null, 'CART_EMPTY');
        }

        const changeZip = document.getElementById('changeDeliveryZip');
        if (changeZip) {
            changeZip.click();
        }
        const zip = document.querySelector('#postalCode1-2');
        if (zip) {
            zip.value = this.input.zip;
        }
        const saveZip = document.getElementById('saveChangeZip');
        if (saveZip) {
            saveZip.click();
        }

        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    await extractorContext.waitForPage();

    response = await extractorContext.execute(function () {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        var error = document.querySelector('.error');
        if (error) {
            return utils.endEx(null, 'ADDRESS_MISSING');
        }
        var checkoutButton = document.querySelector('[data-auid="cart_button_ContinueTop"]');
        if (checkoutButton) {
            checkoutButton.click();
        }

        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }
    
    await extractorContext.waitForPage();

    await extractorContext.execute(function () {
        var continueButton = document.querySelector('[class="btn primary fixed_width"]');
        if (continueButton) {
            continueButton.click();
        }
    });

    await extractorContext.waitForPage();

    // await extractorContext.execute(function () {
    //     const zip = document.querySelector('#postalCode1-2');
    //     if (zip) {
    //         zip.value = this.input.zip;
    //     }
    // });
    await extractorContext.input({
        "constructor": "Event",
        "target": {
          "cssSelector": "input#postalCode1-2",
          "type": "tel"
        },
        "typeArg": "change",
        "eventInit": {
          "bubbles": true,
          "cancelable": false
        },
        "value": extractorContext.memory.zip
    });

    await extractorContext.waitForPage();

    response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        var error = document.querySelector('.error');
        if (error) {
            return utils.endEx(null, 'ADDRESS_MISSING');
        }
        // var selectOtherCityAndState = document.querySelector('select#checkoutCityAndState');
        // if (selectOtherCityAndState.innerHTML) {
        // }

        var fullName = this.input.name.split(' ');
        var firstName = document.querySelector('[id*="firstName"]');
        var lastName = document.querySelector('[id*="lastName"]');
        var address = document.querySelector('[id*="address1"]');
        var address_2 = document.querySelector('[id*="address2"]');
        var phone1 = document.querySelector('[id*="phoneNumber1"]');
        var phone2 = document.querySelector('[id*="phoneNumber2"]');
        var phone3 = document.querySelector('[id*="phoneNumber3"]');
        var email = document.querySelector('[id*="email"]');
        firstName.value = fullName[0];
        lastName.value = fullName[1];
        address.value = this.input.address;
        address_2.value = this.input.address_2;
        phone1.value = this.input.phone.substring(0,3);
        phone2.value = this.input.phone.substring(3,6);
        phone3.value = this.input.phone.substring(6,10);
        email.value = this.input.email;

        receiveSpam = document.querySelector('#guestEmailOptIn');
        receiveSpam.checked = false;

        // submit
        const contbtn = document.getElementById('confirm2');
        if (contbtn) {
            contbtn.click();
        }
        // await utils.delay(5000);
        // await new Promise(resolve => setTimeout(resolve, 3000));
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    await extractorContext.waitForPage();

    response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        // check for 'The following address you entered is not recognized by our database' message
        var warning = document.querySelector('div#skipGroupOne');
        if (warning) {
            return utils.endEx(null, 'ADDRESS_MISSING');
        }

        const firstNameError = document.getElementById('firstName-2-error');
        const lastNameError = document.getElementById('lastName-2-error');
        const addressError = document.getElementById('address1-2-error');
        const address2Error = document.getElementById('address2-2-error');
        const zipError = document.getElementById('postalCode1-2-error');
        const phoneError = document.getElementById('phoneGroup-2-error');
        const emailError = document.getElementById('email-2-error');
        
        if (firstNameError || lastNameError || addressError || address2Error || zipError || phoneError || emailError) {
            return utils.endEx(null, 'ADDRESS_MISSING');
        }

        var shipCostTr = document.querySelector('td[data-auid="orderSummary_value_delivery"]');
        if (shipCostTr) {
            if (shipCostTr.innerText === 'Enter Address') {
                return utils.endEx(null, 'ADDRESS_MISSING');
            }
            var shipCostTxt = shipCostTr.textContent.replace(/\$|\,/, '').replace(/\s/,'');
            var shipCost = 0;
            if (shipCostTxt.match(/free/i) === null) {
                shipCost = parseFloat(shipCostTxt);
                if (shipCost > parseFloat(this.input.max_shipping.replace(/\$|\,/, ''))) {
                    return utils.endEx(null, 'MAX_SHIPPING_COST_EXCEEDED');
                }
                // this.memory.extractedData[0]['group'][0]['shipping']  = [{'text': '$'+shipCost.toString()}];
            //     this.memory.shipping = '$'+shipCost.toString();
            // } else {
            //     this.memory.shipping = shipCostTxt;
            }
        }
        const totalCostTr = document.querySelector('td[data-auid="orderSummary_value_total"]');
        var totalCostTxt = totalCostTr.textContent.replace(/\$|\,/, '');
        var totalCost = parseFloat(totalCostTxt);
        if (totalCost > parseFloat(this.input.max_price.replace(/\$|\,/, ''))) {
            return utils.endEx(null, 'MAX_TOTAL_EXCEEDED');
        }
        
        const estDeliv = document.getElementsByClassName('checkout_v2_sidebar_box clearfix');
        const dateRe = /(\d{2}\/\d{2}\/\d{4})/;
        const allDeliv = [];
        if (estDeliv.length > 0) {
            for (const est of estDeliv) {
                if (est === estDeliv[0]) continue;
                const matched = estDeliv[1].innerText.match(dateRe);
                const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                const firstDate = new Date();
                const secondDate = new Date(matched[0]);
                const diffDays = Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                if (this.input.max_days < diffDays) {
                    return utils.endEx(null, 'MAX_SHIPPING_DAYS_EXCEEDED');
                }
            //return this.return(this.createData({'est_del': matched[0]}));
                const delivery = new Date(matched[0].toString()).getTime()/1000;
            //console.log(delivery);
            //return this.return(this.createData({'est_del': delivery}));
                allDeliv.push({'text': delivery.toString()});//[delivery];
            //return this.return(this.createData({'est_del': this.memory.extractedData[0]['group'][0]['estimated_delivery_date']}));
                
            
            }
            // this.memory.extractedData[0]['group'][0]['estimated_delivery_date'] = allDeliv;
            // return this.return(this.memory.extractedData);
        }

        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    
    console.log('extractor memory', extractorContext.memory);

    const data = await extractorContext.extractData({
        'fields': [
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
                "defaultValue": 0,
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
                "defaultValue": 0,
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
                "defaultValue": 0,
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
                "defaultValue": 0,
                "ranking": 0
            },
            {
                "id": "41acd939-d636-414e-9f1e-e8b0ecb5348e",
                "name": "discount",
                "type": "TEXT",
                "xpath": "//td[not(@synthetic)]/div[@id='checkoutSavingsAmount']/strong",
                "defaultValue": 0,
                "ranking": 0
            },
            {
                "id": "f8aa117c-2be8-42f7-abf5-e8bd253fc8a9",
                "name": "fee",
                "type": "AUTO",
                "defaultValue": 0,
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
                "defaultValue": 0,
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
                "xpath": "//div[@class='checkout_v2_sidebar_box clearfix'][last()]",
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