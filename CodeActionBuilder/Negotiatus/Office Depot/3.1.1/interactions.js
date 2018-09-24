module.exports = async function (input) {
    console.log('Interactions');
    console.log("checking for authorization");
    var returnedData = await extractorContext.execute(async function(a) {
        const utils = new window.__Utils(this, "NEG 3.1.1.");
        if(this.memory.auth_status != "SUCCESS"){
            if(this.memory.auth_status === "UNKNOWN")        {
                return utils.endEx ('AUTH_UNKNOWN', 'BLANK_FAILURE');
            }
            return utils.endEx(null,null,this.memory.auth_message);
        }
        return null;
    });

    await new Promise(r => setTimeout(r, 1000));

    console.log("authorization checked");
    if(returnedData) {
        console.log("authorization failed");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }

    await new Promise(r => setTimeout(r, 1000));

    console.log("authorization passed");
    var returnedData = await extractorContext.execute(async function(a) {
        const utils = new window.__Utils(this, "NEG 3.1.1.");
        return utils.endEx ('AUTH_SUCCESS');
    });
    return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
};