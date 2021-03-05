const displayController = (() => {

    const gameContainer = document.querySelector(".game-container");
    const boardPieces = document.querySelectorAll(".board-piece");

    const _updatePiece = function(e){
        e.target.textContent = "X";
        events.emit("divClicked", e.id);
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

    return {activateBoard, deactivateBoard, clearBoard};

})();