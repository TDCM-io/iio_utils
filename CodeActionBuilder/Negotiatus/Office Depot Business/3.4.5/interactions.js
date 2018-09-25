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

    return extractorContext.return(extractedData);
};