const gameBoard = (() => {

    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let winner = "";

    const checkSpot = function(spot){
        return gameboard[spot - 1] === "";
    }

    const setSpot = function(values){
        gameboard[values.spot - 1] = values.symbol;
        if(gameEnd()){
            events.emit("gameEnd", winner);
        }
    }

    const resetBoard = function(){
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    const gameEnd = function(){

        for(let i = 0; i < gameboard.length; i += 3){
            if(gameboard[i] !== "" && gameboard[i] == gameboard[i+1] && gameboard[i] == gameboard[i+2]){
                winner = gameboard[i];
                return true;
            }
        }

        for(let i = 0; i < 3; i++){
            if(gameboard[i] !== "" && gameboard[i] == gameboard[i+3] && gameboard[i] == gameboard[i+6]){
                winner = gameboard[i];
                return true;
            }
        }

        if((gameboard[0] != "" && gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8])
            || (gameboard[2] != "" && gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6])){
                winner = gameboard[4];
                return true;
        }

        for(let i = 0; i < 9; i++){
            if(gameboard[i] == ""){
                return false;
            }
        }

        winner = "tie";
        return true;

    }

    events.on("divClicked", setSpot);
    events.on("reset", resetBoard);

    return {checkSpot};

})();