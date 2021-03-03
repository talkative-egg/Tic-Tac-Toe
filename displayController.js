const displayController = (() => {

    const gameContainer = document.querySelector(".game-container");

    const render = function(arr){

        _removeAllChild(gameContainer);
        
        for(let i = 0; i < arr.length; i++){
            let boardPiece = document.createElement("div");
            boardPiece.className = "board-piece";
            boardPiece.textContent = arr[i];
            gameContainer.appendChild(boardPiece);
        }

    }

    const _removeAllChild = function(parent){

        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }

    }

    return {render};

})();