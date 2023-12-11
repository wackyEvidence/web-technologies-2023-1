import { TicTacToe } from "./components/TicTacToe.js";

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function init() {
    // Элемент, отображающий X или О
    const moveEl = document.getElementById("move-value");
    // Функция, изменяющая значения X -> O или наоборот
    const onMove = (isXTurn) => {
        let currentMove;

        if (isXTurn) {
            currentMove = "X";
        } else {
            currentMove = "O";
        }
        moveEl.innerText = currentMove;
    };

    // Создание игры
    const game = TicTacToe.init({
        // el - div с игровым полем
        el: document.getElementById("tic-tac-toe"),
        onMove,
    });

    // Начало игры
    game.startGame();

    // Обработка нажатия на кнопку 'Рестарт'
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => {
        game.restartGame();
    });
}
