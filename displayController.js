const displayController = (() => {

    const gameContainer = document.querySelector(".game-container");

    const render = function(arr){
        
        for(let i = 0; i < arr.length; i++){
            let boardPiece = document.createElement("div");
            boardPiece.textContent = arr[i];
            gameContainer.appendChild(boardPiece);
        }

    }

    return {render};

})();