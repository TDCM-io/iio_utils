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

    console.log('redirecting');
    await extractorContext.goto("https://business.officedepot.com/cart/shoppingCart.do");
    await new Promise(r => setTimeout(r, 3000));
    console.log('O.K.');

    await extractorContext.execute(async function (a) {
        var products = new Array(), sortedProducts, quantity = new Array();
        if(document.querySelector('tr[id*="cartItem"]')){
            var selector = document.querySelectorAll('tr[id*="cartItem"]')
            
            for(var i = 0; i < selector.length; i++){
                products.push(selector[i].querySelector('.cart-item-description-details .cart-item-description-name').innerText);
            }
            
            sortedProducts = products.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            
            for(var i = 0; i < sortedProducts.length; i++){
                var sum = 0;
                    for(var j = 0; j < selector.length; j++){
                        if(selector[j].querySelector('.cart-item-description-details .cart-item-description-name').innerText === sortedProducts[i]){
                            sum += parseInt(selector[j].querySelector('.qty-input-group input').getAttribute('value'));
                        }
                    }
                quantity.push(sum.toString());
            }
        }

        let body = document.body, tbl  = document.createElement('table');
        tbl.setAttribute("id", "tblCartHistory");
        let tblBody = document.createElement("tbody");

        for(var i = 0; i < sortedProducts.length; i++){
            let tr = document.createElement('tr');
            
            let td = document.createElement('td');
            td.setAttribute('id', 'productName');
            td.appendChild(document.createTextNode(sortedProducts[i]));
            tr.appendChild(td);
            
            let td2 = document.createElement('td');
            td.setAttribute('id', 'quantity');
            td2.appendChild(document.createTextNode(quantity[i]));
            tr.appendChild(td2);
            
            tblBody.appendChild(tr);
          }
          tbl.appendChild(tblBody);
          body.appendChild(tbl);
    });

    await extractorContext.execute(async function (a) {
        document.body.setAttribute('auth_status', this.memory.auth_status);
        document.body.setAttribute('auth_message', this.memory.auth_message);
        document.body.setAttribute('status', 'SUCCESS');
        document.body.setAttribute('message', ' ');
    });
    console.log("create runtimeConfig");
    const runtimeConfig = {
        "fields": [
            {
                "id": "00804369-b153-4462-aae7-c97218aa3ab8",
                "name": "auth_status",
                "type": "AUTO",
                "xpath": "//body/@auth_status",
                "defaultValue": " ",
                "ranking": 0
              },
              {
                "id": "c8fde873-faf5-4053-bfac-0f38f85abd3a",
                "name": "auth_message",
                "type": "AUTO",
                "xpath": "//body/@auth_message",
                "defaultValue": " ",
                "ranking": 0
              },
              {
                "id": "f48c487d-f2b8-4933-8830-5bef4f3fc3ef",
                "name": "status",
                "type": "AUTO",
                "xpath": "//body/@status",
                "defaultValue": " ",
                "ranking": 0
              },
              {
                "id": "22c8f26c-41dc-47aa-bb90-1cc502de8782",
                "name": "message",
                "type": "AUTO",
                "xpath": "//body/@message",
                "defaultValue": " ",
                "ranking": 0
              },
              {
                "id": "90ff816c-f2a2-48f5-87bc-f6d4910c57c8",
                "name": "product",
                "type": "AUTO",
                "xpath": "//*[@id=\"tblCartHistory\"]/tbody//#productName",
                "defaultValue": " ",
                "ranking": 0
              },
              {
                "id": "92828a58-03e0-4e11-b5b9-c86987687024",
                "name": "quantity",
                "type": "AUTO",
                "xpath": "//*[@id=\"tblCartHistory\"]/tbody//#quantity",
                "defaultValue": "0",
                "ranking": 0
              }
        ],
        "singleRecord": true,
        "noscript": true,
        "screenCapture": false
      }
    console.log("O.K.");

    console.log("extract data");
    var extractedData = await extractorContext.extractData(runtimeConfig);
    console.log("O.K.");

    console.log("return data");
    return extractorContext.return(extractedData);
};