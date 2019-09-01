    var character = function(id, name, pwr, hp, source){
        this.id = id;
        this.name = name;
        this.pwr = pwr;
        this.hp = hp;
        this.source = source;
    };
    var players=[];
    var heroChoose;
    var enemyCount;

    function ifClicked(event, list)
    {
        var clickedElementSRC = event.target.src;
        var clickedElementALT = event.target.alt;
        console.log(event.target.hidden);

        //var target = $("#"+clickedElement);
        //console.log("#"+clickedElement);
        if (clickedElementALT === "myCard")
        {
            event.target.hidden = true;
            $("#userFightCard").attr('src', clickedElementSRC);
        }
        else if (clickedElementALT == "theirCard")
        {
            event.target.hidden = true;
            $("#opponentFightCard").attr('src', clickedElementSRC);
        }
    }
    function fight()
    {
        $("#first").hide();
        $("#second").hide();
        $("#third").show();
        $("#attack").show();

        $(".hFight_name").text(players[0].name);
        $(".hFight_img").attr("src", players[0].source);
        $(".hFight_hp").text(players[0].hp);
        $(".hFight_pwr").text(players[0].pwr);

        $(".vFight_name").text(players[1].name);
        $(".vFight_img").attr("src", players[1].source);
        $(".vFight_hp").text(players[1].hp);
        $(".vFight_pwr").text(players[1].pwr);
    }
    function heroClicked(hero)
    {
        if(heroChoose === 0){
            var c1 = new character();
            c1.id=hero;
            c1.name=$(hero).attr("alt");
            c1.pwr=$(hero).find(".pwr").text();
            c1.hp=$(hero).find(".hp").text();
            c1.source=$(hero).children("img").attr("src");
            heroChoose++;
            $("#second").show();
            players.push(c1);

            console.log(players);
        }
    }
    function enemyClicked(enemy){
        enemyCount++;
        if(heroChoose === 1)
        {
            var c2 = new character();
            c2.id=enemy;
            c2.name=$(enemy).attr("alt");
            c2.pwr=$(enemy).find(".pwr").text();
            c2.hp=$(enemy).find(".hp").text();
            c2.source=$(enemy).children("img").attr("src");
            heroChoose ++;
            players.push(c2);

            console.log(players);
            fight();
        }
    }
    function attack()
    {
        players[0].hp = players[0].hp-players[1].pwr;
        players[1].hp = players[1].hp-players[0].pwr;
        players[0].pwr = (parseInt(players[0].pwr)*2).toString();

        $(".hFight_hp").text(players[0].hp);
        $(".vFight_hp").text(players[1].hp);
        $(".hFight_pwr").text(players[0].pwr);
        $("#after").show();
        $("#next").hide();
        if (players[0].hp <= 0)
        {
            $("#attack").hide();
            $("#result").text("You are defeated!");
        }
        else if(players[1].hp <= 0 && enemyCount < 6)
        {
            $("#attack").hide();
            $("#next").show();
            $("#result").text("Enemy is defeated!");
        }
        else if(players[1].hp <=0 && enemyCount >= 6) {
            $("#attack").hide();
            $("#result").text("You Win!!!");
        }
        console.log(enemyCount);
    }
        //$("img").on("click", ifClicked);
        //$("#attack").on("click", function(){
        //    attack();
        //});
        //$("#next").on("click", )
        //$("#reset").on("click", function(){
        //   location.reload();
        //})
