(function () {
    const STATUS = {
            AUTH_SUCCESS: {
                auth_status: "SUCCESS",
                auth_message: " "
            },
            AUTH_2FA: {
                auth_status: "2FA",
                auth_message: " "
            },
            AUTH_CAPTCHA: {
                auth_status: "FAILURE",
                auth_message: "Extractor could not solve captcha."
            },
            AUTH_UNKNOWN: {
                auth_status: "UNKNOWN",
                auth_message: " "
            },
            ACTION_INCOMPATIBLE_WITH_SOURCE: {
                status: "FAILURE",
                message: "This action is incompatible with the given source."
            },
            SITE_ERROR: {
                status: "FAILURE",
                message: "A site error occurred while trying to perform this action."
            },
            USER_LOGGED_OUT: {
                status: "FAILURE",
                message: "User is not logged in, for an unknown reason."
            },
            ORDER_NUMBER_NOT_EXIST: {
                status: "FAILURE",
                message: "Order with provided number does not exist."
            },
            INVALID_URL: {
                status: "FAILURE",
                message: "URL is invalid."
            },
            INVALID_QUANTITY_PROVIDED: {
                status: "FAILURE",
                message: "Incorrect quantity value."
            },
            PRODUCT_DOES_NOT_EXIST: {
                status: "FAILURE",
                message: "Product not found."
            },
            PRODUCT_OUT_OF_STOCK: {
                status: "FAILURE",
                message: "This product is not available at this time."
            },
            PRODUCT_REQUIRES_ADDITIONAL_DETAILS: {
                status: "FAILURE",
                message: "Product requires additional details to add to cart."
            },
            QUANTITY_EXCEEDS_AVAILABLE_STOCK: {
                status: "FAILURE",
                message: "The quantity provided exceeded the actual quantity in stock."
            },
            QUANTITY_EXCEEDS_MAX_ALLOWED: {
                status: "FAILURE",
                message: "The quantity provided would exceed the maximum quantity allowed in the cart."
            },
            MAX_NUMBER_OF_ADDRESSES_REACHED: {
                status: "FAILURE",
                message: "The maximum number of shipping addresses has been reached."
            },
            LOGIN_DELIVERY_ZIP_MISMATCH: {
                status: "FAILURE",
                message: "Zip provided during login is different than the zip used in shipping address. This is not allowed."
            },
            MAX_SHIPPING_COST_EXCEEDED: {
                status: "FAILURE",
                message: "Actual shipping cost exceeded the maximum specified."
            },
            MAX_SHIPPING_DAYS_EXCEEDED: {
                status: "FAILURE",
                message: "Actual shipping days exceeded the maximum specified."
            },
            MAX_TOTAL_EXCEEDED: {
                status: "FAILURE",
                message: "Order total exceeded the maximum specified."
            },
            CC_MISMATCH: {
                status: "FAILURE",
                message: "Credit card provided was not found or no default credit card exists."
            },
            CVV_REQUIRED: {
                status: "FAILURE",
                message: "CVV code was not provided in the input."
            },
            CVV_INCORRECT: {
                status: "FAILURE",
                message: "Provided CVV code is incorrect."
            },
            CART_EMPTY: {
                status: "FAILURE",
                message: "Shopping cart contains no items."
            },
            CART_NOT_EMPTY: {
                status: "FAILURE",
                message: "Shopping cart is not empty."
            },
            PRODUCT_NOT_AVAILABLE_FOR_SHIPPING: {
                status: "FAILURE",
                message: "Products in cart are not available for shipping."
            },
            ADDRESS_MISSING: {
                status: "FAILURE",
                message: "Provided address doesn't exist in the list of shipping addresses."
            },
            BUY_ACTION_FAILED: {
                status: "FAILURE",
                message: "Failed to finalize the order."
            },
            REQUIRES_CREDIT_CARD_RE: {
                status: "FAILURE",
                message: "Credit card details are required to be re-entered during the final checkout steps. We cannot proceed at this time."
            },
            ACTION_NOT_SUPPORTED: {
                status: "FAILURE",
                message: "This action is not compatible with this source."
            },
            INVALID_TIMEFRAME_QUANTITY: {
                status: "FAILURE",
                message: "Invalid number of timeframe inputs."
            },
            INVALID_TIMEFRAME: {
                status: "FAILURE",
                message: "Invalid timeframe."
            },
            INVALID_ORDER_NUMBER: {
                status: "FAILURE",
                message: "Invalid order number."
            },
            INPUT_MISSING: {
                status: "FAILURE",
                message: "Required input missing."
            },
            INVALID_ZIP_CODE: {
                status: "FAILURE",
                message: "Invalid zip code. Must consist of 5 digits."
            },
            INVALID_PHONE: {
                status: "FAILURE",
                message: "Invalid phone number. Must consist of 10 digits."
            },
            INVALID_STATE: {
                status: "FAILURE",
                message: "Invalid state. Must consist of 2 letters."
            },
            INVALID_CITY: {
                status: "FAILURE",
                message: "Invalid city. Must consist of letters only."
            },
            UNKNOWN_ERROR: {
                status: "FAILURE",
                message: "Extraction failed for an unknown reason."
            },
            PRODUCT_NOT_ADDED_TO_CART: {
                status: "FAILURE",
                message: "Product was not added to cart for an unknown reason."
            },
            BLANK_FAILURE: {
                status: "FAILURE",
                message: " "
            },
            MEMBER_NOT_FOUND: {
                status: "FAILURE",
                message: "Member search failed to find a member with provided inputs."
            }
        },
        COLUMNS_SET_1 = {
            status: "SUCCESS",
            message: " ",
            sku: " ",
            product: " ",
            price: 0,
            category: " ",
            description: " ",
            product_url: " ",
            image: " "
        },
        COLUMNS_SET_2 = {
            auth_status: "SUCCESS",
            auth_message: " ",
            status: "SUCCESS",
            message: " ",
            sku: " ",
            product: " ",
            price: 0,
            category: " ",
            description: " ",
            product_url: " ",
            image: " "
        },
        COLUMNS_SET_3 = {
            auth_status: "SUCCESS",
            auth_message: " ",
            status: "SUCCESS",
            message: " ",
            sku: " ",
            product: " ",
            price: 0,
            product_url: " ",
            quantity: 0
        },
        COLUMNS = {
            "NEG 3.1.1.": {
                auth_status: "SUCCESS",
                auth_message: " "
            },
            "NEG 3.2.1.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " ",
                order_number: " ",
                order_url: " "
            },
            "NEG 3.2.2.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " ",
                order_number: " ",
                date: " ",
                name: " ",
                address: " ",
                address_2: " ",
                city: " ",
                state: " ",
                zip: " ",
                product_names: " ",
                product_skus: " ",
                product_prices: 0,
                product_urls: " ",
                product_quantities: 0,
                subtotal: 0,
                tax: 0,
                shipping: 0,
                discount: 0,
                fee: 0,
                total: 0,
                delivery_status: " ",
                tracking_numbers: " ",
                couriers: " "
            },
            "NEG 3.3.1.": COLUMNS_SET_1,
            "NEG 3.3.2.": COLUMNS_SET_1,
            "NEG 3.3.3.": COLUMNS_SET_2,
            "NEG 3.3.4.": COLUMNS_SET_2,
            "NEG 3.4.1.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " ",
                product: " ",
                quantity: 0
            },
            "NEG 3.4.2.": COLUMNS_SET_3,
            "NEG 3.4.3.": COLUMNS_SET_3,
            "NEG 3.4.4.": COLUMNS_SET_3,
            "NEG 3.4.5.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " "
            },
            "NEG 3.5.1.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " ",
                product: " ",
                product_url: " ",
                category: " ",
                sku: " ",
                price: 0,
                image: " ",
                quantity: 0,
                subtotal: 0,
                tax: 0,
                shipping: 0,
                discount: 0,
                fees: 0,
                total: 0,
                estimated_delivery_date: " "
            },
            "NEG 3.5.2.": {
                status: "SUCCESS",
                message: " ",
                product: " ",
                product_url: " ",
                category: " ",
                sku: " ",
                price: 0,
                image: " ",
                quantity: 0,
                subtotal: 0,
                tax: 0,
                shipping: 0,
                discount: 0,
                fees: 0,
                total: 0,
                estimated_delivery_date: " "
            },
            "NEG 3.5.3.": {
                auth_status: "SUCCESS",
                auth_message: " ",
                status: "SUCCESS",
                message: " ",
                product: " ",
                product_url: " ",
                category: " ",
                sku: " ",
                price: 0,
                image: " ",
                quantity: 0,
                subtotal: 0,
                tax: 0,
                shipping: 0,
                discount: 0,
                fees: 0,
                total: 0,
                estimated_delivery_date: " ",
                order_number: " "
            },
            "EYE 3.1.1.": {
                status: "SUCCESS",
                message: " ",
                provider: " ",
                frame_amount: 0,
                frame_is_percent: false,
                frame_base_amount: 0,
                frame_level: " ",
                frame_copay: 0,
                lenses_description: " ",
                lenses_is_percent: false,
                lenses_base_amount: 0,
                lenses_level: " ",
                lenses_copay: 0,
                lens_options_description: " ",
                lens_options_amount: 0,
                lens_options_is_percent: false,
                lens_options_base_amount: 0,
                lens_options_level: " ",
                lens_options_copay: 0
            }
        }

    window.__Utils = class Utils {
        constructor(jsActionContext, columnsKey) {
            columnsKey = /\.$/.test(columnsKey) ? columnsKey : (columnsKey + '.');
            
            let _columns = COLUMNS[columnsKey] || {};
            let _noConflictHandler = {
                noConflict: function () {
                    return function () {
                        return console.log("jQuery library not loaded.");
                    }.bind(jsActionContext);
                }
            }
            var _this = this;
            this.returnData = null;
            this.loaded = true;
            this.$ = (window.jQuery || _noConflictHandler).noConflict();

            this.endEx = function (authObjId, statusObjId, authFailedMsg, customMsg) {
                let returnData;

                if (customMsg) {
                    returnData = {
                        auth_status: (!!authFailedMsg) ? "FAILURE" : "SUCCESS",
                        auth_message: authFailedMsg || " ",
                        status: "FAILURE",
                        message: customMsg
                    };
                } else if (!authFailedMsg) {
                    let authObj = (typeof authObjId === 'string') ? STATUS[authObjId] : {};
                    let statusObj = (typeof statusObjId === 'string') ? STATUS[statusObjId] : {};

                    if ((authObjId === null && statusObjId === null) || !statusObj || !authObj)
                        return console.log("authObjId or statusObjId do not match any known status.");

                    returnData = Object.assign(authObj, statusObj);
                } else if (columnsKey !== "NEG 3.1.1.") {
                    returnData = {
                        auth_status: "FAILURE",
                        auth_message: authFailedMsg,
                        status: "FAILURE",
                        message: " "
                    };
                } else {
                    returnData = {
                        auth_status: "FAILURE",
                        auth_message: authFailedMsg
                    };
                }
                returnData = { ..._columns,
                    ...returnData
                };
                this.memory.returnData = this.createData(returnData);
                return (_this.returnData = this.return(this.memory.returnData));
            }.bind(jsActionContext);

            this.handle404 = function (authObjId = 'AUTH_SUCCESS', responseCode = null) {
                var regEx = /[45]\d{2}/;
                if (responseCode ? regEx.test(responseCode) : false
                        || regEx.test(jsActionContext.lastResponseData.code)) {
                    return this.endEx(authObjId, 'INVALID_URL');
                }
            }
        }

        checkTimeframes(timeframes, authObjId = 'AUTH_SUCCESS') {
            if (timeframes.length != 2)
                return this.endEx(authObjId, 'INVALID_TIMEFRAME_QUANTITY');

            if (!/^\d{10}$/.test(timeframes[0]) ||
                !/^\d{10}$/.test(timeframes[1]) ||
                (parseInt(timeframes[1]) > new Date().getTime() / 1000) ||
                parseInt(timeframes[0]) > parseInt(timeframes[1])) {
                return this.endEx(authObjId, 'INVALID_TIMEFRAME');
            }

            return true;
        }

        delay(timeout) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }

        async safeRedirect(URL, fetchOptions = {
            'credentials': 'include'
        }, authObjId = 'AUTH_SUCCESS') {
            let isOk = await fetch(URL, fetchOptions)
                .then(response => response.ok)
                .catch(() => false);

            if (!isOk) {
                return this.endEx(authObjId, 'INVALID_URL');
            }
            window.location.replace(URL);
        }

        async fetchHTMLBody(URL, fetchOptions = {
            'credentials': 'include'
        }, authObjId = 'AUTH_SUCCESS') {
            let parser = new DOMParser();
            let isOk = true;

            var text = await fetch(URL, fetchOptions)
                .then(response => response.text())
                .catch(() => {
                    isOk = false;
                });

            if (isOk)
                return parser.parseFromString(text, 'text/html');
            else
                return this.endEx(authObjId, 'INVALID_URL');
        }

        async checkDestinationBody(URL, xpath, fetchOptions = {
            'credentials': 'include',
            'mode': 'no-cors'
        }) {

            var parser = new DOMParser();
            var text = await fetch(URL, fetchOptions)
                .then(response => response.text())
                .catch(() => {
                    return "";
                });

            var doc = parser.parseFromString(text, 'text/html');

            var test = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return !!test;
        }

        mergeExtractions(obj1, obj2) {
            var newData = {};
            for (let property in obj1) {
                if (property in obj2) {
                    if ((obj1[property] == obj2[property]) || (obj2[property][0].text == " ") || (obj2[property].length == 0)) {
                        newData[property] = obj1[property];
                    } else {
                        newData[property] = obj2[property];
                    }
                } else {
                    newData[property] = obj1[property];
                }
            }

            for (let property in obj2) {
                if (!(property in obj1) && (obj2[property].length > 0)) {
                    newData[property] = obj2[property];
                }
            }
            return newData;
        }
    }
    
})();