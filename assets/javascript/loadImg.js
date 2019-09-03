// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCiVZ3-BTnEYzYViVRIkpyTr85YVXjfrvI",
    authDomain: "silver-pad-134523.firebaseapp.com",
    databaseURL: "https://silver-pad-134523.firebaseio.com",
    projectId: "silver-pad-134523",
    storageBucket: "silver-pad-134523.appspot.com",
    messagingSenderId: "800942154333",
    appId: "1:800942154333:web:c6005be8679bcc56"
};


var userWin = 0;
var opponentWin = 0;
var vs_computer = true;
firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref();
var compPlayer = localStorage.getItem("compTeam").split(",");
var userPlayer = localStorage.getItem("playerTeam").split(",");

//console.log(compPlayer);
//console.log(userPlayer);
function initialization(callback) {
    var listRef = storageRef.child('pokelist.txt');
    listRef.getDownloadURL().then(function (url) {
        var txtFile = new XMLHttpRequest();
        txtFile.onload = function (event) {
            if (txtFile.readyState === 4 && txtFile.status === 200 && callback) {
                var lines = txtFile.responseText.split("\n"); // Will separate each line into an array
                lines.pop();
                for (var i = 0; i < lines.length; i++)
                    lines[i] = lines[i].slice(0, -1);
                callback(lines);
            }
        };
        txtFile.open("GET", url, true);
        txtFile.send();
    }).catch(function (error) {

    });
}

function displayPlayer(username, location,list) {
    // Points to the root reference
    var storageRef = firebase.storage().ref();
    // Points to 'pictures'
    var imagesRef = storageRef.child('pictures');
    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    var spaceRef = imagesRef.child("129.png");
    /***
     if(list[0]==="background.jpg")
     console.log("yes");
     ***/
        // File path is 'pictures/background.jpg'
        //var path = spaceRef.fullPath
        // File name is 'space.jpg'
        //var name = spaceRef.name

    var name = $("<h5>");
    var win = $("<h6>");
    var myImg = $("<img>");
    name.text(username);
    if (location === 0) {
        spaceRef.getDownloadURL().then(function (url) {
            myImg.attr("src", url);
            myImg.attr("id", list[location].slice(0,-4))
        }).catch(function (error) {
            // Handle any errors
        });

        win.text("wins: " + opponentWin);
        $(name).append(win);
        //$(name).append(myImg);
        $("#playerOpponent").append(name);
        showComputer("#cardsOpponent", "theirCard", list);


    }
    else if (location === 1) {
        spaceRef.getDownloadURL().then(function (url) {
            myImg.attr("src", url);
            myImg.attr("id", list[location].slice(0,-4))
        }).catch(function (error) {
            // Handle any errors
        });

        win.text("wins: " + userWin);
        $(name).append(win);
        //$(name).append(myImg);
        $("#playerUser").append(name);
        showPlayer("#cardsUser", "myCard", list);
    }

}

function showComputer(place, player, list) {
    for (var i = 0; i < 5; i++) {
        var imagesRef = storageRef.child('pokemon');
        var spaceRef = imagesRef.child(compPlayer[i]);
        var myImg = $("<img>");

        spaceRef.getDownloadURL().then(function (url) {
            myImg = $("<img>");
            myImg.attr("src", url);
            myImg.attr("id", url.slice(87,-53));
            myImg.attr("alt", player);
            $(place).append(myImg);
        }).catch(function (error) {
            // Handle any errors
        });
    }
}
function showPlayer(place, player, list) {
    for (var i = 0; i < 5; i++) {
        var imagesRef = storageRef.child('pokemon');
        var spaceRef = imagesRef.child(userPlayer[i]);
        var myImg = $("<img>");

        spaceRef.getDownloadURL().then(function (url) {
            myImg = $("<img>");
            myImg.attr("src", url);
            myImg.attr("id", url.slice(87,-53));
            myImg.attr("alt", player);
            $(place).append(myImg);
        }).catch(function (error) {
            // Handle any errors
        });
    }
}

initialization(function(list){
    displayPlayer(localStorage.getItem("playerUserName"), 1);
    displayPlayer("opponent", 0);

    if (document.readyState === "complete") {
        $(document).on("click", function(event)
        {
            ifClicked(event, list);
        });
    }
});

/***
$(document).ready(function () {

    function initialization(callback) {
        //firebase.initializeApp(firebaseConfig);
        var storageRef = firebase.storage().ref();
        var compPlayer = localStorage.getItem("compTeam").split(",");
        var userPlayer = localStorage.getItem("playerTeam").split(",");
        //var listRef = storageRef.child('pokelist.txt');
        //listRef.getDownloadURL().then(function (url) {
         //   var txtFile = new XMLHttpRequest();
          //  txtFile.onload = function (event) {
           //     if (txtFile.readyState === 4 && txtFile.status === 200 && callback) {
            //        var lines = txtFile.responseText.split("\n"); // Will separate each line into an array
              //      lines.pop();
                //    for (var i = 0; i < lines.length; i++)
                  //      lines[i] = lines[i].slice(0, -1);
                    callback();
                //}
            //};
            //txtFile.open("GET", url, true);
            //txtFile.send();
        //}).catch(function (error) {

        //});
    }

    function displayPlayer(username, location) {
        // Points to the root reference
        // Points to 'pictures'
        //var imagesRef = storageRef.child('pokemon');
        // Points to 'images/space.jpg'
        // Note that you can use variables to create child values
        //var spaceRef = imagesRef.child("augumon.jpg");
        /***
        if(list[0]==="background.jpg")
            console.log("yes");
        ***/
         // File path is 'pictures/background.jpg'
        //var path = spaceRef.fullPath
        // File name is 'space.jpg'
        //var name = spaceRef.name
/***
        var name = $("<h5>");
        var win = $("<h6>");
        var myImg = $("<img>");
        name.text(username);

        if (location === 0) {
            /***    spaceRef.getDownloadURL().then(function (url) {
                myImg.attr("src", url);
                myImg.attr("id", list[location].slice(0,-4))
            }).catch(function (error) {
                // Handle any errors
            });***/
 /***           win.text("wins: " + opponentWin);
            $(name).append(win);
            //$(name).append(myImg);

            $("#playerOpponent").append(name);
            showComputer("#cardsOpponent", "theirCard");

        }
        else if (location === 1) {
/***spaceRef.getDownloadURL().then(function (url) {
                myImg.attr("src", url);
                myImg.attr("id", list[location].slice(0,-4))
            }).catch(function (error) {
                // Handle any errors
            });***/
  /***          win.text("wins: " + userWin);
            $(name).append(win);
            //$(name).append(myImg);
            $("#playerUser").append(name);
            showPlayer("#cardsUser", "myCard");
        }

    }

    function showPlayer(place, player) {
        for (var i = 0; i < 5; i++) {
            var imagesRef = storageRef.child('pokemon');
            var spaceRef = imagesRef.child(userPlayer[i]);
            var myImg = $("<img>");

            spaceRef.getDownloadURL().then(function (url) {
                myImg = $("<img>");
                myImg.attr("src", url);
                myImg.attr("id", url.slice(87,-53));
                myImg.attr("alt", player);
                $(place).append(myImg);
            }).catch(function (error) {
                // Handle any errors
            });
        }
    }

    function showComputer(place, player) {
        for (var i = 0; i < 5; i++) {
            var spaceRef = storageRef.child('pokemon/Agumon.jpg');
            //var spaceRef = imagesRef.child("Agumon.jpg");
            var myImg = $("<img>");

            spaceRef.getDownloadURL().then(function (url) {
                myImg = $("<img>");
                myImg.attr("src", url);
                myImg.attr("id", url.slice(87,-53));
                myImg.attr("alt", player);
                $(place).append(myImg);
            }).catch(function (error) {
                // Handle any errors
            });
        }
    }
    initialization(function(){
        displayPlayer(localStorage.getItem("playerUserName"), 1);
        displayPlayer("opponent", 0);

        if (document.readyState === "complete") {
            $(document).on("click", function(event)
            {
                ifClicked(event);
            });
        }
    });
});***/