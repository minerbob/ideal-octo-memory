
$(document).ready(function () {


    
    var digmonNamesList = ["Agumon", "Gabumon", "Biyomon", "Tentomon", "Palmon", "Gomamon", "Patamon", "Elecmon", "Gazimon", "Otamamon", "Gotsumon"];
    var digmonNamesList1 = ["Agumon.jpg", "Gabumon.jpg", "Biyomon.jpg", "Tentomon.jpg", "Palmon.jpg", "Gomamon.jpg", "Patamon.jpg", "Elecmon.jpg", "Gazimon.jpg", "Otamamon.jpg", "Gotsumon.jpg"];
    var pokemonNamesList = ["Gyarados", "Magikarp", "Lugia", "Mew", "Mewtwo", "Gengar", "Eevee", "Jigglypuff", "Squirtle", "Charizard", "Pikachu"];
    var namesList = [];
    namesList = digmonNamesList;//$.merge($.merge([], digmonNamesList), pokemonNamesList);
    var deck = [];
    //var full = digmonNamesList.concat(pokemonNamesList);
    var computer = Array(5);
    var idxArray = Array(0);
    var length = 0;
    for (var i = 0; i < 5; i ++)
    {
        do {
            var newRand = Math.floor(Math.random() * 11);
            if (length === 0)
                idxArray.push(newRand);
            else {
                var temp = 0;
                for (var j = 0; j < 5; j++) {
                    if (idxArray[j] === newRand)
                        temp++;
                }
                if (temp === 0)
                    idxArray.push(newRand);
            }
        }while(temp === 0);
    }

    for (var i = 0; i < 5; i ++)
        computer[i] = digmonNamesList1[idxArray[i]].toLowerCase();

    localStorage.setItem("compTeam", computer);

    function getImageDigimon(name) {
        //https://digimon-api.herokuapp.com/

        var queryURL = "https://digimon-api.herokuapp.com/api/digimon/name/" + name;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response[0]["img"];
            $("#" + name).attr("src", results);
        });

    }

    function getImagePokemon(name) {
        //https://pokeapi.co/
        var queryURL = "https://pokeapi.co/api/v2/pokemon/" + name + "/";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.sprites["front_default"];
            $("#" + name).attr("src", results);

        });

    }

    function createDeck(name) {
        var card = $("<img height='100' width='100'>");
        var cardHolder = $("<div>");
        $(cardHolder).addClass("d-inline-block")
        $(card).addClass("d-block")
        $(cardHolder).addClass("cardHolder")
        $(cardHolder).attr("card-name", name);
        $(cardHolder).attr("location", "deck");
        $(card).attr("src", "https://via.placeholder.com/100");
        $(card).attr('id', name.toLowerCase());
        if (jQuery.inArray(name, pokemonNamesList) !== -1) {
            getImagePokemon(name.toLowerCase());
        }
        if (jQuery.inArray(name, digmonNamesList) !== -1) {
            getImageDigimon(name.toLowerCase());
        }
        $(cardHolder).append(card);
        $(cardHolder).append(name);
        $("#deckContainer").append(cardHolder).append(" ");
    }

    for (var name in namesList) {
        createDeck(namesList[name]);
    }


    $(".cardHolder").on("click", function () {

        if ($(this).attr("location") === "deck") {
            if (deck.length < 5) {
                $("#playerHand").append(this).append(" ");
                $(this).attr("location", "hand");
                deck.push($(this).attr("card-name"));
                console.log(deck);
            }
            else {
                $("#myModal2").modal();
            }

        }
        else {

            $("#deckContainer").append(this);
            $(this).attr("location", "deck");
            deck.splice($.inArray($(this).attr("card-name"), deck), 1);
            console.log(deck);
        }

    });
    $("#submit").on("click", function () {
        if (deck.length === 5) {

            for (var i = 0; i < 5; i ++) {
                deck[i] += ".jpg";
                deck[i] = deck[i].toLowerCase();
            }
            localStorage.setItem("playerTeam",deck);
            location.href = "fight.html";

        }
        else {
            $("#myModal").modal();
        }

    });

})

