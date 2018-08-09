(function () {
    window.utils = {
        loaded: true,
        getStatus: function (statusCode) {
            switch (statusCode) {
                case "ACTION_INCOMPATIBLE_WITH_SOURCE":
                    return { status: statusCode, message: "This action is incompatible with the given source." };
                case "ACTION_INCOMPATIBLE_WITH_SOURCE":
                    return { status: statusCode, message: "This action is incompatible with the given source." };
                case "ACTION_INCOMPATIBLE_WITH_SOURCE":	
                    return { status: statusCode, message: "This action is incompatible with the given source." };
                case "SITE_ERROR":	
                    return { status: statusCode, message: "A site error occurred while trying to perform this action." };
                case "USER_LOGGED_OUT":	
                    return { status: statusCode, message: "User is not logged in, for an unknown reason." };
                case "ORDER_NUMBER_NOT_EXIST":	
                    return { status: statusCode, message: "Order with provided number does not exist." };
                case "INVALID_URL":	
                    return { status: statusCode, message: "URL is invalid." };
                case "INVALID_QUANTITY_PROVIDED":	
                    return { status: statusCode, message: "Incorrect quantity Value." };
                case "PRODUCT_DOES_NOT_EXIST":	
                    return { status: statusCode, message: "Product not found." };
                case "PRODUCT_OUT_OF_STOCK":	
                    return { status: statusCode, message: "This product is not available at this time." };
                case "PRODUCT_REQUIRES_ADDITIONAL_DETAILS":	
                    return { status: statusCode, message: "Product requires additional details to add to cart." };
                case "QUANTITY_EXCEEDS_AVAILABLE_STOCK":	
                    return { status: statusCode, message: "The quantity provided exceeded the actual quantity in stock." };
                case "QUANTITY_EXCEEDS_MAX_ALLOWED":	
                    return { status: statusCode, message: "The quantity provided would exceed the maximum  quantity allowed in cart." };
                case "LOGIN_DELIVERY_ZIP_MISMATCH":	
                    return { status: statusCode, message: "Zip provided during login is different than the zip used in shipping address. This is not allowed." };
                case "MAX_SHIPPING_COST_EXCEEDED":	
                    return { status: statusCode, message: "Actual shipping cost exceeded the maximum specified." };
                case "MAX_SHIPPING_DAYS_EXCEEDED":	
                    return { status: statusCode, message: "Actual shipping days exceeded the maximum specified." };
                case "MAX_TOTAL_EXCEEDED":	
                    return { status: statusCode, message: "Order total exceeded the maximum specified." };
                case "CC_MISMATCH":	
                    return { status: statusCode, message: "Credit card provided was not found or no default credit card exists." };
                case "CVV_REQUIRED":	
                    return { status: statusCode, message: "CVV code was not provided in the input." };
                case "CVV_INCORRECT":	
                    return { status: statusCode, message: "Provided CVV code is incorrect." };
                case "CART_EMPTY":	
                    return { status: statusCode, message: "Shopping cart contains no items." };
                case "PRODUCT_NOT_AVAILABLE_FOR_SHIPPING":	
                    return { status: statusCode, message: "Products in cart are not available for shipping." };
                case "ADDRESS_MISSING":	
                    return { status: statusCode, message: "Provided address doesn't exist in the list of shipping addresses." };
                case "BUY_ACTION_FAILED":	
                    return { status: statusCode, message: "Failed to finalize the order." };
                case "REQUIRES_CREDIT_CARD_RE-ENTRY":
                    return { status: statusCode, message: "Credit card details are required to be re-entered during the final checkout steps. We cannot proceed at this time." };
                case "ACTION_NOT_SUPPORTED":	
                    return { status: statusCode, message: "This action is not compatible with this source." };
                default:
                    return { status: "UNKNOWN", message: "Status not recognized by utils lib." };
            }
        }
    }
})()