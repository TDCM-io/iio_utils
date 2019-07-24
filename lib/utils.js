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
            INVALID_PRODUCTS_ARRAY: {
                status: "FAILURE",
                message: "Invalid products array. Provided array of products is malformed."
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
            PRODUCT_REQUIRES_TOO_MANY_VARIANTS: {
                status: "FAILURE",
                message: "Product requires more than 3 variants selected."
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
            INVALID_NAME: {
                status: "FAILURE",
                message: "Invalid name. Must consist of letters only."
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
            },
            INVALID_CC: {
                status: "FAILURE",
                message: "Provided CC digits are not valid."
            },
            INVALID_CVV: {
                status: "FAILURE",
                message: "Provided CVV is not valid."
            },
            COULD_NOT_ADD_PRODUCT_TO_CART: {
                status: "FAILURE",
                message: "Product can not be added to cart successfully."
            },
            INVALID_CART: {
                status: "FAILURE",
                message: "Products in the cart and their respective quantities don't match the input."
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
            image: " ",
            variant_1: "",
            variant_2: "",
            variant_3: "",
            variant_4: "",
            variant_5: "",
            variant_6: "",
            variant_7: "",
            variant_8: "",
            variant_9: "",
            variant_10: "",
            selectors: ""
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
            image: " ",
            variant_1: "",
            variant_2: "",
            variant_3: "",
            variant_4: "",
            variant_5: "",
            variant_6: "",
            variant_7: "",
            variant_8: "",
            variant_9: "",
            variant_10: "",
            selectors: ""
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
        COLUMNS_SET_4 =  {
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
            "NEG 3.5.3.": COLUMNS_SET_4,
            "NEG 3.6.1.": COLUMNS_SET_4,
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
            },
            "SQUTR 4.1.1.": {
                status: "SUCCESS",
                message: " ",
                date: " ",
                sku: " ",
                item_name: " ",
                item_price: 0,
                item_availability: " ",
                protection_title: " ",
                protection_seller: " ",
                protection_price: 0,
                protection_years: 0,
                item_category_ids: " ",
                item_categories: " ",
                item_rating: " ",
                item_brand: " ",
                item_url: " ",
                item_image: " ",
                screen_capture_1: " ",
                screen_capture_2: " ",
                screen_capture_3: " "
            },
            "SQUTR 4.1.3.": {
                status: "SUCCESS",
                message: " ",
                product_url: " "
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
            this.$ = (window.jQuery || window.$ || _noConflictHandler).noConflict();

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

            this.handle404 = function (authObjId = 'AUTH_SUCCESS') {
                var regEx = /[45]\d{2}/;
                if (regEx.test(jsActionContext.lastResponseData.code)) {
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

        parseLocationAutoEurope(iata) {
            // #region CSV file
            const csvContent = `name;PUCountry;Destination;PUCode;PULoc;CDMLoc;Abbreviation;RCAutocomplete;RCCity;RCCoordinates;RCCountry;RCDropName;RCEntry;RCLocation
            Alicante;ES;Spain - Mainland;1082;Alicante Airport;Alicante, Spain (ALC-Alicante Intl.);ALC;Alicante+Airport+%28ALC%29%2C+Alicante%2C+Spain;Alicante;38.2871%2C-0.565073;Spain;Alicante+Airport;1472034;30966
            Malaga;ES;Spain - Mainland;1147;Malaga Airport;Málaga, Spanien (AGP);AGP;Malaga+Airport+%28AGP%29%2C+M%C3%A1laga%2C+Spain;M%C3%A1laga;36.6751%2C-4.49293;Spain;Malaga+Airport;1472052;31896
            Barcelona;ES;Spain - Mainland;1089;Barcelona International Airport - El Prat;Barcelona, Spanien (BCN);BCN;Barcelona+Airport+%28BCN%29%2C+Barcelona%2C+Spain;Barcelona;41.2987%2C2.07803;Spain;Barcelona+Airport;1472037;31061
            Rome FCO;IT;Italy;2019;Rome Fiumicino Airport;Rome, Italy (FCO-Fiumicino - Leonardo da Vinci Intl.);FCO;Rome+Fiumicino+Airport+%28FCO%29%2C+Rome%2C+Italy;Rome;41.7988%2C12.2574;Italy;Rome+Fiumicino+Airport;1472313;22391
            Rome CIO;IT;Italy;2019;Rome Ciampino Airport;Rome, Italy (CIA-Ciampino);CIA;Rome+Ciampino+Airport+%28CIA%29%2C+Rome%2C+Italy;Rome;41.8043%2C12.5913;Italy;Rome+Ciampino+Airport;1472312;22351
            Milan MXP;IT;Italy;1977;Milan Malpensa Airport - Terminal 1;MXP Mailand, Italien (MXP-Malpensa Intl.);MXP;Milan+Malpensa+Airport+%28MXP%29%2C+Milan%2C+Italy;Milan;45.6272%2C8.7111;Italy;Milan+Malpensa+Airport;1472302;21386
            Heathrow;GB;UK;1669;London Heathrow Airport;LHR London, Großbritannien (LHR-Heathrow);LHR;Heathrow+Airport+%28LHR%29%2C+London%2C+United+Kingdom;London;51.4708%2C-0.453043;United+Kingdom;Heathrow+Airport;1472178;37766
            Edinburgh;GB;UK;1634;Edinburgh Airport;EDI Edinburgh, Großbritannien (EDI);EDI;Edinburgh+Airport+%28EDI%29%2C+Edinburgh%2C+United+Kingdom;Edinburgh;55.9493%2C-3.36226;United+Kingdom;Edinburgh+Airport;1472171;36736
            Belfast;IB;UK;1826;Belfast International Airport;BFS Belfast, Großbritannien (BFS);BFS;Belfast+International+Airport+%28BFS%29%2C+Belfast%2C+United+Kingdom;Belfast;54.6575%2C-6.21583;United+Kingdom;Belfast+International+Airport;1472159;26436
            Paris CDG;FR;France - Mainland;1475;Paris Charles de Gaulle Airport;CDG Paris, Frankreich (CDG-Roissy-Charles de Gaulle);CDG;Paris+Charles+de+Gaulle+Airport+%28CDG%29%2C+Paris%2C+France;Paris;49.011%2C2.54727;France;Paris+Charles+de+Gaulle+Airport;1472136;96973
            Nice;FR;France - Mainland;1465;Nice Cote d'Azur International Airport;NCE Nizza, Frankreich (NCE-Cote d'Azur);NCE;Nice+Airport+%28NCE%29%2C+Nice%2C+France;Nice;43.66%2C7.21338;France;Nice+Airport;1472133;10566
            Lisbon;PT;Portgual;2607;Lisbon Airport;LIS Lissabon, Portugal (LIS-Humberto Delgado);LIS;Lisbon+Airport+%28LIS%29%2C+Lisbon%2C+Portugal;Lisbon;38.7704%2C-9.12956;Portugal;Lisbon+Airport;1472612;28061
            Faro;PT;Portgual;2596;Faro Airport;FAO Faro, Portugal (FAO-Faro Intl.);FAO;Faro+Airport+%28FAO%29%2C+Faro%2C+Portugal;Faro;37.0182%2C-7.96977;Portugal;Faro+Airport;1472609;27906
            Mallorca;ES;Spain - Balearic Islands;1162;Palma de Mallorca Airport;PMI Palma de Mallorca, Spanien (PMI);PMI;Palma+de+Mallorca+Airport+%28PMI%29%2C+Palma+de+Mallorca%2C+Spain;Palma+de+Mallorca;39.55%2C2.73333;Spain;Palma+de+Mallorca+Airport;1472056;30471
            Munich;DE;Germany;911;Munich Airport;MUC München, Deutschland (MUC-Franz Josef Strauß Intl.);MUC;Munich+Airport+%28MUC%29%2C+%2C+Germany;;48.3545%2C11.7862;Germany;Munich+Airport;1471994;15986
            Frankfurt;DE;Germany;781;Frankfurt am Main Airport;FRA Frankfurt, Deutschland (FRA-Frankfurt Intl.);FRA;Frankfurt+Airport+(FRA)%2c+Frankfurt%2c+Germany;Frankfurt;50.0514%2c8.56984&;Germany;Frankfurt+Airport;1471979;14526
            Brisbane;AU;Australia;76;Brisbane Airport - International Terminal;BNE Brisbane, Queensland, Australien (BNE);BNE;Brisbane+Airport+%28BNE%29%2C+Brisbane%2C+Australia;Brisbane;-27.4039%2C153.109;Australia;Brisbane+Airport;1471696;796
            Melbourne;AU;Australia;137;Melbourne Airport - International Terminal;MEL Melbourne, Victoria, Australien (MEL-Tullamarine);MEL;Melbourne+Airport+%28MEL%29%2C+Melbourne%2C+Australia;Melbourne;-37.6733%2C144.843;Australia;Melbourne+Airport;1471732;1646
            Athens;GR;Greece;1744;Athens International Airport;ATH Athen, Griechenland (ATH-Eleftherios Venizelos);ATH;Athens+Airport+%28ATH%29%2C+Athens%2C+Greece;Athens;37.9369%2C23.9444;Greece;Athens+Airport;1472203;17621
            Heraklion Airport;GR;Greece;1753;Heraklion International Airport;HER Heraklion, Griechenland (HER-Nikos Kazantzakis);HER;Heraklion+Airport+%28HER%29%2C+Heraklio+Town%2C+Greece;Heraklio+Town;35.3401%2C25.1803;Greece;Heraklion+Airport;1472207;17736
            Thessaloniki Airport;GR;Greece;1792;Thessaloniki International Airport;Thessaloniki, Ostmakedonien und Thrakien, Central Macedonia, Griechenland;SKG;Thessaloniki+Airport+%28SKG%29%2C+Thessalon%C3%ADki%2C+Greece;Thessalon%C3%ADki;40.5211%2C22.9708;Greece;Thessaloniki+Airport;1472226;18206
            Catania;IT;Italy - Sicily;1924;Catania Airport;CTA Catania, Italien (CTA-Fontanarossa);CTA;Catania+Airport+%28CTA%29%2C+Catania%2C+Italy;Catania;37.4714%2C15.0661;Italy;Catania+Airport;1472292;23456
            Boston;US;USA - Other;3100;Boston Logan International Airport;BOS Boston, Massachusetts, USA (BOS-Logan Intl.);BOS;Boston+Airport+%28BOS%29%2C+Boston%2C+United+States+of+America;Boston;42.3666%2C-71.0173;United+States+of+America;Boston+Airport;1472811;42116
            Chicago;US;USA - Other;3142;Chicago O'Hare Airport;ORD Chicago, IL, USA (ORD-O'Hare Intl.);ORD;Chicago+O%60Hare+Airport+%28ORD%29%2C+Chicago%2C+United+States+of+America;Chicago;41.9802%2C-87.9054;United+States+of+America;Chicago+O%60Hare+Airport;1472827;42291
            New Orleans;US;USA - Other;3411;New Orleans International Airport-Louis Armstrong;MSY New Orleans, LA, USA (MSY-Louis Armstrong New Orleans Intl.);MSY;New+Orleans+Airport+%28MSY%29%2C+New+Orleans%2C+United+States+of+America;New+Orleans;29.9851%2C-90.2568;United+States+of+America;New+Orleans+Airport;1472957;43421
            Denver;US;USA - Other;3178;Denver International Airport;DEN Denver, CO, USA (DEN-Denver Intl.);DEN;Denver+Airport+%28DEN%29%2C+Denver%2C+United+States+of+America;Denver;39.8644%2C-104.672;United+States+of+America;Denver+Airport;1472841;42416
            Atlanta;US;USA - Other;3070;Atlanta International Airport;ATL Atlanta, Georgia, USA (ATL-Hartsfield-Jackson Atlanta);ATL;Atlanta+Airport+%28ATL%29%2C+Atlanta%2C+United+States+of+America;Atlanta;33.6403%2C-84.4269;United+States+of+America;Atlanta+Airport;1472795;41996
            LAX;US;USA - California;3353;Los Angeles International Airport;LAX Los Angeles, CA, USA (LAX-Los Angeles Intl.);LAX;Los+Angeles+Airport+%28LAX%29%2C+Los+Angeles%2C+United+States+of+America;Los+Angeles;33.9425%2C-118.408;United+States+of+America;Los+Angeles+Airport;1472926;40446
            SFO;US;USA - California;3518;San Francisco International Airport;SFO San Francisco, CA, USA (SFO-San Francisco Intl.);SFO;San+Francisco+Airport+%28SFO%29%2C+San+Francisco%2C+United+States+of+America;San+Francisco;29.9851%2C-90.2568;United+States+of+America;San+Francisco+Airport;1473008;40691
            Orlando;US;USA - Florida;3440;Orlando International Airport;MCO Orlando, FL, USA (MCO-Orlando Intl.);MCO;Orlando+International+Airport+%28MCO%29%2C+Orlando%2C+United+States+of+America;Orlando;28.4318%2C-81.3083;United+States+of+America;Orlando+International+Airport;1472973;41301
            Miami;US;USA - Florida;3379;Miami International Airport;MIA Miami, FL, USA (MIA-Miami Intl.);MIA;Miami+Airport+(MIA)%2c+Miami%2c+United+States+of+America;Miami;25.7944%2c-80.2784;United+States+of+America;Miami+Airport;1472937;41111
            Teneriffe South;ES;Spain - Canary Islands;1188;South Tenerife Airport;TFS Teneriffa, Spanien (TFS-Tenerife South);TFS;Tenerife+Airport+South+%28TFS%29%2C+Arona%2C+Spain;Arona;28.0458%2C-16.5752;Spain;Tenerife+Airport+South;1472064;30891
            Dublin;IE;Ireland;1836;Dublin Airport;DUB Dublin, Irland (DUB);DUB;Dublin+Airport+%28DUB%29%2C+%2C+Ireland;;53.4263%2C-6.2495;Ireland;Dublin+Airport;1472256;19396
            Cagliari;IT;Italy - Sardinia;1916;Cagliari Aeroporto Elmas;CAG Cagliari, Italien (CAG-Elmas);CAG;Cagliari+Airport+%28CAG%29%2C+Cagliari%2C+Italy;Cagliari;39.2482%2C9.05672;Italy;Cagliari+Airport;1472291;23276
            Cape Town;ZA;South Africa;2891;Cape Town Airport - International Terminal;CPT Kapstadt, Südafrika (CPT-Cape Town Intl.);CPT;Cape+Town+Airport+(CPT)%2c+Cape+Town%2c+South+Africa;Cape+Town;-33.9667%2c18.6;South+Africa;Cape+Town+Airport;1473059;29676
            Zagreb;HR;Croatia;1815;Zagreb International Airport-Franjo Tudman;ZAG Zagreb, Kroatien (ZAG);ZAG;Zagreb+Airport+%28ZAG%29%2C+Zagreb%2C+Croatia;Zagreb;45.7406%2C16.0683;Croatia;Zagreb+Airport;1472244;6276
            Geneva;CH;Switzerland;599;Geneva Airport-Swiss Side;GVA Genf, Schweiz (GVA-Cointrin Intl.);GVA;Geneva+Airport+%28GVA%29%2C+Geneva%2C+Switzerland;Geneva;46.2381%2C6.10895;Switzerland;Geneva+Airport;1471911;33811
            Warsaw WAW;PL;Poland;2563;Warsaw Chopin Airport;WAW Warschau, Polen (WAW-Frederic Chopin);WAW;Warsaw+Airport+%28WAW%29%2C+Warsaw%2C+Poland;Warsaw;52.1675%2C20.9679;Poland;Warsaw+Airport;1472600;27691
            Auckland;NZ;New Zealand;2501;Auckland Airport - International Terminal;AKL Auckland, Neuseeland (AKL-Auckland Intl.);AKL;Auckland+International+Airport+%28AKL%29%2C+Auckland%2C+New+Zealand;Auckland;-37.0081%2C174.792;New+Zealand;Auckland+International+Airport;1472554;438496
            Amsterdam;NL;Holland;2353;Amsterdam Schiphol Airport;AMS Amsterdam, Niederlande (AMS-Schiphol);AMS;Amsterdam+Schiphol+Airport+%28AMS%29%2C+Amsterdam%2C+Netherlands;Amsterdam;52.3113%2C4.7641;Netherlands;Amsterdam+Schiphol+Airport;1472510;18491
            Ajaccio;FR;France - Corsica;1231;Ajaccio Airport-Napoleon Bonaparte;AJA Ajaccio, Frankreich (AJA-Napoléon Bonaparte);AJA;Ajaccio+Airport+%28AJA%29%2C+Ajaccio%2C+France;Ajaccio;41.9199%2C8.79399;France;Ajaccio+Airport;1472093;7701
            Figari;FR;France - Corsica;1359;Figari Airport;FSC Figari, Frankreich (FSC-Figari - Sud Corse);FSC;Figari+Airport+%28FSC%29%2C+Figari%2C+France;Figari;41.5006%2C9.09778;France;Figari+Airport;1472117;7751
            Bastia;FR;France - Corsica;1265;Bastia Airport;BIA Bastia, Frankreich (BIA-Poretta);BIA;Bastia+Airport+%28BIA%29%2C+Bastia%2C+France;Bastia;42.5477%2C9.48012;France;Bastia+Airport;1472098;7716
            Istanbul Ataturk;TR;Turkey;2837;Istanbul Airport - International Terminal;Istanbul, Türkei (IST);ISL;Istanbul+Airport+International+%28IST%29%2C+%C4%B0stanbul%2C+Turkey;%C4%B0stanbul;40.98%2C28.8173;Turkey;Istanbul+Airport+International;1472755;34916
            Naha Airport;JP;Japan;2162;Naha Airport;OKA Naha, Japan (OKA);OKA;Naha+Airport+%28OKA%29%2C+Naha%2C+Japan;Naha;26.2054%2C127.652;Japan;Naha+Airport;1472351;44547
            Tokyo NRT;JP;Japan;2204;Tokyo Narita Airport;NRT Tokyo, Japan (NRT-Narita);HND;Tokyo+Narita+Airport+%28NRT%29%2C+Tokyo%2C+Japan;Tokyo;35.7647%2C140.386;Japan;Tokyo+Narita+Airport;1472370;106633
            Fukuoka Airport;JP;Japan;2089;Fukuoka Airport;FUK Fukuoka, Japan (FUK);FUK;Fukuoka+Airport+%28FUK%29%2C+%2C+Japan;;33.596%2C130.449;Japan;Fukuoka+Airport;1472331;212731
            New Chitose Airport;JP;Japan;2079;Chitose Airport;Chitose, Hokkaido, Japan;CTS;New+Chitose+Airport+%28CTS%29%2C+Sapporo%2C+Japan;Sapporo;42.789%2C141.681;Japan;New+Chitose+Airport;1472353;106033
            Osaka Kix;JP;Japan;2179;Osaka Kansai International Airport;KIX Osaka, Japan (KIX-Kansai Intl.);KIX;Osaka+Kansai+Airport+(KIX)%2c+Osaka%2c+Japan;Osaka;34.4355%2c135.245;Japan;Osaka+Kansai+Airport;1472361;45257
            Keflavik;IS;Iceland;1884;Keflavik International Airport;KEF Reykjavík, Island (KEF-Keflavik Intl.);KEF;Keflavik+International+Airport+%28KEF%29%2C+Keflav%C3%ADk%2C+Iceland;Keflav%C3%ADk;63.985%2C-22.6056;Iceland;Keflavik+International+Airport;1472279;84888
            Cancun;MX;Mexico;2284;Cancun Airport;Cancun, Quintana Roo, Mexico (CUN-Cancun Intl.);CUN;Cancun+Airport+%28CUN%29%2C+Canc%C3%BAn%2C+Mexico;Canc%C3%BAn;21.0388%2C-86.8741;Mexico;Cancun+Airport;1472434;25186
            Sao Paulo GRU;BR;Brazil;423;Sao Paulo Guarulhos International Airport;GRU São Paulo, Brasilien (GRU-Guarulhos - Governor Andre Franco Montoro Intl);GRU;Sao+Paulo+-+Guarulhos+Airport+(GRU)%2c+Brazil;Sao+Paulo;-23.4286%2c-46.4754;Brazil;Sao+Paulo+-+Guarulhos+Airport;1471850;3951
            Recife;BR;Brazil;389;Recife Airport;REC Recife, Brasilien (REC-Guararapes Intl.);REC;Recife+Airport+%28REC%29%2C+%2C+Brazil;;-8.12655%2C-34.9228;Brazil;Recife+Airport;1471840;3736
            Porto Alegre;BR;Brazil;382;Porto Alegre Airport-Salgado Filho;POA Porto Alegre, Brasilien (POA-Salgado Filho Intl.);POA;Porto+Alegre+Airport+%28POA%29%2C+Porto+Alegre%2C+Brazil;Porto+Alegre;-29.9939%2C-51.1712;Brazil;Porto+Alegre+Airport;1471836;3681
            Bangkok Airport;TH;Thailand;2788;Bangkok Suvamabhumi Airport;BKK Bangkok, Thailand (BKK-Suvarnabhumi Intl.);BKK;Bangkok+Suvarnabhumi+Airport+%28BKK%29%2C+Bangkok%2C+Thailand;Bangkok;13.6882%2C100.749;Thailand;Bangkok+Suvarnabhumi+Airport;1472725;34486
            Toronto;CA;Canada;566;Toronto Pearson International Airport;YYZ Toronto, Ontario, Kanada (YYZ-Pearson);YYZ;Toronto+Airport+%28YYZ%29%2C+Toronto%2C+Canada;Toronto;43.6814%2C-79.6119;Canada;Toronto+Airport;1471902;5436
            Montreal;CA;Canada;525;Montreal - Trudeau International Airport;YUL Montréal, QC, Kanada (YUL-Pierre Elliott Trudeau Intl.);YUL;Montreal+Airport+%28YUL%29%2C+Montr%C3%A9al%2C+Canada;Montr%C3%A9al;45.4681%2C-73.7414;Canada;Montreal+Airport;1471884;4841
            Bucharest;RO;Romania;2658;Bucharest Otopeni International Airport-Henri Coanda;OTP Bukarest, Rumänien (OTP-Henri Coanda Intl.);OTP;Bucharest+Otopeni+Airport+%28OTP%29%2C+%2C+Romania;;44.5725%2C26.0844;Romania;Bucharest+Otopeni+Airport;1472627;28681
            Dubai;AE;UAE;3;Dubai International Airport - Terminal 1;DXB Dubai, Vereinigte Arabische Emirate (DXB-Dubai Intl.);DXB;Dubai+Airport+%28DXB%29%2C+Dubai%2C+United+Arab+Emirates;Dubai;25.2525%2C55.3643;United+Arab+Emirates;Dubai+Airport;1471643;35306
            Vienna;AT;Austria;51;Vienna International Airport;VIE Wien, Österreich (VIE-Wien Intl.);VIE;Vienna+Airport+%28VIE%29%2C+Vienna%2C+Austria;Vienna;48.12%2C16.5608;Austria;Vienna+Airport;1471687;2566
            Arlanda;SE;Sweden;2750;Stockholm Arlanda Airport;ARN Stockholm, Schweden (ARN-Arlanda);ARN;Stockholm+Arlanda+Airport+%28ARN%29%2C+%2C+Sweden;;59.6519%2C17.9335;Sweden;Stockholm+Arlanda+Airport;1472705;33486
            Tel Aviv;IL;Israel;1877;Tel Aviv Ben Gurion Airport;TLV Tel Aviv, Israel(TLV-Ben Gurion);TLV;Tel+Aviv+Ben+Gurion+Airport+%28TLV%29%2C+Tel+Aviv%2C+Israel;Tel+Aviv;32.001%2C34.8704;Israel;Tel+Aviv+Ben+Gurion+Airport;1472262;153626
            Oslo OSL;NO;Norway;2455;Oslo Gardermoen Airport;OSL Oslo, Norwegen (OSL-Gardermoen);OSL;Gardermoen+Airport+%28OSL%29%2C+Oslo%2C+Norway;Oslo;60.1939%2C11.1003;Norway;Gardermoen+Airport;1472525;27066
            Brussels BRU;BE;Belgium;209;Brussels Zaventem Airport;BRU Flughafen Brüssel-Zaventem, Belgien (BRU-Brussels - National);BRU;Brussels+Airport+%28BRU%29%2C+Brussels%2C+Belgium;Brussels;50.8971%2C4.48353;Belgium;Brussels+Airport;1471775;2826
            Larnaca;CY;Cyprus;693;Larnaca International Airport;LCA Larnaca, Zypern (LCA-Larnaca Intl.);LCA;Larnaca+Airport+%28LCA%29%2C+Larnaca%2C+Cyprus;Larnaca;34.8693%2C33.6114;Cyprus;Larnaca+Airport;1471960;6371
            Santiago;CL;Chile;648;Santiago Airport;SCQ Santiago de Compostela, Spanien (SCQ-Lavacolla);SCL;SDC+Airport+%28SCQ%29%2C+Santiago+de+Compostela%2C+Spain;Santiago+de+Compostela;42.8975%2C-8.4207;Spain;SDC+Airport;1472061;32251
            Copenhagen;DK;Denmark;1031;Copenhagen Airport;CPH Kopenhagen, Dänemark (CPH-Kastrup);CPH;Copenhagen+Airport+%28CPH%29%2C+K%C3%B8benhavn%2C+Denmark;K%C3%B8benhavn;55.6178%2C12.6558;Denmark;Copenhagen+Airport;1472008;6576
            Prague;CS;Czech Republic;689;Prague International Airport-Vaclav Havel;PRG Prag, Prag, Tschechische Republik (PRG-Václav Havel);PRG;Prague+Airport+%28PRG%29%2C+Prague%2C+Czech+Republic;Prague;50.1073%2C14.2673;Czech+Republic;Prague+Airport;1471965;6486
            Casablanca;MA;Morocco;4568;Casablanca International Airport - Mohammed V;CMN Casablanca, Marokko (CMN-Mohammed V);CMN;Casablanca+Airport+%28CMN%29%2C+Casablanca%2C+Morocco;Casablanca;33.3678%2C-7.58778;Morocco;Casablanca+Airport;1472410;25851
            Ponta del Garda;PT;Portual - Azores;2618;Ponta Delgada Airport-Joao Paulo II;PDL Ponta Delgada, Portugal (PDL-Joao Paulo II);PDL;Ponta+Delgada+Airport+%28PDL%29%2C+Ponta+Delgada%2C+Portugal;Ponta+Delgada;37.7424%2C-25.6968;Portugal;Ponta+Delgada+Airport;1472614;357943
            Funchal Airport;PT;Madeira;2608;Funchal Madeira Airport;FNC Funchal, Portugal (FNC-Cristiano Ronaldo);FNC;Funchal+Airport+(FNC)%2c+Madeira%2c+Portugal;Madeira;32.6931%2c-16.7757;Portugal;Funchal+Airport;1472611;24431
            Budapest;HU;Hungary;1820;Budapest International Airport - Ferenc Liszt;BUD Budapest, Ungarn (BUD-Ferenc Liszt Intl.);BUD;Budapest+Airport+%28BUD%29%2C+Budapest%2C+Hungary;Budapest;47.4376%2C19.2624;Hungary;Budapest+Airport;1472247;18981
            JFK;US;USA - New York;3415;New York - JFK International Airport;JFK New York, New York, USA (JFK-John F. Kennedy Intl.);JFK;JFK+Airport+%28JFK%29%2C+New+York%2C+United+States+of+America;New+York;40.6397%2C-73.7792;United+States+of+America;JFK+Airport;1472896;41721
            Helsinki;FI;Finland;1203;Helsinki Vaanta International Airport;HEL Helsinki, Finnland (HEL-Vantaa);HEL;Helsinki+Airport+%28HEL%29%2C+Helsinki%2C+Finland;Helsinki;60.3192%2C24.963;Finland;Helsinki+Airport;1472069;7316
            Buenos Aires;AR;Argentina;24;Buenos Aires Ezeiza International Airport;EZE Buenos Aires, Argentinien (EZE-Ministro Pistarini Intl.);EZE;Buenos+Aires+International+Airport+%28EZE%29%2C+Buenos+Aires%2C+Argentina;Buenos+Aires;-34.812%2C-58.5422;Argentina;Buenos+Aires+International+Airport;1471651;65056
            Bariloche;AR;Argentina;23;San Carlos de Bariloche Airport;BRC Bariloche, Argentinien (BRC-Teniente Luis Candelaria Intl.);BRC;Bariloche+Airport+%28BRC%29%2C+San+Carlos+de+Bariloche%2C+Argentina;San+Carlos+de+Bariloche;-41.1511%2C-71.1575;Argentina;Bariloche+Airport;1471649;66
            Las Vegas;US;USA - Las Vegas;3338;Las Vegas International Airport-McCarran;LAS Las Vegas, Nevada, USA (LAS-McCarran Intl.);LAS;Las+Vegas+Airport+%28LAS%29%2C+Las+Vegas%2C+United+States+of+America;Las+Vegas;36.0828%2C-115.153;United+States+of+America;Las+Vegas+Airport;1472918;41596
            `;
            // #endregion
            let csvLines = csvContent.split('\n');
            const csvHeadersArr = csvLines.shift().split(';');
            let result = {};
            const iataIndex = csvHeadersArr.findIndex(header => header === 'Abbreviation');
            csvLines.forEach(line => {
                lineArr = line.split(';');
                lineIATA = lineArr[iataIndex];
                result[lineIATA] = {};
                csvHeadersArr.forEach((header, index) => {
                    result[lineIATA][header] = lineArr[index];
                });
                result[lineIATA].name = result[lineIATA].name.replace(/^\s*/, '');
            });
            return result[iata];
        }
    }
    
})();