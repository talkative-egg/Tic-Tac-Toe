const displayController = (() => {

    const boardPieces = document.querySelectorAll(".board-piece");
    const startButton = document.querySelector("#start-button");
    const displayScreen = document.querySelector(".display-text");
    let currentPlayer = null;
    let firstPlayer = null;
    let secondPlayer = null;

    const updatePiece = function(e){
        if(checkSpot(e.target.id)){
            const symbol = currentPlayer.getSymbol()
            e.target.textContent = symbol;
            currentPlayer = (currentPlayer === firstPlayer)? secondPlayer:firstPlayer;
            displayScreen.textContent = `It's ${currentPlayer.getName()}'s turn (${currentPlayer.getSymbol()})`;
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

        if(winner === "O"){
            winner = firstPlayer.getName();
        }else if(winner == "X"){
            winner = secondPlayer.getName();
        }

        displayScreen.textContent = (winner == "tie")? "TIE":`The winner is ${winner}`;

        boardPieces.forEach(e => {
            e.removeEventListener("click", updatePiece);
        });
    }

    const clearBoard = function(){
        boardPieces.forEach(e => e.textContent = "");
    }

    const gameStart = function(){
        const firstPlayerName = document.querySelector("#player1-name").value;
        firstPlayer = Player("O", firstPlayerName);
        const secondPlayerName = document.querySelector("#player2-name").value;
        secondPlayer = Player("X", secondPlayerName);
        currentPlayer = firstPlayer;
        displayScreen.textContent = `It's ${currentPlayer.getName()}'s turn (${currentPlayer.getSymbol()})`;
        clearBoard();
        activateBoard();
        events.emit("reset");
    }

    startButton.addEventListener("click", gameStart);
    events.on("gameEnd", gameEnd);

})();