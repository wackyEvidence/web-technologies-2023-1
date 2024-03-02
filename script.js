const sizeSlider = document.getElementById("size-slider");
const smallSizeLabel = document.getElementById("small-label");
const bigSizeLabel = document.getElementById("big-label");
const addToCartButton = document.getElementById("add-to-cart-button");

const cheeseCrustCost = document.getElementById("cheese-crust-cost");
const mocarellaCost = document.getElementById("mocarella-topping-cost");
const cheddarParmezanCost = document.getElementById("chedder-parmizan-topping-cost");

class PizzaSize {
    static Big = new PizzaSize("Big");
    static Small = new PizzaSize("Small");

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `PizzaSize.${this.name}`;
    }
}

class PizzaTopping {
    static CheeseCrust = new PizzaTopping("CheeseCrust", 150, 50, 300, 50);
    static CreamyMocarella = new PizzaTopping("CreamyMozzarella", 50, 20, 100, 40);
    static CheddarAndParmezan = new PizzaTopping("CheddarAndParmezan", 150, 50, 300, 50);

    constructor(name, smallSizeCost, smallSizeCalories, bigSizeCost, bigSizeCalories) {
        this.name = name;
        this.smallSizeCost = smallSizeCost;
        this.smallSizeCalories = smallSizeCalories;
        this.bigSizeCost = bigSizeCost;
        this.bigSizeCalories = bigSizeCalories;
    }

    static getByName(name) {
        switch (name) {
            case "cheese-crust":
                return this.CheeseCrust;
            case "mocarella":
                return this.CreamyMocarella;
            case "chedder-parmizan":
                return this.CheddarAndParmezan;
            default:
                console.error("Ivalid topping name passed");
        }
    }

    toString() {
        return `PizzaSize.${this.name}`;
    }
}

class Pizza {
    #type;
    #basePrice;
    #baseCalories;
    #size;
    #toppings;

    constructor(type, size, toppings) {
        this.type = type;
        this.#size = size;
        this.#toppings = toppings;
    }

    set type(newType) {
        this.#type = newType;

        switch (newType) {
            case "pepperoni":
                this.#baseCalories = 400;
                this.#basePrice = 800;
                break;
            case "margarita":
                this.#baseCalories = 300;
                this.#basePrice = 500;
                break;
            case "bayern":
                this.#baseCalories = 450;
                this.#basePrice = 700;
                break;
            default:
                console.log("Unknown pizza type set");
        }
    }

    get type() {
        return this.#type;
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
        if (this.#toppings.includes(topping)) {
            console.error("Topping already added!");
        } else {
            this.#toppings.push(topping);
        }
        console.log(this.#toppings);
    }

    removeTopping(topping) {
        if (!this.#toppings.includes(topping)) {
            console.error("No such topping found to remove!");
        } else {
            this.#toppings.splice(this.#toppings.findIndex((e) => e === topping), 1);
        }
    }

    get fullPrice() {
        const sizeCostIncrease = this.size === PizzaSize.Big ? 200 : 100;
        const toppingsCostIncrease =
            this.#toppings.length == 0 ? 0
                : this.size === PizzaSize.Big ?
                    this.#toppings.map((e) => e = e.bigSizeCost).reduce((a, e) => a + e)
                    : this.#toppings.map((e) => e = e.smallSizeCost).reduce((a, e) => a + e);

        return this.#basePrice + sizeCostIncrease + toppingsCostIncrease;
    }

    get fullCalories() {
        const sizeCaloriesIncrease = this.size === PizzaSize.Big ? 200 : 100;
        const toppingsCaloriesIncrease =
            this.#toppings.length == 0 ? 0
                : this.size === PizzaSize.Big ?
                    this.#toppings.map((e) => e.bigSizeCalories).reduce((a, e) => a + e)
                    : this.#toppings.map((e) => e.smallSizeCalories).reduce((a, e) => a + e);

        return this.#baseCalories + sizeCaloriesIncrease + toppingsCaloriesIncrease;
    }
}

const currentPizza = new Pizza("pepperoni", PizzaSize.Small, []);
let selectedPizzaType = document.getElementById("pepperoni");

function updateCartButtonText() {
    addToCartButton.innerHTML = `Добавить в корзину за<br>${currentPizza.fullPrice}₽ (${currentPizza.fullCalories} кКалл)`;
}

function pizzaTypeChanged(value, object) {
    selectedPizzaType.setAttribute("data-selected", "false");
    object.setAttribute("data-selected", "true");
    currentPizza.type = value;
    selectedPizzaType = object;

    updateCartButtonText();
}

function pizzaSizeChanged(changeToppingPrices, sizeValue) {
    if (sizeValue === "Big") {
        moveSlider("slider100");
        currentPizza.size = PizzaSize.Big;
    }
    else if (sizeValue === "Small") {
        moveSlider("slider0");
        currentPizza.size = PizzaSize.Small;
    }
    else
        console.error("Incorrect sizeValue passed");

    changeToppingPrices();
    updateCartButtonText();
}

function toppingChanged(value, object) {
    if (object.getAttribute('data-selected') === 'true') { // deselect topping 
        object.setAttribute('data-selected', 'false');
        currentPizza.removeTopping(PizzaTopping.getByName(value));
    }
    else { // select topping
        object.setAttribute('data-selected', 'true');
        currentPizza.addTopping(PizzaTopping.getByName(value));
    }

    updateCartButtonText();
}

function setSmallToppingsPrices() {
    cheeseCrustCost.textContent = "150₽";
    mocarellaCost.textContent = "50₽";
    cheddarParmezanCost.textContent = "150₽";
}

function setBigToppingsPrices() {
    cheeseCrustCost.textContent = "300₽";
    mocarellaCost.textContent = "100₽";
    cheddarParmezanCost.textContent = "300₽";
}

function moveSlider(sliderClass) {
    sizeSlider.className = sliderClass;
}
