module.exports = async function (input) {
    console.log('Interactions');
    console.log("check authorization");
    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.1.1.");
        if (this.memory.auth_status != "SUCCESS") {
            if (this.memory.auth_status === "UNKNOWN") {
                return utils.endEx('AUTH_UNKNOWN', 'BLANK_FAILURE');
            }
            return utils.endEx(null, null, this.memory.auth_message);
        }
        return null;
    });

    await new Promise(r => setTimeout(r, 1000));

    console.log("authorization O.K.");
    if (returnedData) {
        console.log("authorization fail");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }

    console.log("check input: quantity");
    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.3.");
        if (isNaN(this.input.quantity) || this.input.quantity < 1) {
            return utils.endEx('AUTH_SUCCESS', 'INVALID_QUANTITY_PROVIDED');
        }
    });
    if (returnedData) {
        console.log("input fail.");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
    console.log("input O.K.");

    console.log("check input: url");
    if(!input.__url){
        var returnedData = await extractorContext.execute(async function (a) {
            const utils = new window.__Utils(this, "NEG 3.4.3.");
            return utils.endEx('AUTH_SUCCESS', 'INPUT_MISSING');
        });
    }
    if (returnedData) {
        console.log("input fail");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
    console.log("input O.K.");

    console.log('redirecting');
    await extractorContext.goto(input.__url);

    console.log("check product");
    await new Promise(r => setTimeout(r, 3000));
    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.3.");

        if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Invalid Sku') > -1 ||
            (document.documentElement.textContent || document.documentElement.innerText).indexOf('The page you are trying to access is no longer availabl') > -1) {
            return utils.endEx('AUTH_SUCCESS', 'PRODUCT_DOES_NOT_EXIST');
        }
        
        if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Out of stock') > -1) {
            return utils.endEx('AUTH_SUCCESS', 'PRODUCT_OUT_OF_STOCK');
        }
        else if(!document.querySelector('input[data-auid="productDetail_button_addToCart"]')){
                return utils.endEx('AUTH_SUCCESS', 'PRODUCT_DOES_NOT_EXIST');
        }
        
        if (document.querySelector('input[data-auid="productDetail_button_addToCart"]').getAttribute('value') === "Subscribe now") {
            var selector = document.querySelector('div.price_details');
            if (selector) {
                if (selector.querySelector('table > thead').textContent.match(/Select an option/)) {
                    delay(document.querySelector('#radioOneTimeDelivery').click(), 300);
                } else {
                    return utils.endEx('AUTH_SUCCESS', 'PRODUCT_DOES_NOT_EXIST');
                }
            } else {
                return utils.endEx('AUTH_SUCCESS', 'PRODUCT_DOES_NOT_EXIST');
            }
            if (document.querySelector('input[data-auid="productDetail_button_addToCart"]').getAttribute('value') === "Add To Cart") {} else {
                return utils.endEx('AUTH_SUCCESS', 'PRODUCT_DOES_NOT_EXIST');
            }
        }

        if (document.querySelector('#buttonCustomize1')) {
            return utils.endEx('AUTH_SUCCESS', 'PRODUCT_REQUIRES_ADDITIONAL_DETAILS');
        }

        return null;
    });
    if (returnedData) {
        console.log("product fail");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
    console.log("input O.K.");

    await extractorContext.execute(async function (a) {
        document.body.setAttribute('auth_status', this.memory.auth_status);
        document.body.setAttribute('auth_message', this.memory.auth_message);
        document.body.setAttribute('status', 'SUCCESS');
        document.body.setAttribute('message', ' ');
    });
    console.log("create runtimeConfig");
    const runtimeConfig = {
        "fields": [
          {
            "id": "79f26368-570b-4db7-8298-87ac9699b7d3",
            "name": "auth_status",
            "type": "AUTO",
            "xpath": "//body/@auth_status",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "79f26368-570b-4db7-8298-87ac9699b7d4",
            "name": "auth_message",
            "type": "AUTO",
            "xpath": "//body/@auth_message",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "f3d5a117-698c-4b52-bb76-4f1466b0a787",
            "name": "status",
            "type": "AUTO",
            "xpath": "//body/@status",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "7e5620e6-d6b2-4157-b9e2-a45d9ae3003a",
            "name": "message",
            "type": "AUTO",
            "xpath": "//body/@message",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "11353a3e-a39e-46b0-a3a3-d4cfbb1824fa",
            "name": "sku",
            "type": "AUTO",
            "xpath": "//*[@id=\"basicInfoCustomerSku\"]",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "8d172ff6-41f3-4970-a535-f1982917925b",
            "name": "product",
            "type": "AUTO",
            "xpath": "//*[@id=\"stickyHeader\"]//span[@class=\"sku_title\"]",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "31e27e97-f069-4c3f-9f0c-2f792866910a",
            "name": "price",
            "type": "AUTO",
            "xpath": "//div[@class=\"unified_price_table\"]/*[2]/*[@class=\"price_column right \"]",
            "defaultValue": "$0",
            "ranking": 0
          },
          {
            "id": "fb969894-18f5-4332-8c20-6094438bb79f",
            "name": "product_url",
            "type": "AUTO",
            "xpath": "/html/head/link[@rel=\"canonical\"]/@href",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "f4105b36-c692-4b03-9145-554541614e5a",
            "name": "quantity",
            "type": "AUTO",
            "defaultValue": "0",
            "ranking": 0
          }
        ],
        "singleRecord": true,
        "noscript": true,
        "screenCapture": false
      }
    console.log("O.K.");

    console.log("extract data");
    var extractedData = await extractorContext.extractData(runtimeConfig);

    console.log("O.K.");

    console.log("put quantity into form");
    await extractorContext.execute(async function (a) {
        document.querySelector('input[data-auid="productDetail_textfield_quantity"]').value = this.input.quantity;
    });
    console.log("O.K.");
    console.log("press add to cart button");
    await extractorContext.click('#addToCartButtonId');
    console.log("O.K.");
    console.log('redirecting');
    await new Promise(r => setTimeout(r, 5000));
    console.log("O.K.");

    productProtection = await extractorContext.execute(async function (a) {
        if(document.querySelector('#prelightboxContinueBtn')) return true;
        return false;
    });
    if(productProtection){
        await extractorContext.click('#prelightboxContinueBtn');
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log("check store quantity");
    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.3.");
        if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('The item you requested is currently sold out online. Shop below for similar items.') > -1) {
            return utils.endEx('AUTH_SUCCESS', 'QUANTITY_EXCEEDS_AVAILABLE_STOCK');
        }
        return null;
    });
    if (returnedData) {
        console.log("quantity over stock");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
    console.log("O.K.");

    console.log('proceed to checkout');
    await extractorContext.click('a[data-auid="cartLightBox_buttom_viewCartAndCheckout"]');
    console.log('redirecting');
    await new Promise(r => setTimeout(r, 5000));

    extractorContext.setMemory({
        auth_status: extractorContext.memory.auth_status,
        auth_message: extractorContext.memory.auth_message,
        product: extractedData[0].group[0].product[0].text
      });

    extractedData[0].group[0].quantity[0].text = await extractorContext.execute(async function (a) {
        var selector = document.querySelectorAll('.cart_entry_details ');
        var sum = 0;
        for(var i = 0; i < selector.length; i++){
            if(selector[i].querySelector('.itemname').innerText === this.memory.product){
                sum += parseInt(selector[i].querySelector('input[title="quantity"]').getAttribute('value'));
            }
        }
        return sum.toString();
    });

    console.log("return data");

    return extractorContext.return(extractedData);
};