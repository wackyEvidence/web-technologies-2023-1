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







