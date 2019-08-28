$(document).ready(function () {
    function displayPlayer(username, location) {
        //var cardImages = localStorage.getItem("cardImages").split('\n');
        //localStorage.setItem("userImg", cardImages[3]);
        var fileName = "pictures/" + cardImages//localStorage.getItem("userImg");
        console.log(cardImages[0]);
        var spaceRef = storageRef.child("pictures/d10.jpg");
        var name = $("<h5>");
        var win = $("<h6>");
        var myImg = $("<img>");
        name.text(username);
        if (location === 0) {
            spaceRef.getDownloadURL().then(function (url) {
                myImg.attr("src", url);
            }).catch(function (error) {
                // Handle any errors
            });

            win.text("wins: " + opponentWin);
            $(name).append(win);
            $(name).append(myImg);
            $("#playerOpponent").append(name);
            showCards("#cardsOpponent");


        } else if (location === 1) {
            spaceRef.getDownloadURL().then(function (url) {
                myImg.attr("src", url);
            }).catch(function (error) {
                // Handle any errors
            });

            win.text("wins: " + userWin);
            $(name).append(win);
            $(name).append(myImg);
            $("#playerUser").append(name);
            showCards("#cardsUser");
        }

        console.log("display done");
    }

    function showCards(place) {
        // Create a reference with an initial file path and name
        for (var i = 0; i < 5; i++) {
            var spaceRef = storageRef.child('pictures/sampleCard.png');
            var myImg = $("<img>");
            var count = 0;
            spaceRef.getDownloadURL().then(function (url) {
                myImg = $("<img>");
                myImg.attr("src", url);
                myImg.attr("id", "u"+count);
                $(place).append(myImg);
                count ++;
            }).catch(function (error) {
                // Handle any errors
            });
        }

        console.log("showcards done");
    }

    displayPlayer("player", 0);
    displayPlayer("opponent", 1);
});