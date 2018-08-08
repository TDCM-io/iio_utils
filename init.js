(function () {
    window.utils = { 
        loaded: true,
        testFn: function (a, b) {
            return a + b;
        } 
    }
    window.dispatchEvent(new Event('utils.loaded', { detail: window.utils} ));
})()