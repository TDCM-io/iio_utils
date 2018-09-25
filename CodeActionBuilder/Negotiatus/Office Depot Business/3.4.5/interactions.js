module.exports = async function (input) {
    console.log('Interactions');
    console.log("check authorization");
    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.1.");
        if (this.memory.auth_status != "SUCCESS") {
            if (this.memory.auth_status === "UNKNOWN") {
                return utils.endEx('AUTH_UNKNOWN', 'BLANK_FAILURE');
            }
            return utils.endEx(null, null, this.memory.auth_message);
        }
        return null;
    });

    await new Promise(r => setTimeout(r, 1000));

    if (returnedData) {
        console.log("authorization fail");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
    console.log("authorization O.K.");

    await extractorContext.goto('https://business.officedepot.com/account/shipto/new.do');
    await extractorContext.waitForPage();

    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.1.");
        if (!this.input.name || !this.input.address || !this.input.address_2 || !this.input.city
            || !this.input.state || !this.input.zip || !this.input.phone) {
            return utils.endEx('AUTH_SUCCESS', null, null, 'Missing input');
        }
        this.memory.name = this.input.name;
        this.memory.address = this.input.address;
        this.memory.address_2 = this.input.address_2;
        this.memory.city = this.input.city;
        this.memory.state = this.input.state;
        this.memory.zip = this.input.zip;
        this.memory.phone = this.input.phone;
        
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    var fullAddress = extractorContext.normalizeAddress({
        name: extractorContext.memory.name,
        address: extractorContext.memory.address,
        address_2: extractorContext.memory.address_2,
        city: extractorContext.memory.city,
        state: extractorContext.memory.state,
        zip: extractorContext.memory.zip,
        phone: extractorContext.memory.phone
    });

    extractorContext.setMemory({...extractorContext.memory, ...{name: fullAddress.name}});
    console.log('extractor memory', extractorContext.memory);

    var returnedData = await extractorContext.execute(async function (a) {
        const utils = new window.__Utils(this, "NEG 3.4.1.");
    /*
    async function setAddress(shipName, company, address1, address2, city, state, zip, phone) {
        await new Promise((r) => setTimeout(r, 1500));
        document.getElementById('shipToId').value = shipName;
        document.getElementById('shiptoName-0').value = company;
        document.getElementById('address1-0').value = address1;
        document.getElementById('address2-0').value = address2;
        document.getElementById('postalCode1-0').value = zip;
        document.getElementById('city-0').value = city;
        document.getElementById('state-0').value = state;
            
        await new Promise((r) => setTimeout(r, 2000));
        document.getElementsByClassName('btn primary allowMultipleClick')[0].click();
        await new Promise((r) => setTimeout(r, 2000));
    }
    */
    // pause
        return null;
    });
    if (response) {
        return extractorContext.return(extractorContext.createData(response['data'][0]['group']));
    }

    return extractorContext.return(extractedData);
};