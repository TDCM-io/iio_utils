module.exports = async function (input) {
    console.log('extractor input', input);
    var lastResponseData = await extractorContext.goto('https://business.officedepot.com/');

    var response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.3.3.");
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
    
    response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.3.3.");
        if (!/^((https?|ftp):\/\/)?(www\.)?business\.officedepot\.com\/catalog\/catalogSku\.do\?id=\d+$/.test(this.memory.url)) {
            return utils.endEx(null, 'INVALID_URL');
        }
        await utils.safeRedirect(this.memory.url);
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    await extractorContext.waitForPage();
    
    response = await extractorContext.execute(async function () {
        const utils = new window.__Utils(this, "NEG 3.3.3.");
        var noResult = document.querySelector('div[class="section search_box_wrapper"]');
        if (noResult) {
            if (/no results found/i.test(noResult.innerText)) {
                return utils.endEx(null, 'INVALID_URL');
            }
        }
        document.body.setAttribute('producturl', this.memory.url);
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
                "id": "0683c6d6-1332-4400-b115-1c1613eca907",
                "name": "auth_status",
                "type": "AUTO",
                "xpath": "//body/@auth_status",
                "defaultValue": "SUCCESS",
                "ranking": 0
            },
            {
                "id": "8722112c-d0cd-4399-88c5-21fc0911a26f",
                "name": "auth_message",
                "type": "AUTO",
                "xpath": "//body/@auth_message",
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "c01429bd-b92c-4adb-8798-1f8f0f6f482a",
                "name": "status",
                "type": "AUTO",
                "xpath": "//body/@status",
                "defaultValue": "SUCCESS",
                "ranking": 0
            },
            {
                "id": "347c48b8-fc1e-4f05-a261-0d6373f7d96e",
                "name": "message",
                "type": "AUTO",
                "xpath": "//body/@message",
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "49b16b3a-6993-4664-b8ed-8fc376c25d2e",
                "name": "sku",
                "type": "TEXT",
                "selector": [
                    [
                        "span[itemprop=\"sku\"]"
                    ]
                ],
                "regExp": "[^\\#]+$",
                "regExpReplace": "",
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "a92652fa-a7ea-4b8d-9efc-a261a43a168e",
                "name": "product",
                "type": "TEXT",
                "selector": [
                    [
                        "h1.semi_bold.fn[itemprop=\"name\"]"
                    ]
                ],
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "ff34d932-0aea-43cd-b471-933bd6eb7366",
                "name": "price",
                "type": "TEXT",
                "selector": [
                    [
                        "span.sundaySkyprice.hide"
                    ]
                ],
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "44ef61cc-39c6-461d-b92e-f710ac6c29b4",
                "name": "category",
                "type": "TEXT",
                "xpath": "//li[@itemprop=\"itemListElement\"][last()]/a/span",
                "defaultValue": " ",
                "captureLink": false,
                "ranking": 0
            },
            {
                "id": "1b84dc28-9146-450b-8937-0edaaaf3c882",
                "name": "description",
                "type": "TEXT",
                "selector": [
                    [
                        "div.sku_desc.show"
                    ]
                ],
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "2585b554-3da4-4898-8c06-8b0e46fa055d",
                "name": "product_url",
                "type": "AUTO",
                "xpath": "//body/@producturl",
                "defaultValue": " ",
                "ranking": 0
            },
            {
                "id": "6b4305cb-d310-4220-9d57-142192be0386",
                "name": "image",
                "type": "IMAGE",
                "selector": [
                    [
                        "div[style].s7staticimage > img[style]:nth-of-type(1)"
                    ]
                ],
                "xpath": "//div[@class=\"s7staticimage\"]/img[1]",
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