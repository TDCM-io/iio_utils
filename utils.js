(function () {

    let _status = {
        AUTH_SUCCESS: {
            auth_status: "SUCCESS",
            auth_message: " "
        },
        AUTH_2FA: {
            auth_status: "2FA",
            auth_message: " "
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
            message: "Failed to empty shopping cart."
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
    }

    window.__Utils = class Utils {
        constructor(jsActionContext) {
            let _noConflictHandler = {
                noConflict: function () {
                    return function () {
                        return console.log("jQuery library not loaded.");
                    }.bind(jsActionContext);
                }
            }
            this.loaded = true;
            this.$ = (window.jQuery || _noConflictHandler).noConflict();

            this.endEx = function (authObjId, statusObjId, authFailedMsg) {
                let returnData;

                if (!authFailedMsg) {
                    let authObj = _status[authObjId] || {};
                    let statusObj = _status[statusObjId] || {};

                    if (!_status[authObjId] || !_status[statusObjId])
                        return console.log("authObjId or statusObjId do not match any known status.");

                    returnData = Object.assign(authObj, statusObj)
                } else {
                    returnData = {
                        auth_status: "FAILURE",
                        auth_message: authFailedMsg
                    };
                }
                this.memory.returnData = this.createData(returnData);
                return this.return(this.memory.returnData);
            }.bind(jsActionContext);
        }

        checkTimeframes(timeframes) {
            if (timeframes.length != 2)
                return this.endEx('AUTH_SUCCESS', 'INVALID_TIMEFRAME_QUANTITY');

            if (!/^\d{10}$/.test(timeframes[0]) || !/^\d{10}$/.test(timeframes[1]) || (timeframes[1] > parseInt(new Date().getTime() / 1000)))
                return this.endEx('AUTH_SUCCESS', 'INVALID_TIMEFRAME');

            return true;
        }

        delay(timeout) {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }
    }
})();