module.exports = async function (input) {
    console.log('Interactions');
    var returnedData = await extractorContext.execute(async function(a) {
        const utils = new window.__Utils(this, "NEG 3.5.2.");
        return utils.endEx(null,'ACTION_INCOMPATIBLE_WITH_SOURCE');
    });
    if(returnedData) {
        console.log("interaction fail");
        return extractorContext.return(extractorContext.createData(returnedData['data'][0]['group']));
    }
}