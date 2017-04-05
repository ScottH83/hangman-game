(function() {
    "use strict";

    const hangmanModule = function() {



        function getWords() {
            let http = new XMLHttpRequest();
            http.onreadtstatechange = function() {
                if (http.readyState === 4 && http.status === 200) {
                    console.log(JSON.parse(http.response));
                    const chosenWord = JSON.parse(http.response);
                }
            };
        }

        return {
            getWords: getWords
        };
    };
    const hangmanApp = hangmanModule();
    hangmanApp.getWords('words');

})();
