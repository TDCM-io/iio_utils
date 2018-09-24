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

    console.log("get product info into variables");
    var sku, product, price, product_url, quantity;
    sku = await extractorContext.execute(async function (a) {
        if (document.querySelector('#basicInfoCustomerSku')) return document.querySelector('#basicInfoCustomerSku').innerText.trim();
        return " ";
    });
    product = await extractorContext.execute(async function (a) {
        if (document.querySelector('.sku_title')) return document.querySelector('.sku_title').textContent;
        return " ";
    });
    price = await extractorContext.execute(async function (a) {
        if (document.querySelector('span[class="price_column right "]')) return document.querySelector('span[class="price_column right "]').innerText;
        return "$0";
    });
    product_url = await extractorContext.execute(async function (a) {
        return window.location.href;
    });
    quantity = input.quantity;
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
    extractorContext.setMemory({
        auth_status: extractorContext.memory.auth_status,
        auth_message: extractorContext.memory.auth_message,
        status: 'SUCCESS',
        message: ' '
    });
    console.log("Extract data");
    const data = extractorContext.createData(
        [{
            'auth_status': extractorContext.memory.auth_status,
            'auth_message': extractorContext.memory.auth_message,
            'status': extractorContext.memory.status,
            'message': extractorContext.memory.message,
            'sku': sku,
            'product': product,
            'price': price,
            'product_url': product_url,
            'quantity': quantity
        }]
    );

    const runtimeConfig = {
        "fields": [
          {
            "id": "79f26368-570b-4db7-8298-87ac9699b7d3",
            "name": "auth_status",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "79f26368-570b-4db7-8298-87ac9699b7d4",
            "name": "auth_message",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "f3d5a117-698c-4b52-bb76-4f1466b0a787",
            "name": "status",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "7e5620e6-d6b2-4157-b9e2-a45d9ae3003a",
            "name": "message",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "11353a3e-a39e-46b0-a3a3-d4cfbb1824fa",
            "name": "sku",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "8d172ff6-41f3-4970-a535-f1982917925b",
            "name": "product",
            "type": "AUTO",
            "defaultValue": " ",
            "ranking": 0
          },
          {
            "id": "31e27e97-f069-4c3f-9f0c-2f792866910a",
            "name": "price",
            "type": "AUTO",
            "defaultValue": "0",
            "ranking": 0
          },
          {
            "id": "fb969894-18f5-4332-8c20-6094438bb79f",
            "name": "product_url",
            "type": "AUTO",
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

    return extractorContext.return(data);
};