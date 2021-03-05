const displayController = (() => {

    const boardPieces = document.querySelectorAll(".board-piece");
    const startButton = document.querySelector("#start-button");
    let currentPlayer = null;
    const firstPlayer = Player("O")
    const secondPlayer = Player("X");

    const _updatePiece = function(e){
        e.target.textContent = currentPlayer.symbol;
        events.emit("divClicked", {spot: e.target.id, symbol: currentPlayer.symbol});
        currentPlayer = (currentPlayer === firstPlayer)? secondPlayer:firstPlayer;
    }

    const activateBoard = function(){
        boardPieces.forEach(e => {
            e.addEventListener("click", _updatePiece);
        });
    }

    const deactivateBoard = function(){
        boardPieces.forEach(e => {
            e.removeEventListener("click", _updatePiece);
        });
    }

    const clearBoard = function(){
        boardPieces.forEach(e => e.textContent = "");
    }

    const gameStart = function(){
        currentPlayer = firstPlayer;
        clearBoard();
        activateBoard();
        events.emit("reset");
    }

    startButton.addEventListener("click", gameStart);
    events.on("gameEnd", deactivateBoard);

    return {activateBoard, deactivateBoard, clearBoard};

})();