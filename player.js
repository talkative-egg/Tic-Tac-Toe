const Player = (symbol, name) => {

    const getName = function(){
        return name;
    }

    const getSymbol = function(){
        return symbol;
    }

    return {getName, getSymbol};
};