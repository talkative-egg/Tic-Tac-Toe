const displayController = (() => {

    const boardPieces = document.querySelectorAll(".board-piece");
    const startButton = document.querySelector("#start-button");
    const displayScreen = document.querySelector(".display-text");
    let currentPlayer = null;
    const firstPlayer = Player("O")
    const secondPlayer = Player("X");

    const updatePiece = function(e){
        if(checkSpot(e.target.id)){
            let symbol = currentPlayer.symbol;
            e.target.textContent = symbol;
            currentPlayer = (currentPlayer === firstPlayer)? secondPlayer:firstPlayer;
            displayScreen.textContent = `It's ${currentPlayer.symbol}'s turn`;
            events.emit("divClicked", {spot: e.target.id, symbol});
        }
    }

    const checkSpot = function(spot){
        return gameBoard.checkSpot(spot);
    }

    const activateBoard = function(){
        boardPieces.forEach(e => {
            e.addEventListener("click", updatePiece);
        });
    }

    const gameEnd = function(winner){
        displayScreen.textContent = (winner == "tie")? "TIE":`The winner is ${winner}`;

        boardPieces.forEach(e => {
            e.removeEventListener("click", updatePiece);
        });
    }

    const clearBoard = function(){
        boardPieces.forEach(e => e.textContent = "");
    }

    const gameStart = function(){
        currentPlayer = firstPlayer;
        displayScreen.textContent = `It's ${currentPlayer.symbol}'s turn`;
        clearBoard();
        activateBoard();
        events.emit("reset");
    }

    startButton.addEventListener("click", gameStart);
    events.on("gameEnd", gameEnd);

})();