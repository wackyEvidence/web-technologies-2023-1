const sizeSlider = document.getElementById("size-slider");
const smallSizeLabel = document.getElementById("small-label");
const bigSizeLabel = document.getElementById("big-label");
const addToCartButton = document.getElementById("add-to-cart");

const cheeseCrustCost = document.getElementById("cheese-crust-cost");
const mocarellaCost = document.getElementById("mocarella-topping-cost");
const cheddarParmezanCost = document.getElementById("chedder-parmizan-topping-cost");

class PizzaType {
    static Margarita = {
        name: "Маргарита",
        price: 500,
        calories: 200
    }

    static Pepperoni = {
        name: "Пепперони",
        price: 800,
        calories: 400
    }

    static ChickenBarbeku = {
        name: "Цыпленок барбекю",
        price: 700,
        calories: 450
    }
}

class PizzaSize {
    static Big = {
        id: "Big",
        name: "Большая",
        price: 200,
        calories: 200
    }

    static Small = {
        id: "Small",
        name: "Маленькая",
        price: 100,
        calories: 100
    }
}

class PizzaToppings {
    static CreamyMozzarella = {
        name: "Cливочная моцарелла",
        size: {
            Big: {
                price: 100,
                calories: 50
            },
            Small: {
                price: 50,
                calories: 25
            }
        }
    }

    static CheeseBoard = {
        name: "Сырный борт",
        size: {
            Big: {
                price: 300,
                calories: 100
            },
            Small: {
                price: 150,
                calories: 50
            }
        }
    }

    static CheddarAndParmesan = {
        name: "Чеддер и пармезан",
        size: {
            Big: {
                price: 300,
                calories: 100
            },
            Small: {
                price: 150,
                calories: 50
            }
        }
    }
}

class Pizza {
    #type;
    #size;
    #toppings;

    constructor(type, size, toppings) {
        this.#type = type;
        this.#size = size;
        this.#toppings = toppings;
    }

    get type() {
        return this.#type;
    }

    set type(newType) {
        this.#type = newType;
    }

    get size() {
        return this.#size;
    }

    set size(newSize) {
        this.#size = newSize;
    }

    get toppings() {
        return this.#toppings;
    }


    addTopping(topping) {
        if(this.#toppings.includes(topping))
                throw new Error("Такой доп. ингредиент уже добавлен!");
            else
                this.#toppings.push(topping);
    }

    removeTopping(topping) {
        if(!this.#toppings.includes(topping))
                throw new Error("Такого доп. ингредиента нет!");
            else {
                this.#toppings = this.#toppings.filter((top) => top != topping);
            }
    }

    getToppings() {
        return this.#toppings;
    }

    getSize() {
        return this.#size;
    }

    getStuffing() {
        return this.#type;
    }

    calculatePrice() {
        return [this.#type, this.#size].reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) 
            + [...this.#toppings].reduce((accumulator, currentValue) => accumulator + currentValue.size[this.#size.id].price, 0)
    }

    calculateCalories() {
        return [this.#type, this.#size].reduce((accumulator, currentValue) => accumulator + currentValue.calories, 0) 
            + [...this.#toppings].reduce((accumulator, currentValue) => accumulator + currentValue.size[this.#size.id].calories, 0)
    }
}

const currentPizza = new Pizza(PizzaType.Margarita, PizzaSize.Small, []);
let selectedPizzaType = document.getElementById("Margarita");
selectedPizzaType.setAttribute("data-selected", "true");
updateCartButtonText();
changeToppingPrices();

function changeToppingPrices() {
    cheeseCrustCost.textContent = PizzaToppings.CheeseBoard.size[currentPizza.size.id].price + "₽";
    mocarellaCost.textContent = PizzaToppings.CreamyMozzarella.size[currentPizza.size.id].price + "₽";
    cheddarParmezanCost.textContent = PizzaToppings.CheddarAndParmesan.size[currentPizza.size.id].price + "₽";
}

function updateCartButtonText() {
    addToCartButton.innerHTML = `Добавить в корзину за<br>${currentPizza.calculatePrice()}₽ (${currentPizza.calculateCalories()} кКалл)`;
}

function pizzaTypeChanged(value, object) {
    selectedPizzaType.setAttribute("data-selected", "false");
    object.setAttribute("data-selected", "true");
    currentPizza.type = value;
    selectedPizzaType = object;

    updateCartButtonText();
}

function pizzaSizeChanged(size) {
    if (size === "Big") {
        sizeSlider.className = "slider100";
        currentPizza.size = PizzaSize.Big;
    }
    else if (size === "Small") {
        sizeSlider.className = "slider0";
        currentPizza.size = PizzaSize.Small;
    }

    changeToppingPrices();
    updateCartButtonText();
}

function toppingChanged(value, object) {
    if (object.getAttribute('data-selected') === 'true') {
        object.setAttribute('data-selected', 'false');
        currentPizza.removeTopping(value);
    }
    else { 
        object.setAttribute('data-selected', 'true');
        currentPizza.addTopping(value);
    }

    updateCartButtonText();
}