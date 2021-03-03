const Player = (name, symbol) => {

    const makeMove = function(){

        let input = prompt("1-9 ?");
        gameBoard.setSpot(input, symbol);

    };

    return {name, symbol, makeMove};
};