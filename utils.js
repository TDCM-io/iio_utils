(function () {
    let _jsActionContext;
    let _endEx;
    let _status = {
        AUTH_SUCCESS: { auth_status: "SUCESS", auth_message: "" },
        AUTH_2FA: { auth_status: "2FA", auth_message: "" },
        AUTH_UNKNOWN: { auth_status: "UNKNOWN", auth_message: "" },
        ACTION_INCOMPATIBLE_WITH_SOURCE: { status: "FAILED", message: "This action is incompatible with the given source." },
        SITE_ERROR: { status: "FAILED", message: "A site error occurred while trying to perform this action." },
        USER_LOGGED_OUT: { status: "FAILED", message: "User is not logged in, for an unknown reason." },
        ORDER_NUMBER_NOT_EXIST: { status: "FAILED", message: "Order with provided number does not exist." },
        INVALID_URL: { status: "FAILED", message: "URL is invalid." },
        INVALID_QUANTITY_PROVIDED: { status: "FAILED", message: "Incorrect quantity Value." },
        PRODUCT_DOES_NOT_EXIST: { status: "FAILED", message: "Product not found." },
        PRODUCT_OUT_OF_STOCK: { status: "FAILED", message: "This product is not available at this time." },
        PRODUCT_REQUIRES_ADDITIONAL_DETAILS: { status: "FAILED", message: "Product requires additional details to add to cart." },
        QUANTITY_EXCEEDS_AVAILABLE_STOCK: { status: "FAILED", message: "The quantity provided exceeded the actual quantity in stock." },
        QUANTITY_EXCEEDS_MAX_ALLOWED: { status: "FAILED", message: "The quantity provided would exceed the maximum  quantity allowed in cart." },
        LOGIN_DELIVERY_ZIP_MISMATCH: { status: "FAILED", message: "Zip provided during login is different than the zip used in shipping address. This is not allowed." },
        MAX_SHIPPING_COST_EXCEEDED: { status: "FAILED", message: "Actual shipping cost exceeded the maximum specified." },
        MAX_SHIPPING_DAYS_EXCEEDED: { status: "FAILED", message: "Actual shipping days exceeded the maximum specified." },
        MAX_TOTAL_EXCEEDED: { status: "FAILED", message: "Order total exceeded the maximum specified." },
        CC_MISMATCH: { status: "FAILED", message: "Credit card provided was not found or no default credit card exists." },
        CVV_REQUIRED: { status: "FAILED", message: "CVV code was not provided in the input." },
        CVV_INCORRECT: { status: "FAILED", message: "Provided CVV code is incorrect." },
        CART_EMPTY: { status: "FAILED", message: "Shopping cart contains no items." },
        PRODUCT_NOT_AVAILABLE_FOR_SHIPPING: { status: "FAILED", message: "Products in cart are not available for shipping." },
        ADDRESS_MISSING: { status: "FAILED", message: "Provided address doesn't exist in the list of shipping addresses." },
        BUY_ACTION_FAILED: { status: "FAILED", message: "Failed to finalize the order." },
        REQUIRES_CREDIT_CARD_RE: { status: "FAILED", message: "Credit card details are required to be re-entered during the final checkout steps. We cannot proceed at this time." },
        ACTION_NOT_SUPPORTED: { status: "FAILED", message: "This action is not compatible with this source." },
        INVALID_TIMEFRAME_QUANTITY: { status: "FAILED", message: "Invalid number of timeframe inputs." },
        INVALID_TIMEFRAME: { status: "FAILED", message: "Invalid timeframe." },
    }

    window.__Utils = class Utils {
        constructor(jsActionContext) {
            _jsActionContext = jsActionContext;
            this.endEx = function (authObjId, statusObjId, authFailedMsg) {
                let returnData;

                if (!authFailedMsg) {
                    let authObj = _status[authObjId] || {};
                    let statusObj = _status[statusObjId] || {};

                    if ((!authObjId || typeof authObjId != "string") && (!statusObjId || typeof statusObjId != "string")) {
                        return console.log("No authObjId and no statusObjId provided.");
                    } else if (!_status[authObjId] && !_status[authObjId]) {
                        return console.log("authObjId and statusObjId does not math any known status.");
                    }

                    returnData = Object.assign(authObj, statusObj)
                } else {
                    returnData = {
                        auth_status: "FAILED",
                        auth_message: authFailedMsg
                    };
                }
                this.memory.returnData = this.createData(returnData);
                return this.return(this.memory.returnData);
            }.bind(_jsActionContext);
            
            _endEx = this.endEx;
            
            this.checkTimeframes = function(timeframes) {
              let returnData;
              if (timeframes.length != 2) {
                return _endEx('AUTH_SUCCESS', 'INVALID_TIMEFRAME_QUANTITY');
              } else if (!/^\d{10}$/.test(timeframes[0]) || !/^\d{10}$/.test(timeframes[1]) || (timeframes[1] > parseInt(new Date().getTime()/1000))) {
                return _endEx('AUTH_SUCCESS', 'INVALID_TIMEFRAME');
              }
              return true;
            }.bind(_jsActionContext);
        }
    }
})()