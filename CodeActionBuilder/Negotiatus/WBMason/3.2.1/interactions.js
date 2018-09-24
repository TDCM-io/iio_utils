module.exports = async function (input) {

    console.log("auth interactions");
    
    function delay(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    await extractorContext.waitForPage();
    await extractorContext.goto("https://wbmason.com/default.aspx");
    await extractorContext.waitForPage();
    

  await extractorContext.execute(function () {
        this.memory.message = ' ';

        this.memory.tempArray = [];
        this.memory.pageNumber = 0;
        this.memory.flag = true;


               var regEx = /[45].*/;
        if (regEx.test(this.lastResponseData.code)) {
            this.memory.message = 'Invalid URL. Response code: ' + this.lastResponseData.code;
            //return this.return(this.createData(this.memory.error));
        }
        let timeframes = this.input.time_frame;

        if (timeframes.length != 2) {
            this.memory.message = 'Invalid number of timeframe inputs.';
            //return this.return(this.createData(this.memory.error));

        } else if (!/^\d{10}$/.test(timeframes[0]) || !/^\d{10}$/.test(timeframes[1]) || (timeframes[1] > parseInt(new Date().getTime() / 1000))) {
            this.memory.message = 'Invalid timeframe.';
            //return this.return(this.createData(this.memory.error));

        }


    });
    if (extractorContext.memory.auth_status != 'SUCCESS' || extractorContext.memory.message != ' ') {
        const data = extractorContext.createData({
            'auth_status': extractorContext.memory.auth_status,
            'auth_message': extractorContext.memory.auth_message,
            'message': extractorContext.memory.message,
            'order_number': ' ',
            'order_url': ' ',
            'status': 'FAILURE',

        });
        return extractorContext.return(data);

    }
   

    await extractorContext.click('#ctl00_TabSetNavigation_lnkOrderHistory');
    await extractorContext.waitForPage();
    await extractorContext.execute(function () {
        jQuery.browser = {};
        (function () {
            jQuery.browser.msie = false;
            jQuery.browser.version = 0;
            if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
                jQuery.browser.msie = true;
                jQuery.browser.version = RegExp.$1;
            }
        })();

        function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }



        var startDate = new Date(timeConverter(this.input.time_frame[0]));
        var toDate = new Date(timeConverter(this.input.time_frame[1]));



        $('#ctl00_ContentPlaceholder1_OrderHistory1_StartDateTextBox').datepicker('setDate', new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
        $('#ctl00_ContentPlaceholder1_OrderHistory1_EndDateTextBox').datepicker('setDate', new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()));

        var shiped = document.evaluate("//option[@value='0']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        console.log("Set atribute");
        shiped.setAttribute("selected", "selected");
    });
    await extractorContext.click('#ctl00_ContentPlaceholder1_OrderHistory1_lnkFiltersSubmit');
    await extractorContext.waitForPage();
    await delay(3000);
    for (let index = 0; index < 10; index++) {
       var info = await extractorContext.execute(function () {
        return document.querySelector(".loading-order-history").getAttribute("style");
       });
       if(info == "display: none;")
       {
       break;
       }
       else{
           await delay(5000);
       }
        
    }
    
    
    await extractorContext.waitForPage();
    await extractorContext.execute(function () {
        var selectElement = document.querySelectorAll('.datapager > a');
        if (selectElement) {
            this.memory.pageNumber = selectElement.length;
        }
    });
    
    console.log("Page number" + extractorContext.memory.pageNumber);

    if (extractorContext.memory.pageNumber > 0) {
        for (var i = 1; i <= 100; i++) {
            await extractorContext.waitForPage();
            console.log("Inside if block");
            await extractorContext.execute(function () {
                var pageNumbersContainer = document.querySelector('#ctl00_ContentPlaceholder1_OrderHistory1_OrderHistoryGridView > tbody > tr:last-child > td');
                var pages = Array.from(pageNumbersContainer.children);

                pages.shift();
                var indexOfCurrentPage = 0,
                    indexOfNextPage = 0;

                pages.forEach((p, idx) => {
                    var type = p.nodeName.toLowerCase();
                    if (!indexOfCurrentPage && type === 'span') {
                        indexOfCurrentPage = idx;
                        indexOfNextPage = idx + 1
                    }
                });
                if (indexOfCurrentPage === 0 && indexOfNextPage === 0) indexOfNextPage = 1;

                var nextPage = pages[indexOfNextPage];
                if (nextPage) {
                    nextPage.setAttribute('id', 'io-next-page');
                } else {
                    this.memory.flag = false
                }


            });
            await extractorContext.waitForPage();
            await extractorContext.execute(function () {
                var records = document.querySelectorAll(".order-number a");
                for (i = 0; i < records.length; i++) {
                    this.memory.tempArray.push(records[i].innerText);
                }
            });

            if (extractorContext.memory.flag) {
                await extractorContext.click("#io-next-page");
                await extractorContext.waitForPage();
            }
            else{break;}


        }
    } else {
        await extractorContext.waitForPage();
        console.log("Inside else block");
        await extractorContext.execute(function () {
            var records = document.querySelectorAll(".order-number a");
            for (i = 0; i < records.length; i++) {
                this.memory.tempArray.push(records[i].innerText);
            }
        });
    }



    await extractorContext.execute(function () {
        var table = this.memory.tempArray;

        let body = document.body,
            tbl = document.createElement('table');
        tbl.setAttribute("id", "infoTable");
        let tblBody = document.createElement("tbody");
        for (var i = 0; i < table.length; i++) {
            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.setAttribute("id", "order_number");
            td1.appendChild(document.createTextNode(table[i]));

            tr.appendChild(td1);
           
            tblBody.appendChild(tr);
        }
        tbl.appendChild(tblBody);
        body.appendChild(tbl);
    });
    

    await extractorContext.execute(function () {
        var message = " ";
        if(this.memory.tempArray.length <1)
        {
            message = "No orders within timeframe";
        }

        if (this.memory.auth_status == "SUCCESS") {
            document.body.setAttribute('auth_status', this.memory.auth_status);
            document.body.setAttribute('auth_message', this.memory.auth_message);
            document.body.setAttribute('status', "SUCCESS");
            document.body.setAttribute('message', message);
        } else {
            document.body.setAttribute('auth_status', this.memory.auth_status);
            document.body.setAttribute('auth_message', this.memory.auth_message);
            document.body.setAttribute('status', "FAILURE");
            document.body.setAttribute('message', message);
        }
    });

    await extractorContext.waitForPage();

    const data = await extractorContext.extractData(INSERT_CONFIG_HERE);
    return extractorContext.return(data);
};