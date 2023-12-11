export const TicTacToe = {
    // Элемент с полями в дом дереве
    el: null,

    // Булевое значение закончилась ли игра
    isGameEnd: false,

    // Булевое значение
    // true если текущий ход у X
    // false если текущий ход у O
    isXTurn: true,

    // Матрица 3 на 3 с информацией о полях
    // Индексация: [row][column]
    matrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],

    // массив победных комбинаций
    // состоит из массивов вида [row, column]
    // если все 3 значения равны, то игра окончена
    wonCombinations: [
        [
            // 1 строка
            [1, 1],
            [1, 2],
            [1, 3],
        ],
        [
            // 2 строка
            [2, 1],
            [2, 2],
            [2, 3],
        ],
        [
            // 3 строка
            [3, 1],
            [3, 2],
            [3, 3],
        ],
        [
            // главная диагональ
            [1, 1],
            [2, 2],
            [3, 3],
        ],
        [
            // вспомогательная диагональ
            [1, 3],
            [2, 2],
            [3, 1],
        ],
        [
            // 1 столбец
            [1, 1],
            [2, 1],
            [3, 1],
        ],
        [
            // 2 столбец
            [1, 2],
            [2, 2],
            [3, 2],
        ],
        [
            // 3 столбец
            [1, 3],
            [2, 3],
            [3, 3],
        ],
    ],

    /**
     * Функция инициализации элементов и запуска игры
     * @returns {object} - текущий объект
     */
    init({ el, onMove }) {
        this.el = el;
        this.onMove = onMove;
        this.boxes = el.querySelectorAll(".tic-tac-toe__ceil");

        return this;
    },

    /**
     * Функция инициализации слушателей события клика по ячейке
     */
    initListeners() {
        this.boxes.forEach((box) => {
            box.addEventListener("click", (event) => {
                // проверка не закончилась ли игра и не пустой ли блок
                if (this.isGameEnd || !this.isBlockEmpty(event.target)) {
                    return;
                }

                // изменение значения элемента в матрице
                this.setBlockValue(event.target);

                // изменение значения элемента в дом дереве
                this.setBlockDom(event.target);

                // проверка на победу
                if (this.checkForWin()) {
                    // изменение статуса игры
                    this.setGameEndStatus();
                }

                // проверка статуса игры
                if (this.isGameEnd) {
                    // вывод информации о победителе
                    setTimeout(() => {
                        alert("Победил " + this.getCurrentTurnValue());
                    });
                    return;
                } else {
                    // изменить значение текущего хода в объекте
                    this.changeTurnValue();
                    // изменить значение текущего хода в дом дереве
                    if (this.onMove) {
                        this.onMove(this.isXTurn);
                    }
                }

                // проверка на наличие пустых блоков
                if (!this.checkHasEmptyBlocks()) {
                    // изменение статуса игры
                    this.setGameEndStatus();

                    setTimeout(() => {
                        alert("Конец игры");
                    });
                    return;
                }
            });
        });
    },

    // Дописать
    /**
     * Проверка на наличие пустых блоков
     * @returns {boolean} - true если есть пустые блоки, false - если нет
     */
    checkHasEmptyBlocks() {
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i].some((el) => el == null)) {
                return true;
            }
        }
        return false;
    },

    /**
     * Инициализация слушателя клика и вызов колбэка текущего хода
     */
    startGame() {
        this.initListeners();
        this.onMove(this.isXTurn);
    },

    // Дописать
    /**
     * Сброс данных и очищение дом дерева
     */
    restartGame() {
        this.isGameEnd = false;
        this.isXTurn = true;

        this.boxes.forEach((box) => {
            this.setBlockValue(box, true);
            this.setBlockDom(box, true);
        });
    },

    /**
     * Проверка пустой ли блок
     * @param {HTMLDivElement} target - ячейка в дом дереве
     * @returns {boolean} - true если блок пустой
     */
    isBlockEmpty(target) {
        const [row, col] = this.getBlockPosition(target);
        return !this.matrix[row - 1][col - 1];
    },

    /**
     * Получение позиции блока из dataset
     * @param {HTMLDivElement} target ячейка в дом дереве
     * @returns {array} массив со строкой и колонкой target вида [row, col]
     */
    getBlockPosition(target) {
        const { row, col } = target.dataset;
        return [row, col];
    },

    // Дописать
    /**
     * Изменение значения элемента в матрице
     * Определяет значение [row, col] ячейки, после чего устанавливает
     * значение в матрице для соответствующего поля
     * @param {HTMLDivElement} target - ячейка в дом дереве
     * @param {boolean?} clear - если true - отчистить ячейку в матрице
     */
    setBlockValue(target, clear) {
        const [row, col] = this.getBlockPosition(target);
        this.matrix[row - 1][col - 1] = clear
            ? null
            : this.getCurrentTurnValue();
    },

    // Дописать
    /**
     * Изменение значения элемента в дом дереве
     * Определяет текущий ход, после чего устанавливает
     * значение в дом дереве
     * @param {HTMLDivElement} target - ячейка в дом дереве
     * @param {boolean?} clear - если true - отчистить target
     */
    setBlockDom(target, clear) {
        target.innerHTML = clear ? "" : this.getCurrentTurnValue();
    },

    // Дописать
    /**
     * Получение строки с текущем ходом
     * @returns {string} Текущий ход 'X' или 'O'
     */
    getCurrentTurnValue() {
        return this.isXTurn ? "X" : "O";
    },

    // Дописать
    /**
     * Изменение текущего хода в данных
     */
    changeTurnValue() {
        this.isXTurn = this.isXTurn ? false : true;
    },

    /**
     * Проверка победных комбинаций
     * @returns {boolean} - true если кто-то победил
     */
    checkForWin() {
        for (let i = 0; i < this.wonCombinations.length; i++) {
            const [first, second, third] = this.wonCombinations[i];

            if (
                this.matrix[first[0] - 1][first[1] - 1] &&
                this.matrix[first[0] - 1][first[1] - 1] ===
                    this.matrix[second[0] - 1][second[1] - 1] &&
                this.matrix[third[0] - 1][third[1] - 1] ===
                    this.matrix[second[0] - 1][second[1] - 1]
            ) {
                return true;
            }
        }

        return false;
    },

    // Дописать
    /**
     * Установить статус об окончании игры
     */
    setGameEndStatus() {
        this.isGameEnd = true;
    },
};
