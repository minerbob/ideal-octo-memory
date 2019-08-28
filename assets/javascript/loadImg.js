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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userWin = 0;
var opponentWin = 0;
var vs_computer = true;
var storageRef = firebase.storage().ref();

$(document).ready(function () {

    function initialization() {
        var storageRef = firebase.storage().ref();
        var spaceRef = storageRef.child('filelist.txt');
        spaceRef.getDownloadURL().then(function (url) {
            var txtFile = new XMLHttpRequest();
            txtFile.onload = function (event) {
                var lines = txtFile.responseText.split("\n"); // Will separate each line into an array
                var images = lines;
                console.log(images[0]);
                //localStorage.setItem("cardImages", txtFile.responseText);
                cardImages.length = images.length;
                for (var i = 0; i < images.length; i++) {
                    cardImages[i] = images[i];
                }
                console.log(cardImages.length);

                //cardImages.pop();
            };
            txtFile.open("GET", url, true);
            txtFile.send();
        }).catch(function (error) {

        });
        console.log("init done");
    }

    initialization();
});